import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  getCurrentUser,
  fetchAuthSession,
  signIn,
  signOut,
} from "aws-amplify/auth";
import { config } from "@/config";
import { User, AppRole } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  hasRole: (roles: AppRole | AppRole[]) => boolean;
  canAccessModule: (module: string) => boolean;
}

const ROLE_PERMISSIONS: Record<AppRole, string[]> = {
  "System Admin": [
    "Dashboard",
    "Core HR",
    "Leave",
    "Performance",
    "Admin",
    "Audit",
    "Analytics",
  ],
  "HR Admin": ["Dashboard", "Core HR", "Leave", "Performance", "Admin", "Analytics"],
  Manager: ["Dashboard", "Leave", "Performance", "Analytics"],
  Employee: ["Dashboard", "Leave"],
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCognitoToUser(cognitoUser: any | undefined): User | null {
  if (!cognitoUser) return null;

  const attrs = cognitoUser.attributes || {};
  const groups: string[] =
    cognitoUser?.signInUserSession?.idToken?.payload?.["cognito:groups"] || [];

  let role: AppRole = "Employee";
  if (groups.includes("SystemAdmin")) role = "System Admin";
  else if (groups.includes("HRAdmin")) role = "HR Admin";
  else if (groups.includes("Manager")) role = "Manager";

  return {
    id: attrs.sub || cognitoUser.username || "",
    firstName: attrs.given_name || "",
    lastName: attrs.family_name || "",
    email: attrs.email || "",
    avatar: "",
    role,
  };
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
  (async () => {
    try {
      const cognitoUser = await getCurrentUser();      // instead of Auth.currentAuthenticatedUser()
      const user = mapCognitoToUser(cognitoUser);
      if (user) {
        const session = await fetchAuthSession();      // instead of Auth.currentSession()
        const idToken = session.tokens?.idToken?.toString() ?? "";

        localStorage.setItem(config.auth.tokenStorageKey, idToken);
        localStorage.setItem(config.auth.userStorageKey, JSON.stringify(user));
        setState({ user, isAuthenticated: true, isLoading: false });
      } else {
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  })();
}, []);

const login = useCallback(
  async (email: string, password: string): Promise<User> => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });

      if (!isSignedIn) {
        // handle nextStep (e.g. MFA) if you need it
      }

      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString() ?? "";
      const cognitoUser = await getCurrentUser();
      const user = mapCognitoToUser(cognitoUser);

      if (!user) {
        throw new Error("Unable to map Cognito user");
      }

      localStorage.setItem(config.auth.tokenStorageKey, idToken);
      localStorage.setItem(config.auth.userStorageKey, JSON.stringify(user));

      setState({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (error) {
      setState(prev => ({ ...prev, isAuthenticated: false, isLoading: false }));
      throw error;
    }
  },
  []
);

  const logout = useCallback(async () => {
    await signOut();
    localStorage.removeItem(config.auth.userStorageKey);
    localStorage.removeItem(config.auth.tokenStorageKey);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const hasRole = useCallback(
    (roles: AppRole | AppRole[]): boolean => {
      if (!state.user) return false;
      const roleArray = Array.isArray(roles) ? roles : [roles];
      return roleArray.includes(state.user.role);
    },
    [state.user]
  );

  const canAccessModule = useCallback(
    (module: string): boolean => {
      if (!state.user) return false;
      const allowedModules = ROLE_PERMISSIONS[state.user.role] || [];
      return allowedModules.includes(module);
    },
    [state.user]
  );

  const value: AuthContextValue = useMemo(
    () => ({
      ...state,
      login,
      logout,
      hasRole,
      canAccessModule,
    }),
    [state, login, logout, hasRole, canAccessModule]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface RequireAuthProps {
  children: React.ReactNode;
  roles?: AppRole[];
  module?: string;
  fallback?: React.ReactNode;
}

export function RequireAuth({ children, roles, module, fallback }: RequireAuthProps) {
  const { isAuthenticated, hasRole, canAccessModule, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || null;
  }

  if (roles && !hasRole(roles)) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h2 className="text-xl font-semibold text-card-foreground">Access Denied</h2>
        <p className="text-muted-foreground mt-2">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  if (module && !canAccessModule(module)) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h2 className="text-xl font-semibold text-card-foreground">Access Denied</h2>
        <p className="text-muted-foreground mt-2">
          You do not have access to the {module} module.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
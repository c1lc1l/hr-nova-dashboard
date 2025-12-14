import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { User, AppRole } from '@/types';
import { config } from '@/config';

// ============================================
// Auth Context Types
// ============================================

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

// Module access by role
const ROLE_PERMISSIONS: Record<AppRole, string[]> = {
  'System Admin': ['Dashboard', 'Core HR', 'Leave', 'Performance', 'Admin', 'Audit', 'Analytics'],
  'HR Admin': ['Dashboard', 'Core HR', 'Leave', 'Performance', 'Admin', 'Analytics'],
  'Manager': ['Dashboard', 'Leave', 'Performance', 'Analytics'],
  'Employee': ['Dashboard', 'Leave'],
};

// ============================================
// Auth Context
// ============================================

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Mock user data - TODO: Replace with Cognito authentication
const mockUsers: Record<string, User> = {
  'admin@company.com': {
    id: 'USR001',
    firstName: 'Amanda',
    lastName: 'Foster',
    email: 'admin@company.com',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150',
    role: 'System Admin',
  },
  'hr@company.com': {
    id: 'USR002',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'hr@company.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'HR Admin',
  },
  'manager@company.com': {
    id: 'USR003',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'manager@company.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'Manager',
  },
  'employee@company.com': {
    id: 'USR004',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'employee@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    role: 'Employee',
  },
};

// ============================================
// Auth Provider
// ============================================

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(config.auth.userStorageKey);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem(config.auth.userStorageKey);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Login handler
  // TODO: Integrate with AWS Cognito
  const login = useCallback(async (email: string, password: string): Promise<User> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock authentication - accepts any password for demo
    // In production, this would call Cognito
    const user = mockUsers[email.toLowerCase()] || mockUsers['hr@company.com'];

    // TODO: Replace with actual Cognito authentication
    // const cognitoUser = await Auth.signIn(email, password);
    // const session = await Auth.currentSession();
    // const idToken = session.getIdToken().getJwtToken();
    // Store token: localStorage.setItem(config.auth.tokenStorageKey, idToken);

    localStorage.setItem(config.auth.userStorageKey, JSON.stringify(user));
    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });

    return user;
  }, []);

  // Logout handler
  const logout = useCallback(async () => {
    // TODO: Call Cognito signOut
    // await Auth.signOut();

    localStorage.removeItem(config.auth.userStorageKey);
    localStorage.removeItem(config.auth.tokenStorageKey);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  // Check if user has one of the specified roles
  const hasRole = useCallback((roles: AppRole | AppRole[]): boolean => {
    if (!state.user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(state.user.role);
  }, [state.user]);

  // Check if user can access a specific module
  const canAccessModule = useCallback((module: string): boolean => {
    if (!state.user) return false;
    const allowedModules = ROLE_PERMISSIONS[state.user.role] || [];
    return allowedModules.includes(module);
  }, [state.user]);

  const value = useMemo<AuthContextValue>(() => ({
    ...state,
    login,
    logout,
    hasRole,
    canAccessModule,
  }), [state, login, logout, hasRole, canAccessModule]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================
// Custom Hook
// ============================================

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// ============================================
// Route Guard Component
// ============================================

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

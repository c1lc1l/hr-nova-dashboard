// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth, RequireAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/layout/AppLayout";

import LoginPage from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Employees from "@/pages/Employees";
import EmployeeDetail from "@/pages/EmployeeDetail";
import LeaveManagement from "@/pages/LeaveManagement";
import PerformanceReview from "@/pages/PerformanceReview";
import PerformanceDetail from "@/pages/PerformanceDetail";
import Analytics from "@/pages/Analytics";
import Admin from "@/pages/Admin";
import AuditLogs from "@/pages/AuditLogs";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const isHrOrSysAdmin =
    user?.role === "HR Admin" || user?.role === "System Admin";

  // Default landing page once authenticated:
  // - HR/System Admin → dashboard
  // - Employee → leave management
  const defaultAuthenticatedPath = isHrOrSysAdmin ? "/dashboard" : "/leave";

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* unauthenticated users hitting / should go to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* if already authenticated and URL is /login, go to role‑based default */}
      <Route
        path="/login"
        element={<Navigate to={defaultAuthenticatedPath} replace />}
      />

      <Route element={<AppLayout />}>
        {/* Dashboard – only HR/System Admin for now */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth module="Dashboard" roles={["System Admin", "HR Admin"]}>
              <Dashboard user={user} />
            </RequireAuth>
          }
        />

        {/* Employees list – HR/System Admin only */}
        <Route
          path="/employees"
          element={
            <RequireAuth module="Core HR" roles={["System Admin", "HR Admin"]}>
              <Employees />
            </RequireAuth>
          }
        />

        {/* Employee detail – HR/System Admin only */}
        <Route
          path="/employees/:id"
          element={
            <RequireAuth module="Core HR" roles={["System Admin", "HR Admin"]}>
              <EmployeeDetail />
            </RequireAuth>
          }
        />

        {/* Leave management – everyone with access to Leave module (employees land here by default) */}
        <Route
          path="/leave"
          element={
            <RequireAuth module="Leave">
              <LeaveManagement />
            </RequireAuth>
          }
        />

        {/* Performance – HR/System Admin only */}
        <Route
          path="/performance"
          element={
            <RequireAuth
              module="Performance"
              roles={["System Admin", "HR Admin"]}
            >
              <PerformanceReview />
            </RequireAuth>
          }
        />
        <Route
          path="/performance/:id"
          element={
            <RequireAuth
              module="Performance"
              roles={["System Admin", "HR Admin"]}
            >
              <PerformanceDetail />
            </RequireAuth>
          }
        />

        {/* Analytics – currently assume HR/System Admin via module config, or widen later */}
        <Route
          path="/analytics"
          element={
            <RequireAuth module="Analytics">
              <Analytics />
            </RequireAuth>
          }
        />

        {/* Admin & Audit – HR/System Admin only */}
        <Route
          path="/admin"
          element={
            <RequireAuth roles={["System Admin", "HR Admin"]}>
              <Admin />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/audit"
          element={
            <RequireAuth roles={["System Admin", "HR Admin"]} module="Audit">
              <AuditLogs />
            </RequireAuth>
          }
        />
      </Route>

      {/* Root: send authenticated users to their role‑based default */}
      <Route
        path="/"
        element={<Navigate to={defaultAuthenticatedPath} replace />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
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
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout user={user} onLogout={logout} />}>
        <Route
          path="/dashboard"
          element={
            <RequireAuth module="Dashboard">
              <Dashboard user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/employees"
          element={
            <RequireAuth module="Core HR" roles={["System Admin", "HR Admin"]}>
              <Employees />
            </RequireAuth>
          }
        />
        <Route
          path="/employees/:id"
          element={
            <RequireAuth module="Core HR" roles={["System Admin", "HR Admin"]}>
              <EmployeeDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/leave"
          element={
            <RequireAuth module="Leave">
              <LeaveManagement />
            </RequireAuth>
          }
        />
        <Route
          path="/performance"
          element={
            <RequireAuth module="Performance">
              <PerformanceReview />
            </RequireAuth>
          }
        />
        <Route
          path="/performance/:id"
          element={
            <RequireAuth module="Performance">
              <PerformanceDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/analytics"
          element={
            <RequireAuth module="Analytics">
              <Analytics />
            </RequireAuth>
          }
        />
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
            <RequireAuth roles={["System Admin"]} module="Audit">
              <AuditLogs />
            </RequireAuth>
          }
        />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
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

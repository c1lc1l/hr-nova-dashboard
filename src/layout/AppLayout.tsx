import { NavLink, Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { useAuth } from "@/contexts/AuthContext";

export function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen w-full bg-background">
      <AppSidebar onLogout={logout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={user} onLogout={logout} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarLinks() {
  const { hasRole, canAccessModule } = useAuth();

  return (
    <>
      {canAccessModule("Dashboard") && (
        <NavLink to="/dashboard">Dashboard</NavLink>
      )}

      {canAccessModule("Core HR") && hasRole(["System Admin", "HR Admin"]) && (
        <NavLink to="/employees">Employees</NavLink>
      )}

      {canAccessModule("Leave") && <NavLink to="/leave">Leave</NavLink>}

      {canAccessModule("Performance") && (
        <NavLink to="/performance">Performance</NavLink>
      )}

      {canAccessModule("Analytics") && (
        <NavLink to="/analytics">Analytics</NavLink>
      )}

      {hasRole(["System Admin", "HR Admin"]) && (
        <NavLink to="/admin">Admin</NavLink>
      )}

      {hasRole(["System Admin"]) && (
        <NavLink to="/admin/audit">Audit Logs</NavLink>
      )}
    </>
  );
}

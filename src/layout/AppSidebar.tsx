import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import logo from "@/assets/logo.png";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/employees", label: "Employees", icon: Users },
  { path: "/leave", label: "Leave Management", icon: Calendar },
  //{ path: "/performance", label: "Performance", icon: BarChart3 },
  { path: "/admin", label: "Admin", icon: Settings },
];

interface AppSidebarProps {
  onLogout: () => Promise<void>;
}

export function AppSidebar({ onLogout }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();

  const confirmLogout = async () => {
    await onLogout();
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <aside
        className={cn(
          "h-screen bg-card border-r border-border flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-background flex items-center justify-center">
                <img
                  src={logo}
                  alt="HR NOVA"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-xl text-card-foreground">
                HR NOVA
              </span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-background flex items-center justify-center mx-auto">
              <img
                src={logo}
                alt="HR NOVA"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", collapsed && "hidden")}
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-card-foreground"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse Toggle (when collapsed) */}
        {collapsed && (
          <div className="p-3">
            <Button
              variant="ghost"
              size="icon"
              className="w-full h-10"
              onClick={() => setCollapsed(false)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Logout */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-colors",
              "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Logout confirmation dialog */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log out of HR NOVA?</DialogTitle>
            <DialogDescription>
              You will be signed out and returned to the login page.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmLogout}>
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

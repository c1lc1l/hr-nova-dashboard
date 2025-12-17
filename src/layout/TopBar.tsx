import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { User } from "@/types";

interface TopBarProps {
  user: User | null;
  onLogout: () => Promise<void>;
}

type FeatureKey = "profile" | "preferences" | null;

export function TopBar({ user, onLogout }: TopBarProps) {
  const navigate = useNavigate();
  const [openFeature, setOpenFeature] = useState<FeatureKey>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const openComingSoon = (feature: Exclude<FeatureKey, null>) => {
    setOpenFeature(feature);
  };

  const confirmLogout = async () => {
    await onLogout();
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  return (
    <>
      <header className="h-16 bg-card border-b border-border flex items-center px-6">
        {/* Left: search */}
        <div className="flex-[2]">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees, leave requests..."
              className="pl-10 bg-background"
            />
          </div>
        </div>

        {/* Center: reserved for page title (optional, currently empty) */}
        <div className="flex-1 flex justify-center" />

        {/* Right: notifications + user */}
        <div className="flex-[2] flex items-center gap-4 justify-end">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">New leave request</span>
                <span className="text-sm text-muted-foreground">
                  Emily Rodriguez requested 2 days off
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">Performance review due</span>
                <span className="text-sm text-muted-foreground">
                  3 reviews pending your approval
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">New employee onboarding</span>
                <span className="text-sm text-muted-foreground">
                  Robert Taylor starts today
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-3 pl-2 pr-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => openComingSoon("profile")}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openComingSoon("preferences")}>
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setShowLogoutConfirm(true)}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Coming soon dialog for profile/preferences */}
      <Dialog open={openFeature !== null} onOpenChange={() => setOpenFeature(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {openFeature === "profile"
                ? "Profile Settings"
                : openFeature === "preferences"
                ? "Preferences"
                : "Coming soon"}
            </DialogTitle>
            <DialogDescription>
              This feature is coming soon. You will be able to edit your{" "}
              {openFeature === "profile"
                ? "profile details"
                : "account preferences"}{" "}
              here.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

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

import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { TopBar } from './TopBar';
import { User } from '@/types';

interface AppLayoutProps {
  user: User | null;
  onLogout: () => void;
}

export function AppLayout({ user, onLogout }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background">
      <AppSidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={user} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

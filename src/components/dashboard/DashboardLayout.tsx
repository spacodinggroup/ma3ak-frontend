import { ReactNode } from 'react';
import { StudentSidebar } from './StudentSidebar';
import { BusinessSidebar } from './BusinessSidebar';
import { FounderSidebar } from './FounderSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import { Navigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardContent({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const { collapsed } = useSidebar();

  const renderSidebar = () => {
    switch (user?.role) {
      case 'student':
        return <StudentSidebar />;
      case 'business':
        return <BusinessSidebar />;
      case 'founder':
      default:
        return <FounderSidebar />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderSidebar()}
      <main className={cn(
        'min-h-screen p-6 md:p-8 transition-all duration-300',
        isRTL 
          ? (collapsed ? 'mr-[72px]' : 'mr-64')
          : (collapsed ? 'ml-[72px]' : 'ml-64')
      )}>
        {children}
      </main>
    </div>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}

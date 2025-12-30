import { Outlet, Navigate } from 'react-router-dom';
import { StudentSidebar } from './StudentSidebar';
import { BusinessSidebar } from './BusinessSidebar';
import { FounderSidebar } from './FounderSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types/user';

function DashboardContent() {
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const { collapsed } = useSidebar();

  const renderSidebar = () => {
    switch (user?.role) {
      case UserRole.STUDENT:
        return <StudentSidebar />;
      case UserRole.BUSINESS:
        return <BusinessSidebar />;
      case UserRole.FOUNDER:
        return <FounderSidebar />;
      default:
        return null;
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
        <Outlet />
      </main>
    </div>
  );
}

export function DashboardLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
}

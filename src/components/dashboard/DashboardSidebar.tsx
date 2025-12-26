import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { ROLE_CONFIGS, UserRole } from '@/types/user';
import {
  Sparkles,
  LayoutDashboard,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Brain,
  Calendar,
  FileText,
  Target,
  BarChart3,
  Mail,
  PieChart,
  Rocket,
  GitBranch,
  Lightbulb,
  Milestone,
  Flag,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const roleNavItems: Record<UserRole, { icon: any; label: string; href: string }[]> = {
  student: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Brain, label: 'AI Tutor', href: '/dashboard/chat' },
    { icon: BookOpen, label: 'Subjects', href: '/dashboard/subjects' },
    { icon: Calendar, label: 'Study Plan', href: '/dashboard/plan' },
    { icon: FileText, label: 'Notes & PDFs', href: '/dashboard/notes' },
    { icon: Target, label: 'Exams', href: '/dashboard/exams' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ],
  business: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: MessageSquare, label: 'AI Advisor', href: '/dashboard/chat' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: PieChart, label: 'Campaigns', href: '/dashboard/campaigns' },
    { icon: Mail, label: 'Content', href: '/dashboard/content' },
    { icon: Target, label: 'Goals', href: '/dashboard/goals' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ],
  founder: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Rocket, label: 'AI Co-Founder', href: '/dashboard/chat' },
    { icon: GitBranch, label: 'Roadmap', href: '/dashboard/roadmap' },
    { icon: Lightbulb, label: 'Ideas', href: '/dashboard/ideas' },
    { icon: Users, label: 'Team', href: '/dashboard/team' },
    { icon: Milestone, label: 'Milestones', href: '/dashboard/milestones' },
    { icon: Flag, label: 'Investor Prep', href: '/dashboard/investor' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ],
};

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  const { isRTL } = useLanguage();
  const { collapsed, toggle } = useSidebar();
  const location = useLocation();

  const roleConfig = ROLE_CONFIGS.find((r) => r.id === user?.role);
  const navItems = roleNavItems[user?.role || 'founder'];

  const getRoleColor = () => {
    switch (user?.role) {
      case 'student': return 'role-student';
      case 'business': return 'role-business';
      case 'founder': return 'role-founder';
      default: return 'primary';
    }
  };

  const roleColor = getRoleColor();

  const NavItem = ({ item }: { item: { icon: any; label: string; href: string } }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;

    const content = (
      <Link
        to={item.href}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
          isActive
            ? `bg-${roleColor}/15 text-${roleColor} shadow-sm`
            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
          collapsed && 'justify-center px-2'
        )}
      >
        <Icon className={cn(
          'w-5 h-5 shrink-0 transition-transform duration-200',
          !isActive && 'group-hover:scale-110'
        )} />
        {!collapsed && (
          <span className="text-sm font-medium truncate">{item.label}</span>
        )}
        {isActive && !collapsed && (
          <div className={cn(
            'w-1.5 h-1.5 rounded-full ml-auto',
            `bg-${roleColor}`
          )} />
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side={isRTL ? 'left' : 'right'} className="font-medium">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <aside
      className={cn(
        'fixed top-0 bottom-0 z-40 flex flex-col bg-sidebar/95 backdrop-blur-xl border-sidebar-border transition-all duration-300 ease-in-out',
        isRTL ? 'right-0 border-l' : 'left-0 border-r',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border/50">
        {!collapsed ? (
          <Link to="/" className={cn('flex items-center gap-2.5', isRTL && 'flex-row-reverse')}>
            <div className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center',
              `bg-${roleColor}/20`
            )}>
              <Sparkles className={cn('w-5 h-5', `text-${roleColor}`)} />
            </div>
            <span className="font-bold text-lg gradient-text">CoFounder AI</span>
          </Link>
        ) : (
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center mx-auto',
            `bg-${roleColor}/20`
          )}>
            <Sparkles className={cn('w-5 h-5', `text-${roleColor}`)} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className={cn('px-3 space-y-1', isRTL && 'text-right')}>
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>
      </ScrollArea>

      {/* User Section */}
      <div className="p-3 border-t border-sidebar-border/50">
        {!collapsed && user && (
          <div className={cn(
            'flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-sidebar-accent/30',
            isRTL && 'flex-row-reverse'
          )}>
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center text-lg',
              `bg-${roleColor}/20`
            )}>
              {roleConfig?.icon}
            </div>
            <div className={cn('flex-1 min-w-0', isRTL && 'text-right')}>
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className={cn(
                'text-xs capitalize font-medium',
                `text-${roleColor}`
              )}>{user.role}</p>
            </div>
          </div>
        )}
        
        {collapsed && user && (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 text-lg cursor-default',
                `bg-${roleColor}/20`
              )}>
                {roleConfig?.icon}
              </div>
            </TooltipTrigger>
            <TooltipContent side={isRTL ? 'left' : 'right'}>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </TooltipContent>
          </Tooltip>
        )}

        <Button
          variant="ghost"
          className={cn(
            'w-full text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10 rounded-xl',
            collapsed ? 'justify-center px-2' : isRTL ? 'justify-end' : 'justify-start'
          )}
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className={cn(isRTL ? 'mr-3' : 'ml-3')}>Log out</span>}
        </Button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={toggle}
        className={cn(
          'absolute top-20 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200 shadow-sm',
          isRTL ? '-left-3' : '-right-3'
        )}
      >
        {isRTL ? (
          collapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        ) : (
          collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
}

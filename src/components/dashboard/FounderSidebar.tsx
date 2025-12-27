import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/contexts/SidebarContext';
import {
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Settings,
  Rocket,
  Lightbulb,
  GitBranch,
  Target,
  Users,
  FileText,
  Milestone,
  Code2,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/founder' },
  { icon: MessageSquare, label: 'AI Co-Founder', href: '/dashboard/founder/chat' },
  { icon: Lightbulb, label: 'Idea Validation', href: '/dashboard/founder/validate' },
  { icon: GitBranch, label: 'Roadmap', href: '/dashboard/founder/roadmap' },
  { icon: Code2, label: 'Tech Stack', href: '/dashboard/founder/tech' },
  { icon: Milestone, label: 'Milestones', href: '/dashboard/founder/milestones' },
  { icon: Target, label: 'OKRs', href: '/dashboard/founder/okrs' },
  { icon: Users, label: 'Team', href: '/dashboard/founder/team' },
  { icon: FileText, label: 'Pitch Deck', href: '/dashboard/founder/pitch' },
  { icon: BarChart3, label: 'Metrics', href: '/dashboard/founder/metrics' },
  { icon: Settings, label: 'Settings', href: '/dashboard/founder/settings' },
];

export function FounderSidebar() {
  const { user, logout } = useAuth();
  const { isRTL } = useLanguage();
  const { collapsed, toggle } = useSidebar();
  const location = useLocation();

  const NavItem = ({ item }: { item: { icon: any; label: string; href: string } }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;

    const content = (
      <Link
        to={item.href}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
          isActive
            ? 'bg-role-founder/15 text-role-founder shadow-sm'
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
          <div className="w-1.5 h-1.5 rounded-full ml-auto bg-role-founder" />
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
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-role-founder/20">
              <Rocket className="w-5 h-5 text-role-founder" />
            </div>
            <span className="font-bold text-lg text-role-founder">Founder AI</span>
          </Link>
        ) : (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto bg-role-founder/20">
            <Rocket className="w-5 h-5 text-role-founder" />
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
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-role-founder/20">
              🚀
            </div>
            <div className={cn('flex-1 min-w-0', isRTL && 'text-right')}>
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs capitalize font-medium text-role-founder">Founder</p>
            </div>
          </div>
        )}

        {collapsed && user && (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 text-lg cursor-default bg-role-founder/20">
                🚀
              </div>
            </TooltipTrigger>
            <TooltipContent side={isRTL ? 'left' : 'right'}>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">Founder</p>
            </TooltipContent>
          </Tooltip>
        )}

        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            "hover:bg-secondary hover:text-secondary-foreground",
            "w-full text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10 rounded-xl",
            collapsed ? 'justify-center px-2' : isRTL ? 'justify-end' : 'justify-start'
          )}
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className={cn(isRTL ? 'mr-3' : 'ml-3')}>Log out</span>}
        </button>
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

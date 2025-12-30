import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { ROUTES } from '@/constants/routes';
import {
  Sparkles,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Brain,
  Calendar,
  FileText,
  Target,
  Settings,
  GraduationCap,
  FlaskConical,
  PenTool,
  Trophy,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: ROUTES.STUDENT.HOME },
  { icon: Brain, label: 'AI Tutor', href: ROUTES.STUDENT.CHAT },
  { icon: BookOpen, label: 'Subjects', href: ROUTES.STUDENT.SUBJECTS },
  { icon: Calendar, label: 'Study Plan', href: ROUTES.STUDENT.PLAN },
  { icon: FileText, label: 'Notes & PDFs', href: ROUTES.STUDENT.NOTES },
  { icon: FlaskConical, label: 'Practice Tests', href: ROUTES.STUDENT.PRACTICE },
  { icon: Target, label: 'Exams', href: ROUTES.STUDENT.EXAMS },
  { icon: Trophy, label: 'Progress', href: ROUTES.STUDENT.PROGRESS },
  { icon: Clock, label: 'Study Timer', href: ROUTES.STUDENT.TIMER },
  { icon: Settings, label: 'Settings', href: ROUTES.STUDENT.SETTINGS },
];

export function StudentSidebar() {
  const { user, logout } = useAuth();
  const { isRTL } = useLanguage();
  const { collapsed, toggle } = useSidebar();

  const NavItem = ({ item }: { item: { icon: any; label: string; href: string } }) => {
    const Icon = item.icon;

    const content = (
      <NavLink
        to={item.href}
        end={item.href === ROUTES.STUDENT.HOME}
        className={({ isActive }) => cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
          isActive
            ? 'bg-role-student/15 text-role-student shadow-sm active-sidebar-item'
            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
          collapsed && 'justify-center px-2'
        )}
      >
        {({ isActive }) => (
          <>
            <Icon className={cn(
              'w-5 h-5 shrink-0 transition-transform duration-200',
              !isActive && 'group-hover:scale-110'
            )} />
            {!collapsed && (
              <span className="text-sm font-medium truncate">{item.label}</span>
            )}
            {isActive && !collapsed && (
              <div className="w-1.5 h-1.5 rounded-full ml-auto bg-role-student" />
            )}
          </>
        )}
      </NavLink>
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
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-role-student/20">
              <GraduationCap className="w-5 h-5 text-role-student" />
            </div>
            <span className="font-bold text-lg text-role-student">Study AI</span>
          </Link>
        ) : (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto bg-role-student/20">
            <GraduationCap className="w-5 h-5 text-role-student" />
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
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-role-student/20">
              🎓
            </div>
            <div className={cn('flex-1 min-w-0', isRTL && 'text-right')}>
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs capitalize font-medium text-role-student">Student</p>
            </div>
          </div>
        )}

        {collapsed && user && (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 text-lg cursor-default bg-role-student/20">
                🎓
              </div>
            </TooltipTrigger>
            <TooltipContent side={isRTL ? 'left' : 'right'}>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">Student</p>
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

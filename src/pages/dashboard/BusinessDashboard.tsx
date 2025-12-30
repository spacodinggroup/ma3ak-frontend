import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import {
  BarChart3,
  Briefcase,
  LayoutDashboard,
  Megaphone,
  PenTool,
  Users,
  FileText,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getBusinessDashboard } from '@/services/business';

// Import business components
import { SalesOverview } from '@/components/dashboard/business/SalesOverview';
import { MarketingCenter } from '@/components/dashboard/business/MarketingCenter';
import { ContentGenerator } from '@/components/dashboard/business/ContentGenerator';
import { CustomerInsights } from '@/components/dashboard/business/CustomerInsights';
import { TasksAndGoals } from '@/components/dashboard/business/TasksAndGoals';
import { ReportsAnalytics } from '@/components/dashboard/business/ReportsAnalytics';
import { AIAdvisorChat } from '@/components/dashboard/business/AIAdvisorChat';

export default function BusinessDashboard() {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  type MonthlyGoal = {
    current: number;
    target: number;
    progress: number;
    daysRemaining: number;
  };

  const [monthlyGoal, setMonthlyGoal] = useState<MonthlyGoal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getBusinessDashboard();
        if (data.monthlyGoal) {
          setMonthlyGoal(data.monthlyGoal);
        }
      } catch (err) {
        console.error("Error loading business dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className="text-2xl font-bold">
            {t('welcomeBackUser')} <span className="text-role-business">{user?.name}</span>
          </h1>
          <p className="text-muted-foreground">{t('businessOverview')}</p>
        </div>
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={() => navigate(ROUTES.BUSINESS.CHAT)}
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
              "h-10 px-4 py-2",
              "bg-role-business hover:bg-role-business/80"
            )}>
            <Briefcase className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('aiBusinessAdvisor')}
          </button>
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
          <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-role-business/20">
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="marketing" className="gap-2 data-[state=active]:bg-role-business/20">
            <Megaphone className="w-4 h-4" />
            <span className="hidden sm:inline">Marketing</span>
          </TabsTrigger>
          <TabsTrigger value="sales" className="gap-2 data-[state=active]:bg-role-business/20">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Sales</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2 data-[state=active]:bg-role-business/20">
            <PenTool className="w-4 h-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="gap-2 data-[state=active]:bg-role-business/20">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Customers</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2 data-[state=active]:bg-role-business/20">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* AI Advisor Chat */}
          <AIAdvisorChat />

          {/* Sales Overview */}
          <SalesOverview />

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <MarketingCenter />
            </div>
            <div className="space-y-6">
              <TasksAndGoals />

              {/* Monthly Goal Card */}
              {monthlyGoal && (
                <div className="bg-gradient-to-br from-role-business/20 to-card rounded-xl border border-role-business/30 p-4">
                  <h3 className="font-semibold mb-2">{t('monthlyRevenueGoal')}</h3>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-2xl font-bold">${monthlyGoal.current.toLocaleString()}</span>
                    <span className="text-muted-foreground">/ ${monthlyGoal.target.toLocaleString()}</span>
                  </div>
                  <Progress value={monthlyGoal.progress} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {monthlyGoal.progress}% {t('achieved')} • {monthlyGoal.daysRemaining} {t('daysRemaining')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Marketing Tab */}
        <TabsContent value="marketing" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <MarketingCenter />
            <ContentGenerator />
          </div>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="mt-6">
          <SalesOverview />
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <ContentGenerator />
            <div className="space-y-6">
              <AIAdvisorChat />
            </div>
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <CustomerInsights />
            <div className="space-y-6">
              <AIAdvisorChat />
            </div>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <ReportsAnalytics />
            <div className="space-y-6">
              <TasksAndGoals />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

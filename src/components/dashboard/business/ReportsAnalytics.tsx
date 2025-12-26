import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const kpiSummary = [
  { label: 'Total Revenue', value: '$48,520', change: '+12.5%', trend: 'up' },
  { label: 'New Customers', value: '127', change: '+23%', trend: 'up' },
  { label: 'Churn Rate', value: '2.3%', change: '-0.5%', trend: 'up' },
  { label: 'Avg. Order Value', value: '$382', change: '+8%', trend: 'up' },
];

const recentReports = [
  { name: 'Weekly Performance', date: 'Dec 8, 2024', type: 'Auto-generated' },
  { name: 'Monthly Marketing Report', date: 'Dec 1, 2024', type: 'Auto-generated' },
  { name: 'Q4 Sales Analysis', date: 'Nov 30, 2024', type: 'Custom' },
];

export function ReportsAnalytics() {
  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Your AI-generated PDF report will be ready shortly.",
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-role-business" />
            Reports & Analytics
          </CardTitle>
          <Button 
            size="sm" 
            className="bg-role-business hover:bg-role-business/80"
            onClick={handleGenerateReport}
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Generate Report
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* KPI Summary */}
        <div>
          <h4 className="text-sm font-medium mb-3">KPI Summary</h4>
          <div className="grid grid-cols-2 gap-3">
            {kpiSummary.map((kpi, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{kpi.label}</span>
                  <span className={`text-xs flex items-center gap-1 ${kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {kpi.change}
                  </span>
                </div>
                <p className="text-lg font-bold">{kpi.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Weekly Report Preview */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-role-business/10 to-transparent border border-role-business/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-role-business/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-role-business" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">AI Weekly Insights</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Revenue increased 12.5% this week. Email campaign "Holiday Sale" performed 
                best with 9.7% CTR. Consider increasing ad spend on Facebook where 
                conversion rate is highest.
              </p>
              <Link to="/dashboard/chat">
                <Button size="sm" variant="ghost" className="text-role-business mt-2 -ml-2">
                  Get Full Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <h4 className="text-sm font-medium mb-3">Recent Reports</h4>
          <div className="space-y-2">
            {recentReports.map((report, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-role-business" />
                  <div>
                    <p className="text-sm font-medium">{report.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                      <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">{report.type}</span>
                    </div>
                  </div>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

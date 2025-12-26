import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { LineChart, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBusinessAnalytics } from '@/services/business';
import { Skeleton } from '@/components/ui/skeleton';

export default function BusinessAnalytics() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getBusinessAnalytics();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching business analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-business/20 flex items-center justify-center">
            <LineChart className="w-6 h-6 text-role-business" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Understand your performance</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-5">
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-7 w-20 mb-1" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))
          ) : (
            metrics.map((metric, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-5">
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className={`text-xs mt-1 ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="bg-card rounded-xl border border-border p-6 h-64 flex items-center justify-center">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Skeleton className="w-16 h-16 rounded-full" />
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <LineChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Analytics charts coming soon</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

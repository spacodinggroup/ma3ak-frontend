import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getFounderMetrics } from '@/services/founder';

const iconMap = {
  TrendingUp,
  Users,
  DollarSign,
  Target: BarChart3, // Assuming Target is not imported, use BarChart3
};

export default function FounderMetrics() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await getFounderMetrics();
        setMetrics(data);
      } catch (err) {
        console.error("Error loading founder metrics", err);
      } finally {
        setLoading(false);
      }
    };
    loadMetrics();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-founder/20 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-role-founder" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Metrics</h1>
            <p className="text-muted-foreground">Track your startup performance</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-5 animate-pulse">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-8 bg-muted rounded mb-1"></div>
                <div className="h-3 bg-muted rounded"></div>
              </div>
            ))
          ) : (
            metrics.map((metric, index) => {
              const Icon = iconMap[metric.icon] || BarChart3;
              return (
                <div key={index} className="bg-card rounded-xl border border-border p-5">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Icon className="w-4 h-4" />
                    <span>{metric.label}</span>
                  </div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  {metric.change && (
                    <p className={`text-xs mt-1 ${metric.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {metric.change}
                    </p>
                  )}
                  {metric.target && (
                    <p className="text-xs text-muted-foreground mt-1">Target: {metric.target}</p>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="bg-card rounded-xl border border-border p-6 h-64 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Detailed metrics charts coming soon</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

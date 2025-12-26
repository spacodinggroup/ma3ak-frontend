import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Target, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { getFounderOKRs } from '@/services/founder';

export default function FounderOKRs() {
  const [okrs, setOkrs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOKRs = async () => {
      try {
        const data = await getFounderOKRs();
        setOkrs(data);
      } catch (err) {
        console.error("Error loading founder OKRs", err);
      } finally {
        setLoading(false);
      }
    };
    loadOKRs();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-founder/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-role-founder" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">OKRs</h1>
              <p className="text-muted-foreground">Objectives & Key Results</p>
            </div>
          </div>
          <Button className="bg-role-founder hover:bg-role-founder/80">
            <Plus className="w-4 h-4 mr-2" />
            Add OKR
          </Button>
        </div>

        <div className="space-y-6">
          {loading ? (
            Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6 animate-pulse">
                <div className="h-6 bg-muted rounded mb-4"></div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-4 bg-muted rounded w-48"></div>
                      <div className="h-4 bg-muted rounded w-16"></div>
                    </div>
                    <div className="h-2 bg-muted rounded"></div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-4 bg-muted rounded w-40"></div>
                      <div className="h-4 bg-muted rounded w-12"></div>
                    </div>
                    <div className="h-2 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            okrs.map((okr, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg mb-4">{okr.objective}</h3>
                <div className="space-y-4">
                  {okr.keyResults.map((kr, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">{kr.title}</span>
                        <span className="text-sm text-muted-foreground">{kr.current} / {kr.target}</span>
                      </div>
                      <Progress value={kr.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

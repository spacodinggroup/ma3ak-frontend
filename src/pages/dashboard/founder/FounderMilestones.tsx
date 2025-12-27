import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Milestone, Plus, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getFounderMilestones } from '@/services/founder';

export default function FounderMilestones() {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMilestones = async () => {
      try {
        const data = await getFounderMilestones();
        setMilestones(data);
      } catch (err) {
        console.error("Error loading founder milestones", err);
      } finally {
        setLoading(false);
      }
    };
    loadMilestones();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-founder/20 flex items-center justify-center">
              <Milestone className="w-6 h-6 text-role-founder" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Milestones</h1>
              <p className="text-muted-foreground">Track your startup journey</p>
            </div>
          </div>
          <button className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
            "h-10 px-4 py-2",
            "bg-role-founder hover:bg-role-founder/80"
          )}>
            <Plus className="w-4 h-4 mr-2" />
            Add Milestone
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="space-y-6">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 animate-pulse">
                  <div className="w-4 h-4 bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded mb-1"></div>
                    <div className="h-3 bg-muted rounded w-24"></div>
                  </div>
                </div>
              ))
            ) : (
              milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${milestone.status === 'completed' ? 'bg-emerald-400' :
                      milestone.status === 'in-progress' ? 'bg-role-founder animate-pulse' :
                        'bg-muted-foreground/30'
                    }`} />
                  <div className="flex-1">
                    <p className={`font-medium ${milestone.status === 'completed' ? 'text-muted-foreground' : ''}`}>
                      {milestone.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{milestone.date}</p>
                  </div>
                  {milestone.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  )}
                  {milestone.status === 'in-progress' && (
                    <span className="text-xs px-2 py-1 rounded bg-role-founder/20 text-role-founder">In Progress</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

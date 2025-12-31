import { GitBranch, Plus, CheckCircle, Circle, CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getFounderRoadmap } from '@/services/founder';

export default function FounderRoadmap() {
  const [roadmapItems, setRoadmapItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        const data = await getFounderRoadmap();
        setRoadmapItems(data);
      } catch (err) {
        console.error("Error loading founder roadmap", err);
      } finally {
        setLoading(false);
      }
    };
    loadRoadmap();
  }, []);
  return (
    <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-founder/20 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-role-founder" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Product Roadmap</h1>
              <p className="text-muted-foreground">Plan your MVP and beyond</p>
            </div>
          </div>
          <button className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
            "h-10 px-4 py-2",
            "bg-role-founder hover:bg-role-founder/80"
          )}>
            <Plus className="w-4 h-4 mr-2" />
            Add Feature
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border divide-y divide-border">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="p-4 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 bg-muted rounded-full"></div>
                  <div className="h-4 bg-muted rounded w-48"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 bg-muted rounded w-8"></div>
                  <div className="h-5 bg-muted rounded w-16"></div>
                </div>
              </div>
            ))
          ) : (
            roadmapItems.map((item, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {item.status === 'done' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : item.status === 'in-progress' ? (
                    <CircleDot className="w-5 h-5 text-role-founder animate-pulse" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className={item.status === 'done' ? 'text-muted-foreground line-through' : 'font-medium'}>
                    {item.feature}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded ${item.priority === 'P0' ? 'bg-red-500/20 text-red-400' :
                      item.priority === 'P1' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-muted text-muted-foreground'
                    }`}>
                    {item.priority}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${item.status === 'done' ? 'bg-emerald-500/20 text-emerald-400' :
                      item.status === 'in-progress' ? 'bg-role-founder/20 text-role-founder' :
                        'bg-muted text-muted-foreground'
                    }`}>
                    {item.status === 'in-progress' ? 'In Progress' : item.status === 'done' ? 'Done' : 'Pending'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
    </div>
  );
}

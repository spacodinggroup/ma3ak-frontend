import { Target, Plus, CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import { getBusinessGoals } from '@/services/business';
import { Skeleton } from '@/components/ui/skeleton';

export default function BusinessGoals() {
  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await getBusinessGoals();
        setGoals(data.goals || []);
        setTasks(data.tasks || []);
      } catch (error) {
        console.error('Error fetching business goals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);
  return (
    <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-business/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-role-business" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Tasks & Goals</h1>
              <p className="text-muted-foreground">Track your objectives</p>
            </div>
          </div>
          <button className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
            "h-10 px-4 py-2",
            "bg-role-business hover:bg-role-business/80"
          )}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold mb-4">Monthly Goals</h2>
          <div className="space-y-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              ))
            ) : (
              goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-sm text-muted-foreground">{goal.current} / {goal.target}</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold mb-4">Tasks</h2>
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-5 w-12 rounded-full ml-auto" />
                </div>
              ))
            ) : (
              tasks.map((task, index) => (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${task.completed ? 'bg-muted/30 opacity-60' : 'bg-muted/50'}`}>
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-role-business" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ml-auto ${task.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
    </div>
  );
}

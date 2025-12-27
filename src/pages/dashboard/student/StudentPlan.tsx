import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Calendar, Plus, Play, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getStudentPlan } from '@/services/student';

export default function StudentPlan() {
  const [studyPlan, setStudyPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlan = async () => {
      try {
        const data = await getStudentPlan();
        setStudyPlan(data);
      } catch (err) {
        console.error("Error loading study plan", err);
      } finally {
        setLoading(false);
      }
    };
    loadPlan();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-role-student" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Study Plan</h1>
              <p className="text-muted-foreground">Your personalized learning schedule</p>
            </div>
          </div>
          <button className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
            "h-10 px-4 py-2",
            "bg-role-student hover:bg-role-student/80"
          )}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border divide-y divide-border">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Loading study plan...</p>
            </div>
          ) : (
            studyPlan.map((item, index) => (
              <div key={index} className={`p-4 flex items-center justify-between ${item.completed ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.completed ? 'bg-role-student/20' : 'bg-muted'}`}>
                    {item.completed ? (
                      <CheckCircle className="w-5 h-5 text-role-student" />
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${item.completed ? 'line-through' : ''}`}>{item.topic}</p>
                    <p className="text-sm text-muted-foreground">{item.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.time}</p>
                    <p className="text-xs text-muted-foreground">{item.duration}</p>
                  </div>
                  {!item.completed && (
                    <button
                      className={cn(
                        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                        "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
                        "h-9 rounded-md px-3",
                        "border-role-student text-role-student hover:bg-role-student/10"
                      )}
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

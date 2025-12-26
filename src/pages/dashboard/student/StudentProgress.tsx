import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Trophy, TrendingUp, Clock, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { getStudentProgress } from '@/services/student';

export default function StudentProgress() {
  const [stats, setStats] = useState([]);
  const [subjectProgress, setSubjectProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = await getStudentProgress();
        setStats(data.stats);
        setSubjectProgress(data.subjectProgress);
      } catch (err) {
        console.error("Error loading progress", err);
      } finally {
        setLoading(false);
      }
    };
    loadProgress();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-role-student" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Progress</h1>
            <p className="text-muted-foreground">Track your learning journey</p>
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
            stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-card rounded-xl border border-border p-5">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Icon className="w-4 h-4" />
                    <span>{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-role-student mt-1">{stat.change}</p>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold mb-4">Subject Progress</h2>
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 bg-muted rounded w-24"></div>
                    <div className="h-4 bg-muted rounded w-16"></div>
                  </div>
                  <div className="h-3 bg-muted rounded"></div>
                </div>
              ))
            ) : (
              subjectProgress.map((subject, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{subject.name}</span>
                    <span className="text-sm text-muted-foreground">Grade: {subject.grade}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={subject.progress} className="h-3 flex-1" />
                    <span className="text-sm w-12">{subject.progress}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Target, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { getStudentExams } from '@/services/student';

export default function StudentExams() {
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExams = async () => {
      try {
        const data = await getStudentExams();
        setUpcomingExams(data);
      } catch (err) {
        console.error("Error loading exams", err);
      } finally {
        setLoading(false);
      }
    };
    loadExams();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
            <Target className="w-6 h-6 text-role-student" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Upcoming Exams</h1>
            <p className="text-muted-foreground">Prepare for your exams</p>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading exams...</p>
            </div>
          ) : (
            upcomingExams.map((exam, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{exam.subject}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{exam.date}</span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${exam.daysLeft <= 7 ? 'bg-red-500/20 text-red-400' : 'bg-muted text-muted-foreground'}`}>
                    {exam.daysLeft} days left
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Exam Readiness</span>
                    <span className="font-medium">{exam.readiness}%</span>
                  </div>
                  <Progress value={exam.readiness} className="h-3" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

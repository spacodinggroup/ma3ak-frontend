import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FlaskConical, Play, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { getStudentPractice } from '@/services/student';

export default function StudentPractice() {
  const [practiceTests, setPracticeTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPractice = async () => {
      try {
        const data = await getStudentPractice();
        setPracticeTests(data);
      } catch (err) {
        console.error("Error loading practice tests", err);
      } finally {
        setLoading(false);
      }
    };
    loadPractice();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-role-student" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Practice Tests</h1>
              <p className="text-muted-foreground">Test your knowledge</p>
            </div>
          </div>
          <Button className="bg-role-student hover:bg-role-student/80">
            <FlaskConical className="w-4 h-4 mr-2" />
            Generate Test
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">Loading practice tests...</p>
            </div>
          ) : (
            practiceTests.map((test, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{test.title}</h3>
                    <p className="text-sm text-muted-foreground">{test.subject} • {test.questions} questions</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">{test.bestScore}%</span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Best Score</span>
                    <span>{test.bestScore}%</span>
                  </div>
                  <Progress value={test.bestScore} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{test.attempts} attempts</span>
                  <Button size="sm" className="bg-role-student hover:bg-role-student/80">
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

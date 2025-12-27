import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FlaskConical, Play, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
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
          <button
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
              "h-10 px-4 py-2",
              "bg-role-student hover:bg-role-student/80"
            )}
          >
            <FlaskConical className="w-4 h-4 mr-2" />
            Generate Test
          </button>
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
                  <button
                    className={cn(
                      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
                      "h-9 rounded-md px-3",
                      "bg-role-student hover:bg-role-student/80"
                    )}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateAIStudyPlan, StudyPlanItem } from '@/services/student';

export default function StudentPlan() {
  const [studyPlan, setStudyPlan] = useState<StudyPlanItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const subjects = (location.state as { subjects?: string[] })?.subjects || [];

  useEffect(() => {
    if (subjects.length === 0) {
      setError('No subjects provided. Please add subjects first.');
      return;
    }

    const fetchStudyPlan = async () => {
      setLoading(true);
      setError(null);

      try {
        const { studyPlan: plan } = await generateAIStudyPlan({ subjects });

        if (Array.isArray(plan) && plan.length > 0) {
          setStudyPlan(plan);
        } else {
          setStudyPlan([]);
          setError('We couldn\'t generate a study plan. The AI returned an empty response.');
        }
      } catch (err) {
        console.error('Error generating study plan:', err);
        setError('We couldn\'t generate a study plan. Please try again.');
        setStudyPlan([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyPlan();
  }, [subjects]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/student/subjects')}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-secondary h-9 w-9"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-role-student" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Study Plan</h1>
              <p className="text-muted-foreground">
                Generated for {subjects.length} subject{subjects.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-card rounded-xl border border-border p-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-role-student animate-pulse" />
            <p className="text-lg font-medium">Generating Your Study Plan...</p>
            <p className="text-sm text-muted-foreground mt-1">
              Our AI is creating a personalized plan for you
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6">
            <p className="text-destructive font-medium mb-2">Unable to Generate Plan</p>
            <p className="text-sm text-destructive/80">{error}</p>
            <button
              onClick={() => navigate('/dashboard/student/subjects')}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 bg-destructive hover:bg-destructive/80 text-white h-9 px-4 mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Subjects
            </button>
          </div>
        )}

        {/* Study Plan Display */}
        {!loading && !error && studyPlan && studyPlan.length > 0 && (
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">Your Personalized Study Plan</h2>

            <div className="space-y-4">
              {studyPlan?.map((item, index) => (
                <div
                  key={index}
                  className="bg-secondary/30 rounded-lg p-4 border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-role-student/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-role-student">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base">{item.subject}</h3>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>

                  {item.tasks && item.tasks.length > 0 && (
                    <ul className="space-y-2 ml-13">
                      {item.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-sm text-foreground/90 flex items-start gap-2">
                          <span className="text-role-student mt-0.5 shrink-0">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/dashboard/student/subjects')}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 border border-border bg-transparent hover:bg-secondary h-9 px-4 mt-6 w-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Add More Subjects
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && studyPlan.length === 0 && subjects.length > 0 && (
          <div className="bg-card rounded-xl border border-border p-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No study plan generated yet.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

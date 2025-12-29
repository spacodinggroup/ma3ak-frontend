import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { BookOpen, Plus, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { generateAIStudyPlan, StudyPlanItem } from '@/services/student';

interface Subject {
  id: string;
  name: string;
}

export default function StudentSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [inputSubject, setInputSubject] = useState<string>('');
  const [studyPlan, setStudyPlan] = useState<StudyPlanItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddSubject = () => {
    if (!inputSubject.trim()) return;

    const newSubject: Subject = {
      id: Date.now().toString(),
      name: inputSubject.trim()
    };

    setSubjects(prev => [...prev, newSubject]);
    setInputSubject('');
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const handleGeneratePlan = async () => {
    if (subjects.length === 0) {
      setError('Please add at least one subject first');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const subjectNames = subjects.map(s => s.name);
      const { studyPlan: plan } = await generateAIStudyPlan({ subjects: subjectNames });

      // Safe handling of response
      if (Array.isArray(plan) && plan.length > 0) {
        setStudyPlan(plan);
      } else {
        setStudyPlan([]);
        setError('We couldn\'t generate a study plan. Please try again.');
      }
    } catch (err) {
      console.error('Error generating study plan:', err);
      setError('We couldn\'t generate a study plan. Please try again.');
      setStudyPlan([]);
    } finally {
      setGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSubject();
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-role-student" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Subjects & Study Plan</h1>
            <p className="text-muted-foreground">Add subjects and generate your AI study plan</p>
          </div>
        </div>

        {/* Subject Input Section */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Add Your Subjects</h2>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={inputSubject}
              onChange={(e) => setInputSubject(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter subject name (e.g., Mathematics)"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
            />
            <button
              onClick={handleAddSubject}
              disabled={!inputSubject.trim()}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-role-student hover:bg-role-student/80 text-white h-10 px-4"
            >
              <Plus className="w-4 h-4" />
              Add Subject
            </button>
          </div>

          {/* Subjects List */}
          {subjects.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Added Subjects ({subjects.length})</h3>
              <ul className="space-y-2">
                {subjects?.map((subject) => (
                  <li
                    key={subject.id}
                    className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2"
                  >
                    <span className="text-sm font-medium">{subject.name}</span>
                    <button
                      onClick={() => handleRemoveSubject(subject.id)}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGeneratePlan}
            disabled={subjects.length === 0 || generating}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-role-student hover:bg-role-student/80 text-white h-10 px-4 mt-4 w-full"
          >
            {generating ? (
              <>
                <Sparkles className="w-4 h-4 animate-pulse" />
                Generating Study Plan...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate AI Study Plan
              </>
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <p className="text-sm text-destructive font-medium">{error}</p>
          </div>
        )}

        {/* Study Plan Display */}
        {studyPlan && studyPlan.length > 0 && (
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">Your AI-Generated Study Plan</h2>

            <div className="space-y-4">
              {studyPlan?.map((item, index) => (
                <div
                  key={index}
                  className="bg-secondary/30 rounded-lg p-4 border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-role-student/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-role-student">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.subject}</h3>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>

                  {item.tasks && item.tasks.length > 0 && (
                    <ul className="space-y-1 mt-3">
                      {item.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span className="text-role-student mt-1">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Plan Yet */}
        {!generating && studyPlan.length === 0 && subjects.length > 0 && !error && (
          <div className="bg-card rounded-xl border border-border p-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No study plan generated yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Click "Generate AI Study Plan" to create one!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

import { Target, Calendar, Clock, ChevronLeft, ChevronRight, AlertCircle, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState, useCallback } from 'react';
import { getStudentExams } from '@/services/student';
import { cn } from '@/lib/utils';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Exam {
  id: string;
  subject: string;
  date: string;
  daysLeft: number;
  readiness: number;
  durationMinutes: number;
  questions: Question[];
}

interface ExamResults {
  score: number;
  totalQuestions: number;
  weakTopics: { topic: string; score: number }[];
  improvementTips: string[];
}

export default function StudentExams() {
  const [upcomingExams, setUpcomingExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active Exam State
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'exam' | 'results'>('list');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [results, setResults] = useState<ExamResults | null>(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  useEffect(() => {
    const loadExams = async () => {
      try {
        setError(null);
        const data = await getStudentExams();
        // Safe mapping with defaults
        const safeData = Array.isArray(data) ? data.map((exam: any) => ({
          ...exam,
          durationMinutes: exam.durationMinutes || 60,
          questions: Array.isArray(exam.questions) ? exam.questions : [
            // Dummy questions if none provided for demo/robustness
            { id: '1', text: 'Sample Question 1', options: ['A', 'B', 'C', 'D'], correctAnswer: 0 },
            { id: '2', text: 'Sample Question 2', options: ['A', 'B', 'C', 'D'], correctAnswer: 1 }
          ]
        })) : [];
        setUpcomingExams(safeData);
      } catch (err: any) {
        console.error("Error loading exams:", err);
        setError("Failed to load exams. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadExams();
  }, []);

  // Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (viewMode === 'exam' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            submitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [viewMode, timeLeft]);

  const startExam = (exam: Exam) => {
    setActiveExam(exam);
    setTimeLeft(exam.durationMinutes * 60);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setViewMode('exam');
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const submitExam = useCallback(() => {
    if (!activeExam) return;

    let score = 0;
    activeExam.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) score++;
    });

    // Mock results breakdown
    const mockResults: ExamResults = {
      score,
      totalQuestions: activeExam.questions.length,
      weakTopics: [
        { topic: "Core Concepts", score: 45 },
        { topic: "Applied Logic", score: 62 }
      ],
      improvementTips: [
        "Focus on reviewing the fundamental principles of " + activeExam.subject,
        "Practice more time-based mock tests to improve speed",
        "Re-visit your notes on Core Concepts specifically"
      ]
    };

    setResults(mockResults);
    setViewMode('results');
    setShowConfirmSubmit(false);
  }, [activeExam, answers]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-role-student border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
        {viewMode === 'list' ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-role-student" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Upcoming Exams</h1>
                <p className="text-muted-foreground">Stay prepared for your upcoming assessments</p>
              </div>
            </div>

            <div className="grid gap-4">
              {upcomingExams.map((exam, index) => (
                <div key={index} className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-role-student/5 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{exam.subject}</h3>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold uppercase",
                          exam.daysLeft <= 7 ? "bg-rose-500/10 text-rose-500" : "bg-muted text-muted-foreground"
                        )}>
                          {exam.daysLeft} Days Left
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {exam.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {exam.durationMinutes} Minutes
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 min-w-[200px]">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-muted-foreground uppercase opacity-60">Readiness</span>
                          <span className="text-role-student">{exam.readiness}%</span>
                        </div>
                        <Progress value={exam.readiness} className="h-2 bg-muted/50" />
                      </div>
                      <button
                        onClick={() => startExam(exam)}
                        className="w-full py-2.5 bg-role-student text-white rounded-xl hover:bg-role-student/90 transition-colors font-bold text-sm"
                      >
                        Launch Exam
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : viewMode === 'exam' && activeExam ? (
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
                <button onClick={() => setViewMode('list')} className="text-sm font-medium hover:text-role-student">Exit</button>
                <div className="flex items-center gap-3 font-mono text-xl font-bold text-role-student">
                  <Clock className="w-5 h-5" />
                  {formatTime(timeLeft)}
                </div>
                <div className="bg-role-student text-white px-3 py-1 rounded-lg text-xs font-bold">
                  {currentQuestionIndex + 1} / {activeExam.questions.length}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-8 shadow-sm min-h-[400px]">
                <h2 className="text-2xl font-bold mb-8 leading-relaxed">
                  {activeExam.questions[currentQuestionIndex].text}
                </h2>

                <div className="grid gap-3">
                  {activeExam.questions[currentQuestionIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(currentQuestionIndex, idx)}
                      className={cn(
                        "p-5 rounded-xl border-2 text-left transition-all font-medium",
                        answers[currentQuestionIndex] === idx
                          ? "border-role-student bg-role-student/5 shadow-md shadow-role-student/10"
                          : "border-border hover:border-role-student/30 hover:bg-muted/50"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  {currentQuestionIndex === activeExam.questions.length - 1 ? (
                    <button
                      onClick={() => setShowConfirmSubmit(true)}
                      className="px-8 py-2.5 bg-role-student text-white rounded-xl font-bold shadow-lg shadow-role-student/25"
                    >
                      Finish Exam
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-xl font-bold"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-role-student" />
                  Question Navigator
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {activeExam.questions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={cn(
                        "h-10 rounded-lg text-sm font-bold transition-all",
                        currentQuestionIndex === idx ? "bg-role-student text-white ring-2 ring-role-student/20" :
                          answers[idx] !== undefined ? "bg-role-student/20 text-role-student" :
                            "bg-muted hover:bg-muted/80 text-muted-foreground"
                      )}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-500 font-medium leading-relaxed">
                  Answers are saved automatically. You can jump back to any question before submitting.
                </p>
              </div>
            </div>
          </div>
        ) : viewMode === 'results' && results ? (
          <div className="max-w-3xl mx-auto space-y-8 animate-in zoom-in duration-500">
            <div className="bg-card rounded-[2rem] border-4 border-role-student/10 p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-role-student to-transparent opacity-20" />
              <div className="w-24 h-24 bg-role-student/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-role-student" />
              </div>
              <h1 className="text-4xl font-black mb-2">Exam Results</h1>
              <p className="text-muted-foreground mb-8">Great effort! Here is how you performed.</p>

              <div className="flex items-center justify-center gap-8 mb-12">
                <div>
                  <div className="text-6xl font-black text-role-student">{Math.round((results.score / results.totalQuestions) * 100)}%</div>
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Final Score</div>
                </div>
                <div className="w-px h-16 bg-border" />
                <div className="text-left">
                  <div className="text-2xl font-bold">{results.score} / {results.totalQuestions}</div>
                  <div className="text-sm font-medium text-muted-foreground">Correct Answers</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setViewMode('list')}
                  className="w-full py-4 px-6 rounded-2xl border-2 border-border font-bold hover:bg-muted transition-all"
                >
                  Back to Dashboard
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-4 px-6 bg-role-student text-white rounded-2xl font-bold hover:bg-role-student/90 transition-all shadow-xl shadow-role-student/20"
                >
                  Download Report
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-role-student" />
                  Weak Topics
                </h3>
                <div className="space-y-6">
                  {results.weakTopics.map((topic, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span>{topic.topic}</span>
                        <span className="text-amber-500">{topic.score}%</span>
                      </div>
                      <Progress value={topic.score} className="h-2 bg-muted/50" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-role-student rotate-90" />
                  Improvement Tips
                </h3>
                <ul className="space-y-4">
                  {results.improvementTips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-role-student mt-1.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : null}

        {/* Confirmation Modal */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
              <h3 className="text-xl font-bold mb-2">Ready to submit?</h3>
              <p className="text-muted-foreground mb-8">
                You have answered {Object.keys(answers).length} out of {activeExam?.questions.length} questions.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 py-3 rounded-xl border border-border font-bold hover:bg-muted"
                >
                  Keep Working
                </button>
                <button
                  onClick={submitExam}
                  className="flex-1 py-3 bg-role-student text-white rounded-xl font-bold hover:bg-role-student/90"
                >
                  Submit Now
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

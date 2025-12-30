import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FlaskConical, Play, Trophy, CheckCircle2, XCircle, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState, useMemo } from 'react';
import { getStudentPractice } from '@/services/student';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface PracticeTest {
  id: string;
  title: string;
  subject: string;
  questions: Question[];
  bestScore: number;
  attempts: number;
  topicProgress: number;
}

export default function StudentPractice() {
  const [practiceTests, setPracticeTests] = useState<PracticeTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Session State
  const [activeTest, setActiveTest] = useState<PracticeTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [weakQuestions, setWeakQuestions] = useState<Question[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'session' | 'retry'>('list');

  useEffect(() => {
    const loadPractice = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getStudentPractice();
        // Ensure data is an array and items have required structure
        const safeData = Array.isArray(data) ? data.map((test: any) => ({
          ...test,
          questions: Array.isArray(test.questions) ? test.questions : [],
          bestScore: test.bestScore || 0,
          attempts: test.attempts || 0,
          topicProgress: test.topicProgress || 0
        })) : [];
        setPracticeTests(safeData);
      } catch (err: any) {
        console.error("Error loading practice tests:", err);
        setError("Failed to load practice tests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadPractice();
  }, []);

  const startTest = (test: PracticeTest) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setWeakQuestions([]);
    setIsComplete(false);
    setViewMode('session');
  };

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    const currentQuestion = viewMode === 'retry' 
      ? weakQuestions[currentQuestionIndex] 
      : activeTest?.questions[currentQuestionIndex];

    if (index === currentQuestion?.correctAnswer) {
      setScore(prev => prev + 1);
    } else if (currentQuestion) {
      setWeakQuestions(prev => [...prev, currentQuestion]);
    }
  };

  const nextQuestion = () => {
    const questions = viewMode === 'retry' ? weakQuestions : activeTest?.questions || [];
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const retryWeak = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    // Keep weakQuestions but we'll filter them again if they fail twice
    const currentWeak = [...weakQuestions];
    setWeakQuestions([]);
    setViewMode('retry');
    setIsComplete(false);
  };

  const questions = viewMode === 'retry' ? weakQuestions : activeTest?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-role-student border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">Loading practice...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {viewMode === 'list' ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-role-student" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Practice</h1>
                  <p className="text-muted-foreground">Master your subjects step by step</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {practiceTests.length > 0 ? (
                practiceTests.map((test) => (
                  <div key={test.id} className="bg-card rounded-xl border border-border p-6 hover:border-role-student/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{test.title}</h3>
                        <p className="text-sm text-muted-foreground">{test.subject} • {test.questions.length} Questions</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-role-student/10 rounded-full text-role-student text-sm font-medium">
                        <Trophy className="w-4 h-4" />
                        {test.bestScore}% Best
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground font-medium text-purple-400">Topic Mastery</span>
                        <span className="font-bold">{test.topicProgress}%</span>
                      </div>
                      <Progress value={test.topicProgress} className="h-2 bg-muted/50" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{test.attempts} attempts completed</span>
                      <button
                        onClick={() => startTest(test)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-role-student text-white rounded-lg hover:bg-role-student/90 transition-colors font-medium"
                      >
                        <Play className="w-4 h-4" />
                        Start Practice
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-card rounded-2xl border border-border border-dashed">
                  <FlaskConical className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
                  <h3 className="text-lg font-medium mb-1">No practice tests available</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">Generate a mock exam or complete notes to see practice questions here.</p>
                </div>
              )}
            </div>
          </>
        ) : isComplete ? (
          <div className="bg-card rounded-2xl border border-border p-12 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-role-student/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-role-student" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Practice Complete!</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              You scored <span className="text-foreground font-bold">{score}</span> out of <span className="text-foreground font-bold">{questions.length}</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setViewMode('list')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-border hover:bg-muted transition-colors font-medium"
              >
                Back to Topics
              </button>
              {weakQuestions.length > 0 && (
                <button
                  onClick={retryWeak}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-role-student text-white rounded-xl hover:bg-role-student/90 transition-all shadow-lg shadow-role-student/25 font-medium"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry Weak Questions ({weakQuestions.length})
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setViewMode('list')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Exit Session
              </button>
              <div className="text-sm font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2 bg-muted/50" />

            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                  currentQuestion?.difficulty === 'Easy' ? "bg-green-500/10 text-green-500" :
                  currentQuestion?.difficulty === 'Medium' ? "bg-amber-500/10 text-amber-500" :
                  "bg-rose-500/10 text-rose-500"
                )}>
                  {currentQuestion?.difficulty}
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="text-xs text-muted-foreground">{activeTest?.subject}</span>
              </div>

              <h2 className="text-xl font-semibold mb-8 leading-relaxed">
                {currentQuestion?.text}
              </h2>

              <div className="grid gap-3">
                {currentQuestion?.options.map((option, idx) => {
                  const isCorrect = idx === currentQuestion.correctAnswer;
                  const isSelected = idx === selectedAnswer;
                  
                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerSelect(idx)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all duration-200 group relative",
                        !isAnswered && "hover:border-role-student/50 hover:bg-role-student/5",
                        isAnswered && isCorrect && "border-green-500 bg-green-500/10",
                        isAnswered && isSelected && !isCorrect && "border-rose-500 bg-rose-500/10",
                        !isSelected && !isCorrect && isAnswered && "opacity-50 border-border"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="mt-8 p-6 bg-muted/50 rounded-xl animate-in slide-in-from-top-4 duration-300">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-role-student shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Explanation</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {currentQuestion?.explanation}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={nextQuestion}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-lg hover:opacity-90 transition-all font-medium"
                    >
                      {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

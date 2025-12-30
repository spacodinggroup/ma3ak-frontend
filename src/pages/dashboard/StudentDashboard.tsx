import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Brain,
  Calendar,
  Clock,
  FileText,
  Flame,
  GraduationCap,
  HelpCircle,
  ListTodo,
  MessageSquare,
  Play,
  Plus,
  Target,
  Timer,
  TrendingUp,
  Upload,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState, useMemo } from 'react';
import { getStudentDashboard } from '@/services/student';

interface DashboardStats {
  streak: number;
  hours: number;
  topics: number;
  questions: number;
  avgScore: number;
  hoursThisWeek: number;
  topicsThisWeek: number;
  questionsThisWeek: number;
  avgScoreChange: number;
}

interface StudyTask {
  topic: string;
  subject: string;
  time: string;
  duration: string;
  completed: boolean;
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [studyPlan, setStudyPlan] = useState<StudyTask[]>([]);
  const [upcomingExams, setUpcomingExams] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const data = await getStudentDashboard();

        setStudyPlan(Array.isArray(data?.todayStudyPlan) ? data.todayStudyPlan :
          Array.isArray(data?.studyPlan) ? data.studyPlan : []);
        setUpcomingExams(Array.isArray(data?.upcomingExams) ? data.upcomingExams :
          Array.isArray(data?.upcomingExam) ? data.upcomingExam : []);
        setSubjects(Array.isArray(data?.subjects) ? data.subjects : []);

        const rawStats = data?.Stats || data?.stats;
        setStats(rawStats ? {
          streak: rawStats.streak ?? 0,
          hours: rawStats.hours ?? 0,
          topics: rawStats.topics ?? 0,
          questions: rawStats.questions ?? 0,
          avgScore: rawStats.avgScore ?? 0,
          hoursThisWeek: rawStats.hoursThisWeek ?? 0,
          topicsThisWeek: rawStats.topicsThisWeek ?? 0,
          questionsThisWeek: rawStats.questionsThisWeek ?? 0,
          avgScoreChange: rawStats.avgScoreChange ?? 0,
        } : null);

      } catch (err: any) {
        console.error("Dashboard Load Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const nextTask = useMemo(() => {
    return studyPlan.find(task => !task.completed);
  }, [studyPlan]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* Superior Header: Educational & Motivating */}
      <div className="relative overflow-hidden bg-foreground text-background rounded-[2rem] p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-role-student/20 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm">
              <GraduationCap className="w-10 h-10 text-role-student" />
            </div>
            <div>
              <h1 className="text-3xl font-black mb-1">
                Keep it up, <span className="text-role-student">{user?.name}</span>!
              </h1>
              <p className="text-muted-foreground font-medium flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                Your {stats?.streak ?? 0}-day study streak is inspiring.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center min-w-[120px]">
              <div className="text-3xl font-black text-role-student">{stats?.avgScore ?? 0}%</div>
              <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mt-1">Mastery Score</div>
            </div>
            <button
              onClick={() => navigate(ROUTES.STUDENT.CHAT)}
              className="group h-full px-8 py-4 bg-role-student text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-role-student/90 transition-all shadow-xl shadow-role-student/20"
            >
              <Brain className="w-5 h-5" />
              Ask AI Tutor
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Stats: Performance Focus */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Hours', val: stats?.hours, change: stats?.hoursThisWeek, icon: Clock, color: 'text-blue-400' },
          { label: 'Topics Mastery', val: stats?.topics, change: stats?.topicsThisWeek, icon: Target, color: 'text-purple-400' },
          { label: 'Questions Solved', val: stats?.questions, change: stats?.questionsThisWeek, icon: MessageSquare, color: 'text-emerald-400' },
          { label: 'Avg Improvement', val: `${stats?.avgScore ?? 0}% `, change: stats?.avgScoreChange, icon: TrendingUp, color: 'text-rose-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <stat.icon className={cn("w-5 h-5", stat.color)} />
              <span className="text-xs font-bold uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="text-3xl font-black mb-1">{stat.val ?? 0}</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-role-student">
              <Zap className="w-3 h-3" />
              +{stat.change ?? 0} {i === 3 ? '%' : ''} this week
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Focus: Today's Path */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-role-student" />
              <h2 className="text-xl font-bold">Your Learning Path Today</h2>
            </div>
            <p className="text-sm font-bold text-muted-foreground">
              {studyPlan.filter(t => t.completed).length} / {studyPlan.length} Tasks
            </p>
          </div>

          {/* Next Up Focus Card */}
          {nextTask && (
            <div className="bg-role-student/10 border-2 border-role-student/20 rounded-3xl p-6 flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-role-student flex items-center justify-center text-white shadow-lg shadow-role-student/30">
                  <Play className="w-8 h-8 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-role-student uppercase tracking-widest mb-1">Up Next</h4>
                  <h3 className="text-xl font-bold">{nextTask.topic}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{nextTask.subject} • {nextTask.duration}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(ROUTES.STUDENT.TIMER)}
                className="px-6 py-3 bg-foreground text-background rounded-xl font-bold text-sm transition-transform hover:scale-105 active:scale-95"
              >
                Start Focus
              </button>
            </div>
          )}

          <div className="bg-card rounded-3xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {studyPlan.length > 0 ? studyPlan.map((item, index) => (
                <div key={index} className={cn(
                  "p-6 flex items-center justify-between transition-colors",
                  item.completed ? "bg-muted/30 opacity-50" : "hover:bg-muted/10"
                )}>
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center border-2",
                      item.completed ? "bg-role-student border-role-student" : "bg-card border-border"
                    )}>
                      {item.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className={cn("font-bold", item.completed && "line-through")}>{item.topic}</p>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{item.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-black text-muted-foreground uppercase">{item.time}</p>
                      <p className="text-sm font-bold">{item.duration}</p>
                    </div>
                    {!item.completed && (
                      <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-role-student hover:text-role-student transition-all">
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              )) : (
                <div className="p-16 text-center">
                  <ListTodo className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                  <p className="text-muted-foreground font-medium">No active tasks. Time to set new goals!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Content: Rapid Tools & Exams */}
        <div className="space-y-8">
          <div className="bg-foreground text-background rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-role-student" />
              Learning Command Center
            </h3>
            <div className="grid gap-3">
              {[
                { label: 'Pulse Explanation', sub: 'Instant AI help', icon: MessageSquare, col: 'bg-role-student', to: ROUTES.STUDENT.CHAT + '?mode=explain' },
                { label: 'Insight Summarizer', sub: 'PDF Intelligence', icon: FileText, col: 'bg-indigo-500', to: ROUTES.STUDENT.CHAT + '?mode=summarize' },
                { label: 'Mastery Quiz', sub: 'Test knowledge', icon: ListTodo, col: 'bg-emerald-500', to: ROUTES.STUDENT.CHAT + '?mode=tests' },
                { label: 'Logic Organizer', sub: 'Process notes', icon: Brain, col: 'bg-orange-500', to: ROUTES.STUDENT.CHAT + '?mode=nodes' },
              ].map((tool, i) => (
                <div
                  key={i}
                  onClick={() => navigate(tool.to)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", tool.col)}>
                    <tool.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm group-hover:text-role-student transition-colors">{tool.label}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{tool.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-400" />
                Upcoming Exams
              </h3>
            </div>
            <div className="space-y-6">
              {upcomingExams.length > 0 ? upcomingExams.map((exam, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{exam.subject}</span>
                    <span className={cn(
                      "text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter",
                      (exam.daysLeft <= 7) ? "bg-rose-500/10 text-rose-500" : "bg-muted text-muted-foreground"
                    )}>
                      {exam.daysLeft} Days
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={exam.readiness} className="h-1.5 bg-muted/50" />
                    <span className="text-[10px] font-black text-muted-foreground">{exam.readiness}%</span>
                  </div>
                </div>
              )) : (
                <p className="text-center py-8 text-xs text-muted-foreground font-medium">All caught up! No exams soon.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

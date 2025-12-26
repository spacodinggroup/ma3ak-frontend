import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getStudentDashboard } from '@/services/student';


const StudentDashboard = () => {
  const { user } = useAuth();

  const  [studyPlan, setStudyPlan] = useState([]);
  const  [upcomingExams, setUpcomingExams] = useState([]);
  const  [subjects, setSubjects] = useState([]);
  const [stats, setStats] = useState<{
    streak: number;
    hours: number;
    topics: number;
    questions: number;
    avgScore: number;
    hoursThisWeek: number;
    topicsThisWeek: number;
    questionsThisWeek: number;
    avgScoreChange: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const loadDashboard = async () => {
      try{
        const data = await getStudentDashboard();

        setStudyPlan(data.studyPlan);
        setUpcomingExams(data.upcomingExam);
        setSubjects(data.subjects);
        setStats(data.Stats);
      } catch (err) {
        console.error("Error loading student dashboard", err)
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
    }, []);
  
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header - Educational Theme */}
        <div className="bg-gradient-to-r from-role-student/20 via-card to-emerald-500/10 rounded-2xl p-6 border border-role-student/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-role-student/20 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-role-student" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  Good morning, <span className="text-role-student">{user?.name}</span>! 📚
                </h1>
                <p className="text-muted-foreground">
                  You're on a {stats?.streak ?? 0}-day study streak! Keep up the great work!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full">
                <Flame className="w-5 h-5 text-orange-400" />
                <span className="font-semibold text-orange-400">{stats?.streak ?? 0} day streak</span>
              </div>
              <Link to="/dashboard/chat">
                <Button className="bg-role-student hover:bg-role-student/80">
                  <Brain className="w-4 h-4 mr-2" />
                  MA3AK AI Tutor
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <Clock className="w-4 h-4" />
              <span>Hours Studied</span>
            </div>
            <p className="text-2xl font-bold">{stats?.hours}</p>
            <p className="text-xs text-role-student">+{stats?.hoursThisWeek ?? 0} this week</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <Target className="w-4 h-4" />
              <span>Topics Completed</span>
            </div>
            <p className="text-2xl font-bold">{stats?.topics ?? 0}</p>
            <p className="text-xs text-role-student">+{stats?.topicsThisWeek ?? 0} this week</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Questions Asked</span>
            </div>
            <p className="text-2xl font-bold">{stats?.questions ?? 0}</p>
            <p className="text-xs text-role-student">+{stats?.questionsThisWeek ?? 0} this week</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Avg. Score</span>
            </div>
            <p className="text-2xl font-bold">{stats?.avgScore ?? 0}%</p>
            <p className="text-xs text-role-student">+{stats?.avgScoreChange ?? 0}% improvement</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Study Plan */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-role-student" />
                <h2 className="font-semibold">Today's Study Plan</h2>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Task
              </Button>
            </div>
            <div className="divide-y divide-border">
              {studyPlan.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 flex items-center justify-between ${item.completed ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.completed ? 'bg-role-student/20' : 'bg-muted'}`}>
                      {item.completed ? (
                        <div className="w-5 h-5 rounded-full bg-role-student flex items-center justify-center">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      ) : (
                        <BookOpen className="w-5 h-5 text-muted-foreground" />
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
                      <Button size="sm" variant="outline" className="border-role-student text-role-student hover:bg-role-student/10">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exams Countdown */}
          <div className="bg-card rounded-xl border border-border">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-orange-400" />
                <h2 className="font-semibold">Upcoming Exams</h2>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {upcomingExams.map((exam, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{exam.subject}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${exam.daysLeft <= 7 ? 'bg-red-500/20 text-red-400' : 'bg-muted text-muted-foreground'}`}>
                      {exam.daysLeft} days left
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={exam.readiness} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground w-10">{exam.readiness}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{exam.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subjects & Quick Actions Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Subjects Progress */}
          <div className="bg-card rounded-xl border border-border">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-role-student" />
                <h2 className="font-semibold">Subjects & Courses</h2>
              </div>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {subjects.map((subject, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <span className="font-medium">{subject.name}</span>
                  </div>
                  <Progress value={subject.progress} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">{subject.progress}% complete</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Quick Actions */}
          <div className="bg-card rounded-xl border border-border">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-role-student" />
                <h2 className="font-semibold">AI Study Tools</h2>
              </div>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              <Link to="/dashboard/chat?mode=explain" className="p-4 rounded-lg bg-role-student/10 hover:bg-role-student/20 transition-colors group">
                <MessageSquare className="w-6 h-6 text-role-student mb-2" />
                <p className="font-medium">Quick Explainer</p>
                <p className="text-xs text-muted-foreground">Get instant answers</p>
              </Link>
              <Link to="/dashboard/chat?mode=summarize" className="p-4 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors group">
                <FileText className="w-6 h-6 text-purple-400 mb-2" />
                <p className="font-medium">Summarize PDF</p>
                <p className="text-xs text-muted-foreground">Upload & learn</p>
              </Link>
              <Link to="/dashboard/chat?mode=tests" className="p-4 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors group">
                <ListTodo className="w-6 h-6 text-emerald-400 mb-2" />
                <p className="font-medium">Generate Quiz</p>
                <p className="text-xs text-muted-foreground">Test yourself</p>
              </Link>
              <Link to="/dashboard/chat?mode=nodes" className="p-4 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-colors group">
                <Upload className="w-6 h-6 text-orange-400 mb-2" />
                <p className="font-medium">Upload Notes</p>
                <p className="text-xs text-muted-foreground">AI will organize</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

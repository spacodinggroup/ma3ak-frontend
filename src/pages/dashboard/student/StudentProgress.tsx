import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Trophy, TrendingUp, Clock, Target, Rocket, Award, Star, Lightbulb, ArrowUpRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { getStudentProgress } from '@/services/student';
import { cn } from '@/lib/utils';

interface DetailedSubject {
  name: string;
  progress: number;
  grade: string;
  knowledge: number;
  accuracy: number;
  speed: number;
}

export default function StudentProgress() {
  const [stats, setStats] = useState<any[]>([]);
  const [subjectProgress, setSubjectProgress] = useState<DetailedSubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getStudentProgress();

        setStats(Array.isArray(data?.stats) ? data.stats : []);

        // Enhance subject progress with safe multi-dimensional mapping
        const rawSubs = Array.isArray(data?.subjectProgress) ? data.subjectProgress : [];
        const enhancedSubs = rawSubs.map((s: any) => ({
          name: s?.name || 'Unknown Subject',
          progress: s?.progress ?? 0,
          grade: s?.grade || 'N/A',
          knowledge: s?.knowledge ?? Math.min(100, (s?.progress ?? 0) + 10), // Fallback logic
          accuracy: s?.accuracy ?? 75,
          speed: s?.speed ?? 60,
        }));
        setSubjectProgress(enhancedSubs);

      } catch (err: any) {
        console.error("Progress Load Error:", err);
        setError("Failed to load your learning metrics. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadProgress();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-role-student/20 flex items-center justify-center border-2 border-role-student/10 text-role-student">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Performance Hub</h1>
              <p className="text-muted-foreground font-medium">Measuring your growth across all dimensions</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center opacity-40 grayscale">
                <Award className="w-5 h-5 text-role-student" />
              </div>
            ))}
            <div className="text-[10px] font-black uppercase text-muted-foreground vertical-middle self-center ml-2 tracking-widest leading-tight">
              3 Badges<br />Locked
            </div>
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-card rounded-2xl border border-border animate-pulse" />
            ))
          ) : stats.length > 0 ? stats.map((stat, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-sm group hover:border-role-student/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-muted group-hover:bg-role-student/10 transition-colors flex items-center justify-center">
                  {stat.label?.includes('Score') ? <Star className="w-5 h-5 text-amber-500" /> :
                    stat.label?.includes('Time') ? <Clock className="w-5 h-5 text-blue-500" /> :
                      <TrendingUp className="w-5 h-5 text-role-student" />}
                </div>
                <div className="text-[10px] font-black text-role-student bg-role-student/10 px-2 py-0.5 rounded uppercase">
                  {stat.change || 'Keep it up'}
                </div>
              </div>
              <p className="text-3xl font-black mb-1">{stat.value ?? 0}</p>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            </div>
          )) : (
            <div className="col-span-full py-12 bg-muted/20 border border-dashed border-border rounded-3xl text-center">
              <Rocket className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-20" />
              <p className="text-muted-foreground font-medium">Start more lessons to see your global stats!</p>
            </div>
          )}
        </div>

        {/* Multi-Dimensional Subject Breakdown */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-[2.5rem] border border-border p-8 shadow-sm">
            <h2 className="text-xl font-black mb-8 flex items-center gap-3">
              <Target className="w-6 h-6 text-role-student" />
              Subject Proficiency
            </h2>
            <div className="space-y-10">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
                    <div className="h-2 bg-muted rounded w-full animate-pulse" />
                  </div>
                ))
              ) : subjectProgress.map((sub, i) => (
                <div key={i} className="space-y-4 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-lg group-hover:text-role-student transition-colors">{sub.name}</h4>
                      <p className="text-xs font-bold text-muted-foreground">Mastery Level: {sub.grade}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black">{sub.progress}%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Progress value={sub.progress} className="h-3 bg-muted shadow-inner" />

                    {/* Multi-Dimension Bars */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {[
                        { label: 'Knowledge', val: sub.knowledge, col: 'bg-indigo-500' },
                        { label: 'Accuracy', val: sub.accuracy, col: 'bg-emerald-500' },
                        { label: 'Speed', val: sub.speed, col: 'bg-amber-500' },
                      ].map((dim, j) => (
                        <div key={j}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-black uppercase text-muted-foreground">{dim.label}</span>
                            <span className="text-[9px] font-bold">{dim.val}%</span>
                          </div>
                          <div className="h-1 bg-muted rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full transition-all duration-1000", dim.col)} style={{ width: `${dim.val}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* AI Insights & Recommended Focus */}
            <div className="bg-role-student text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 fill-white" />
                  Recommended Focus
                </h3>
                <div className="space-y-4">
                  <div className="p-5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                    <p className="text-sm font-bold opacity-80 mb-2 uppercase tracking-widest text-[10px]">Highest Impact</p>
                    <h4 className="text-lg font-black mb-2">Algorithm Complexity</h4>
                    <p className="text-xs leading-relaxed font-medium opacity-90">
                      Solving 5 more medium-difficulty problems in this topic could boost your Computer Science accuracy by 15%.
                    </p>
                  </div>
                  <div className="p-5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                    <p className="text-sm font-bold opacity-80 mb-2 uppercase tracking-widest text-[10px]">Skill Recovery</p>
                    <h4 className="text-lg font-black mb-2">Cell Biology</h4>
                    <p className="text-xs leading-relaxed font-medium opacity-90">
                      It's been 4 days since you reviewed this. A quick 10-minute quiz will help lock in your memory.
                    </p>
                  </div>
                </div>
                <button className="w-full mt-6 py-4 bg-white text-role-student rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-opacity-95 transition-all shadow-xl">
                  Start Weakness Drill
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Achievement Preview */}
            <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-role-student" />
                Latest Milestone
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center border-2 border-amber-500/20">
                  <Award className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold">Fast Learner</h4>
                  <p className="text-xs text-muted-foreground font-medium">Completed 5 chapters in a single day.</p>
                  <p className="text-[10px] text-role-student font-black mt-1 uppercase tracking-wider">Achieved Dec 28, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

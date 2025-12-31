import { Play, Pause, Square, BookOpen, Trophy, History, Timer, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import { getStudentSubjects } from '@/services/student';

interface Subject {
  id: string;
  name: string;
  color: string;
}

interface StudySession {
  id: string;
  subject: string;
  durationSeconds: number;
  timestamp: string;
}

export default function StudentTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [activeSubject, setActiveSubject] = useState<string>('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load Persistence & Initial Data
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        // Load Subjects
        const subs = await getStudentSubjects();
        setSubjects(Array.isArray(subs) ? subs : []);

        // Load Persistence
        const saved = localStorage.getItem('study_timer_state');
        if (saved) {
          const { seconds, subject, status, lastTimestamp } = JSON.parse(saved);
          setActiveSubject(subject || '');

          if (status === 'running') {
            const now = Date.now();
            const diff = Math.floor((now - lastTimestamp) / 1000);
            setElapsedSeconds(seconds + diff);
            setIsRunning(true);
          } else {
            setElapsedSeconds(seconds);
          }
        }

        // Load Sessions (Mock or from API if available)
        // For now, using localStorage to track local history
        const savedSessions = localStorage.getItem('study_sessions_history');
        if (savedSessions) {
          setSessions(JSON.parse(savedSessions));
        }

      } catch (err) {
        console.error("Timer Init Error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Persist State
  useEffect(() => {
    const state = {
      seconds: elapsedSeconds,
      subject: activeSubject,
      status: isRunning ? 'running' : 'paused',
      lastTimestamp: Date.now()
    };
    localStorage.setItem('study_timer_state', JSON.stringify(state));
  }, [elapsedSeconds, isRunning, activeSubject]);

  const toggleTimer = () => {
    if (!activeSubject && !isRunning) {
      alert("Please select a subject first!");
      return;
    }
    setIsRunning(!isRunning);
  };

  const stopTimer = () => {
    if (elapsedSeconds > 0) {
      const newSession: StudySession = {
        id: Math.random().toString(36).substr(2, 9),
        subject: activeSubject || 'Other',
        durationSeconds: elapsedSeconds,
        timestamp: new Date().toISOString()
      };

      const updatedSessions = [newSession, ...sessions.slice(0, 4)];
      setSessions(updatedSessions);
      localStorage.setItem('study_sessions_history', JSON.stringify(updatedSessions));
    }

    setIsRunning(false);
    setElapsedSeconds(0);
    localStorage.removeItem('study_timer_state');
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hrs > 0) {
      return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentSubjectColor = subjects.find(s => s.name === activeSubject)?.color || 'role-student';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-role-student border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-role-student/20 flex items-center justify-center">
              <Timer className="w-8 h-8 text-role-student" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Focus Timer</h1>
              <p className="text-muted-foreground font-medium">Deep work for better results</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          <div className="space-y-8">
            {/* Timer Card */}
            <div className={cn(
              "bg-card rounded-[2.5rem] border-4 p-12 text-center transition-all duration-500 relative overflow-hidden",
              isRunning ? "border-role-student/30 shadow-2xl shadow-role-student/10" : "border-border shadow-lg"
            )}>
              {isRunning && (
                <div className="absolute inset-0 bg-role-student/5 animate-pulse transition-opacity" />
              )}

              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  <div className="px-4 py-1.5 rounded-full bg-muted border border-border text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    {activeSubject || 'Select a Subject'}
                  </div>
                </div>

                <div className="text-[7rem] md:text-[9rem] font-black font-mono leading-none tracking-tighter mb-12 tabular-nums">
                  {formatTime(elapsedSeconds)}
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={toggleTimer}
                    className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl",
                      isRunning ? "bg-amber-100 text-amber-600 hover:bg-amber-200" : "bg-role-student text-white hover:scale-105 shadow-role-student/25"
                    )}
                  >
                    {isRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                  </button>

                  {isRunning || elapsedSeconds > 0 ? (
                    <button
                      onClick={stopTimer}
                      className="w-16 h-16 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all"
                    >
                      <Square className="w-6 h-6 fill-current" />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Subject Selector */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-role-student" />
                Select Subject
              </h3>
              <div className="flex flex-wrap gap-3">
                {subjects.length > 0 ? subjects.map((sub) => (
                  <button
                    key={sub.id}
                    disabled={isRunning}
                    onClick={() => setActiveSubject(sub.name)}
                    className={cn(
                      "px-6 py-2.5 rounded-xl border-2 font-bold transition-all text-sm",
                      activeSubject === sub.name
                        ? "border-role-student bg-role-student/5 text-role-student"
                        : "border-border hover:border-role-student/30 text-muted-foreground",
                      isRunning && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {sub.name}
                  </button>
                )) : (
                  <div className="text-sm text-muted-foreground p-4 text-center w-full border border-dashed border-border rounded-xl">
                    No subjects found. Add subjects in Settings or Progress.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Daily Summary */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm overflow-hidden relative">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-role-student/5 rounded-full blur-2xl" />
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-role-student" />
                Recent Sessions
              </h3>

              <div className="space-y-4">
                {sessions.length > 0 ? sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                    <div>
                      <p className="font-bold text-sm">{session.subject}</p>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase">
                        {new Date(session.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="text-sm font-black text-role-student">
                      {Math.floor(session.durationSeconds / 60)} min
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <p className="text-xs text-muted-foreground font-medium">No sessions logged yet today</p>
                  </div>
                )}
              </div>

              {sessions.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Focus</h4>
                      <p className="text-2xl font-black">
                        {Math.floor(sessions.reduce((acc, s) => acc + s.durationSeconds, 0) / 60)} <span className="text-xs font-bold text-muted-foreground uppercase">min</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-role-student/10 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-role-student" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-role-student rounded-2xl text-white shadow-xl shadow-role-student/20 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              <AlertCircle className="w-6 h-6 mb-4 opacity-80" />
              <h4 className="font-bold mb-1">Stay Focused!</h4>
              <p className="text-xs opacity-90 leading-relaxed font-medium">
                Try setting small goals for each session. 25 minutes of deep focus is more productive than 2 hours of distracted study.
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}

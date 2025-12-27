import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getStudentTimer } from '@/services/student';

export default function StudentTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timerStats, setTimerStats] = useState({
    sessions: 4,
    focusTime: '1h 45m',
    breaks: 3,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimerStats = async () => {
      try {
        const data = await getStudentTimer();
        setTimerStats(data);
      } catch (err) {
        console.error("Error loading timer stats", err);
      } finally {
        setLoading(false);
      }
    };
    loadTimerStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-role-student" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Study Timer</h1>
            <p className="text-muted-foreground">Focus with Pomodoro technique</p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <div className="text-8xl font-bold mb-8 font-mono">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
                "h-12 rounded-lg px-8 text-base"
              )}
              onClick={() => {
                setMinutes(25);
                setSeconds(0);
                setIsRunning(false);
              }}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
                "h-12 rounded-lg px-8 text-base",
                "bg-role-student hover:bg-role-student/80 px-8"
              )}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                "hover:bg-secondary hover:text-secondary-foreground",
                "h-10 px-4 py-2"
              )}
              onClick={() => { setMinutes(25); setSeconds(0); }}
            >
              25 min
            </button>
            <button
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                "hover:bg-secondary hover:text-secondary-foreground",
                "h-10 px-4 py-2"
              )}
              onClick={() => { setMinutes(45); setSeconds(0); }}
            >
              45 min
            </button>
            <button
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                "hover:bg-secondary hover:text-secondary-foreground",
                "h-10 px-4 py-2"
              )}
              onClick={() => { setMinutes(60); setSeconds(0); }}
            >
              60 min
            </button>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Today's Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{loading ? '...' : timerStats.sessions}</p>
              <p className="text-sm text-muted-foreground">Sessions</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{loading ? '...' : timerStats.focusTime}</p>
              <p className="text-sm text-muted-foreground">Focus Time</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{loading ? '...' : timerStats.breaks}</p>
              <p className="text-sm text-muted-foreground">Breaks</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

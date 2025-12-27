import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { CalendarDays, Plus, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getBusinessCalendar } from '@/services/business';
import { Skeleton } from '@/components/ui/skeleton';

export default function BusinessCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const data = await getBusinessCalendar();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching business calendar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-business/20 flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-role-business" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Calendar</h1>
              <p className="text-muted-foreground">Manage your schedule</p>
            </div>
          </div>
          <button className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
            "h-10 px-4 py-2",
            "bg-role-business hover:bg-role-business/80"
          )}>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))
            ) : (
              events.map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${event.type === 'meeting' ? 'bg-blue-500/20' :
                      event.type === 'call' ? 'bg-green-500/20' : 'bg-purple-500/20'
                    }`}>
                    <Clock className={`w-5 h-5 ${event.type === 'meeting' ? 'text-blue-400' :
                        event.type === 'call' ? 'text-green-400' : 'text-purple-400'
                      }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

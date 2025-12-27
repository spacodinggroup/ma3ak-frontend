import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Users, UserPlus, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getFounderTeam } from '@/services/founder';
import { Skeleton } from '@/components/ui/skeleton';

export default function FounderTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getFounderTeam();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching founder team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-founder/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-role-founder" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Team</h1>
              <p className="text-muted-foreground">Manage your team members</p>
            </div>
          </div>
          <button className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
            "h-10 px-4 py-2",
            "bg-role-founder hover:bg-role-founder/80"
          )}>
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
            ))
          ) : (
            teamMembers.map((member, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-role-founder to-violet-500 flex items-center justify-center text-white font-medium">
                      {member.avatar}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${member.status === 'online' ? 'bg-green-400' : 'bg-muted-foreground'
                      }`} />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <button
                  className={cn(
                    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                    "hover:bg-secondary hover:text-secondary-foreground",
                    "h-9 rounded-md px-3"
                  )}
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

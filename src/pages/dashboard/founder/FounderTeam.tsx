import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Users, UserPlus, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
          <Button className="bg-role-founder hover:bg-role-founder/80">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
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
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                      member.status === 'online' ? 'bg-green-400' : 'bg-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

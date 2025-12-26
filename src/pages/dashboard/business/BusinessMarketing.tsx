import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Megaphone, Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import { getBusinessMarketing } from '@/services/business';
import { Skeleton } from '@/components/ui/skeleton';

export default function BusinessMarketing() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketing = async () => {
      try {
        const data = await getBusinessMarketing();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching business marketing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketing();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-business/20 flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-role-business" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Marketing Center</h1>
              <p className="text-muted-foreground">Manage your campaigns</p>
            </div>
          </div>
          <Button className="bg-role-business hover:bg-role-business/80">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>

        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="w-5 h-5" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Skeleton className="h-4 w-12 mb-1" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-12 mb-1" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            campaigns.map((campaign, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      campaign.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      campaign.status === 'scheduled' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <TrendingUp className="w-5 h-5 text-role-business" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Reach</p>
                    <p className="font-bold">{campaign.reach.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Clicks</p>
                    <p className="font-bold">{campaign.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion</p>
                    <p className="font-bold">{campaign.conversion}%</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

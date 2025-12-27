import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Settings, User, Bell, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { getFounderSettings, updateFounderSettings } from '@/services/founder';
import { Skeleton } from '@/components/ui/skeleton';

export default function FounderSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getFounderSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching founder settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateFounderSettings(settings);
      // Show success message or toast
    } catch (error) {
      console.error('Error updating founder settings:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-founder/20 flex items-center justify-center">
            <Settings className="w-6 h-6 text-role-founder" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account</p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <User className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-semibold">Profile</h2>
          </div>
          <div className="space-y-4">
            {loading ? (
              <>
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm text-muted-foreground">Name</label>
                  <input
                    value={settings?.name || user?.name || ''}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className={cn(
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "mt-1"
                    )}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <input
                    value={settings?.email || user?.email || ''}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className={cn(
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "mt-1"
                    )}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Startup Name</label>
                  <input
                    value={settings?.startupName || ''}
                    onChange={(e) => setSettings({ ...settings, startupName: e.target.value })}
                    placeholder="Enter your startup name"
                    className={cn(
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "mt-1"
                    )}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            {loading ? (
              <>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-11" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-11" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-6 w-11" />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span>Milestone Reminders</span>
                  <Switch
                    checked={settings?.notifications?.milestoneReminders ?? true}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, milestoneReminders: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Team Updates</span>
                  <Switch
                    checked={settings?.notifications?.teamUpdates ?? true}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, teamUpdates: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Weekly Reports</span>
                  <Switch
                    checked={settings?.notifications?.weeklyReports ?? false}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, weeklyReports: checked }
                      })
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading || saving}
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
            "h-10 px-4 py-2",
            "bg-role-founder hover:bg-role-founder/80"
          )}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </DashboardLayout>
  );
}

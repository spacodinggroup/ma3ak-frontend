import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Settings, User, Bell, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { getBusinessSettings, updateBusinessSettings } from '@/services/business';
import { Skeleton } from '@/components/ui/skeleton';

export default function BusinessSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getBusinessSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching business settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateBusinessSettings(settings);
      // Show success message or toast
    } catch (error) {
      console.error('Error updating business settings:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-business/20 flex items-center justify-center">
            <Settings className="w-6 h-6 text-role-business" />
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
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm text-muted-foreground">Business Name</label>
                  <Input
                    value={settings?.businessName || user?.name || ''}
                    onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <Input
                    value={settings?.email || user?.email || ''}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="mt-1"
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
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-11" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-11" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-11" />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span>Sales Alerts</span>
                  <Switch
                    checked={settings?.notifications?.salesAlerts ?? true}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, salesAlerts: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Marketing Updates</span>
                  <Switch
                    checked={settings?.notifications?.marketingUpdates ?? true}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, marketingUpdates: checked }
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

        <Button
          onClick={handleSave}
          disabled={loading || saving}
          className="bg-role-business hover:bg-role-business/80"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </DashboardLayout>
  );
}

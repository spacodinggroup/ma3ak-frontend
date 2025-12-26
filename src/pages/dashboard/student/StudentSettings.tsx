import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Settings, User, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { getStudentSettings, updateStudentSettings } from '@/services/student';

export default function StudentSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getStudentSettings();
        setSettings(data);
      } catch (err) {
        console.error("Error loading settings", err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      await updateStudentSettings(settings);
      // Show success message
    } catch (err) {
      console.error("Error saving settings", err);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
            <Settings className="w-6 h-6 text-role-student" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences</p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <User className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-semibold">Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Name</label>
              <Input defaultValue={user?.name} className="mt-1" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <Input defaultValue={user?.email} className="mt-1" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Study Reminders</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Exam Alerts</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Progress Updates</span>
              <Switch />
            </div>
          </div>
        </div>

        <Button 
          className="bg-role-student hover:bg-role-student/80"
          onClick={handleSaveSettings}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </DashboardLayout>
  );
}

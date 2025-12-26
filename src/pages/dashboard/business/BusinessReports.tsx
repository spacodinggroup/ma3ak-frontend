import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FileText, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getBusinessReports } from '@/services/business';
import { Skeleton } from '@/components/ui/skeleton';

export default function BusinessReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getBusinessReports();
        setReports(data);
      } catch (error) {
        console.error('Error fetching business reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-business/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-role-business" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Reports</h1>
              <p className="text-muted-foreground">View and download reports</p>
            </div>
          </div>
          <Button className="bg-role-business hover:bg-role-business/80">
            <Plus className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>

        <div className="space-y-3">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div>
                    <Skeleton className="h-4 w-40 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="w-8 h-8" />
                </div>
              </div>
            ))
          ) : (
            reports.map((report, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-role-business/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-role-business" />
                  </div>
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{report.type}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

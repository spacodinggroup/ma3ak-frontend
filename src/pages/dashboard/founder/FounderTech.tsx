import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Code2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getFounderTech } from '@/services/founder';
import { Skeleton } from '@/components/ui/skeleton';

export default function FounderTech() {
  const [techCategories, setTechCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTech = async () => {
      try {
        const data = await getFounderTech();
        setTechCategories(data);
      } catch (error) {
        console.error('Error fetching founder tech stack:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTech();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-founder/20 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-role-founder" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Tech Stack</h1>
              <p className="text-muted-foreground">Your technology choices</p>
            </div>
          </div>
          <Button className="bg-role-founder hover:bg-role-founder/80">
            <Sparkles className="w-4 h-4 mr-2" />
            Get Recommendations
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6">
                <Skeleton className="h-5 w-20 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-7 w-16 rounded-lg" />
                  ))}
                </div>
              </div>
            ))
          ) : (
            techCategories.map((category, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-role-founder/10 text-role-founder text-sm font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

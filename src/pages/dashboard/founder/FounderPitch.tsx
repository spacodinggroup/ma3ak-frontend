import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FileText, Sparkles, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getFounderPitch } from '@/services/founder';

export default function FounderPitch() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPitch = async () => {
      try {
        const data = await getFounderPitch();
        setSlides(data);
      } catch (err) {
        console.error("Error loading founder pitch", err);
      } finally {
        setLoading(false);
      }
    };
    loadPitch();
  }, []);
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-founder/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-role-founder" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Pitch Deck</h1>
              <p className="text-muted-foreground">Create your investor presentation</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
              "h-10 px-4 py-2"
            )}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
              "h-10 px-4 py-2",
              "bg-role-founder hover:bg-role-founder/80"
            )}>
              <Sparkles className="w-4 h-4 mr-2" />
              AI Generate
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {loading ? (
            Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-muted rounded-lg"></div>
                  <div className="h-5 bg-muted rounded w-24"></div>
                </div>
                <div className="h-4 bg-muted rounded w-48"></div>
              </div>
            ))
          ) : (
            slides.map((slide, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6 hover:border-role-founder/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-role-founder/20 flex items-center justify-center text-role-founder font-bold text-sm">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold">{slide.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{slide.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

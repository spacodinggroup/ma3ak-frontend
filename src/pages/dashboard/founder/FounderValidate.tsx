import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Lightbulb, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { getFounderValidate } from '@/services/founder';
import { Skeleton } from '@/components/ui/skeleton';

export default function FounderValidate() {
  const [idea, setIdea] = useState('');
  const [validationData, setValidationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    const fetchValidation = async () => {
      try {
        const data = await getFounderValidate();
        setValidationData(data);
      } catch (error) {
        console.error('Error fetching founder validation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchValidation();
  }, []);

  const handleValidate = async () => {
    if (!idea.trim()) return;

    setValidating(true);
    try {
      // Assuming there's a validateIdea service function
      // const result = await validateIdea({ idea });
      // setValidationData(result);
      // For now, just simulate validation
      setTimeout(() => {
        setValidationData({
          strengths: ['Strong market potential', 'Unique value proposition'],
          weaknesses: ['High competition', 'Technical complexity'],
          questions: ['What is your go-to-market strategy?', 'Who are your early adopters?']
        });
        setValidating(false);
      }, 2000);
    } catch (error) {
      console.error('Error validating idea:', error);
      setValidating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-founder/20 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-role-founder" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Idea Validation</h1>
            <p className="text-muted-foreground">Test your startup assumptions</p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <Textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your startup idea in detail..."
            className="min-h-32"
          />
          <button
            onClick={handleValidate}
            disabled={validating || !idea.trim()}
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
              "h-10 px-4 py-2",
              "bg-role-founder hover:bg-role-founder/80"
            )}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {validating ? 'Validating...' : 'Validate Idea'}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {loading ? (
            <>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </>
          ) : (
            <>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold">Strengths</h3>
                </div>
                {validationData?.strengths?.length > 0 ? (
                  <ul className="space-y-2">
                    {validationData.strengths.map((strength, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Enter your idea to see strengths</p>
                )}
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold">Weaknesses</h3>
                </div>
                {validationData?.weaknesses?.length > 0 ? (
                  <ul className="space-y-2">
                    {validationData.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <XCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                        {weakness}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Enter your idea to see weaknesses</p>
                )}
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  <h3 className="font-semibold">Questions</h3>
                </div>
                {validationData?.questions?.length > 0 ? (
                  <ul className="space-y-2">
                    {validationData.questions.map((question, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <HelpCircle className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                        {question}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Enter your idea to see key questions</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

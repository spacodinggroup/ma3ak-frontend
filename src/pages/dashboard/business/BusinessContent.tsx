import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PenTool, Sparkles, Copy, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { getBusinessContent } from '@/services/business';
import { Skeleton } from '@/components/ui/skeleton';

export default function BusinessContent() {
  const [content, setContent] = useState('');
  const [templates, setTemplates] = useState([]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getBusinessContent();
        setTemplates(data.templates || []);
        setGeneratedContent(data.generatedContent || '');
      } catch (error) {
        console.error('Error fetching business content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleGenerate = async () => {
    if (!content.trim()) return;

    setGenerating(true);
    try {
      // Assuming there's a generateContent service function
      // const result = await generateContent({ prompt: content });
      // setGeneratedContent(result.content);
      // For now, simulate generation
      setTimeout(() => {
        setGeneratedContent('This is a sample generated content based on your prompt. The AI would create actual content here.');
        setGenerating(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating content:', error);
      setGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-business/20 flex items-center justify-center">
            <PenTool className="w-6 h-6 text-role-business" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Content Studio</h1>
            <p className="text-muted-foreground">Create AI-powered content</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-4 text-center">
                <Skeleton className="w-8 h-8 mx-auto mb-2 rounded" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </div>
            ))
          ) : (
            templates.map((template, index) => (
              <button key={index} className="bg-card rounded-xl border border-border p-4 hover:border-role-business/50 transition-colors text-center">
                <span className="text-3xl mb-2 block">{template.icon}</span>
                <p className="text-sm font-medium">{template.name}</p>
              </button>
            ))
          )}
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe what content you want to create..."
            className="min-h-32"
          />
          {generatedContent && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium mb-2">Generated Content:</p>
              <p className="text-sm">{generatedContent}</p>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={generating || !content.trim() || loading}
              className="bg-role-business hover:bg-role-business/80"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {generating ? 'Generating...' : 'Generate'}
            </Button>
            <Button variant="outline" disabled={!generatedContent}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

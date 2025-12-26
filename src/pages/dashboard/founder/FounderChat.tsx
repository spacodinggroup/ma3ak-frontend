import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MessageSquare, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function FounderChat() {
  const [message, setMessage] = useState('');

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-role-founder/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-role-founder" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Ma3ak AI</h1>
            <p className="text-muted-foreground">Your startup strategy partner</p>
          </div>
        </div>

        <div className="flex-1 bg-card rounded-xl border border-border p-6 overflow-y-auto mb-4">
          <div className="text-center text-muted-foreground py-12">
            <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Start a conversation with Ma3ak AI</p>
            <p className="text-sm mt-2">Discuss strategy, validate ideas, plan your roadmap</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Ma3ak anything..."
            className="flex-1"
          />
          <Button className="bg-role-founder hover:bg-role-founder/80">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

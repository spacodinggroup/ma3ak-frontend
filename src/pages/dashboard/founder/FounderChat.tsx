import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MessageSquare, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
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
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Ma3ak anything..."
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "flex-1"
            )}
          />
          <button className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
            "h-10 px-4 py-2",
            "bg-role-founder hover:bg-role-founder/80"
          )}>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

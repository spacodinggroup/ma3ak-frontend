import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MessageSquare, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import { generateAI } from '@/services/ai';
import { toast } from 'sonner';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function BusinessChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await generateAI({
        tool: 'chat',
        prompt: message
      });

      // Defensive check
      if (response && typeof response === 'object' && 'reply' in response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.reply }]);
      } else {
        console.error('Invalid AI response:', response);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I'm having trouble providing advice right now. Please try again."
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error("Failed to send message. Please try again.");
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I encountered an error connecting to the business advisor. Please check your connection."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-role-business/20 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-role-business" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Business Advisor</h1>
            <p className="text-muted-foreground">Get expert advice for your business</p>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 bg-card rounded-xl border border-border p-6 overflow-y-auto mb-4 space-y-4"
        >
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 flex flex-col items-center">
              <MessageSquare className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">Start a conversation with your AI Advisor</p>
              <p className="text-sm mt-2 max-w-sm">Ask about marketing, sales, strategy, and more</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-full",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-3 text-sm",
                    msg.role === 'user'
                      ? "bg-role-business text-white"
                      : "bg-muted text-foreground"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-lg px-4 py-3 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-pulse" />
                Analyzing market trends...
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 relative">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI Advisor anything..."
            disabled={isLoading}
            className={cn(
              "flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm shadow-sm",
              "flex-1 pr-12"
            )}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className={cn(
              "absolute right-2 top-2 bottom-2",
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
              "text-role-business hover:bg-role-business/10 w-8 h-8"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

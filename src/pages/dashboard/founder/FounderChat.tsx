import { Sparkles, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { generateAI } from '@/services/ai';
import { toast } from 'sonner';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_STORAGE_KEY = 'Ma3ak_founder_chat_v1';

const SYSTEM_PROMPT = "You are Ma3ak AI, a strategic advisor for startup founders. Respond directly and concisely without any meta-commentary like 'Here is my analysis' or 'Let me help you'. Provide actionable insights immediately.";

export default function FounderChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHAT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const safe = parsed
            .map((m: any) => ({ role: m?.role, content: m?.content }))
            .filter((m: any) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string');
          setMessages(safe);
        }
      }
    } catch {
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    const newUserMessage: ChatMessage = { role: 'user', content: userMessage };
    const nextMessages = [...messages, newUserMessage];
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: "system" as const, content: SYSTEM_PROMPT },
        ...nextMessages.map((m) => ({
          role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
          content: m.content,
        }))
      ];

      const { reply } = await generateAI({ messages: apiMessages });

      // CHAT STATE SAFETY
      if (typeof reply !== "string" || !reply.trim()) {
        setMessages(m => [
          ...m,
          { role: 'assistant', content: "Sorry, I couldn't generate a response. Please try again." }
        ]);
        return;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

    } catch (error) {
      console.error('Chat error:', error);
      toast.error("Failed to send message. Please try again.");
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting. Please try again."
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

        <div
          ref={scrollRef}
          className="flex-1 bg-card rounded-xl border border-border p-6 overflow-y-auto mb-4 space-y-4"
        >
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 flex flex-col items-center">
              <Sparkles className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">Start a conversation with Ma3ak AI</p>
              <p className="text-sm mt-2 max-w-sm">Discuss strategy, validate ideas, and plan your roadmap with our advanced AI assistant.</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${msg.role === 'user'
                      ? 'bg-role-founder text-white'
                      : 'bg-muted text-foreground'
                    }`}
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
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input - Native HTML */}
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Ma3ak anything..."
            disabled={isLoading}
            className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm flex-1 pr-12"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 text-role-founder hover:bg-role-founder/10 w-8 h-8"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
    </div>
  );
}

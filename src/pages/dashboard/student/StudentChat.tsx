import { Brain, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { sendStudentMessage } from '@/services/student';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_STORAGE_KEY = 'Ma3ak_student_chat_v1';

const SYSTEM_PROMPT = "You are a helpful AI tutor. Respond directly to the student's question without any introductory phrases like 'Here is my response' or 'Let me help you'. Just provide the answer or explanation directly.";

export default function StudentChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');

    const newUserMessage: ChatMessage = { role: 'user', content: userMessage };
    const nextMessages = [...messages, newUserMessage];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const apiMessages = [
        { role: "system" as const, content: SYSTEM_PROMPT },
        ...nextMessages.map((m) => ({
          role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
          content: m.content,
        })),
      ];

      const { reply } = await sendStudentMessage(apiMessages);

      if (typeof reply !== "string" || !reply.trim()) {
        setMessages(m => [
          ...m,
          { role: 'assistant', content: "Sorry, I couldn't generate a response. Please try again." }
        ]);
        return;
      }

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: reply }
      ]);
    } catch (err) {
      console.error('Chat error', err);
      setMessages(m => [
        ...m,
        { role: 'assistant', content: "I'm having trouble connecting. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
          <Brain className="w-6 h-6 text-role-student" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Tutor</h1>
          <p className="text-muted-foreground">
            Ask any question about your studies
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-card rounded-xl border border-border p-6 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Start a conversation with your AI Tutor</p>
            <p className="text-sm mt-2">
              Ask about any topic, get explanations, solve problems
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                    ? 'bg-role-student text-white'
                    : 'bg-secondary'
                  }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {loading && (
          <p className="text-sm text-muted-foreground">AI is thinking...</p>
        )}
      </div>

      {/* Input - Native HTML */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI Tutor anything..."
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
        />
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-role-student hover:bg-role-student/80 text-white shadow-lg h-10 px-4 py-2"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
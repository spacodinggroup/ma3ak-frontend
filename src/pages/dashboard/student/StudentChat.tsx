import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Brain, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { sendStudentMessage } from '@/services/student';


interface ChatMessage {
  sender: 'student' | 'ai';
  text: string;
}


export default function StudentChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMessage = message;
    setMessage('');
    // 🔹 Add student message
    setMessages((prev) => [
      ...prev,
      { sender: 'student', text: userMessage },
    ]);
    setLoading(true);
    try {
      const data = await sendStudentMessage(userMessage);
      // 🔹 Add AI reply
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: data.reply },
      ]);
    } catch (err) {
      console.error('Chat error', err)
    } finally {
      setLoading(false);
    }
  };



  return (
    <DashboardLayout>
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
        {/* 🔹 Chat Messages */}
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
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.sender === 'student'
                    ? 'ml-auto bg-role-student text-white'
                    : 'bg-secondary'
                }`}
              >
                {msg.text}
              </div>
            ))
          )}
          {loading && (
            <p className="text-sm text-muted-foreground">AI is thinking...</p>
          )}
        </div>
        {/* 🔹 Input */}
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your AI Tutor anything..."
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            className="bg-role-student hover:bg-role-student/80"
            onClick={handleSend}
            disabled={loading}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
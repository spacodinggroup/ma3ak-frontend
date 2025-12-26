import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Briefcase, 
  Send, 
  Sparkles,
  TrendingUp,
  Target,
  Users,
  ArrowUpRight
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const quickPrompts = [
  { icon: TrendingUp, label: 'Growth Strategy', prompt: 'What are the best strategies to grow my business this quarter?' },
  { icon: Target, label: 'Marketing Plan', prompt: 'Help me create a marketing plan for my business' },
  { icon: Users, label: 'Customer Retention', prompt: 'How can I improve customer retention rates?' },
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIAdvisorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI Business Advisor. I can help you with marketing strategies, sales optimization, content creation, and business growth. What would you like to work on today?"
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "That's a great question! Based on current market trends and your business profile, I'd recommend focusing on these key areas... Would you like me to elaborate on any specific point?"
      }]);
    }, 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setMessages([...messages, { role: 'user', content: prompt }]);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Great question! Let me analyze this for your business..."
      }]);
    }, 1000);
  };

  return (
    <Card className="bg-gradient-to-br from-role-business/20 via-card to-amber-500/5 border-role-business/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-role-business/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-role-business" />
            </div>
            <div>
              <span className="text-base">AI Business Advisor</span>
              <p className="text-xs text-muted-foreground font-normal">Strategy • Marketing • Growth</p>
            </div>
          </CardTitle>
          <Link to="/dashboard/chat">
            <Button size="sm" variant="ghost" className="text-role-business">
              Full Chat
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Prompts */}
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              className="border-role-business/30 hover:bg-role-business/10 text-xs"
              onClick={() => handleQuickPrompt(prompt.prompt)}
            >
              <prompt.icon className="w-3 h-3 mr-1" />
              {prompt.label}
            </Button>
          ))}
        </div>

        {/* Chat Messages */}
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    message.role === 'user'
                      ? 'bg-role-business text-white'
                      : 'bg-muted/50'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <Sparkles className="w-3 h-3 inline mr-1 text-role-business" />
                  )}
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about marketing, sales, growth..."
            className="flex-1 bg-background/50"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button 
            onClick={handleSend} 
            className="bg-role-business hover:bg-role-business/80"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

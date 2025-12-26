import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Mail, 
  MessageSquare, 
  PenTool, 
  ShoppingBag,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const contentTypes = [
  { 
    name: 'Blog Post', 
    desc: 'SEO-optimized articles', 
    icon: FileText,
    prompt: 'Write a blog post about'
  },
  { 
    name: 'Email Campaign', 
    desc: 'Newsletters & sequences', 
    icon: Mail,
    prompt: 'Create an email campaign for'
  },
  { 
    name: 'Social Caption', 
    desc: 'Engaging social posts', 
    icon: MessageSquare,
    prompt: 'Write a social media caption about'
  },
  { 
    name: 'Ad Copy', 
    desc: 'High-converting ads', 
    icon: PenTool,
    prompt: 'Create ad copy for'
  },
  { 
    name: 'Product Description', 
    desc: 'Compelling product copy', 
    icon: ShoppingBag,
    prompt: 'Write a product description for'
  },
];

export function ContentGenerator() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-role-business" />
            Content Generator
          </CardTitle>
          <Link to="/dashboard/chat">
            <Button variant="ghost" size="sm" className="text-role-business">
              Open Studio
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {contentTypes.map((type, index) => (
          <Link to="/dashboard/chat" key={index}>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-lg bg-role-business/10 flex items-center justify-center">
                <type.icon className="w-5 h-5 text-role-business" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{type.name}</p>
                <p className="text-xs text-muted-foreground">{type.desc}</p>
              </div>
              <Sparkles className="w-4 h-4 text-muted-foreground group-hover:text-role-business transition-colors" />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

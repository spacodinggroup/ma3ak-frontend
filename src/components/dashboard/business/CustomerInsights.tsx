import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, Brain, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const personas = [
  {
    name: 'Tech Professional',
    age: '28-40',
    income: '$80K-150K',
    problems: ['Time management', 'Work-life balance', 'Staying competitive'],
    needs: ['Efficiency tools', 'Premium quality', 'Fast support'],
  },
  {
    name: 'Small Business Owner',
    age: '35-55',
    income: '$60K-120K',
    problems: ['Limited budget', 'Wearing many hats', 'Growth challenges'],
    needs: ['Cost-effective solutions', 'Easy to use', 'Scalability'],
  },
];

const audienceBreakdown = [
  { segment: 'Age 25-34', percentage: 35 },
  { segment: 'Age 35-44', percentage: 42 },
  { segment: 'Age 45-54', percentage: 18 },
  { segment: 'Age 55+', percentage: 5 },
];

export function CustomerInsights() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-role-business" />
            Customer Insights
          </CardTitle>
          <Link to="/dashboard/chat">
            <Button variant="ghost" size="sm" className="text-role-business">
              <Sparkles className="w-4 h-4 mr-1" />
              Generate New
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Personas */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-role-business" />
            AI-Generated Personas
          </h4>
          <div className="grid gap-4">
            {personas.map((persona, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{persona.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Age: {persona.age} • Income: {persona.income}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1">Pain Points:</p>
                    <ul className="space-y-1">
                      {persona.problems.map((p, i) => (
                        <li key={i} className="text-red-400">• {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Needs:</p>
                    <ul className="space-y-1">
                      {persona.needs.map((n, i) => (
                        <li key={i} className="text-emerald-400">• {n}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Breakdown */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-role-business" />
            Audience Breakdown
          </h4>
          <div className="space-y-3">
            {audienceBreakdown.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.segment}</span>
                  <span className="text-muted-foreground">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-role-business rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link to="/dashboard/chat">
          <Button variant="outline" className="w-full border-role-business/50 text-role-business hover:bg-role-business/10">
            Deep Dive with AI
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Progress } from '@/components/ui/progress';
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  CircleDot,
  Code2,
  FileText,
  Flag,
  GitBranch,
  Lightbulb,
  MessageSquare,
  Milestone,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getFounderDashboard } from '@/services/founder';

type StartupStage = {
  current: string;
  progress: number;
  stages: string[];
};

type Metric = {
  label: string;
  value: string;
  change?: string;
  target?: string;
};

type RoadmapItem = {
  id: string;
  feature: string;
  status: 'pending' | 'in-progress' | 'done';
  priority: 'P0' | 'P1' | 'P2';
};

type MilestoneItem = {
  id: string;
  name: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed';
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

export default function FounderDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [startupStage, setStartupStage] = useState<StartupStage | null>(null);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [milestones, setMilestones] = useState<MilestoneItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getFounderDashboard();
        setStartupStage(data.startupStage);
        setRoadmapItems(data.roadmapItems);
        setMetrics(data.metrics);
        setMilestones(data.milestones);
        setTeamMembers(data.teamMembers);
      } catch (err) {
        console.error("Error loading founder dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (!startupStage) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Founder Header - Bold & Strategic */}
      <div className="bg-gradient-to-br from-role-founder/30 via-card to-violet-500/10 rounded-2xl p-6 border border-role-founder/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-role-founder/30 flex items-center justify-center border border-role-founder/50">
              <Rocket className="w-8 h-8 text-role-founder" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Let's build, <span className="text-role-founder">{user?.name}</span> 🚀
              </h1>
              <p className="text-muted-foreground">Ma3ak is ready to strategize</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 bg-role-founder/20 rounded-full border border-role-founder/40">
              <span className="text-sm font-medium text-role-founder">Stage: {startupStage.current}</span>
            </div>
            <button
              onClick={() => navigate(ROUTES.FOUNDER.CHAT)}
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
                "h-10 px-4 py-2",
                "bg-role-founder hover:bg-role-founder/80"
              )}>
              <Sparkles className="w-4 h-4 mr-2" />
              Ma3ak AI Chat
            </button>
          </div>
        </div>

        {/* Startup Stage Progress */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Startup Progress</span>
            <span className="text-sm font-medium">{startupStage.progress}%</span>
          </div>
          <div className="relative">
            <Progress value={startupStage.progress} className="h-2" />
            <div className="flex justify-between mt-2">
              {startupStage.stages.map((stage, index) => (
                <span key={index} className={`text-xs ${stage === startupStage.current ? 'text-role-founder font-medium' : 'text-muted-foreground'}`}>
                  {stage}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-card rounded-xl p-5 border border-border">
            <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">{metric.value}</span>
              {metric.change && (
                <span className="text-xs text-emerald-400 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {metric.change}
                </span>
              )}
            </div>
            {metric.target && (
              <p className="text-xs text-muted-foreground mt-1">Target: {metric.target}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Product Roadmap */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-role-founder" />
              <h2 className="font-semibold">Product Roadmap</h2>
            </div>
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                "hover:bg-secondary hover:text-secondary-foreground",
                "h-9 rounded-md px-3"
              )}
            >
              <Lightbulb className="w-4 h-4 mr-1" />
              AI Suggestions
            </button>
          </div>
          <div className="divide-y divide-border">
            {roadmapItems.map((item, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {item.status === 'done' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : item.status === 'in-progress' ? (
                    <CircleDot className="w-5 h-5 text-role-founder animate-pulse" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  <span className={item.status === 'done' ? 'text-muted-foreground line-through' : 'font-medium'}>
                    {item.feature}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded ${item.priority === 'P0' ? 'bg-red-500/20 text-red-400' : item.priority === 'P1' ? 'bg-amber-500/20 text-amber-400' : 'bg-muted text-muted-foreground'}`}>
                    {item.priority}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${item.status === 'done' ? 'bg-emerald-500/20 text-emerald-400' : item.status === 'in-progress' ? 'bg-role-founder/20 text-role-founder' : 'bg-muted text-muted-foreground'}`}>
                    {item.status === 'in-progress' ? 'In Progress' : item.status === 'done' ? 'Done' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Milestone className="w-5 h-5 text-role-founder" />
              <h2 className="font-semibold">Milestones</h2>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${milestone.status === 'completed' ? 'bg-emerald-400' : milestone.status === 'in-progress' ? 'bg-role-founder animate-pulse' : 'bg-muted-foreground/30'}`} />
                <div className="flex-1">
                  <p className={`font-medium text-sm ${milestone.status === 'completed' ? 'text-muted-foreground' : ''}`}>
                    {milestone.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{milestone.date}</p>
                </div>
                {milestone.status === 'completed' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Tools & Team Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Ma3ak AI Tools */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-role-founder" />
              <h2 className="font-semibold">Ma3ak AI Tools</h2>
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            <div
              onClick={() => navigate(`${ROUTES.FOUNDER.CHAT}?mode=validate-idea`)}
              className="p-4 rounded-lg bg-role-founder/10 hover:bg-role-founder/20 transition-colors border border-role-founder/20 cursor-pointer"
            >
              <Lightbulb className="w-6 h-6 text-role-founder mb-2" />
              <p className="font-medium">Validate Idea</p>
              <p className="text-xs text-muted-foreground">Test assumptions</p>
            </div>
            <div
              onClick={() => navigate(`${ROUTES.FOUNDER.CHAT}?mode=build-roadmap`)}
              className="p-4 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 transition-colors border border-violet-500/20 cursor-pointer"
            >
              <Target className="w-6 h-6 text-violet-400 mb-2" />
              <p className="font-medium">Build Roadmap</p>
              <p className="text-xs text-muted-foreground">Plan your MVP</p>
            </div>
            <div
              onClick={() => navigate(`${ROUTES.FOUNDER.CHAT}?mode=tech-stack`)}
              className="p-4 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors border border-cyan-500/20 cursor-pointer"
            >
              <Code2 className="w-6 h-6 text-cyan-400 mb-2" />
              <p className="font-medium">Tech Stack</p>
              <p className="text-xs text-muted-foreground">Get recommendations</p>
            </div>
            <div
              onClick={() => navigate(`${ROUTES.FOUNDER.CHAT}?mode=pitch-deck`)}
              className="p-4 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors border border-emerald-500/20 cursor-pointer"
            >
              <FileText className="w-6 h-6 text-emerald-400 mb-2" />
              <p className="font-medium">Pitch Deck</p>
              <p className="text-xs text-muted-foreground">Create presentation</p>
            </div>
          </div>
        </div>

        {/* Team Workspace */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-role-founder" />
              <h2 className="font-semibold">Team Workspace</h2>
            </div>
            <button
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                "hover:bg-secondary hover:text-secondary-foreground",
                "h-9 rounded-md px-3",
                "text-xs"
              )}
            >
              + Invite
            </button>
          </div>
          <div className="p-4 space-y-3">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-role-founder to-violet-500 flex items-center justify-center text-sm font-medium text-white">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <button
                  className={cn(
                    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                    "hover:bg-secondary hover:text-secondary-foreground",
                    "h-9 rounded-md px-3"
                  )}
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => navigate(`${ROUTES.FOUNDER.CHAT}?mode=team-chat`)}
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
                "h-10 px-4 py-2",
                "w-full mt-2 border-role-founder/50 text-role-founder hover:bg-role-founder/10"
              )}>
              <Boxes className="w-4 h-4 mr-2" />
              Open Team Chat with AI
            </button>
          </div>
        </div>
      </div>

      {/* Investor Prep CTA */}
      <div className="bg-gradient-to-r from-role-founder/20 via-card to-amber-500/10 rounded-xl border border-role-founder/30 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-role-founder/20 flex items-center justify-center">
              <Flag className="w-6 h-6 text-role-founder" />
            </div>
            <div>
              <h3 className="font-semibold">Preparing for Fundraising?</h3>
              <p className="text-sm text-muted-foreground">Practice investor Q&A with Ma3ak</p>
            </div>
          </div>
          <button
            onClick={() => navigate(ROUTES.FOUNDER.CHAT)}
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
              "h-10 px-4 py-2",
              "border-role-founder text-role-founder hover:bg-role-founder/10"
            )}>
            Start Investor Prep
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Share2, 
  Megaphone, 
  Calendar, 
  Search, 
  Palette,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const socialPlatforms = [
  { name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
  { name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
  { name: 'Twitter/X', icon: Twitter, color: 'text-foreground' },
];

const calendarItems = [
  { day: 'Mon', content: 'Product Launch Post', platform: 'All' },
  { day: 'Wed', content: 'Customer Testimonial', platform: 'Instagram' },
  { day: 'Fri', content: 'Weekly Tips', platform: 'LinkedIn' },
  { day: 'Sun', content: 'Behind the Scenes', platform: 'Facebook' },
];

export function MarketingCenter() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-role-business" />
          Marketing Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="social" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="social" className="text-xs sm:text-sm">
              <Share2 className="w-4 h-4 mr-1 hidden sm:block" />
              Social
            </TabsTrigger>
            <TabsTrigger value="ads" className="text-xs sm:text-sm">
              <Megaphone className="w-4 h-4 mr-1 hidden sm:block" />
              Ads
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs sm:text-sm">
              <Calendar className="w-4 h-4 mr-1 hidden sm:block" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="brand" className="text-xs sm:text-sm">
              <Palette className="w-4 h-4 mr-1 hidden sm:block" />
              Brand
            </TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Generate social media posts for any platform</p>
            <div className="grid grid-cols-2 gap-3">
              {socialPlatforms.map((platform) => (
                <Link to="/dashboard/chat" key={platform.name}>
                  <Button variant="outline" className="w-full justify-start gap-2 h-12">
                    <platform.icon className={`w-5 h-5 ${platform.color}`} />
                    {platform.name}
                  </Button>
                </Link>
              ))}
            </div>
            <Link to="/dashboard/chat">
              <Button className="w-full bg-role-business hover:bg-role-business/80 mt-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Post with AI
              </Button>
            </Link>
          </TabsContent>

          <TabsContent value="ads" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Create compelling ad copy and campaigns</p>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/dashboard/chat">
                <Button variant="outline" className="w-full h-12">Google Ads</Button>
              </Link>
              <Link to="/dashboard/chat">
                <Button variant="outline" className="w-full h-12">Facebook Ads</Button>
              </Link>
              <Link to="/dashboard/chat">
                <Button variant="outline" className="w-full h-12">Display Ads</Button>
              </Link>
              <Link to="/dashboard/chat">
                <Button variant="outline" className="w-full h-12">Video Scripts</Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">This week's content plan</p>
              <Link to="/dashboard/chat">
                <Button size="sm" variant="ghost" className="text-role-business">
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI Plan
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              {calendarItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 rounded-lg bg-role-business/10 flex items-center justify-center text-sm font-semibold text-role-business">
                    {item.day}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.content}</p>
                    <p className="text-xs text-muted-foreground">{item.platform}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="brand" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">AI-powered branding suggestions</p>
            <div className="space-y-3">
              <Link to="/dashboard/chat" className="block">
                <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Palette className="w-4 h-4 text-role-business" />
                    <span className="font-medium text-sm">Brand Voice Guide</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Define your brand's tone and messaging</p>
                </div>
              </Link>
              <Link to="/dashboard/chat" className="block">
                <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Search className="w-4 h-4 text-role-business" />
                    <span className="font-medium text-sm">Competitor Analysis</span>
                  </div>
                  <p className="text-xs text-muted-foreground">AI analysis of competitor strategies</p>
                </div>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

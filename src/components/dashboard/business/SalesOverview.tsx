import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, Target, ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const salesData = [
  { month: 'Jan', revenue: 32000 },
  { month: 'Feb', revenue: 38000 },
  { month: 'Mar', revenue: 35000 },
  { month: 'Apr', revenue: 42000 },
  { month: 'May', revenue: 45000 },
  { month: 'Jun', revenue: 48520 },
];

const topProductsData = [
  { name: 'Premium Plan', sales: 120 },
  { name: 'Basic Plan', sales: 89 },
  { name: 'Enterprise', sales: 45 },
  { name: 'Add-ons', sales: 32 },
];

interface KPI {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
}

export function SalesOverview() {
  const { isRTL } = useLanguage();

  const kpis: KPI[] = [
    { label: 'Monthly Revenue', value: '$48,520', change: '+12.5%', trend: 'up', icon: DollarSign },
    { label: 'Sales This Week', value: '$12,340', change: '+8.2%', trend: 'up', icon: ShoppingCart },
    { label: 'Conversion Rate', value: '3.8%', change: '+0.4%', trend: 'up', icon: Target },
    { label: 'Leads Generated', value: '284', change: '+15', trend: 'up', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-role-business/10 flex items-center justify-center">
                  <kpi.icon className="w-5 h-5 text-role-business" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {kpi.change}
                </div>
              </div>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-role-business" />
              Revenue Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} reversed={isRTL} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} orientation={isRTL ? 'right' : 'left'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--role-business))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--role-business))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-role-business" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProductsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="sales" fill="hsl(var(--role-business))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

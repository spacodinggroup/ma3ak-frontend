import { TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import { getBusinessSales } from '@/services/business';
import { Skeleton } from '@/components/ui/skeleton';

export default function BusinessSales() {
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await getBusinessSales();
        setSalesData(data.metrics || []);
        setTopProducts(data.topProducts || []);
      } catch (error) {
        console.error('Error fetching business sales:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);
  return (
    <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-business/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-role-business" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Sales Overview</h1>
            <p className="text-muted-foreground">Track your sales performance</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-7 w-16 mb-1" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))
          ) : (
            salesData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-card rounded-xl border border-border p-5">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Icon className="w-4 h-4" />
                    <span>{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-role-business mt-1">{stat.change}</p>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold mb-4">Top Products</h2>
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              ))
            ) : (
              topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <p className="font-bold text-role-business">{product.revenue}</p>
                </div>
              ))
            )}
          </div>
        </div>
    </div>
  );
}

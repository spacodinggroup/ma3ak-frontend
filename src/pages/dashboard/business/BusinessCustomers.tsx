import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Users, Search, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { getBusinessCustomers } from '@/services/business';
import { Skeleton } from '@/components/ui/skeleton';

export default function BusinessCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getBusinessCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching business customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-business/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-role-business" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Customers</h1>
              <p className="text-muted-foreground">Manage your customer base</p>
            </div>
          </div>
          <Button className="bg-role-business hover:bg-role-business/80">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium">Customer</th>
                <th className="text-left p-4 text-sm font-medium">Orders</th>
                <th className="text-left p-4 text-sm font-medium">Spent</th>
                <th className="text-left p-4 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </td>
                    <td className="p-4"><Skeleton className="h-4 w-8" /></td>
                    <td className="p-4"><Skeleton className="h-4 w-12" /></td>
                    <td className="p-4"><Skeleton className="h-5 w-12 rounded-full" /></td>
                  </tr>
                ))
              ) : (
                filteredCustomers.map((customer, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </td>
                    <td className="p-4">{customer.orders}</td>
                    <td className="p-4 font-medium">{customer.spent}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        customer.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

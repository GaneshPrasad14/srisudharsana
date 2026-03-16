import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Tag, Users, ShoppingCart, TrendingUp } from 'lucide-react';

const AdminHome = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    users: 0,
    sales: 0
  });

  useEffect(() => {
    // In a real app, these would be fetched from API
    // For now, we'll fetch products and categories length
    const fetchStats = async () => {
        try {
            const [pRes, cRes] = await Promise.all([
                fetch('http://localhost:7050/api/products'),
                fetch('http://localhost:7050/api/categories')
            ]);
            const pData = await pRes.json();
            const cData = await cRes.json();
            setStats({
                products: pData.length,
                categories: cData.length,
                users: 12, // Placeholder
                sales: 45000 // Placeholder
            });
        } catch (e) {}
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 font-body">
      <div>
        <h2 className="text-3xl font-display font-bold">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome to the super admin panel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Products" value={stats.products} icon={<Package className="text-blue-500" />} />
        <StatCard title="Categories" value={stats.categories} icon={<Tag className="text-green-500" />} />
        <StatCard title="Total Customers" value={stats.users} icon={<Users className="text-purple-500" />} />
        <StatCard title="Revenue (MTD)" value={`₹${stats.sales.toLocaleString()}`} icon={<TrendingUp className="text-orange-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart size={20} className="text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem text="New product 'Kanchipuram Silk' added" time="2 hours ago" />
              <ActivityItem text="User 'John Doe' registered" time="5 hours ago" />
              <ActivityItem text="Category 'Veshti' updated" time="Yesterday" />
              <ActivityItem text="Stock updated for 'Pattu Saree'" time="2 days ago" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Package size={120} />
          </div>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Server Status</p>
              <p className="font-semibold flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Operational
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Database</p>
              <p className="font-semibold">MongoDB Atlas Cloud</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-1">API Environment</p>
              <p className="font-semibold">Development (v1.0.4)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }: any) => (
  <Card className="border-border/50 shadow-sm transition-transform hover:scale-[1.02]">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold font-display">{value}</h3>
        </div>
        <div className="bg-secondary/50 p-3 rounded-xl">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const ActivityItem = ({ text, time }: any) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-border/50 last:border-0">
    <span className="font-medium">{text}</span>
    <span className="text-xs text-muted-foreground">{time}</span>
  </div>
);

export default AdminHome;

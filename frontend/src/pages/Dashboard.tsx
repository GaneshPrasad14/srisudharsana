import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, Package, LogOut, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, logout, token, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [fullProfile, setFullProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user?.role === 'admin') {
      navigate('/admin');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:7050/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setFullProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && token) {
      fetchProfile();
    }
  }, [user, navigate, authLoading, token]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-background/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight">Your Dashboard</h1>
            <p className="text-muted-foreground font-body mt-2">Manage your account and view your orders</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 border-destructive text-destructive hover:bg-destructive/10">
            <LogOut size={18} />
            Logout
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your contact and shipping details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <User size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Full Name</p>
                    <p className="font-body font-semibold">{fullProfile?.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email Address</p>
                    <p className="font-body font-semibold">{fullProfile?.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Phone Number</p>
                    <p className="font-body font-semibold">{fullProfile?.phone || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Shipping Address</p>
                    <p className="font-body font-semibold line-clamp-3">{fullProfile?.address || 'Not provided'}</p>
                  </div>
                </div>
                <Button className="w-full variant-outline bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity/Orders Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card className="border-border/50 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="text-primary" />
                  Recent Orders
                </CardTitle>
                <CardDescription>Your purchase history with us</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="bg-muted p-4 rounded-full">
                    <Package size={48} className="text-muted-foreground/50" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold">No orders yet</p>
                    <p className="text-muted-foreground font-body mt-1">When you make a purchase, it will appear here.</p>
                  </div>
                  <Button onClick={() => navigate('/')} className="mt-4">
                    Explore Collection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

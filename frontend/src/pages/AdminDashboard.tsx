import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, Tag, LogOut, Home, Image as ImageIcon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  if (isLoading || !user || user.role !== 'admin') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/admin/products", icon: <Package size={18} />, label: "Products" },
    { to: "/admin/categories", icon: <Tag size={18} />, label: "Categories" },
    { to: "/admin/gallery", icon: <ImageIcon size={18} />, label: "Gallery" },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-primary-foreground/10">
        <Link to="/" className="font-display text-xl font-bold tracking-tight">Admin Central</Link>
        <p className="text-xs text-primary-foreground/60 mt-1 uppercase tracking-widest font-body">Sri Sudharsana Tex</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 font-body mt-4">
        {navLinks.map((link) => (
          <Link 
            key={link.to}
            to={link.to} 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === link.to ? 'bg-primary-foreground/20' : 'hover:bg-primary-foreground/10'
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-primary-foreground/10">
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-primary-foreground hover:bg-destructive hover:text-destructive-foreground">
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-primary text-primary-foreground z-50 md:hidden flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8">
        <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <button 
                className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-lg"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm font-body text-muted-foreground hidden lg:block">Logged in as: <strong>{user.name}</strong></span>
              <Link to="/">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                   <Home size={16} className="sm:mr-2" />
                   <span className="hidden sm:inline">View Store</span>
                </Button>
              </Link>
            </div>
        </header>

        <div className="bg-background rounded-xl p-4 sm:p-6 shadow-sm border border-border">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Heart, Menu, X, User, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { cartCount, setIsCartOpen, wishlist } = useCart();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-center py-1.5 text-sm font-body tracking-wide">
        Free Shipping on Orders Above ₹5,000 | Handwoven with Love
      </div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile menu */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-wide text-foreground">
          <span className="text-gold-gradient">Sri Sudharsana</span>
          <span className="text-primary ml-2">Tex</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8 font-body text-sm tracking-widest uppercase">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/category/sarees" className="hover:text-accent transition-colors">Sarees</Link>
          <Link to="/category/veshti" className="hover:text-accent transition-colors">Veshti</Link>
          <Link to="/category/thundu" className="hover:text-accent transition-colors">Thundu</Link>
          <Link to="/culture" className="hover:text-accent transition-colors">Our Heritage</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-accent transition-colors">
            <Search size={18} className="sm:w-[20px] sm:h-[20px]" />
          </button>
          
          {user?.role === 'admin' && (
            <Link to="/admin" className="p-2 hover:text-accent transition-colors" title="Admin Panel">
              <ShieldCheck size={18} className="sm:w-[20px] sm:h-[20px]" />
            </Link>
          )}

          <Link to={user ? "/dashboard" : "/login"} className="p-2 hover:text-accent transition-colors">
            <User size={18} className="sm:w-[20px] sm:h-[20px]" />
          </Link>
          <Link to="/wishlist" className="p-2 hover:text-accent transition-colors relative">
            <Heart size={18} className="sm:w-[20px] sm:h-[20px]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-[8px] sm:text-xs w-4 h-4 rounded-full flex items-center justify-center font-body">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="p-2 hover:text-accent transition-colors relative">
            <ShoppingBag size={18} className="sm:w-[20px] sm:h-[20px]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[8px] sm:text-xs w-4 h-4 rounded-full flex items-center justify-center font-body">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3">
              <input
                type="text"
                placeholder="Search for sarees, veshti, thundu..."
                className="w-full bg-secondary rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="lg:hidden overflow-hidden border-t border-border"
          >
            <div className="flex flex-col gap-4 p-4 font-body text-sm tracking-widest uppercase">
              <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/category/sarees" onClick={() => setMobileOpen(false)}>Sarees</Link>
              <Link to="/category/veshti" onClick={() => setMobileOpen(false)}>Veshti</Link>
              <Link to="/category/thundu" onClick={() => setMobileOpen(false)}>Thundu</Link>
              <Link to="/culture" onClick={() => setMobileOpen(false)}>Our Heritage</Link>
              <div className="border-t border-border my-2 pt-2">
                <Link to={user ? "/dashboard" : "/login"} onClick={() => setMobileOpen(false)}>
                  {user ? "Dashboard" : "Login / Register"}
                </Link>
              </div>
              {user?.role === 'admin' && (
                <div className="border-t border-border mt-2 pt-2">
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-accent font-semibold">
                    Admin Panel
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

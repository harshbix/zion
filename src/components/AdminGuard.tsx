import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { checkAdminSession, adminLogout } from '@/services/admin-auth';
import { useToast } from '@/services/toast-context';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Image as ImageIcon, 
  BookOpen,
  Star, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminGuard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    let active = true;
    checkAdminSession().then((isValid) => {
      if (active) {
        setIsAuthenticated(isValid);
      }
    });
    return () => {
      active = false;
    };
  }, [location.pathname]);

  const handleLogout = async () => {
    await adminLogout();
    toast.success('Admin session terminated.');
    navigate('/admin', { replace: true });
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-950">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent animate-spin mx-auto" />
          <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: UtensilsCrossed },
    { label: 'Journal (Blog)', path: '/admin/blog', icon: BookOpen },
    { label: 'Media Manager', path: '/admin/media', icon: ImageIcon },
    { label: 'Guest Reviews', path: '/admin/reviews', icon: Star },
    { label: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-stone-900 border-r border-stone-800 text-stone-300">
      {/* Brand Header */}
      <div className="p-6 border-b border-stone-800 flex items-center gap-3">
        <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-sans-luxury text-sm font-bold uppercase tracking-widest text-stone-100">
            ZION CORE
          </h2>
          <p className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">
            Control Panel
          </p>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3.5 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all rounded ${
                isActive
                  ? 'bg-amber-600 text-stone-950 font-black'
                  : 'hover:bg-stone-800 hover:text-stone-100 text-stone-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-stone-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all rounded cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Terminate Session
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-stone-900 text-stone-100 border-b border-stone-800 px-6 py-4 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3.5">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <span className="font-sans-luxury text-xs font-bold uppercase tracking-widest">
            Zion Admin
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 bg-stone-850 border border-stone-800 hover:bg-stone-800 text-stone-200 transition-all cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden md:block w-64 flex-shrink-0 z-20 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar (Drawer Overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-stone-900 z-50 md:hidden flex flex-col shadow-2xl"
            >
              <div className="absolute top-4 right-4 md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 bg-stone-50 min-h-screen overflow-x-hidden">
        {/* Dynamic header per page */}
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
          <div className="border-b border-stone-200/80 pb-5">
            <h1 className="font-sans-luxury text-xl font-black text-stone-900 uppercase tracking-wider">
              {navItems.find((item) => item.path === location.pathname)?.label || 'Admin Portal'}
            </h1>
            <p className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider mt-1">
              Active Session • Admin Console
            </p>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

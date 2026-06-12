'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  BookOpen, 
  Star, 
  Image as ImageIcon, 
  Settings, 
  ArrowLeft,
  Users,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: UtensilsCrossed },
  { href: '/admin/blog', label: 'Blog Posts', icon: BookOpen },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/media', label: 'Media Manager', icon: ImageIcon },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  
  // Simulated admin role selection (UI only)
  const [role, setRole] = useState<'Administrator' | 'Editor' | 'Store Manager'>('Administrator');
  const [activeUsersCount, setActiveUsersCount] = useState(3);

  useEffect(() => {
    // Simulate other editors connecting/disconnecting
    const interval = setInterval(() => {
      setActiveUsersCount(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const newVal = prev + delta;
        return newVal >= 1 && newVal <= 6 ? newVal : prev;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-stone-900 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-stone-950 text-white flex flex-col shrink-0 border-b md:border-b-0 md:border-r border-stone-800">
        {/* Logo and Brand */}
        <div className="p-6 border-b border-stone-850 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-amber-600 bg-amber-600/10 flex items-center justify-center">
              <span className="font-sans-luxury text-amber-500 font-bold text-sm">Z</span>
            </div>
            <div>
              <h1 className="font-sans-luxury font-black text-sm uppercase tracking-widest text-white leading-none">
                Zion CMS
              </h1>
              <p className="text-[8px] text-stone-400 font-sans-luxury uppercase tracking-widest mt-1">
                Control Panel
              </p>
            </div>
          </div>
          <Link 
            href="/shop" 
            className="md:hidden text-stone-400 hover:text-white transition-colors"
            title="Back to storefront"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {sidebarLinks.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors rounded-none ${
                  isActive 
                    ? 'bg-amber-600 text-white' 
                    : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User context footer */}
        <div className="p-4 border-t border-stone-850 bg-stone-900/50 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-stone-700 flex items-center justify-center text-[10px] uppercase font-bold text-white">
              {user?.displayName ? user.displayName.substring(0, 2) : 'AD'}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-stone-200 truncate leading-none">
                {user?.displayName || 'Admin Operator'}
              </p>
              <p className="text-[8px] text-stone-400 truncate mt-1 leading-none">
                {user?.email || 'admin@zioncakes.co.tz'}
              </p>
            </div>
          </div>
          
          <Link 
            href="/shop" 
            className="flex items-center justify-center gap-2 w-full py-2 border border-stone-800 hover:bg-stone-900 text-white font-sans-luxury text-[9px] font-bold uppercase tracking-widest transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-stone-200/50 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="font-sans-luxury font-bold text-sm uppercase tracking-widest text-stone-800 hidden sm:block">
              {sidebarLinks.find(l => l.href === pathname)?.label || 'Administration'}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Live session count */}
            <div className="flex items-center gap-2 text-stone-500 font-sans-luxury text-[10px] tracking-wider uppercase font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <Users className="w-3.5 h-3.5 inline text-stone-400" /> {activeUsersCount} Active
            </div>

            {/* Role switcher simulation */}
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value as any)}
                className="bg-stone-50 border border-stone-200 text-stone-700 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-none focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 cursor-pointer"
              >
                <option value="Administrator">Administrator</option>
                <option value="Store Manager">Store Manager</option>
                <option value="Editor">Editor</option>
              </select>
            </div>
          </div>
        </header>

        {/* Content canvas */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

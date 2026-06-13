

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  BookOpen, 
  Star, 
  Sparkles, 
  Plus, 
  FileEdit,
  History,
  TrendingUp
} from 'lucide-react';
import { menuItems } from '@/services/menu';
import { blogPosts } from '@/services/blog';
import { reviews } from '@/services/reviews';

interface EditLog {
  id: string;
  action: string;
  target: string;
  user: string;
  time: string;
}

export default function DashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [featuredCount, setFeaturedCount] = useState(0);
  const [recentEdits, setRecentEdits] = useState<EditLog[]>([]);

  useEffect(() => {
    setProductCount(menuItems.length);
    setBlogCount(blogPosts.length);
    setFeaturedCount(menuItems.filter(item => item.featured).length);

    // Initial mock log system
    const defaultLogs: EditLog[] = [
      { id: '1', action: 'Modified Price', target: 'Chocolate Dream Cake', user: 'Amos M.', time: '2 mins ago' },
      { id: '2', action: 'Created Draft', target: 'The Volcanic Flavors of Southern Tanzania', user: 'Salome K.', time: '15 mins ago' },
      { id: '3', action: 'Approved Review', target: 'Grace Mbeya (5 Stars)', user: 'David L.', time: '1 hour ago' },
      { id: '4', action: 'Updated Tagline', target: 'Business Profile Settings', user: 'Amos M.', time: '3 hours ago' },
    ];
    
    const storedLogs = localStorage.getItem('zion_recent_edits');
    if (storedLogs) {
      try {
        setRecentEdits(JSON.parse(storedLogs));
      } catch (e) {
        setRecentEdits(defaultLogs);
      }
    } else {
      setRecentEdits(defaultLogs);
      localStorage.setItem('zion_recent_edits', JSON.stringify(defaultLogs));
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Upper Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card: Products count */}
        <div className="bg-white border border-stone-200/50 p-6 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-sans-luxury">
              Catalog Products
            </p>
            <h3 className="font-sans-luxury text-3xl font-black text-stone-900">
              {productCount}
            </h3>
            <p className="text-[9px] text-emerald-600 font-semibold tracking-wider uppercase flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Direct Mapping
            </p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100/50">
            <UtensilsCrossed className="w-6 h-6 text-amber-700" />
          </div>
        </div>

        {/* Card: Blogs count */}
        <div className="bg-white border border-stone-200/50 p-6 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-sans-luxury">
              Journal Articles
            </p>
            <h3 className="font-sans-luxury text-3xl font-black text-stone-900">
              {blogCount}
            </h3>
            <p className="text-[9px] text-emerald-600 font-semibold tracking-wider uppercase flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Static Param Sync
            </p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100/50">
            <BookOpen className="w-6 h-6 text-amber-700" />
          </div>
        </div>

        {/* Card: Reviews count */}
        <div className="bg-white border border-stone-200/50 p-6 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-sans-luxury">
              Guest Reviews
            </p>
            <h3 className="font-sans-luxury text-3xl font-black text-stone-900">
              {reviews.length}
            </h3>
            <p className="text-[9px] text-stone-500 font-semibold tracking-wider uppercase">
              ★ Active Moderator
            </p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100/50">
            <Star className="w-6 h-6 text-amber-700" />
          </div>
        </div>

        {/* Card: Featured Products count */}
        <div className="bg-white border border-stone-200/50 p-6 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-sans-luxury">
              Featured Items
            </p>
            <h3 className="font-sans-luxury text-3xl font-black text-stone-900">
              {featuredCount}
            </h3>
            <p className="text-[9px] text-stone-500 font-semibold tracking-wider uppercase">
              ⚡ Highlighted Carousel
            </p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100/50">
            <Sparkles className="w-6 h-6 text-amber-700" />
          </div>
        </div>
      </div>

      {/* Middle Section: Quick Actions & Recent Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Quick Actions */}
        <div className="bg-white border border-stone-200/50 p-6 space-y-6">
          <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-100 pb-3">
            Quick Actions
          </h4>
          <div className="grid grid-cols-1 gap-4">
            <Link 
              to="/admin/products"
              className="flex items-center justify-between p-4 border border-stone-200/80 hover:border-amber-600/50 hover:bg-amber-50/10 group transition-all text-xs font-bold uppercase tracking-wider"
            >
              <span className="flex items-center gap-3">
                <Plus className="w-4 h-4 text-amber-700" /> Add New Product
              </span>
              <span className="text-stone-400 group-hover:text-amber-700 transition-colors">➔</span>
            </Link>

            <Link 
              to="/admin/blog"
              className="flex items-center justify-between p-4 border border-stone-200/80 hover:border-amber-600/50 hover:bg-amber-50/10 group transition-all text-xs font-bold uppercase tracking-wider"
            >
              <span className="flex items-center gap-3">
                <Plus className="w-4 h-4 text-amber-700" /> Create Blog Post
              </span>
              <span className="text-stone-400 group-hover:text-amber-700 transition-colors">➔</span>
            </Link>

            <Link 
              to="/admin/settings"
              className="flex items-center justify-between p-4 border border-stone-200/80 hover:border-amber-600/50 hover:bg-amber-50/10 group transition-all text-xs font-bold uppercase tracking-wider"
            >
              <span className="flex items-center gap-3">
                <FileEdit className="w-4 h-4 text-amber-700" /> Edit Tagline & Info
              </span>
              <span className="text-stone-400 group-hover:text-amber-700 transition-colors">➔</span>
            </Link>
          </div>
        </div>

        {/* Right: Recent Edits (mock log system) */}
        <div className="bg-white border border-stone-200/50 p-6 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-widest text-stone-900 flex items-center gap-2">
              <History className="w-4 h-4 text-stone-450" /> Recent Actions Log
            </h4>
            <span className="text-[8px] font-bold tracking-widest uppercase bg-stone-100 text-stone-600 px-2 py-0.5">
              Simulated Session
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400 font-bold uppercase tracking-wider text-[9px]">
                  <th className="pb-3">Action</th>
                  <th className="pb-3">Asset Name</th>
                  <th className="pb-3">User</th>
                  <th className="pb-3 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100/50 text-stone-700">
                {recentEdits.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3 font-semibold text-stone-900">{log.action}</td>
                    <td className="py-3 text-stone-500">{log.target}</td>
                    <td className="py-3 font-medium">{log.user}</td>
                    <td className="py-3 text-right text-stone-400">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

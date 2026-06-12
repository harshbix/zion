'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, BookOpen, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/blog';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Sourcing', 'Technique', 'Recipes'];

  const filteredPosts = useMemo(() => {
    let result = [...blogPosts];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium">
        
        {/* Page Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            THE JOURNAL
          </span>
          <h1 className="font-sans-luxury text-stone-900 leading-tight text-5xl md:text-6xl font-black">
            Zion Journal
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Stories of culinary science, baking crafts, volcanic soil sourcing, and the heritage behind your favorite bites.
          </p>
        </div>

        {/* Controls */}
        <div className="glass-panel border border-stone-200/60 p-6 mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-sans-luxury text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-stone-900 border-stone-900 text-white'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-950'
                }`}
              >
                {cat === 'all' ? 'All Stories' : cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 font-sans-luxury text-[11px] uppercase tracking-wider focus:outline-none focus:border-amber-600 text-stone-800"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.article
                  layout
                  key={post.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-stone-200 p-5 hover:shadow-xl transition-shadow flex flex-col justify-between group"
                >
                  <div>
                    <Link href={`/blog/${post.slug}`} className="block relative aspect-[3/2] overflow-hidden mb-6">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 bg-amber-600/90 text-white font-sans-luxury text-[8px] font-bold tracking-widest uppercase px-3 py-1">
                        {post.category}
                      </span>
                    </Link>

                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-[10px] font-sans-luxury text-stone-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                      </div>
                      <h3 className="font-sans-luxury text-xl font-bold text-stone-900 leading-tight">
                        <Link href={`/blog/${post.slug}`} className="hover:text-amber-600 transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-stone-500 text-xs leading-relaxed" style={{ fontFamily: 'Inter' }}>
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-stone-100">
                    <Link href={`/blog/${post.slug}`} className="font-sans-luxury text-[9px] font-bold uppercase tracking-widest text-stone-900 hover:text-amber-600 group-hover:underline transition-colors flex items-center gap-2">
                      Read Article <BookOpen className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="font-sans-luxury text-xl text-stone-500 italic">
                  No journal articles found. Try another query.
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}

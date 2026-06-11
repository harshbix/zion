'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { menuItems, categories } from '@/lib/menu';
import { formatCurrency } from '@/lib/utils';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export default function ShopPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Filter & Sort menu items
  const processedItems = useMemo(() => {
    let result = [...menuItems];

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24">
      <div className="container-premium">
        {/* Page Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            OUR COLLECTION
          </span>
          <h1 className="font-serif-luxury text-stone-900 leading-tight">
            The Zion Catalog
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Freshly baked delicacies and curated local dishes prepared daily on order. Selected with passion, styled with minimalism.
          </p>
        </div>

        {/* Search, Filter, Sort Controls Panel */}
        <div className="glass-panel border border-stone-200/60 p-6 mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`font-sans-luxury text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 transition-colors border ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 border-stone-900 text-white'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-900'
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`font-sans-luxury text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 transition-colors border flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 border-stone-900 text-white'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-900'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search and Sort Group */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:min-w-[200px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 font-sans-luxury text-[11px] uppercase tracking-wider focus:outline-none focus:border-amber-600 text-stone-800"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="pl-10 pr-8 py-2.5 bg-white border border-stone-200 font-sans-luxury text-[11px] uppercase tracking-wider focus:outline-none focus:border-amber-600 text-stone-800 appearance-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {processedItems.length > 0 ? (
              processedItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="luxury-card group flex flex-col justify-between p-5 border border-stone-100"
                >
                  <Link href={`/product/${item.id}`} className="block relative aspect-square overflow-hidden bg-stone-50 mb-6">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover luxury-hover-image group-hover:scale-105"
                    />
                    {item.featured && (
                      <span className="absolute top-4 left-4 bg-stone-900/90 text-white font-sans-luxury text-[8px] font-bold tracking-widest uppercase px-3 py-1.5 backdrop-blur-sm">
                        Featured
                      </span>
                    )}
                  </Link>

                  <div className="space-y-4">
                    <div>
                      <span className="font-sans-luxury text-[9px] font-bold text-amber-700 uppercase tracking-widest">
                        {item.category}
                      </span>
                      <h3 className="font-serif-luxury text-xl text-stone-900 font-bold mt-1">
                        <Link href={`/product/${item.id}`} className="hover:text-amber-600 transition-colors">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-stone-500 text-xs mt-2 leading-relaxed" style={{ fontFamily: 'Inter' }}>
                        {item.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags?.map((tag) => (
                        <span key={tag} className="bg-stone-100 text-stone-600 font-sans-luxury text-[8px] font-bold uppercase tracking-wider px-2 py-0.5">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <span className="font-sans-luxury text-sm font-bold text-stone-950">
                        {item.priceString}
                      </span>

                      <button
                        onClick={() =>
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            priceString: item.priceString,
                            image: item.image,
                            category: item.category,
                          })
                        }
                        className="font-sans-luxury text-[9px] font-bold uppercase tracking-widest text-stone-900 hover:text-amber-600 border-b border-stone-900 hover:border-amber-600 pb-0.5 transition-all"
                      >
                        + ADD TO BAG
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center space-y-4">
                <p className="font-serif-luxury text-xl text-stone-500 italic">
                  No products match your filter options.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setSortBy('featured');
                  }}
                  className="inline-block px-8 py-3 bg-stone-900 text-white font-sans-luxury font-bold text-[10px] uppercase tracking-widest hover:bg-amber-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { useToast } from '@/lib/toast-context';
import { menuItems, categories } from '@/lib/menu';
import { formatCurrency } from '@/lib/utils';
import { Search, ArrowUpDown, ShoppingBag } from 'lucide-react';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

function ProductCardSkeleton() {
  return (
    <div className="border border-stone-200/60 p-5 space-y-6 bg-white flex flex-col justify-between">
      <div className="aspect-square w-full skeleton-shimmer bg-stone-100" />
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-3 w-16 skeleton-shimmer" />
          <div className="h-6 w-3/4 skeleton-shimmer" />
          <div className="h-4 w-full skeleton-shimmer mt-2" />
        </div>
        <div className="flex gap-1.5 pt-1">
          <div className="h-3.5 w-12 skeleton-shimmer" />
          <div className="h-3.5 w-12 skeleton-shimmer" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-stone-100">
          <div className="h-4 w-16 skeleton-shimmer" />
          <div className="h-4 w-20 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const { addToCart } = useCart();
  const toast = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (catId: string) => {
    setIsLoading(true);
    setSelectedCategory(catId);
    setTimeout(() => setIsLoading(false), 450);
  };

  const handleSortChange = (sortOpt: SortOption) => {
    setIsLoading(true);
    setSortBy(sortOpt);
    setTimeout(() => setIsLoading(false), 400);
  };

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

  const handleAddToBag = (item: typeof menuItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      priceString: item.priceString,
      image: item.image,
      category: item.category,
    });
    toast.success(`Added ${item.name} to your bag.`);
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24">
      <div className="container-premium">
        {/* Page Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            OUR COLLECTION
          </span>
          <h1 className="font-sans-luxury text-stone-900 leading-tight font-black tracking-tight text-5xl md:text-6xl">
            The Zion Catalog
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Freshly baked delicacies and curated local dishes prepared daily on order. Selected with passion, styled with minimalism.
          </p>
        </div>

        {/* Search, Filter, Sort Controls Panel */}
        <div className="glass-panel border border-stone-200/60 p-6 mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs (44px target) */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`font-sans-luxury text-[10px] font-bold uppercase tracking-wider px-5 h-11 flex items-center justify-center transition-all border active:scale-[0.98] ${
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
                onClick={() => handleCategoryChange(cat.id)}
                className={`font-sans-luxury text-[10px] font-bold uppercase tracking-wider px-5 h-11 flex items-center justify-center transition-all border gap-2 active:scale-[0.98] ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 border-stone-900 text-white'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-900'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search and Sort Group */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input (44px target) */}
            <div className="relative flex-1 sm:min-w-[240px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => { setIsLoading(true); setSearchQuery(e.target.value); setTimeout(() => setIsLoading(false), 300); }}
                className="w-full pl-11 pr-4 h-11 bg-white border border-stone-200 font-sans-luxury text-[11px] uppercase tracking-wider focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-600/10 text-stone-800"
              />
            </div>

            {/* Sort Dropdown (44px target) */}
            <div className="relative">
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="pl-11 pr-10 h-11 bg-white border border-stone-200 font-sans-luxury text-[11px] uppercase tracking-wider focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-600/10 text-stone-800 appearance-none cursor-pointer"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : processedItems.length > 0 ? (
            <AnimatePresence>
              {processedItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="luxury-card group flex flex-col justify-between p-5 border border-stone-100"
                >
                  <Link href={`/product/${item.id}`} className="block relative aspect-square overflow-hidden bg-stone-50 mb-6">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                      <h3 className="font-sans-luxury text-lg text-stone-900 font-bold mt-1 tracking-tight leading-snug">
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
                        onClick={() => handleAddToBag(item)}
                        className="font-sans-luxury text-[9px] font-bold uppercase tracking-widest text-stone-900 hover:text-amber-600 border-b border-stone-900 hover:border-amber-600 pb-0.5 h-11 flex items-center justify-center transition-all select-none active:scale-95"
                      >
                        + ADD TO BAG
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="col-span-full py-24 text-center space-y-6 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-sans-luxury text-base font-bold text-stone-900 uppercase tracking-widest">No Products Found</h3>
                <p className="text-stone-500 text-xs mt-2 leading-relaxed" style={{ fontFamily: 'Inter' }}>
                  We couldn't find any delicacies matching "{searchQuery}". Try adjusting your keywords, switching categories, or clearing sorting preferences.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setSortBy('featured');
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 500);
                }}
                className="premium-btn-primary w-full max-w-xs mx-auto"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

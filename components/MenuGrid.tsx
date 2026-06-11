'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems, categories } from '@/lib/menu';
import { ShoppingBag, Filter } from 'lucide-react';

export default function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState('cakes');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="w-full">
      {/* Premium Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="relative group">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-600 group-hover:text-orange-600 transition-colors" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-md hover:shadow-lg font-roboto"
            style={{ fontFamily: 'Roboto' }}
          />
        </div>
      </motion.div>

      {/* Premium Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-4 mb-12"
      >
        {categories.map((category, idx) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 shadow-md ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl'
                : 'bg-white border-2 border-amber-200 text-stone-700 hover:border-orange-500 hover:shadow-lg'
            }`}
            style={{ fontFamily: 'Montserrat', letterSpacing: '0.3px' }}
          >
            <span className="text-xl">{category.icon}</span>
            {category.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Premium Menu Items Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-amber-50 border border-amber-100 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 h-full flex flex-col justify-between">
                  {/* Animated background on hover */}
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-yellow-400/0 group-hover:from-orange-400/5 group-hover:to-yellow-400/5 transition-all duration-500" />

                  {/* Header with Icon and Badge */}
                  <div className="mb-6 flex items-start justify-between relative z-10">
                    <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className="inline-block">
                      <div className="p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl group-hover:shadow-lg transition-all">
                        <span className="text-3xl">
                          {item.category === 'cakes'
                            ? '🎂'
                            : item.category === 'juices'
                              ? '🥤'
                              : item.category === 'meals'
                                ? '🍗'
                                : '🍪'}
                        </span>
                      </div>
                    </motion.div>
                    {item.featured && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-stone-900 text-xs font-black rounded-full shadow-lg"
                      >
                        ⭐ Featured
                      </motion.span>
                    )}
                  </div>

                  {/* Premium Content */}
                  <div className="mb-6 flex-1 relative z-10">
                    <h3
                      className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-orange-600 transition-colors"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-stone-600 text-sm leading-relaxed"
                      style={{ fontFamily: 'Roboto', fontWeight: 300 }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Premium Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {item.tags?.slice(0, 2).map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-gradient-to-r from-amber-200 to-orange-200 text-stone-700 text-xs font-bold rounded-full"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Premium Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-amber-200 relative z-10">
                    <p
                      className="text-2xl font-black text-orange-600"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {item.priceString}
                    </p>
                    <motion.div whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }}>
                      <ShoppingBag className="w-6 h-6 text-orange-600 group-hover:text-orange-700 transition-colors" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p
                className="text-stone-600 text-lg"
                style={{ fontFamily: 'Roboto' }}
              >
                No items found. Try a different search.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

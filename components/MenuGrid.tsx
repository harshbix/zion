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
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-600" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-amber-100 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel-500 transition-all"
          />
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-glow'
                : 'bg-amber-200 text-stone-700 hover:bg-amber-300'
            }`}
          >
            <span>{category.icon}</span>
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* Menu Items Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 p-6 hover-lift transition-all duration-300 h-full flex flex-col justify-between">
                  {/* Category Icon */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="inline-block p-3 bg-white rounded-lg group-hover:shadow-glow transition-all">
                      <span className="text-2xl">
                        {item.category === 'cakes'
                          ? '🎂'
                          : item.category === 'juices'
                            ? '🥤'
                            : item.category === 'meals'
                              ? '🍗'
                              : '🍪'}
                      </span>
                    </div>
                    {item.featured && (
                      <span className="px-2 py-1 bg-yellow-400 text-stone-900 text-xs font-bold rounded-full">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mb-4 flex-1">
                    <h3 className="text-lg font-serif font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-amber-200 text-stone-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-amber-300">
                    <p className="text-xl font-bold text-gradient">{item.price}</p>
                    <ShoppingBag className="w-5 h-5 text-stone-600 group-hover:text-orange-600 transition-colors" />
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
              <p className="text-stone-600 text-lg">
                No items found. Try a different search.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

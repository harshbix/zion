'use client';

import { motion } from 'framer-motion';
import { getFeaturedItems } from '@/lib/menu';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function MenuShowcase() {
  const featuredItems = getFeaturedItems();

  return (
    <section id="menu" className="section-padding bg-gradient-to-b from-amber-50 to-white">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
            Featured Menu Highlights
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover our most loved selections, handpicked for their exceptional quality and taste
          </p>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 p-6 hover-lift">
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-yellow-400 text-stone-900 text-xs font-bold rounded-full">
                    Featured
                  </span>
                </div>

                {/* Category Icon */}
                <div className="mb-4">
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
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

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
                  <p className="text-lg font-bold text-orange-600">{item.price}</p>
                  <ShoppingBag className="w-4 h-4 text-stone-600 group-hover:text-orange-600 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Menu CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/menu"
            className="inline-block px-8 py-4 bg-gradient-to-r from-stone-700 to-stone-800 text-white font-semibold rounded-lg hover:shadow-luxury-lg hover:scale-105 transition-all duration-300"
          >
            Explore Full Menu
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

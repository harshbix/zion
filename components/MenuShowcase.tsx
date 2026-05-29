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
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span
              className="text-sm font-black text-orange-600 tracking-widest"
              style={{ fontFamily: 'Montserrat' }}
            >
              FEATURED HIGHLIGHTS
            </span>
          </motion.div>
          <h2
            className="text-5xl md:text-6xl font-black text-stone-900 mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display', letterSpacing: '-0.02em' }}
          >
            Handpicked Favorites
          </h2>
          <p
            className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Roboto', fontWeight: 300 }}
          >
            Discover our most loved selections, handpicked for their exceptional quality and taste
          </p>
        </motion.div>

        {/* Premium Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-amber-50 p-8 shadow-lg border border-amber-100 hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-yellow-400/0 group-hover:from-orange-400/5 group-hover:to-yellow-400/5 transition-all duration-500"
                />

                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.12 + 0.3 }}
                  className="absolute top-6 right-6"
                >
                  <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-stone-900 text-xs font-bold rounded-full shadow-lg">
                    ⭐ Featured
                  </div>
                </motion.div>

                {/* Category Icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="mb-6"
                >
                  <div className="inline-block p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl group-hover:shadow-xl transition-all duration-300">
                    <span className="text-4xl">
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

                {/* Premium Content */}
                <h3
                  className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-orange-600 transition-colors duration-300"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-stone-600 text-sm mb-6 line-clamp-2 leading-relaxed"
                  style={{ fontFamily: 'Roboto', fontWeight: 300 }}
                >
                  {item.description}
                </p>

                {/* Premium Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
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
                <div className="flex items-center justify-between pt-6 border-t border-amber-200">
                  <p className="text-2xl font-black text-orange-600" style={{ fontFamily: 'Montserrat' }}>
                    {item.price}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ShoppingBag className="w-5 h-5 text-orange-600 group-hover:text-orange-700 transition-colors" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Premium View Menu CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
            <Link
              href="/menu"
              className="inline-block px-10 py-4 bg-gradient-to-r from-stone-700 to-stone-800 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300"
              style={{ fontFamily: 'Montserrat', letterSpacing: '0.5px' }}
            >
              EXPLORE FULL MENU
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

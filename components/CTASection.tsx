'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { businessData } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
      {/* Premium animated background elements */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 right-0 w-96 h-96 bg-orange-400/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl"
      />

      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Premium Main CTA */}
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-black text-amber-50 mb-8 leading-tight"
            style={{ fontFamily: 'Playfair Display', letterSpacing: '-0.02em' }}
          >
            Ready to Experience the
            <br />
            <span className="text-gradient-gold">Taste</span> of Quality?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-amber-200 max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: 'Roboto', fontWeight: 300 }}
          >
            Join thousands of satisfied customers who've discovered their favorite spot in Mbeya.
            Order now and enjoy our freshly baked cakes and delicious cuisine.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
              <a
                href={businessData.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300"
                style={{ fontFamily: 'Montserrat', letterSpacing: '0.5px' }}
              >
                Order Now
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
              <Link
                href="/menu"
                className="flex items-center justify-center gap-3 px-10 py-4 bg-white/10 border-2 border-white/40 text-amber-50 font-bold rounded-xl hover:bg-white/20 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
                style={{ fontFamily: 'Montserrat', letterSpacing: '0.5px' }}
              >
                Explore Menu
              </Link>
            </motion.div>
          </motion.div>

          {/* Premium Feature Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { emoji: '📍', label: 'Easy Location', value: 'Forest Area, Mbeya' },
              { emoji: '📞', label: 'Quick Contact', value: businessData.contact.phone },
              { emoji: '⏰', label: 'Open Daily', value: '8 AM - Late Evening' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="relative rounded-xl overflow-hidden bg-white/10 border border-white/20 p-8 shadow-xl hover:shadow-2xl hover:border-white/40 transition-all duration-300 backdrop-blur-xl"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-yellow-400/0 hover:from-orange-400/10 hover:to-yellow-400/10 transition-all duration-500" />

                <div className="relative z-10">
                  <p
                    className="text-sm text-amber-300 mb-3 font-bold tracking-widest"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    {feature.emoji} {feature.label.toUpperCase()}
                  </p>
                  <p
                    className="font-bold text-amber-50 text-lg"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    {feature.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

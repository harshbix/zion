'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { businessData } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-r from-stone-900 via-chocolate-800 to-stone-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl" />

      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main CTA */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-50 mb-6 leading-tight">
            Ready to Experience the <span className="text-gradient-gold">Taste</span> of Quality?
          </h2>

          <p className="text-lg md:text-xl text-amber-200 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who've discovered their favorite spot in Mbeya.
            Order now and enjoy our freshly baked cakes and delicious cuisine.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={businessData.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              Order Now
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/menu"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-amber-50 font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              Explore Menu
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div className="glass p-6">
              <p className="text-sm text-amber-200 mb-2">📍 Easy Location</p>
              <p className="font-semibold text-amber-50">Forest Area, Mbeya</p>
            </div>
            <div className="glass p-6">
              <p className="text-sm text-amber-200 mb-2">📞 Quick Contact</p>
              <p className="font-semibold text-amber-50">{businessData.contact.phone}</p>
            </div>
            <div className="glass p-6">
              <p className="text-sm text-amber-200 mb-2">⏰ Open Daily</p>
              <p className="font-semibold text-amber-50">8 AM - Late Evening</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

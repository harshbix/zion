'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { heroContent, businessData } from '@/lib/data';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen pt-20 overflow-hidden bg-gradient-to-b from-amber-100 to-amber-50">
      {/* Background gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* Gradient overlay */}
      <div className="gradient-overlay-light" />

      <div className="container-premium h-full flex flex-col items-center justify-center relative z-10">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-300/50 rounded-full backdrop-blur-sm">
              <p className="text-sm font-semibold text-gradient-gold">
                ⭐ Rated 4.0 • 82+ Reviews
              </p>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-stone-900 mb-6 leading-tight"
          >
            Freshly Baked.
            <br />
            <span className="text-gradient">Locally Loved.</span>
            <br />
            Crafted in Mbeya.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-stone-700 mb-10 max-w-2xl mx-auto"
          >
            Premium cakes, juices, and local flavors crafted with passion and the
            finest ingredients. Experience the taste of quality at prices you'll love.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/menu"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300 text-center"
            >
              Explore Menu
            </Link>
            <a
              href={businessData.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 hover:scale-105 transition-all duration-300 text-center"
            >
              Order on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-stone-600 font-medium">Scroll to explore</p>
            <ChevronDown className="w-6 h-6 text-orange-600" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

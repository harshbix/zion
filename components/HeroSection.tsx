'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { heroContent, businessData } from '@/lib/data';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="relative w-full h-screen pt-20 overflow-hidden bg-gradient-to-b from-amber-100 via-amber-50 to-white"
    >
      {/* Premium animated background orbs */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
      />
      <motion.div
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
      />
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
      />

      {/* Gradient overlay */}
      <div className="gradient-overlay-light" />

      <div className="container-premium h-full flex flex-col items-center justify-center relative z-10">
        {/* Main Content Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl"
        >
          {/* Premium Badge */}
          <motion.div variants={itemVariants} className="inline-block mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 border border-yellow-300/40 rounded-full backdrop-blur-xl shadow-lg"
            >
              <p
                className="text-sm font-bold text-gradient-gold tracking-wide"
                style={{ fontFamily: 'Montserrat' }}
              >
                ⭐ RATED 4.0 • 82+ REVIEWS
              </p>
            </motion.div>
          </motion.div>

          {/* Premium Main Headline with staggered animation */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-black text-stone-900 leading-none mb-4"
              style={{ fontFamily: 'Playfair Display', letterSpacing: '-0.02em' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="block"
              >
                Freshly Baked.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="block bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
              >
                Locally Loved.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="block"
              >
                Crafted in Mbeya.
              </motion.span>
            </h1>
          </motion.div>

          {/* Premium Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-stone-700 mb-12 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Roboto', fontWeight: 300 }}
          >
            Premium cakes, juices, and local flavors crafted with passion and the finest
            ingredients. Experience the taste of quality at prices you'll love.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
              <Link
                href="/menu"
                className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 text-center block"
                style={{ fontFamily: 'Montserrat', letterSpacing: '0.5px' }}
              >
                Explore Menu
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
              <a
                href={businessData.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white border-2 border-orange-500 text-orange-600 font-bold rounded-xl hover:shadow-2xl hover:bg-orange-50 transition-all duration-300 text-center block"
                style={{ fontFamily: 'Montserrat', letterSpacing: '0.5px' }}
              >
                Order on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Premium Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.1 }}
          >
            <p
              className="text-sm text-stone-600 font-semibold tracking-wide"
              style={{ fontFamily: 'Montserrat' }}
            >
              SCROLL TO EXPLORE
            </p>
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="w-5 h-5 text-orange-600" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

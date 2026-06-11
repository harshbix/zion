'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_URLS } from '@/lib/whatsapp';

export default function HeroSectionCinematic() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-stone-900"
    >
      {/* Cinematic Background Image with Slow Zoom */}
      <motion.div
        animate={{ scale: 1.05 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=1080&fit=crop"
          alt="Freshly baked cakes"
          fill
          priority
          className="object-cover"
          quality={95}
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Top-Left Logo */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-6 left-6 z-20"
      >
        <div className="w-12 h-12 md:w-16 md:h-16 relative bg-white/10 backdrop-blur-md rounded-lg p-2">
          <Image
            src="/logo.png"
            alt="Zion Cakes Logo"
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-3xl px-6 md:px-12">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight"
          style={{
            fontFamily: 'Playfair Display',
            letterSpacing: '-0.03em',
            textShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          Freshly Baked.
        </motion.h1>

        {/* Subheadline Accent */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-2xl md:text-4xl text-amber-200 mb-8 font-light"
          style={{
            fontFamily: 'Playfair Display',
            letterSpacing: '-0.01em',
          }}
        >
          Made with Care in Mbeya.
        </motion.p>

        {/* Descriptive Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base md:text-lg text-white/80 mb-12 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: 'Inter, -apple-system', fontWeight: 300 }}
        >
          Premium handcrafted cakes, pastries, and local Tanzanian dishes. Every bite tells a story of passion.
        </motion.p>

        {/* Primary CTA - WhatsApp Button with Pulse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.a
            href={WHATSAPP_URLS.order}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="inline-block px-12 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-2xl transition-all duration-300"
            style={{
              fontFamily: 'Inter',
              letterSpacing: '0.5px',
              fontSize: '18px',
            }}
          >
            Order on WhatsApp
          </motion.a>

          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 text-sm"
          >
            💬 We respond instantly
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-white/60 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

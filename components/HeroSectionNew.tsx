'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSectionNew() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&h=900&fit=crop"
          alt="Cinematic bakery hero"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-4xl px-6 md:px-12 flex flex-col items-center justify-center h-full">
        {/* Logo - Minimal placement */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 relative">
            <Image
              src="/logo.png"
              alt="Zion Cakes Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
          style={{
            fontFamily: 'Playfair Display',
            letterSpacing: '-0.03em',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          Artisan Baked Excellence
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-2xl text-amber-50 mb-8 max-w-2xl"
          style={{ fontFamily: 'Roboto', fontWeight: 300, letterSpacing: '0.3px' }}
        >
          Discover the warmth of fresh-baked goodness in every bite
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/menu"
              className="inline-block px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-none shadow-2xl transition-all duration-300"
              style={{ fontFamily: 'Montserrat', letterSpacing: '0.5px' }}
            >
              DISCOVER OUR MENU
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

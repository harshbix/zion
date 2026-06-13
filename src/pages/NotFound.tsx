import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-4 relative overflow-hidden text-center">
      {/* Decorative blurry backgrounds */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-stone-900/30 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-8 max-w-lg">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex p-3 bg-amber-950/30 border border-amber-800/20 text-amber-500 rounded-full mb-2"
        >
          <Compass className="w-8 h-8 animate-pulse" />
        </motion.div>

        {/* 404 text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-sans-luxury text-amber-600 text-8xl md:text-9xl font-black tracking-widest leading-none"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans-luxury text-stone-100 text-lg md:text-xl font-bold uppercase tracking-widest"
          >
            Lost in the aroma of fresh bakes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-stone-400 text-xs md:text-sm leading-relaxed"
            style={{ fontFamily: 'Inter' }}
          >
            The page you are looking for has been moved, deleted, or doesn't exist. Let's guide you back to our delicious collections.
          </motion.p>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-4"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 bg-amber-600 hover:bg-amber-700 text-stone-950 text-[10px] font-bold uppercase tracking-widest px-8 py-4.5 transition-colors duration-300 rounded-none cursor-pointer"
          >
            <Home className="w-4 h-4" /> Back to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

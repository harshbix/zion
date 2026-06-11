'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_URLS } from '@/lib/whatsapp';

export default function FinalCTASection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1585080876519-175f63602afb?w=1920&h=1080&fit=crop"
          alt="Fresh baked pastries"
          fill
          className="object-cover"
          quality={95}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Headline */}
          <h2
            className="text-5xl md:text-7xl font-black text-white leading-tight"
            style={{
              fontFamily: 'Playfair Display',
              letterSpacing: '-0.03em',
              textShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            Craving Something Fresh?
          </h2>

          {/* Subheading */}
          <p
            className="text-2xl text-amber-100 font-light"
            style={{
              fontFamily: 'Inter',
              fontWeight: 300,
            }}
          >
            We're ready when you are.
          </p>

          {/* Descriptive Text */}
          <p
            className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter', fontWeight: 300 }}
          >
            From our ovens to your table in minutes. Order now on WhatsApp and get your freshly baked goodness delivered or ready for pickup.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center pt-4"
          >
            {/* Primary CTA */}
            <motion.a
              href={WHATSAPP_URLS.order}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="px-12 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-2xl transition-all duration-300 text-lg"
              style={{ fontFamily: 'Inter' }}
            >
              Order Now on WhatsApp
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href={WHATSAPP_URLS.customOrder}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-white text-white hover:bg-white/10 font-bold rounded-full transition-all duration-300 text-lg"
              style={{ fontFamily: 'Inter' }}
            >
              Custom Order
            </motion.a>
          </motion.div>

          {/* Trust Line */}
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-white/70 text-sm"
            style={{ fontFamily: 'Inter' }}
          >
            ✓ Free consultation • ✓ Same-day delivery • ✓ 100% fresh guarantee
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}

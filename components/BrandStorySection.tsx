'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { WHATSAPP_URLS } from '@/lib/whatsapp';
import Link from 'next/link';

export default function BrandStorySection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 md:py-32 bg-gradient-to-b from-amber-50 to-white"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Strong Emotional Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=600&fit=crop"
                alt="Our bakery craft"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                quality={95}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>

          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 space-y-6"
          >
            <div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 12 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-1 bg-amber-600 rounded-full mb-4"
              />
              <h2
                className="text-5xl md:text-6xl font-black text-amber-900"
                style={{
                  fontFamily: 'Montserrat',
                  letterSpacing: '-0.03em',
                }}
              >
                Our Story
              </h2>
            </div>

            <p
              className="text-lg text-stone-700 leading-relaxed"
              style={{ fontFamily: 'Inter', fontWeight: 300 }}
            >
              At Zion Cakes & Bites, we believe that every cake tells a story. Since opening our doors in Mbeya, we've been dedicated to crafting premium baked goods that bring joy to every table.
            </p>

            <p
              className="text-lg text-stone-600 leading-relaxed"
              style={{ fontFamily: 'Inter', fontWeight: 300 }}
            >
              From our ovens to your moments—we use only the finest ingredients, traditional techniques, and a whole lot of love in every creation.
            </p>

            {/* Why Choose Us */}
            <div className="space-y-4 pt-4">
              {[
                { emoji: '✨', text: 'Freshly baked daily, no preservatives' },
                { emoji: '🌾', text: 'Locally sourced, premium ingredients' },
                { emoji: '❤️', text: 'Handcrafted with passion and care' },
                { emoji: '⚡', text: 'Fresh to your table in minutes' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <p className="text-base text-stone-700" style={{ fontFamily: 'Inter' }}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <Link
                href={WHATSAPP_URLS.order}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all duration-300"
                style={{ fontFamily: 'Inter' }}
              >
                Order Now →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSectionNew() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 md:py-32 bg-amber-50"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-96 md:h-full min-h-96"
          >
            <Image
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=600&fit=crop"
              alt="Our bakery interior"
              fill
              className="object-cover rounded-lg shadow-2xl"
              quality={90}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2
              className="text-5xl md:text-6xl font-black text-amber-900"
              style={{
                fontFamily: 'Montserrat',
                letterSpacing: '-0.03em',
              }}
            >
              Our Story
            </h2>

            <p
              className="text-lg text-stone-700 leading-relaxed"
              style={{ fontFamily: 'Roboto', fontWeight: 300 }}
            >
              Welcome to Zion Cakes & Bites, where tradition meets passion in the heart of Mbeya. Every creation tells a story of dedication to quality, locally-sourced ingredients, and time-honored baking techniques.
            </p>

            <p
              className="text-lg text-stone-700 leading-relaxed"
              style={{ fontFamily: 'Roboto', fontWeight: 300 }}
            >
              From our ovens to your table, we craft moments of joy one bite at a time.
            </p>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {[
                { icon: '🌾', label: 'Fresh & Local' },
                { icon: '❤️', label: 'Handcrafted' },
                { icon: '⭐', label: 'Premium Quality' },
                { icon: '🍯', label: 'Pure Ingredients' },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-4xl">{item.icon}</span>
                  <p
                    className="font-bold text-amber-900"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

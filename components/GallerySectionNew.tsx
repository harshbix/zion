'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryItems = [
  {
    id: 1,
    title: 'Morning Fresh Bakes',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
    size: 'large',
  },
  {
    id: 2,
    title: 'Artisan Process',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    size: 'medium',
  },
  {
    id: 3,
    title: 'Premium Ingredients',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=400&fit=crop',
    size: 'medium',
  },
  {
    id: 4,
    title: 'Precision Crafting',
    image: 'https://images.unsplash.com/photo-1585080876519-175f63602afb?w=800&h=600&fit=crop',
    size: 'large',
  },
  {
    id: 5,
    title: 'Seasonal Flavors',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    size: 'medium',
  },
  {
    id: 6,
    title: 'Tasting Moments',
    image: 'https://images.unsplash.com/photo-1599599810694-b3b146efb2c1?w=800&h=600&fit=crop',
    size: 'large',
  },
];

export default function GallerySectionNew() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 md:py-32 bg-amber-50"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl font-black text-amber-900 mb-4"
            style={{
              fontFamily: 'Montserrat',
              letterSpacing: '-0.03em',
            }}
          >
            Our Craft
          </h2>
          <p
            className="text-lg text-stone-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Roboto', fontWeight: 300 }}
          >
            From sunrise baking to the moment your freshly baked treats reach your table, experience the artistry and passion behind every creation.
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-max">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-lg shadow-xl cursor-pointer
                ${item.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1'}
              `}
            >
              {/* Image */}
              <div className={`relative w-full ${item.size === 'large' ? 'h-96' : 'h-64'}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  quality={90}
                />

                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center"
                >
                  <h3
                    className="text-white text-2xl font-bold text-center px-6"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    {item.title}
                  </h3>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

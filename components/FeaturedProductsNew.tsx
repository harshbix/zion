'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Chocolate Elegance',
    description: 'Rich dark chocolate cake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    featured: true,
  },
  {
    id: 2,
    name: 'Vanilla Dreams',
    description: 'Classic vanilla cake',
    image: 'https://images.unsplash.com/photo-1585080876519-175f63602afb?w=500&h=500&fit=crop',
    featured: false,
  },
  {
    id: 3,
    name: 'Strawberry Bliss',
    description: 'Fresh strawberry layers',
    image: 'https://images.unsplash.com/photo-1595080876519-175f63602afb?w=500&h=500&fit=crop',
    featured: true,
  },
  {
    id: 4,
    name: 'Caramel Dream',
    description: 'Salted caramel cake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    featured: false,
  },
  {
    id: 5,
    name: 'Citrus Zest',
    description: 'Tangy lemon cake',
    image: 'https://images.unsplash.com/photo-1599599810694-b3b146efb2c1?w=500&h=500&fit=crop',
    featured: false,
  },
  {
    id: 6,
    name: 'Red Velvet',
    description: 'Luxurious red velvet',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    featured: true,
  },
];

export default function FeaturedProductsNew() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 md:py-32 bg-white"
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
            Signature Collection
          </h2>
          <p
            className="text-lg text-stone-600"
            style={{ fontFamily: 'Roboto', fontWeight: 300 }}
          >
            Handcrafted selections from our artisan kitchens
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-80 mb-6 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  quality={90}
                />
                
                {/* Featured Badge */}
                {product.featured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    ⭐ Featured
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div>
                <h3
                  className="text-2xl font-bold text-amber-900 mb-2"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-stone-600"
                  style={{ fontFamily: 'Roboto', fontWeight: 300 }}
                >
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

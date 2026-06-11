'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_URLS } from '@/lib/whatsapp';
import { ShoppingBag } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Chocolate Dream Cake',
    price: '45,000 TZS',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    description: 'Rich dark chocolate with ganache',
  },
  {
    id: 2,
    name: 'Vanilla Cloud Cake',
    price: '40,000 TZS',
    image: 'https://images.unsplash.com/photo-1585080876519-175f63602afb?w=500&h=500&fit=crop',
    description: 'Light fluffy vanilla perfection',
  },
  {
    id: 3,
    name: 'Strawberry Paradise',
    price: '48,000 TZS',
    image: 'https://images.unsplash.com/photo-1599599810694-b3b146efb2c1?w=500&h=500&fit=crop',
    description: 'Fresh strawberry with cream',
  },
  {
    id: 4,
    name: 'Red Velvet Elegance',
    price: '50,000 TZS',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    description: 'Premium cream cheese frosting',
  },
  {
    id: 5,
    name: 'Lemon Zest Cake',
    price: '38,000 TZS',
    image: 'https://images.unsplash.com/photo-1585080876519-175f63602afb?w=500&h=500&fit=crop',
    description: 'Tangy citrus with fresh glaze',
  },
  {
    id: 6,
    name: 'Carrot Cake Delight',
    price: '42,000 TZS',
    image: 'https://images.unsplash.com/photo-1599599810694-b3b146efb2c1?w=500&h=500&fit=crop',
    description: 'Moist with cream cheese icing',
  },
];

export default function SignatureProductsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
              fontFamily: 'Playfair Display',
              letterSpacing: '-0.03em',
            }}
          >
            Signature Collection
          </h2>
          <p
            className="text-lg text-stone-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter', fontWeight: 300 }}
          >
            Our most-loved creations, crafted daily with premium ingredients
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group"
            >
              {/* Card Container */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-amber-100/50">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden bg-stone-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3
                      className="text-xl font-bold text-amber-900 mb-1"
                      style={{ fontFamily: 'Inter' }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-sm text-stone-600"
                      style={{ fontFamily: 'Inter', fontWeight: 300 }}
                    >
                      {product.description}
                    </p>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-amber-100">
                    <span
                      className="text-2xl font-black text-amber-600"
                      style={{ fontFamily: 'Inter' }}
                    >
                      {product.price}
                    </span>
                    <motion.a
                      href={WHATSAPP_URLS.orderProduct(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="inline-flex items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all"
                    >
                      <ShoppingBag size={18} />
                    </motion.a>
                  </div>

                  {/* WhatsApp Button */}
                  <motion.a
                    href={WHATSAPP_URLS.orderProduct(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full block py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg text-center transition-all"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Order Now
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-stone-600 mb-4" style={{ fontFamily: 'Inter' }}>
            Can't find what you're looking for?
          </p>
          <Link
            href={WHATSAPP_URLS.customOrder}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border-2 border-green-500 text-green-600 hover:bg-green-50 font-bold rounded-full transition-all"
            style={{ fontFamily: 'Inter' }}
          >
            Request Custom Order
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

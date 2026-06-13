

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    text: 'The cakes here are absolutely delicious. Premium quality, fresh daily. Worth every shilling!',
    category: 'Quality',
  },
  {
    id: 2,
    name: 'James K.',
    rating: 5,
    text: 'Great prices for premium products. You get excellent value for money. Highly recommended!',
    category: 'Value',
  },
  {
    id: 3,
    name: 'Amina L.',
    rating: 4,
    text: 'Amazing cakes! Friendly service. Sometimes orders take a bit longer on weekends, but worth the wait.',
    category: 'Service',
  },
  {
    id: 4,
    name: 'David T.',
    rating: 5,
    text: "Ordered a custom cake for my daughter's birthday. Absolutely stunning and delicious!",
    category: 'Quality',
  },
  {
    id: 5,
    name: 'Grace N.',
    rating: 5,
    text: 'Fast WhatsApp ordering, fresh delivery. Best bakery in Mbeya!',
    category: 'Service',
  },
  {
    id: 6,
    name: 'Peter M.',
    rating: 4,
    text: 'Excellent flavors, great quality. They respond quickly to orders on WhatsApp.',
    category: 'Value',
  },
];

const stats = [
  { label: 'Happy Customers', value: '1,000+', icon: '👥' },
  { label: 'Orders Delivered', value: '5,000+', icon: '📦' },
  { label: 'Avg. Rating', value: '4.8★', icon: '⭐' },
  { label: 'Years Fresh', value: '2+', icon: '🎂' },
];

export default function TrustSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 md:py-32 bg-gradient-to-b from-white to-amber-50"
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
            Loved by Our Community
          </h2>
          <p
            className="text-lg text-stone-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter', fontWeight: 300 }}
          >
            Real customers, real experiences with Zion Cakes & Bites
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center p-6 bg-white rounded-xl border border-amber-100/50 shadow-lg"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p
                className="text-2xl font-black text-amber-600 mb-1"
                style={{ fontFamily: 'Inter' }}
              >
                {stat.value}
              </p>
              <p
                className="text-sm text-stone-600"
                style={{ fontFamily: 'Inter', fontWeight: 300 }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl p-6 border border-amber-100/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p
                className="text-stone-700 mb-4 leading-relaxed text-sm"
                style={{ fontFamily: 'Inter', fontWeight: 300 }}
              >
                "{review.text}"
              </p>

              {/* Author & Category */}
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-bold text-stone-900 text-sm"
                    style={{ fontFamily: 'Inter' }}
                  >
                    {review.name}
                  </p>
                  <p
                    className="text-xs text-stone-500"
                    style={{ fontFamily: 'Inter' }}
                  >
                    {review.category}
                  </p>
                </div>
                <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold">
                  ✓ Verified
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-stone-600 mb-2" style={{ fontFamily: 'Inter' }}>
            Join thousands of satisfied customers
          </p>
          <p
            className="text-2xl font-bold text-amber-900"
            style={{ fontFamily: 'Montserrat' }}
          >
            Experience the Zion Difference Today
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

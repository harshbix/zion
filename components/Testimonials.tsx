'use client';

import { motion } from 'framer-motion';
import { getTopReviews, getRatingStats } from '@/lib/reviews';
import { Star, Quote } from 'lucide-react';
import Link from 'next/link';

export default function Testimonials() {
  const topReviews = getTopReviews(3);
  const stats = getRatingStats();

  return (
    <section id="reviews" className="section-padding bg-white">
      <div className="container-premium">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Star Rating Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} whileInView={{ scale: [0.8, 1.1, 1] }} transition={{ delay: i * 0.1 }}>
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span
              className="text-sm font-black text-orange-600 tracking-widest"
              style={{ fontFamily: 'Montserrat' }}
            >
              CUSTOMER REVIEWS
            </span>
          </motion.div>

          <h2
            className="text-5xl md:text-6xl font-black text-stone-900 mb-6 mt-4 leading-tight"
            style={{ fontFamily: 'Playfair Display', letterSpacing: '-0.02em' }}
          >
            Loved by {stats.total}+ Customers
          </h2>
          <p
            className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Roboto', fontWeight: 300 }}
          >
            See what our happy customers have to say about their experience at Zion Cakes and Bites
          </p>
        </motion.div>

        {/* Premium Rating Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 glass p-12 md:p-16 rounded-2xl shadow-xl border border-white/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Average Rating Display */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center py-6"
            >
              <div
                className="text-7xl font-black text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text mb-4"
                style={{ fontFamily: 'Montserrat' }}
              >
                {stats.average}
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div key={i} whileHover={{ rotate: 20 }}>
                    <Star
                      className={`w-6 h-6 ${
                        i < Math.round(stats.average)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-amber-300'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <p
                className="text-stone-600 font-bold tracking-wide"
                style={{ fontFamily: 'Montserrat' }}
              >
                AVERAGE RATING
              </p>
            </motion.div>

            {/* Premium Rating Distribution */}
            <div className="space-y-5">
              {[5, 4, 3, 2, 1].map((rating, idx) => {
                const count = stats.distribution[rating as keyof typeof stats.distribution];
                const percentage = (count / stats.total) * 100;
                return (
                  <motion.div
                    key={rating}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="flex items-center gap-4"
                  >
                    <span
                      className="text-sm font-bold text-stone-700 w-12"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {rating}⭐
                    </span>
                    <div className="flex-1 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full h-3 overflow-hidden shadow-md">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 h-full shadow-lg"
                      />
                    </div>
                    <span
                      className="text-sm font-bold text-stone-700 w-10 text-right"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {count}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Premium Top Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {topReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className="relative bg-gradient-to-br from-white to-amber-50 border border-amber-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Animated background accent */}
                <motion.div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-yellow-400/0 group-hover:from-orange-400/5 group-hover:to-yellow-400/5 transition-all duration-500" />

                {/* Quote Icon */}
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                  <Quote className="w-10 h-10 text-yellow-300 mb-4" />
                </motion.div>

                {/* Star Rating */}
                <div className="flex gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div key={i} whileHover={{ rotate: 20, scale: 1.1 }}>
                      <Star
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-amber-200'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Review Text */}
                <p
                  className="text-stone-700 text-base mb-6 leading-relaxed relative z-10"
                  style={{ fontFamily: 'Roboto', fontWeight: 400 }}
                >
                  "{review.text}"
                </p>

                {/* Premium Author Section */}
                <div className="pt-6 border-t border-amber-200 relative z-10">
                  <p
                    className="font-bold text-stone-900"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    {review.author}
                  </p>
                  <p
                    className="text-xs text-stone-500 mt-2 tracking-wide"
                    style={{ fontFamily: 'Roboto' }}
                  >
                    {new Date(review.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium View All Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
            <Link
              href="/reviews"
              className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300"
              style={{ fontFamily: 'Montserrat', letterSpacing: '0.5px' }}
            >
              READ ALL REVIEWS
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

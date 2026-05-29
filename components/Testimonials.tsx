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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
            Loved by {stats.total}+ Customers
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            See what our happy customers have to say about their experience at Zion Cakes and Bites
          </p>
        </motion.div>

        {/* Rating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 glass p-8 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-6xl font-bold text-gradient mb-2">{stats.average}</div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(stats.average)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-amber-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-stone-600 font-medium">Average Rating</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats.distribution[rating as keyof typeof stats.distribution];
                const percentage = (count / stats.total) * 100;
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-stone-600 w-12">
                      {rating}⭐
                    </span>
                    <div className="flex-1 bg-amber-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full"
                      />
                    </div>
                    <span className="text-sm text-stone-600 w-8 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Top Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="card-premium relative"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-yellow-300 mb-3" />

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-stone-700 text-sm mb-4 leading-relaxed">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-amber-300">
                <p className="font-semibold text-stone-900">{review.author}</p>
                <p className="text-xs text-stone-600 mt-1">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/reviews"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            Read All Reviews
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

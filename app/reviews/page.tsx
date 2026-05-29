'use client';

import { Metadata } from 'next';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  reviews,
  getRatingStats,
  getRecentReviews,
  getReviewsByRating,
  getTagStats,
  Review,
} from '@/lib/reviews';
import ReviewCard from '@/components/ReviewCard';
import ReviewFilters from '@/components/ReviewFilters';
import { Star, MessageSquare } from 'lucide-react';

export default function ReviewsPage() {
  const stats = getRatingStats();
  const tagStats = getTagStats();

  const [activeSort, setActiveSort] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [activeRating, setActiveRating] = useState<'all' | 1 | 2 | 3 | 4 | 5>('all');

  const filteredReviews = useMemo(() => {
    let filtered = reviews;

    // Filter by rating
    if (activeRating !== 'all') {
      filtered = getReviewsByRating(activeRating);
    }

    // Sort
    if (activeSort === 'recent') {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (activeSort === 'highest') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (activeSort === 'lowest') {
      filtered = [...filtered].sort((a, b) => a.rating - b.rating);
    }

    return filtered;
  }, [activeSort, activeRating]);

  return (
    <div className="pt-20 pb-16 bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="container-premium">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-4">
            Customer Reviews
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            See what our valued customers say about their experience at Zion Cakes and Bites
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 glass p-8 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Average Rating */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-5xl font-bold text-gradient mb-2">{stats.average}</div>
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

            {/* Total Reviews */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-5xl font-bold text-gradient mb-2">{stats.total}</div>
              <MessageSquare className="w-6 h-6 text-orange-600 mb-2" />
              <p className="text-stone-600 font-medium">Total Reviews</p>
            </div>

            {/* Verified Reviews */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-5xl font-bold text-gradient mb-2">
                {reviews.filter((r) => r.verified).length}
              </div>
              <p className="text-stone-600 font-medium mb-1">Verified Reviews</p>
              <p className="text-sm text-stone-500">
                {Math.round(
                  (reviews.filter((r) => r.verified).length / stats.total) * 100
                )}
                % verified
              </p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="mt-8 pt-8 border-t border-amber-300">
            <h3 className="font-semibold text-stone-900 mb-4">Rating Distribution</h3>
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
                        animate={{ width: `${percentage}%` }}
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

        {/* Popular Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="font-semibold text-stone-900 mb-4 text-lg">Popular Topics</h3>
          <div className="flex flex-wrap gap-2">
            {tagStats.slice(0, 8).map((stat) => (
              <div
                key={stat.tag}
                className="px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full text-stone-700 font-medium text-sm"
              >
                {stat.tag}
                <span className="ml-2 text-orange-600">({stat.count})</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <ReviewFilters
          activeSort={activeSort}
          activeRating={activeRating}
          onSortChange={setActiveSort}
          onRatingChange={setActiveRating}
        />

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, idx) => (
              <ReviewCard key={review.id} review={review} index={idx} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-stone-600 text-lg">
                No reviews found with the selected filters.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

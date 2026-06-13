

import { motion } from 'framer-motion';
import { Star, Calendar } from 'lucide-react';
import { Review } from '@/services/reviews';

interface ReviewCardProps {
  review: Review;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-premium hover:scale-100"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-serif font-bold text-stone-900 text-lg">{review.author}</h3>
          <p className="text-sm text-stone-600 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(review.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
        {review.verified && (
          <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            ✓ Verified
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-amber-300'
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-stone-700 mb-4 leading-relaxed">
        {review.text}
      </p>

      {/* Tags */}
      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-amber-200">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

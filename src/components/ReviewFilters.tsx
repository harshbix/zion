

import { motion } from 'framer-motion';
import { Star, Filter } from 'lucide-react';

interface ReviewFiltersProps {
  activeSort: 'recent' | 'highest' | 'lowest';
  activeRating: 'all' | 1 | 2 | 3 | 4 | 5;
  onSortChange: (sort: 'recent' | 'highest' | 'lowest') => void;
  onRatingChange: (rating: 'all' | 1 | 2 | 3 | 4 | 5) => void;
}

export default function ReviewFilters({
  activeSort,
  activeRating,
  onSortChange,
  onRatingChange,
}: ReviewFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
    >
      {/* Sort */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 mb-3">
          <Filter className="w-4 h-4" />
          Sort By
        </label>
        <div className="flex gap-3">
          {[
            { value: 'recent', label: 'Most Recent' },
            { value: 'highest', label: 'Highest Rating' },
            { value: 'lowest', label: 'Lowest Rating' },
          ].map((sort) => (
            <button
              key={sort.value}
              onClick={() => onSortChange(sort.value as 'recent' | 'highest' | 'lowest')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                activeSort === sort.value
                  ? 'bg-orange-500 text-white shadow-glow'
                  : 'bg-amber-200 text-stone-700 hover:bg-amber-300'
              }`}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 mb-3">
          <Star className="w-4 h-4" />
          Filter by Rating
        </label>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => onRatingChange('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
              activeRating === 'all'
                ? 'bg-stone-700 text-white'
                : 'bg-amber-200 text-stone-700 hover:bg-amber-300'
            }`}
          >
            All Reviews
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingChange(rating as 1 | 2 | 3 | 4 | 5)}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm flex items-center gap-1 ${
                activeRating === rating
                  ? 'bg-yellow-400 text-stone-900'
                  : 'bg-amber-200 text-stone-700 hover:bg-amber-300'
              }`}
            >
              {rating}
              <Star className="w-3 h-3 fill-current" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

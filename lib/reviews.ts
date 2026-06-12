export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  tags?: string[];
  verified?: boolean;
};

export let reviews: Review[] = [
  {
    id: 'r1',
    author: 'Grace Mbeya',
    rating: 5,
    date: '2024-05-28',
    text: 'Absolutely incredible cakes! The chocolate dream cake is to die for. Fresh ingredients, exceptional quality, and the prices are so fair. The atmosphere is welcoming and the staff is incredibly friendly. This is my new favorite place in Mbeya!',
    tags: ['food quality', 'cakes', 'atmosphere', 'affordability'],
    verified: true,
  },
  {
    id: 'r2',
    author: 'James Kipchoge',
    rating: 4,
    date: '2024-05-25',
    text: 'Great food and amazing juices! The service was a bit slow during lunch rush, but the quality made up for it. The grilled chicken is tender and flavorful. Will definitely come back.',
    tags: ['food quality', 'juices', 'service delay', 'grilled chicken'],
    verified: true,
  },
  {
    id: 'r3',
    author: 'Amara Hassan',
    rating: 5,
    date: '2024-05-22',
    text: 'The Mango Sunrise juice is perfection! Fresh, not too sweet, exactly what I need in the morning. The pastries are also top-notch. Highly recommend for breakfast or lunch.',
    tags: ['juices', 'fresh', 'breakfast', 'pastries'],
    verified: true,
  },
  {
    id: 'r4',
    author: 'David Moshi',
    rating: 4,
    date: '2024-05-20',
    text: 'Solid experience. The vanilla cake is creamy and well-balanced. Food is quality and reasonably priced. One time the wait was longer than expected, but it\'s worth the wait.',
    tags: ['cakes', 'affordability', 'service delay', 'reasonable prices'],
    verified: true,
  },
  {
    id: 'r5',
    author: 'Zainab Mbeya',
    rating: 5,
    date: '2024-05-18',
    text: 'The Beef Nyama Choma is absolutely perfect. Grilled to perfection with amazing flavor. The atmosphere is so comfortable and the staff remembers regular customers. Zion is truly a gem!',
    tags: ['grilled meat', 'atmosphere', 'customer service', 'premium'],
    verified: true,
  },
  {
    id: 'r6',
    author: 'Peter Kariuki',
    rating: 4,
    date: '2024-05-15',
    text: 'Great place for a meal. Food quality is excellent and prices are fair. The samosas are crispy and delicious. Service can be slow during peak hours, but management is working on it.',
    tags: ['food quality', 'affordable', 'snacks', 'service improvement'],
    verified: true,
  },
  {
    id: 'r7',
    author: 'Sophia Njiwa',
    rating: 5,
    date: '2024-05-12',
    text: 'This is hands down the best bakery in Mbeya. The Red Velvet cake is gorgeous and tastes even better. Every time I come here, I leave happy. Highly recommended!',
    tags: ['bakery', 'cakes', 'presentation', 'favorite'],
    verified: true,
  },
  {
    id: 'r8',
    author: 'Marcus Wilson',
    rating: 4,
    date: '2024-05-10',
    text: 'Very impressed with the menu variety and quality. The chicken biryani is fragrant and well-cooked. A couple of times the order took longer than expected, but the food arrived perfect.',
    tags: ['menu variety', 'chicken', 'wait time', 'quality'],
    verified: true,
  },
  {
    id: 'r9',
    author: 'Faith Nkomo',
    rating: 5,
    date: '2024-05-08',
    text: 'The Spinach Pastry is my go-to snack! Fresh, healthy, and delicious. The Green Vitality smoothie keeps me energized all day. This place is my wellness destination in Mbeya.',
    tags: ['healthy', 'snacks', 'smoothies', 'energizing'],
    verified: true,
  },
  {
    id: 'r10',
    author: 'Robert Mapunda',
    rating: 5,
    date: '2024-05-05',
    text: 'Outstanding service today! Staff is courteous and knowledgeable about the menu. The fish fillet was fresh and perfectly prepared. Zion Cakes is setting the bar high for restaurants in Mbeya.',
    tags: ['service', 'fish', 'fresh', 'professional'],
    verified: true,
  },
  {
    id: 'r11',
    author: 'Linda Mutua',
    rating: 4,
    date: '2024-05-01',
    text: 'Love the atmosphere and the people here. Food is consistently good. Had a slightly longer wait on one visit during evening rush, but overall it\'s a great spot.',
    tags: ['atmosphere', 'community', 'consistent', 'service speed'],
    verified: true,
  },
  {
    id: 'r12',
    author: 'George Kiplagat',
    rating: 5,
    date: '2024-04-28',
    text: 'The chocolate croissant is my new addiction! Buttery, flaky, and perfectly balanced chocolate inside. The team here really knows what they\'re doing. Prices are amazing too.',
    tags: ['pastry', 'chocolate', 'affordability', 'quality'],
    verified: true,
  },
];

if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('zion_reviews');
  if (stored) {
    try {
      reviews = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse zion_reviews', e);
    }
  }
}

export function getRatingStats() {
  const stats = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    stats[review.rating as keyof typeof stats]++;
  });

  const total = reviews.length;
  const average =
    Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / total) * 10) / 10;

  return {
    average,
    total,
    distribution: stats,
  };
}

export function getTopReviews(count = 3): Review[] {
  return reviews.filter((r) => r.rating === 5).slice(0, count);
}

export function getRecentReviews(count = 5): Review[] {
  return [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);
}

export function getReviewsByRating(rating: number): Review[] {
  return reviews.filter((r) => r.rating === rating);
}

export function getTagStats() {
  const tagCount: Record<string, number> = {};

  reviews.forEach((review) => {
    review.tags?.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

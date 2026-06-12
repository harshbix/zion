export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'mbeya-volcanic-flavors',
    title: 'The Volcanic Flavors of Southern Tanzania',
    excerpt: 'How the high-altitude, fertile volcanic soil surrounding Mount Rungwe shapes the distinct taste profile of Mbeya mangoes and vanilla beans.',
    image: 'https://images.unsplash.com/photo-1546173152-fd1adac65050?w=600&h=400&fit=crop',
    date: 'June 10, 2026',
    readTime: '4 min read',
    category: 'Sourcing',
  },
  {
    slug: 'science-of-cold-fermentation',
    title: 'The Science of Sourdough & Cold Fermentation',
    excerpt: 'Why unhurried cold-fermentation is the secret to developing premium croissant crusts and highly digestible organic bread rolls.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
    date: 'June 01, 2026',
    readTime: '6 min read',
    category: 'Technique',
  },
  {
    slug: 'perfect-red-velvet-crumb',
    title: 'Red Velvet Elegance: Achieving the Fluffiest Crumb',
    excerpt: 'Exploring the chemical balance of cocoa acidity and cream cheese frosting density that makes our signature Red Velvet legendary.',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&h=400&fit=crop',
    date: 'May 22, 2026',
    readTime: '5 min read',
    category: 'Recipes',
  },
];

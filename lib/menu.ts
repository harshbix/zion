export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price?: string;
  category: 'cakes' | 'juices' | 'meals' | 'snacks';
  image?: string;
  featured?: boolean;
  tags?: string[];
};

export const menuItems: MenuItem[] = [
  // CAKES
  {
    id: 'c1',
    name: 'Chocolate Dream Cake',
    description: 'Rich, moist chocolate cake with premium cocoa ganache and smooth frosting',
    price: '45,000 TZS',
    category: 'cakes',
    featured: true,
    tags: ['signature', 'chocolate', 'premium'],
  },
  {
    id: 'c2',
    name: 'Vanilla Cloud Cake',
    description: 'Light, fluffy vanilla cake with fresh cream and berry toppings',
    price: '40,000 TZS',
    category: 'cakes',
    tags: ['classic', 'fresh', 'popular'],
  },
  {
    id: 'c3',
    name: 'Red Velvet Elegance',
    description: 'Velvety red velvet cake with cream cheese frosting',
    price: '50,000 TZS',
    category: 'cakes',
    featured: true,
    tags: ['elegant', 'premium', 'special'],
  },
  {
    id: 'c4',
    name: 'Carrot Cake Delight',
    description: 'Moist carrot cake with cream cheese frosting and crushed pistachios',
    price: '42,000 TZS',
    category: 'cakes',
    tags: ['healthy', 'classic', 'favorite'],
  },
  {
    id: 'c5',
    name: 'Strawberry Paradise',
    description: 'Fresh strawberry layers with whipped cream and white chocolate shavings',
    price: '48,000 TZS',
    category: 'cakes',
    featured: true,
    tags: ['fresh', 'fruity', 'seasonal'],
  },
  {
    id: 'c6',
    name: 'Lemon Zest Cake',
    description: 'Tangy lemon cake with citrus glaze and candied lemon peel',
    price: '38,000 TZS',
    category: 'cakes',
    tags: ['fresh', 'citrus', 'light'],
  },

  // JUICES
  {
    id: 'j1',
    name: 'Mango Sunrise',
    description: 'Fresh mango juice with a hint of passion fruit and natural sweetness',
    price: '8,000 TZS',
    category: 'juices',
    featured: true,
    tags: ['tropical', 'fresh', 'signature'],
  },
  {
    id: 'j2',
    name: 'Green Vitality Smoothie',
    description: 'Spinach, apple, ginger, and lime for a healthy boost',
    price: '10,000 TZS',
    category: 'juices',
    tags: ['healthy', 'green', 'energizing'],
  },
  {
    id: 'j3',
    name: 'Berry Blast',
    description: 'Mixed berries with strawberry and blueberry goodness',
    price: '9,000 TZS',
    category: 'juices',
    featured: true,
    tags: ['fruity', 'antioxidants', 'popular'],
  },
  {
    id: 'j4',
    name: 'Watermelon Refresh',
    description: 'Refreshing watermelon juice with mint and lime',
    price: '7,000 TZS',
    category: 'juices',
    tags: ['refreshing', 'seasonal', 'light'],
  },
  {
    id: 'j5',
    name: 'Pineapple Paradise',
    description: 'Fresh pineapple juice with coconut milk and ginger',
    price: '9,000 TZS',
    category: 'juices',
    tags: ['tropical', 'coconut', 'exotic'],
  },
  {
    id: 'j6',
    name: 'Orange Citrus Blend',
    description: 'Fresh orange juice with lemon and natural honey',
    price: '6,000 TZS',
    category: 'juices',
    tags: ['citrus', 'vitamin C', 'classic'],
  },

  // MEALS
  {
    id: 'm1',
    name: 'Grilled Chicken Perfection',
    description: 'Succulent grilled chicken with aromatic spices, served with rice and vegetables',
    price: '35,000 TZS',
    category: 'meals',
    featured: true,
    tags: ['grilled', 'protein', 'signature'],
  },
  {
    id: 'm2',
    name: 'Tanzanian Ugali & Stew',
    description: 'Traditional ugali with rich vegetable or meat stew',
    price: '18,000 TZS',
    category: 'meals',
    tags: ['traditional', 'local', 'comfort food'],
  },
  {
    id: 'm3',
    name: 'Sukuma Wiki Plate',
    description: 'Sautéed greens with beans and corn, served with chapati',
    price: '15,000 TZS',
    category: 'meals',
    tags: ['vegetarian', 'local', 'healthy'],
  },
  {
    id: 'm4',
    name: 'Chicken Biryani Special',
    description: 'Fragrant basmati rice with tender chicken and aromatic spices',
    price: '32,000 TZS',
    category: 'meals',
    featured: true,
    tags: ['rice', 'chicken', 'aromatic'],
  },
  {
    id: 'm5',
    name: 'Beef Nyama Choma',
    description: 'Perfectly grilled beef chunks with tangy lime and chili sauce',
    price: '38,000 TZS',
    category: 'meals',
    featured: true,
    tags: ['grilled', 'beef', 'premium'],
  },
  {
    id: 'm6',
    name: 'Fish Fillet Delight',
    description: 'Fresh fish fillet with lemon butter sauce and seasonal vegetables',
    price: '36,000 TZS',
    category: 'meals',
    tags: ['seafood', 'fresh', 'light'],
  },

  // SNACKS
  {
    id: 's1',
    name: 'Samosa Trio',
    description: 'Golden crispy samosas filled with vegetables and spiced meat',
    price: '12,000 TZS',
    category: 'snacks',
    featured: true,
    tags: ['crispy', 'traditional', 'popular'],
  },
  {
    id: 's2',
    name: 'Cheese Bread Rolls',
    description: 'Soft bread rolls filled with melted cheese and herbs',
    price: '10,000 TZS',
    category: 'snacks',
    tags: ['bread', 'cheese', 'savory'],
  },
  {
    id: 's3',
    name: 'Chocolate Croissant',
    description: 'Buttery croissant with premium dark chocolate filling',
    price: '8,000 TZS',
    category: 'snacks',
    featured: true,
    tags: ['pastry', 'chocolate', 'breakfast'],
  },
  {
    id: 's4',
    name: 'Vegetable Spring Rolls',
    description: 'Crispy rolls filled with fresh vegetables and served with sweet chili sauce',
    price: '11,000 TZS',
    category: 'snacks',
    tags: ['vegetarian', 'crispy', 'light'],
  },
  {
    id: 's5',
    name: 'Mandazi Sweet Treats',
    description: 'Traditional fried dough pastries dusted with sugar',
    price: '5,000 TZS',
    category: 'snacks',
    tags: ['traditional', 'sweet', 'classic'],
  },
  {
    id: 's6',
    name: 'Spinach Pastry',
    description: 'Flaky pastry layered with spinach, feta, and herbs',
    price: '9,000 TZS',
    category: 'snacks',
    tags: ['vegetarian', 'pastry', 'healthy'],
  },
];

export const categories = [
  { id: 'cakes', label: 'Cakes', icon: '🎂' },
  { id: 'juices', label: 'Juices', icon: '🥤' },
  { id: 'meals', label: 'Meals', icon: '🍗' },
  { id: 'snacks', label: 'Snacks', icon: '🍪' },
];

export function getMenuByCategory(category: string): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}

export function getFeaturedItems(): MenuItem[] {
  return menuItems.filter((item) => item.featured);
}

export let businessData = {
  name: 'Zion Cakes and Bites',
  tagline: 'Freshly Baked. Locally Loved. Crafted in Mbeya.',
  location: {
    city: 'Mbeya',
    region: 'Tanzania',
    landmark: 'Near Mbeya Referral Hospital, Forest Area',
    address: 'Mbeya CBD, Forest Area, Tanzania',
    lat: -8.9119495,
    lng: 33.4468727,
  },
  contact: {
    phone: '+255 789 123 456',
    phoneLink: 'tel:+255789123456',
    whatsapp: '+255789123456',
    whatsappLink: 'https://wa.me/255789123456',
    email: 'info@zioncakes.co.tz',
  },
  rating: {
    average: 4.0,
    total: 82,
  },
  services: [
    'Freshly Baked Cakes',
    'Premium Juices',
    'Grilled Chicken',
    'Local Tanzanian Cuisine',
    'Catering Services',
    'Special Orders',
  ],
  hours: {
    monday: '8:00 AM - 10:00 PM',
    tuesday: '8:00 AM - 10:00 PM',
    wednesday: '8:00 AM - 10:00 PM',
    thursday: '8:00 AM - 10:00 PM',
    friday: '8:00 AM - 11:00 PM',
    saturday: '9:00 AM - 11:00 PM',
    sunday: '10:00 AM - 9:00 PM',
  },
  description:
    'Zion Cakes and Bites is a premium bakery and restaurant in Mbeya, Tanzania. We specialize in freshly baked cakes, juices, grilled chicken, and authentic local Tanzanian cuisine. Our commitment to quality, affordability, and exceptional service makes us your favorite local destination.',
};

export let heroContent = {
  headline: 'Freshly Baked. Locally Loved. Crafted in Mbeya.',
  subheadline: 'Premium cakes, juices, and local flavors in the heart of Mbeya',
  ctaPrimary: 'View Menu',
  ctaSecondary: 'Order Now',
};

export let aboutContent = {
  title: 'About Zion Cakes and Bites',
  sections: [
    {
      title: 'Our Story',
      content:
        'Since our opening, Zion Cakes and Bites has been dedicated to bringing the finest baked goods and culinary experiences to Mbeya. We combine traditional Tanzanian flavors with modern culinary techniques to create memorable experiences.',
    },
    {
      title: 'Our Commitment',
      content:
        'We commit to using only the freshest ingredients, maintaining exceptional service standards, and creating a welcoming atmosphere for every guest. Our team works tirelessly to ensure every visit exceeds your expectations.',
    },
    {
      title: 'Quality & Affordability',
      content:
        'We believe premium doesn\'t have to be expensive. Our pricing reflects our dedication to serving the community while maintaining the highest quality standards in every bite.',
    },
  ],
  values: [
    { title: 'Fresh Ingredients', description: 'Sourced daily for peak quality' },
    { title: 'Local Pride', description: 'Supporting Mbeya community' },
    { title: 'Passion', description: 'Crafted with love in every item' },
    { title: 'Excellence', description: 'Premium experience, friendly prices' },
  ],
};

export const keywords = [
  'bakery Mbeya',
  'cakes Tanzania',
  'restaurant Mbeya',
  'local cuisine',
  'catering services',
  'juice bar',
  'grilled chicken',
  'premium bakery',
];

if (typeof window !== 'undefined') {
  const storedData = localStorage.getItem('zion_business_data');
  if (storedData) {
    try {
      businessData = JSON.parse(storedData);
    } catch (e) {
      console.error('Failed to parse zion_business_data', e);
    }
  }

  const storedHero = localStorage.getItem('zion_hero_content');
  if (storedHero) {
    try {
      heroContent = JSON.parse(storedHero);
    } catch (e) {
      console.error('Failed to parse zion_hero_content', e);
    }
  }

  const storedAbout = localStorage.getItem('zion_about_content');
  if (storedAbout) {
    try {
      aboutContent = JSON.parse(storedAbout);
    } catch (e) {
      console.error('Failed to parse zion_about_content', e);
    }
  }
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu Categories — Cakes, Juices, Meals & Snacks',
  description:
    'Explore all categories at Zion Cakes & Bites. Artisan cakes, cold-pressed juices, gourmet meals, and fresh pastry snacks — baked daily in Mbeya.',
  alternates: { canonical: 'https://zioncakesandbites.co.tz/categories' },
  openGraph: {
    title: 'Menu Categories | Zion Cakes & Bites',
    description: 'Explore cakes, juices, meals, and snacks at Zion Cakes & Bites, Mbeya.',
    url: 'https://zioncakesandbites.co.tz/categories',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Zion Menu Categories' }],
  },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

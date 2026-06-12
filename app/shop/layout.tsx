import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop — The Zion Catalog',
  description:
    'Browse our full artisan catalog. Freshly baked cakes, cold-pressed juices, grilled meals and handcrafted snacks — made daily in Mbeya.',
  alternates: { canonical: 'https://zioncakesandbites.co.tz/shop' },
  openGraph: {
    title: 'Shop — The Zion Catalog',
    description: 'Browse our full artisan catalog of premium cakes, juices, meals and snacks.',
    url: 'https://zioncakesandbites.co.tz/shop',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Zion Shop' }],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

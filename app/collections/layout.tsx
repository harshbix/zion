import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gourmet Collections — Curated Hampers',
  description:
    'Shop Zion Cakes & Bites curated gourmet hampers — The Celebration Hamper, Southern Highlands Breakfast Box, and the Executive Sharing Platter.',
  alternates: { canonical: 'https://zioncakesandbites.co.tz/collections' },
  openGraph: {
    title: 'Gourmet Collections | Zion Cakes & Bites',
    description: 'Curated gourmet hampers combining our best sellers for events and celebrations.',
    url: 'https://zioncakesandbites.co.tz/collections',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Zion Gourmet Collections' }],
  },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

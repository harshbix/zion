import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zion Journal — Baking Stories & Craft Guides',
  description:
    'Read stories on culinary science, artisan baking techniques, volcanic soil sourcing, and the heritage behind Zion Cakes & Bites favourites.',
  alternates: { canonical: 'https://zioncakesandbites.co.tz/blog' },
  openGraph: {
    title: 'Zion Journal',
    description: 'Stories on culinary science, baking craft, and Mbeya heritage.',
    url: 'https://zioncakesandbites.co.tz/blog',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Zion Journal' }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

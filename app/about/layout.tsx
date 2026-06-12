import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Our Story & Heritage',
  description:
    'Discover the Zion Cakes & Bites story. A Mbeya bakery rooted in honest ingredients, fresh sourcing, and artisan craftsmanship since 2022.',
  alternates: { canonical: 'https://zioncakesandbites.co.tz/about' },
  openGraph: {
    title: 'About Zion Cakes & Bites',
    description:
      'Discover the Zion story — a Mbeya bakery built on fresh ingredients and unhurried craftsmanship.',
    url: 'https://zioncakesandbites.co.tz/about',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'About Zion' }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

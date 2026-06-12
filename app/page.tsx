import HomePageClient from './home-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zion | Premium Cakes and Bites in Mbeya',
  description:
    'Minimal, premium cakes and bites crafted for quick browsing and effortless ordering in Mbeya.',
  alternates: { canonical: 'https://zioncakesandbites.co.tz' },
  openGraph: {
    title: 'Zion | Premium Cakes and Bites in Mbeya',
    description:
      'Minimal, premium cakes and bites crafted for quick browsing and effortless ordering in Mbeya.',
    url: 'https://zioncakesandbites.co.tz',
    siteName: 'Zion Cakes & Bites',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Zion Cakes and Bites' }],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}

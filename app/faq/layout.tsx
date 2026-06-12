import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description:
    'Answers to your top questions about ordering, custom cakes, Mbeya delivery, ingredients, allergens, and payment options at Zion Cakes & Bites.',
  alternates: { canonical: 'https://zioncakesandbites.co.tz/faq' },
  openGraph: {
    title: 'FAQ | Zion Cakes & Bites',
    description: 'Your top questions about ordering, delivery and ingredients answered.',
    url: 'https://zioncakesandbites.co.tz/faq',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Zion FAQ' }],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

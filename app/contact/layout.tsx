import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Send Us an Inquiry',
  description:
    'Get in touch with Zion Cakes & Bites. Custom wedding cakes, corporate catering, and delivery questions answered fast — Mbeya, Tanzania.',
  alternates: { canonical: 'https://zioncakesandbites.co.tz/contact' },
  openGraph: {
    title: 'Contact Zion Cakes & Bites',
    description: 'Custom orders, catering inquiries and delivery questions — Mbeya, Tanzania.',
    url: 'https://zioncakesandbites.co.tz/contact',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Contact Zion' }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

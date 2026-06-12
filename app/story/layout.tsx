import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story — How a Zion Moment is Baked',
  description:
    'Read the three-chapter craft narrative behind Zion Cakes & Bites: volcanic soil sourcing, unhurried cold-fermented doughs, and precision finishing.',
  alternates: { canonical: 'https://zioncakesandbites.co.tz/story' },
  openGraph: {
    title: 'Our Story | Zion Cakes & Bites',
    description: 'Volcanic sourcing, cold fermentation, and precision finishing — the Zion craft story.',
    url: 'https://zioncakesandbites.co.tz/story',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Zion Craft Story' }],
  },
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';
import HeroSectionNew from '@/components/HeroSectionNew';
import AboutSectionNew from '@/components/AboutSectionNew';
import FeaturedProductsNew from '@/components/FeaturedProductsNew';
import GallerySectionNew from '@/components/GallerySectionNew';
import CTASection from '@/components/CTASection';
import LocationMap from '@/components/LocationMap';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Zion Cakes & Bites | Premium Bakery in Mbeya',
  description: 'Discover artisan-baked excellence with fresh, handcrafted cakes, pastries, and authentic Tanzanian dishes at Zion Cakes & Bites in Mbeya.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zioncakesandbites.com',
    title: 'Zion Cakes & Bites | Premium Bakery in Mbeya',
    description: 'Discover artisan-baked excellence with fresh, handcrafted cakes, pastries, and authentic Tanzanian dishes.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Zion Cakes & Bites',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSectionNew />
      <AboutSectionNew />
      <FeaturedProductsNew />
      <GallerySectionNew />
      <LocationMap />
      <CTASection />
      <Footer />
    </>
  );
}

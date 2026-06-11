import { Metadata } from 'next';
import HeroSectionCinematic from '@/components/HeroSectionCinematic';
import BrandStorySection from '@/components/BrandStorySection';
import SignatureProductsSection from '@/components/SignatureProductsSection';
import TrustSection from '@/components/TrustSection';
import LocationSection from '@/components/LocationSection';
import FinalCTASection from '@/components/FinalCTASection';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Zion Cakes & Bites | Premium Bakery in Mbeya, Tanzania',
  description:
    'Freshly baked, premium cakes and pastries in Mbeya. Order on WhatsApp for instant delivery. Handcrafted with care, made fresh daily.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zioncakesandbites.com',
    title: 'Zion Cakes & Bites | Premium Bakery in Mbeya',
    description:
      'Freshly baked, premium cakes and pastries in Mbeya. Order on WhatsApp for instant delivery.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Zion Cakes & Bites Premium Bakery',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      {/* Story Flow */}
      <HeroSectionCinematic />
      <BrandStorySection />
      <SignatureProductsSection />
      <TrustSection />
      <LocationSection />
      <FinalCTASection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button - visible on all pages */}
      <FloatingWhatsAppButton />
    </>
  );
}

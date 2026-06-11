import HeroSectionCinematic from '@/components/HeroSectionCinematic';
import BrandStorySection from '@/components/BrandStorySection';
import SignatureProductsSection from '@/components/SignatureProductsSection';
import TrustSection from '@/components/TrustSection';
import LocationSection from '@/components/LocationSection';
import FinalCTASection from '@/components/FinalCTASection';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Story-Driven Cinematic Experience */}
      <HeroSectionCinematic />
      <BrandStorySection />
      <SignatureProductsSection />
      <TrustSection />
      <LocationSection />
      <FinalCTASection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />
    </>
  );
}

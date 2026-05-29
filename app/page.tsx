import HeroSectionNew from '@/components/HeroSectionNew';
import AboutSectionNew from '@/components/AboutSectionNew';
import FeaturedProductsNew from '@/components/FeaturedProductsNew';
import GallerySectionNew from '@/components/GallerySectionNew';
import LocationMap from '@/components/LocationMap';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
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

import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MenuShowcase from '@/components/MenuShowcase';
import Testimonials from '@/components/Testimonials';
import LocationMap from '@/components/LocationMap';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MenuShowcase />
      <Testimonials />
      <LocationMap />
      <CTASection />
    </>
  );
}

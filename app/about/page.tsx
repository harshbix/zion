import { Metadata } from 'next';
import { motion } from 'framer-motion';
import AboutSection from '@/components/AboutSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'About | Zion Cakes and Bites',
  description: 'Learn about Zion Cakes and Bites, our story, values, and commitment to quality in Mbeya, Tanzania.',
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutSection />
      <CTASection />
    </div>
  );
}

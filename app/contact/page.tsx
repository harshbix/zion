import { Metadata } from 'next';
import { motion } from 'framer-motion';
import LocationMap from '@/components/LocationMap';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Contact | Zion Cakes and Bites',
  description: 'Get in touch with Zion Cakes and Bites in Mbeya, Tanzania. Find our location, phone number, and contact information.',
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <LocationMap />
      <CTASection />
    </div>
  );
}

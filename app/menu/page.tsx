import { Metadata } from 'next';
import MenuGrid from '@/components/MenuGrid';

export const metadata: Metadata = {
  title: 'Menu | Zion Cakes and Bites',
  description: 'Explore our premium menu of cakes, juices, grilled chicken, and local Tanzanian cuisine.',
};

export default function MenuPage() {
  return (
    <div className="pt-20 pb-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container-premium">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Browse our carefully curated selection of freshly baked cakes, juices, and local
            Tanzanian dishes
          </p>
        </div>

        {/* Menu Grid */}
        <MenuGrid />
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { formatCurrency } from '@/lib/utils';
import { Gift, Sparkles, Check } from 'lucide-react';

export default function CollectionsPage() {
  const { addToCart } = useCart();

  const collectionsList = [
    {
      id: 'col1',
      name: 'The Celebration Hamper',
      price: 65000,
      priceString: '65,000 TZS',
      description: 'The ultimate set for family milestones, anniversaries, or office events.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=800&fit=crop',
      contents: [
        'Signature Chocolate Dream Cake (8-inch)',
        'Samosa Trio Plate (Beef & Coriander)',
        'Traditional Cardamom Mandazi Sweet Pack',
      ],
      tag: 'BEST SELLER',
    },
    {
      id: 'col2',
      name: 'Southern Highlands Breakfast Box',
      price: 30000,
      priceString: '30,000 TZS',
      description: 'A morning treat basket featuring fresh-baked flaky pastries and cold-pressed juice.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=800&fit=crop',
      contents: [
        '4x Flaky Butter Chocolate Croissants',
        '6x Traditional Air-Fried Mandazi Pastries',
        '1x Large Bottle of Mango Sunrise Juice',
      ],
      tag: 'MORNING FRESH',
    },
    {
      id: 'col3',
      name: 'The Executive Sharing Platter',
      price: 85000,
      priceString: '85,000 TZS',
      description: 'A premium combination of our top gourmet meals, designed for group dinners or luncheons.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=800&fit=crop',
      contents: [
        'Grilled Chicken Perfection Platter',
        'Coals-Seared Acacia Beef Nyama Choma',
        'Large Coconut Sukuma Wiki Sautéed Greens',
        '2x Green Vitality Ginger-Apple Smoothies',
      ],
      tag: 'GOURMET MEALSET',
    },
  ];

  const handleAddBundle = (col: typeof collectionsList[0]) => {
    addToCart({
      id: col.id,
      name: col.name,
      price: col.price,
      priceString: col.priceString,
      image: col.image,
      category: 'snacks',
      selectedSize: 'Curated Bundle',
    });
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium">
        
        {/* Page Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            CURATED SETS
          </span>
          <h1 className="font-serif-luxury text-stone-900 leading-tight">
            Gourmet Collections
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Specially designed hampers combining our best sellers. Crafted to elevate events, surprise friends, or complete shared family dinners.
          </p>
        </div>

        {/* Collections Stack */}
        <div className="space-y-16">
          {collectionsList.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="bg-white border border-stone-200 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Image box (col-span-5) */}
              <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden bg-stone-50 border border-stone-100">
                <Image src={col.image} alt={col.name} fill className="object-cover transition-transform duration-1000 hover:scale-105" />
                <span className="absolute top-4 left-4 bg-stone-950 text-white font-sans-luxury text-[8px] font-black tracking-widest uppercase px-3 py-1.5">
                  {col.tag}
                </span>
              </div>

              {/* Description box (col-span-7) */}
              <div className="lg:col-span-7 space-y-6 flex flex-col justify-between h-full py-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber-600">
                    <Gift className="w-4 h-4" />
                    <span className="font-sans-luxury text-[9px] font-bold uppercase tracking-widest">CURATED HAMPER BUNDLE</span>
                  </div>
                  <h2 className="font-serif-luxury text-stone-900 text-3xl font-bold leading-tight">
                    {col.name}
                  </h2>
                  <p className="text-stone-600 text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
                    {col.description}
                  </p>

                  {/* Bundle checklist items */}
                  <div className="pt-4 border-t border-stone-100 space-y-2.5">
                    <h4 className="font-sans-luxury text-[9px] font-bold uppercase tracking-widest text-stone-400">WHAT IS INCLUDED</h4>
                    <ul className="space-y-2">
                      {col.contents.map((item, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-3 text-xs text-stone-700" style={{ fontFamily: 'Inter' }}>
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-stone-400 font-sans-luxury text-[9px] tracking-wider uppercase block">BUNDLE SPECIAL PRICE</span>
                    <span className="font-sans-luxury text-xl font-black text-stone-950">{col.priceString}</span>
                  </div>

                  <button
                    onClick={() => handleAddBundle(col)}
                    className="bg-stone-950 hover:bg-amber-600 text-white font-sans-luxury text-[10px] font-bold uppercase tracking-widest px-8 py-4.5 transition-colors"
                  >
                    + ADD BUNDLE TO BAG
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

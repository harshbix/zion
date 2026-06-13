import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CollectionsPage() {
  const navigate = useNavigate();

  const collections = [
    {
      id: 'cakes',
      title: 'Signature Celebrations',
      desc: 'Our legendary custom-baked celebration cakes. Rich chocolates, delicate red velvets, and fluffy vanilla clouds built for your grandest moments.',
      image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&h=600&fit=crop',
      count: 'Premium Cakes',
    },
    {
      id: 'juices',
      title: 'Natural Refreshments',
      desc: 'Cold-pressed botanical juices and wellness blends sourced from organic farms at the base of Mount Rungwe.',
      image: 'https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=800&h=600&fit=crop',
      count: 'Organic Juices',
    },
    {
      id: 'meals',
      title: 'Traditional Mbeya Kitchen',
      desc: 'Char-grilled local proteins, savory slow-cooked beef stews, and traditional fine-ground Tanzanian ugali platters.',
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&h=600&fit=crop',
      count: 'Gourmet Meals',
    },
    {
      id: 'snacks',
      title: 'Golden Bakery Treats',
      desc: 'Crispy samosa trios, fresh brioche rolls, flaky chocolate croissants, and spiced mandazi bites baked fresh daily at sunrise.',
      image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&h=600&fit=crop',
      count: 'Daily Snacks',
    },
  ];

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium">
        
        {/* Page Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            THE ZION CATALOGUE
          </span>
          <h1 className="font-sans-luxury text-stone-900 leading-tight text-5xl md:text-6xl font-black">
            Curated Collections
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Browse through our masterfully assembled food collections. We specialize in high-end presentation, balanced nutrition, and exceptional local taste profiles.
          </p>
        </div>

        {/* Collections Stack */}
        <div className="space-y-16">
          {collections.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`flex flex-col ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-12 items-center bg-white border border-stone-200/50 p-6 md:p-8 hover:shadow-xl transition-all duration-500`}
            >
              {/* Image Container */}
              <div className="w-full lg:w-1/2 relative aspect-[4/3] overflow-hidden border border-stone-100">
                <img
                  src={col.image}
                  alt={col.title}
                  className="object-cover w-full h-full transition-transform duration-1000 hover:scale-103"
                />
              </div>

              {/* Text / Action Panel */}
              <div className="w-full lg:w-1/2 space-y-6">
                <span className="inline-block text-[9px] font-bold uppercase tracking-widest bg-amber-50 text-amber-800 px-3 py-1 border border-amber-100">
                  {col.count}
                </span>
                <h3 className="font-sans-luxury text-3xl font-bold text-stone-900 leading-tight">
                  {col.title}
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed" style={{ fontFamily: 'Inter' }}>
                  {col.desc}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => navigate(`/shop?category=${col.id}`)}
                    className="bg-stone-950 hover:bg-amber-600 text-white hover:text-stone-950 font-bold uppercase tracking-widest text-[9px] px-8 py-4.5 transition-all duration-300 rounded-none cursor-pointer"
                  >
                    View Selection
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

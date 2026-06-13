import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '@/services/menu';
import { motion } from 'framer-motion';

export default function CategoriesPage() {
  const navigate = useNavigate();

  const categoryImages: Record<string, string> = {
    cakes: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=800&fit=crop',
    juices: 'https://images.unsplash.com/photo-1716441392930-b4daa288266a?w=600&h=800&fit=crop',
    meals: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&h=800&fit=crop',
    snacks: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&h=800&fit=crop',
  };

  const categoryQuotes: Record<string, string> = {
    cakes: 'Luxurious layers of flavor, baked fresh for every celebration.',
    juices: '100% natural, cold-pressed tropical fruits sourced from local Mbeya fields.',
    meals: 'Authentic local Tanzanian flavors and perfectly grilled premium dishes.',
    snacks: 'Crisp, golden bakes and tasty sweet treats for anytime cravings.',
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium">
        
        {/* Page Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            OUR DEPARTMENTS
          </span>
          <h1 className="font-sans-luxury text-stone-900 leading-tight text-5xl md:text-6xl font-black">
            Taste Categories
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Explore our curated culinary segments. Every item is crafted by hand using premium, locally-sourced ingredients.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => navigate(`/shop?category=${cat.id}`)}
              className="relative aspect-[4/3] w-full overflow-hidden border border-stone-200 p-3 bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer group"
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={categoryImages[cat.id]}
                  alt={cat.label}
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Gradient tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />
                
                {/* Text Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{cat.icon}</span>
                    <h3 className="font-sans-luxury text-2xl font-bold uppercase tracking-wider">
                      {cat.label}
                    </h3>
                  </div>
                  <p className="text-[11px] text-stone-300 font-medium leading-relaxed max-w-sm" style={{ fontFamily: 'Inter' }}>
                    {categoryQuotes[cat.id]}
                  </p>
                  <div className="pt-2 text-[9px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1 group-hover:text-white transition-colors">
                    Explore Collection ➔
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

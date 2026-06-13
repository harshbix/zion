import React, { useEffect, useState } from 'react';
import { aboutContent as defaultAbout } from '@/services/data';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [about, setAbout] = useState(defaultAbout);

  useEffect(() => {
    const stored = localStorage.getItem('zion_about_content');
    if (stored) {
      try {
        setAbout(JSON.parse(stored));
      } catch (e) {
        setAbout(defaultAbout);
      }
    }
  }, []);

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium">
        
        {/* Page Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            OUR HERITAGE & VISION
          </span>
          <h1 className="font-sans-luxury text-stone-900 leading-tight text-5xl md:text-6xl font-black">
            Our Story
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Learn more about our baking philosophies, volcanic soil sourcing, and the local hands making your favorite treats.
          </p>
        </div>

        {/* Hero image showcase */}
        <div className="relative aspect-[21/9] w-full overflow-hidden border border-stone-200 p-3 bg-white mb-16">
          <img
            src="https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=1920&h=800&fit=crop"
            alt="Baking Fresh Croissants at Zion"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Story details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {about.sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white border border-stone-200/50 p-8 space-y-4"
            >
              <span className="font-mono text-amber-600 font-bold text-sm block">0{idx + 1}.</span>
              <h3 className="font-sans-luxury text-xl font-bold text-stone-900 uppercase tracking-wider">
                {section.title}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Brand Values */}
        <div className="border-t border-stone-200/60 pt-16">
          <div className="text-center max-w-lg mx-auto mb-12 space-y-3">
            <h2 className="font-sans-luxury text-3xl font-bold text-stone-950">
              Core Principles
            </h2>
            <p className="text-stone-500 text-xs" style={{ fontFamily: 'Inter' }}>
              We stick to these values in everything we bake, cook, and serve to our guest community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.values.map((val, idx) => (
              <div key={idx} className="text-center space-y-2">
                <span className="inline-block p-4 bg-amber-50 border border-amber-100 rounded-full text-lg mb-2">
                  ✨
                </span>
                <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-wider text-stone-900">
                  {val.title}
                </h4>
                <p className="text-stone-500 text-[11px] leading-relaxed" style={{ fontFamily: 'Inter' }}>
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

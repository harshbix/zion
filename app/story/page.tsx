'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function StoryPage() {
  const storyChapters = [
    {
      label: 'CHAPTER I',
      title: 'Volcanic Soil Sourcing',
      desc: 'The rich highlands surrounding Mount Rungwe in Mbeya provide the optimal climate for volcanic agriculture. We source our tropical fruits (mangoes, passionfruit, avocados) and spices directly from small family co-ops in this fertile volcanic zone, lending a distinctive, bright profile to our juices and ingredients.',
      image: 'https://images.unsplash.com/photo-1546173152-fd1adac65050?w=800&h=800&fit=crop',
    },
    {
      label: 'CHAPTER II',
      title: 'The Unhurried Dough',
      desc: 'In a world of fast baking mixes and industrial speed-proofing, we choose the path of patience. Our brioche rolls and croissants undergo a cold-fermentation process for 24-48 hours. This develops deep enzymatic flavors, a rich buttery aroma, and a light, digestible texture that cannot be replicated by shortcuts.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=800&fit=crop',
    },
    {
      label: 'CHAPTER III',
      title: 'Precision Finishing',
      desc: 'The final stage is where culinary craft becomes art. Our cake decorators spend hours refining custom chocolate ganache drips, mounting fresh wild berries, and hand-writing customized personal inscriptions. No two Zion cakes are identical, each reflects the individual passion of the decorator.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop',
    },
  ];

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      {/* Editorial Chapter Hero */}
      <section className="container-premium mb-24 max-w-4xl text-center space-y-6">
        <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
          CRAFT NARRATIVE
        </span>
        <h1 className="font-sans-luxury text-stone-900 leading-none text-5xl md:text-6xl font-black">
          How a Zion Moment is Baked.
        </h1>
        <p className="text-stone-500 font-sans-luxury text-lg max-w-2xl mx-auto leading-relaxed italic">
          "Patience is our primary ingredient. We believe quality requires time, deliberate motion, and respect for nature's elements."
        </p>
      </section>

      {/* Narrative chapters list */}
      <section className="space-y-32">
        {storyChapters.map((ch, idx) => (
          <div key={idx} className="container-premium">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image box */}
              <div className={`relative aspect-[4/5] overflow-hidden border border-stone-200 p-3 bg-white ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
                <div className="relative w-full h-full overflow-hidden">
                  <Image src={ch.image} alt={ch.title} fill className="object-cover luxury-hover-image" />
                </div>
              </div>

              {/* Story box */}
              <div className="space-y-6">
                <span className="font-sans-luxury text-xs font-black text-amber-600 tracking-widest uppercase">
                  {ch.label}
                </span>
                <h2 className="font-sans-luxury text-stone-900 leading-tight text-3xl md:text-4xl font-bold">
                  {ch.title}
                </h2>
                <p className="text-stone-600 text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
                  {ch.desc}
                </p>
                <div className="pt-4 border-t border-stone-200/50 flex items-center gap-2">
                  <span className="text-[10px] text-stone-400 font-sans-luxury font-bold uppercase tracking-wider">MBEYA BAKERY STANDARDS</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom section */}
      <section className="container-premium text-center mt-36 max-w-2xl space-y-6">
        <h2 className="font-sans-luxury text-stone-900 leading-tight text-4xl md:text-5xl font-bold">
          Ready to experience the craft?
        </h2>
        <p className="text-stone-500 text-xs tracking-wide uppercase font-sans-luxury">
          BROWSE FRESH PRODUCTS PREPARED TODAY
        </p>
        <div className="pt-4">
          <Link href="/shop" className="premium-btn-primary">
            Explore the Menu
          </Link>
        </div>
      </section>
    </div>
  );
}

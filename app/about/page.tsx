'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Leaf, Shield, Award } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Salome Mtewele',
      role: 'Founder & Head Artisan',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
    },
    {
      name: 'Amos Chale',
      role: 'Master Pastry Chef',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
    },
  ];

  const milestones = [
    { year: '2022', title: 'The Sunrise Oven', desc: 'Opened our first pastry kitchen in Mbeya Forest Area, baking for local celebrations.' },
    { year: '2024', title: 'Culinary Expansion', desc: 'Introduced local Tanzanian gourmet lunch plates and fresh cold-pressed tropical juices.' },
    { year: '2026', title: 'Digital E-Commerce', desc: 'Launched secure checkout and active order tracking systems for premium delivery.' },
  ];

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            ZION HERITAGE
          </span>
          <h1 className="font-serif-luxury text-stone-900 leading-none">
            We believe in honest baking and warm hospitality.
          </h1>
          <p className="text-stone-500 font-serif-luxury text-lg md:text-xl leading-relaxed italic pt-4 border-t border-stone-200/60 mt-6">
            "Taste is not merely a combination of sugar and flour. It is the texture of fresh-churned butter, the warmth of acacia coal, and the anticipation of celebration."
          </p>
        </div>

        {/* Split Narrative Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <div className="relative aspect-[4/5] overflow-hidden border border-stone-200 p-3 bg-white">
            <div className="relative w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=1000&fit=crop"
                alt="Inside the Zion kitchen"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-serif-luxury text-stone-900 leading-tight">
              Honest Ingredients. Fresh Beginnings.
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
              Zion Cakes and Bites was born from a desire to bring the finest pastry techniques to the southern highlands of Mbeya. We reject cheap baking mixes, artificial colors, and chemical preservatives. Our kitchen uses only locally sourced milk, fresh organic eggs, and स्वादु vanilla.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
              From standard birthday cakes to full-scale corporate catering packages, we treat every order as a signature masterpiece. The result is a menu of pure, distinct flavors that satisfy the appetite and uplift the soul.
            </p>
            <div className="pt-4 flex gap-4">
              <Link href="/shop" className="premium-btn-primary">
                Shop the Catalog
              </Link>
              <Link href="/story" className="premium-btn-secondary">
                Read Our Story
              </Link>
            </div>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="border-t border-stone-200/50 py-20 mb-20">
          <div className="text-center mb-16 space-y-2">
            <span className="font-sans-luxury text-[10px] font-black text-stone-500 uppercase tracking-widest">
              OUR FOUNDING PILLARS
            </span>
            <h2 className="font-serif-luxury text-stone-900">
              The Craft Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: 'Organic Sourcing', desc: 'Direct trade sugars, fresh local dairy, and organic wheat selected by our head baker.' },
              { icon: Heart, title: 'Made From Scratch', desc: 'No mass production. We weigh, fold, and decorate every piece by hand daily.' },
              { icon: Shield, title: 'Clean Guarantee', desc: 'No synthetic flavor enhancers or coloring. Colors are derived from organic fruits.' },
              { icon: Award, title: 'Regional Pride', desc: 'Supporting the southern highland farmers of Mbeya with local direct purchasing.' },
            ].map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="space-y-4 border border-stone-200 bg-white p-6">
                  <div className="p-3 bg-amber-50 inline-block border border-amber-100 text-amber-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans-luxury text-xs font-bold uppercase tracking-wider text-stone-900">
                    {pillar.title}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed" style={{ fontFamily: 'Inter' }}>
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Heritage Timeline */}
        <section className="border-t border-stone-200/50 py-20 mb-20">
          <div className="mb-16">
            <span className="font-sans-luxury text-[10px] font-black text-stone-500 uppercase tracking-widest">
              CHRONOLOGY
            </span>
            <h2 className="font-serif-luxury text-stone-900 mt-2">
              Our Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative border-l border-stone-300 pl-6 py-2 space-y-3">
                <span className="font-sans-luxury text-xl font-black text-amber-600">
                  {m.year}
                </span>
                <h3 className="font-serif-luxury text-lg font-bold text-stone-950">
                  {m.title}
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed" style={{ fontFamily: 'Inter' }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Culinary Artisans Team */}
        <section className="border-t border-stone-200/50 py-20">
          <div className="text-center mb-16 space-y-2">
            <span className="font-sans-luxury text-[10px] font-black text-stone-500 uppercase tracking-widest">
              PEOPLE
            </span>
            <h2 className="font-serif-luxury text-stone-900">
              The Culinary Artisans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="space-y-4 text-center">
                <div className="relative aspect-[4/5] overflow-hidden border border-stone-200 p-2 bg-white">
                  <div className="relative w-full h-full">
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                    {member.name}
                  </h3>
                  <p className="font-sans-luxury text-[9px] font-bold text-amber-700 uppercase tracking-widest mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

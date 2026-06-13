'use client';

import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Leaf, Sparkles, Award } from 'lucide-react';
import { useCart } from '@/services/cart-context';
import { menuItems } from '@/services/menu';
import { formatCurrency } from '@/services/utils';
import { useState } from 'react';
import { shimmerDataURL, CREAM_BLUR_PIXEL } from '@/services/image-utils';

export default function HomePage() {
  const { addToCart } = useCart();
  const featured = menuItems.filter((item: any) => item.featured).slice(0, 4);
  const [activeReview, setActiveReview] = useState(0);

  const reviews = [
    {
      name: 'Amos M.',
      rating: 5,
      comment: 'The Red Velvet cake was absolutely magnificent. Rich cream cheese frosting, perfectly moist cake base. Everyone at the party was amazed.',
      date: 'June 02, 2026',
    },
    {
      name: 'Salome K.',
      rating: 5,
      comment: 'Zion has the best grilled chicken in Mbeya, hands down. Seasoned to perfection and served hot. The packaging was super premium too!',
      date: 'May 28, 2026',
    },
    {
      name: 'David L.',
      rating: 5,
      comment: 'Amazing pastries and juices. The Mango Sunrise is pure tropical paradise. Ordered online and checkout was incredibly smooth.',
      date: 'May 15, 2026',
    },
  ];

  const galleryItems = [
    {
      title: 'Morning Fresh Bakes',
      subtitle: 'Prepared daily at sunrise',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=800&fit=crop',
      size: 'col-span-2 row-span-2',
    },
    {
      title: 'Artisan Baking Craft',
      subtitle: 'Handcrafted with passion',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop',
      size: 'col-span-1 row-span-1',
    },
    {
      title: 'Pure Local Ingredients',
      subtitle: 'Sourced directly from Mbeya',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop',
      size: 'col-span-1 row-span-1',
    },
    {
      title: 'Detailed Presentation',
      subtitle: 'Finished with absolute precision',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=400&fit=crop',
      size: 'col-span-2 row-span-1',
    },
  ];

  const valueProps = [
    { icon: Leaf, title: 'Fresh & Organic', desc: 'Locally grown, handpicked ingredients from Mbeya fields.' },
    { icon: Heart, title: 'Baked with Love', desc: 'Crafted from family-guarded recipes for deep, warm flavors.' },
    { icon: Sparkles, title: 'Uncompromising Quality', desc: 'Premium food standards in prep, baking, and presentation.' },
    { icon: Award, title: 'Award Winning Taste', desc: 'Voted the finest cakes and bites experience in the region.' },
  ];

  return (
    <div className="bg-[#FFFBF5]">
      {/* 1. Cinematic Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-stone-900">
        <motion.div
          animate={{ scale: 1.06 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1920&h=1080&fit=crop"
            alt="Artisan Chocolate Cake Closeup"
           
            
            
            className="object-cover opacity-80"
            
            
          />
        </motion.div>
        
        {/* Cinematic dark tint overlay */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-16 h-16 border border-white/20 bg-white/5 backdrop-blur-md rounded-none p-2 flex items-center justify-center">
              <img src="/logo.png" alt="Zion Logo" width={48} height={48} className="object-contain filter invert"   />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-sans-luxury text-white text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05]"
            style={{ textShadow: '0 8px 30px rgba(0,0,0,0.35)' }}
          >
            Artisan Baked<br />Excellence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-amber-100 text-lg md:text-2xl font-sans-luxury font-light mb-12 tracking-wide"
          >
            Crafted with passion, delivered fresh in Mbeya.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/shop" className="premium-btn-primary bg-amber-600 border border-amber-600 hover:bg-white hover:text-stone-950">
              Shop the Collection
            </Link>
            <Link to="/about" className="inline-flex items-center justify-center border border-white/40 text-white hover:bg-white hover:text-stone-900 transition-colors uppercase font-sans-luxury text-[10px] tracking-widest px-8 py-5">
              Read Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Teaser Brand Story / Values Section */}
      <section className="section-padding-luxury bg-[#FFFBF5]">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Image with details */}
            <div className="relative aspect-[4/5] overflow-hidden border border-stone-200 p-4 bg-white/50">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&h=1000&fit=crop"
                  alt="Baking Fresh Bread and Pastries"
                 
                  className="object-cover luxury-hover-image"
                />
              </div>
              <div className="absolute bottom-10 left-10 text-white z-10 space-y-1">
                <p className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-amber-200">OUR HERITAGE</p>
                <p className="font-sans-luxury text-2xl font-bold">Est. Mbeya, Tanzania</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right Column: Values */}
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
                  Zion Craftsmanship
                </span>
                <h2 className="font-sans-luxury text-stone-900 leading-tight text-4xl md:text-5xl font-bold">
                  Designed for taste. Made for memories.
                </h2>
                <p className="text-stone-600 text-base leading-relaxed" style={{ fontFamily: 'Inter' }}>
                  At Zion Cakes and Bites, we blend traditional baking heritage with modern, minimal presentation. We believe premium flavor originates from pure, raw ingredients and unhurried craftsmanship.
                </p>
              </div>

              {/* Value props grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                {valueProps.map((val, idx) => {
                  const Icon = val.icon;
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="p-3 bg-amber-50 inline-block border border-amber-100">
                        <Icon className="w-5 h-5 text-amber-700" />
                      </div>
                      <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-wider text-stone-900">
                        {val.title}
                      </h4>
                      <p className="text-stone-500 text-xs leading-relaxed" style={{ fontFamily: 'Inter' }}>
                        {val.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4">
                <Link to="/about" className="inline-flex items-center gap-3 font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-900 hover:text-amber-600 group transition-colors">
                  Meet Our Bakers <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured / Signature Collection */}
      <section className="py-24 bg-white border-y border-stone-200/50">
        <div className="container-premium">
          <div className="mb-16 flex flex-col md:flex-row items-baseline justify-between gap-6">
            <div className="space-y-3">
              <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
                Signature Collection
              </span>
              <h2 className="font-sans-luxury text-stone-900 text-4xl md:text-5xl font-bold">
                Highly Focused. Pure Taste.
              </h2>
            </div>
            <Link to="/shop" className="inline-flex items-center gap-3 font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors">
              Explore All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Catalog grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((item: any) => (
              <div key={item.id} className="luxury-card group flex flex-col justify-between p-4 border border-stone-100">
                <Link to={`/product/${item.id}`} className="block relative aspect-square overflow-hidden bg-stone-50 mb-6">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop'}
                    alt={item.name}
                   
                    className="object-cover luxury-hover-image group-hover:scale-105"
                  />
                  {item.featured && (
                    <span className="absolute top-4 left-4 bg-stone-900/90 text-white font-sans-luxury text-[8px] font-bold tracking-widest uppercase px-3 py-1.5 backdrop-blur-sm">
                      Best Seller
                    </span>
                  )}
                </Link>

                <div className="space-y-4">
                  <div>
                    <span className="font-sans-luxury text-[9px] font-bold text-amber-700 uppercase tracking-widest">
                      {item.category}
                    </span>
                    <h3 className="font-sans-luxury text-lg text-stone-900 font-bold mt-1">
                      <Link to={`/product/${item.id}`} className="hover:text-amber-600 transition-colors">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-stone-500 text-xs mt-2 leading-relaxed" style={{ fontFamily: 'Inter' }}>
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <span className="font-sans-luxury text-sm font-bold text-stone-950">
                      {item.priceString || formatCurrency(item.price || 0)}
                    </span>
                    
                    <button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price || 0,
                          priceString: item.priceString || '',
                          image: item.image || '',
                          category: item.category,
                        })
                      }
                      className="font-sans-luxury text-[9px] font-bold uppercase tracking-widest text-stone-900 hover:text-amber-600 border-b border-stone-900 hover:border-amber-600 pb-0.5 transition-all"
                    >
                      + ADD TO BAG
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Craft Gallery Section */}
      <section className="section-padding-luxury bg-[#FFFBF5]">
        <div className="container-premium">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
              The Craft Process
            </span>
            <h2 className="font-sans-luxury text-stone-900 text-4xl md:text-5xl font-bold">
              Kitchen Story in Frames
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
              Take a visual journey behind our counters. From custom flour blends at sunrise to the delicate finish of hand-applied ganache.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {galleryItems.map((g, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden group border border-stone-200 p-2 bg-white ${
                  idx === 0 ? 'md:col-span-2 md:row-span-2' : ''
                } ${idx === 3 ? 'md:col-span-2' : ''}`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={g.image}
                    alt={g.title}
                   
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                    <span className="font-sans-luxury text-[9px] text-amber-400 font-bold uppercase tracking-widest mb-1">
                      {g.subtitle}
                    </span>
                    <h4 className="font-sans-luxury text-xl font-bold">
                      {g.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="py-24 bg-white border-t border-stone-200/50 overflow-hidden">
        <div className="container-premium flex flex-col items-center text-center">
          <div className="mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(reviews[activeReview].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="font-sans-luxury text-[10px] font-bold text-stone-500 uppercase tracking-[0.25em]">
              GUEST EXPERIENCES
            </span>
          </div>

          <div className="max-w-3xl h-44 flex items-center justify-center">
            <motion.p
              key={activeReview}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="font-sans-luxury text-stone-900 text-2xl md:text-3xl leading-relaxed italic"
            >
              "{reviews[activeReview].comment}"
            </motion.p>
          </div>

          <div className="mt-8 space-y-1">
            <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-widest text-stone-900">
              {reviews[activeReview].name}
            </h4>
            <p className="text-[10px] text-stone-400 font-sans-luxury uppercase tracking-wider">
              {reviews[activeReview].date}
            </p>
          </div>

          {/* Dots */}
          <div className="flex gap-3 mt-12">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveReview(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeReview === idx ? 'bg-amber-600 w-6' : 'bg-stone-300'
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Premium Call to Action */}
      <section className="section-padding-luxury bg-stone-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.1),transparent_45%)]" />
        <div className="container-premium relative z-10 text-center max-w-4xl space-y-10">
          <span className="font-sans-luxury text-xs font-black text-amber-500 uppercase tracking-[0.3em]">
            Taste the Craft
          </span>
          <h2 className="font-sans-luxury text-white text-4xl md:text-6xl font-bold leading-tight">
            Elevate your celebration. Order custom cakes and delicacies.
          </h2>
          <p className="text-stone-400 text-base max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Browse our catalog, build your customized order, and enjoy hand-delivered fresh gourmet foods at your doorstep. We are here to craft your perfect moment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/shop" className="inline-flex items-center justify-center bg-white text-stone-950 font-semibold uppercase tracking-[0.25em] text-xs px-10 py-5 hover:bg-amber-500 hover:text-white transition-all duration-500">
              Browse Menu
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center border border-white/20 text-white font-semibold uppercase tracking-[0.25em] text-xs px-10 py-5 hover:bg-white hover:text-stone-950 transition-all duration-500">
              Custom Commissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems } from '@/lib/menu';

export default function CategoriesPage() {
  const categoriesList = [
    {
      id: 'cakes',
      title: 'Artisan Cakes',
      desc: 'Decadent multi-layered celebration cakes, custom engraved for special moments.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=1000&fit=crop',
      count: menuItems.filter((i) => i.category === 'cakes').length,
    },
    {
      id: 'juices',
      title: 'Cold-Pressed Juices',
      desc: '100% natural, freshly squeezed local tropical juices, smoothies, and ginger vitality shots.',
      image: 'https://images.unsplash.com/photo-1546173152-fd1adac65050?w=800&h=1000&fit=crop',
      count: menuItems.filter((i) => i.category === 'juices').length,
    },
    {
      id: 'meals',
      title: 'Gourmet Meals',
      desc: 'Rich Tanzanian local delicacies, aromatic chicken biryani, and coals-cooked Nyama Choma.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=1000&fit=crop',
      count: menuItems.filter((i) => i.category === 'meals').length,
    },
    {
      id: 'snacks',
      title: 'Savory Snacks & Pastries',
      desc: 'Spiced samosa trios, golden cardamon mandazi, and buttery flaky Belgian croissants.',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=1000&fit=crop',
      count: menuItems.filter((i) => i.category === 'snacks').length,
    },
  ];

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24">
      <div className="container-premium">
        {/* Page Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            DISCOVER TASTE
          </span>
          <h1 className="font-sans-luxury text-stone-900 leading-tight text-5xl md:text-6xl font-black">
            Menu Categories
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Choose a culinary path. Each category contains a selection of recipes made from scratch daily in our Mbeya kitchens.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categoriesList.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative h-[450px] overflow-hidden group border border-stone-200 p-2 bg-white flex flex-col"
            >
              <div className="relative w-full h-full overflow-hidden">
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Category Details */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h2 className="font-sans-luxury text-3xl font-bold tracking-tight">
                      {cat.title}
                    </h2>
                    <span className="font-sans-luxury text-xs bg-amber-600/90 text-white font-bold px-3 py-1 tracking-wider uppercase">
                      {cat.count} Items
                    </span>
                  </div>
                  
                  <p className="text-stone-200 text-xs leading-relaxed max-w-md" style={{ fontFamily: 'Inter' }}>
                    {cat.desc}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/shop?category=${cat.id}`}
                      className="inline-block bg-white text-stone-950 font-sans-luxury text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 hover:bg-amber-600 hover:text-white transition-colors"
                      onClick={() => {
                        // Trigger query param redirect
                        window.location.href = `/shop?category=${cat.id}`;
                      }}
                    >
                      Browse {cat.title}
                    </Link>
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

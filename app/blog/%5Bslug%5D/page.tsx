'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog';
import { Calendar, Clock, ArrowLeft, Heart } from 'lucide-react';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-[#FFFBF5] min-h-screen pt-40 pb-24 text-center">
        <div className="container-premium space-y-6">
          <h1 className="font-sans-luxury text-3xl text-stone-900">Article Not Found</h1>
          <p className="text-stone-500 font-sans-luxury text-xs">The post you are searching for does not exist or has been deleted.</p>
          <Link href="/blog" className="premium-btn-primary">
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium max-w-4xl">
        
        {/* Navigation Link */}
        <div className="mb-10">
          <Link href="/blog" className="inline-flex items-center gap-2 font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-6 mb-12">
          <span className="bg-amber-600/90 text-white font-sans-luxury text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 inline-block">
            {post.category}
          </span>
          <h1 className="font-sans-luxury text-stone-900 text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-[10px] font-sans-luxury text-stone-400 uppercase tracking-widest border-y border-stone-200/50 py-4">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
            <span>By Zion Bakery Editors</span>
          </div>
        </div>

        {/* Primary Banner Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-stone-200 p-2 bg-white mb-12">
          <div className="relative w-full h-full">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
        </div>

        {/* Editorial Body Text */}
        <div className="max-w-none text-stone-600 text-sm md:text-base leading-relaxed space-y-6" style={{ fontFamily: 'Inter' }}>
          <p className="text-stone-900 font-sans-luxury text-lg md:text-xl font-bold leading-relaxed italic border-l-4 border-amber-600 pl-6 my-8">
            {post.excerpt}
          </p>

          <p>The culinary philosophy of Zion Cakes and Bites has always been rooted in origin. We believe the local microclimates of southern Tanzania possess distinct, unexamined terroir. In this article, we trace the chemistry and heritage that sets our bakeries apart, documenting the ingredients and methods that cultivate pure, memorable appetites.</p>

          <h3 className="font-sans-luxury text-stone-900 text-xl font-bold pt-4">Respect for Volcanic Soil</h3>
          <p>Mbeya is defined by its geological history. Volcanic ash soils around Mount Rungwe are loaded with minerals—potassium, magnesium, and phosphorus. When coffee bushes, tropical trees, and vanilla bean orchids grow in this density, they develop deep root systems that draw up clean regional compounds. Our pastry chefs directly collaborate with local Mbeya smallholders to pick berries and squeeze mangoes at peak ripeness, introducing a volcanic volcanic acidity and rich caramel sweetness that sets our items apart.</p>

          <blockquote className="font-sans-luxury text-stone-950 text-2xl font-semibold leading-relaxed italic text-center max-w-2xl mx-auto my-12">
            "Artisanal baking is the chemistry of patience. We let nature do the heavy lifting, giving raw local ingredients the time they require."
          </blockquote>

          <h3 className="font-sans-luxury text-stone-900 text-xl font-bold pt-4">Fermenting Over Speed-Proofing</h3>
          <p>Typical commercial setups prioritize fast throughput, relying on dough additives and chemical softeners to accelerate baking. At Zion, we choose slow, cold fermentation. We fold our brioche doughs with high-fat churned butter and allow them to rest in controlled chilling chambers for up to 48 hours. This unhurried method allows wild yeast cultures to break down gluten chains slowly, generating subtle organic acids that give our bread rolls and croissants their airy honeycomb crumb and digestible texture.</p>

          <p>This attention to process ensures that when you order a Zion pastry, you are experiencing the work of hands, clean water, fine flour, and patient time. We are proud to keep this slow culinary heritage alive in the heart of Mbeya.</p>
        </div>

        {/* Footer of Article */}
        <div className="border-t border-stone-200 mt-16 pt-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-500 font-sans-luxury text-[9px] uppercase tracking-wider">
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>SHARE THIS STORY</span>
          </div>

          <Link href="/shop" className="font-sans-luxury text-[9px] font-bold uppercase tracking-widest text-amber-700 hover:text-amber-800">
            BROWSE PRECIPITATED DELICACIES &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}

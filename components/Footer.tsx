'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-[#FFFBF5] py-16 text-stone-600">
      <div className="container-premium grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <p className="font-sans-luxury text-sm font-black uppercase tracking-[0.25em] text-stone-900 leading-tight">
              Zion
            </p>
            <p className="font-sans-luxury text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700 leading-tight mt-0.5">
              Cakes & Bites
            </p>
          </Link>
          <p className="text-xs leading-relaxed max-w-xs" style={{ fontFamily: 'Inter' }}>
            Artisanal bakery and gourmet cuisine crafted in Mbeya, Tanzania. Making every bite a memorable, luxury experience.
          </p>
        </div>

        {/* Shop & Discover */}
        <div className="space-y-3 flex flex-col">
          <h4 className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-950">
            Shop & Discover
          </h4>
          <Link href="/shop" className="text-xs hover:text-amber-600 transition-colors">
            All Products
          </Link>
          <Link href="/categories" className="text-xs hover:text-amber-600 transition-colors">
            Browse Categories
          </Link>
          <Link href="/collections" className="text-xs hover:text-amber-600 transition-colors">
            Curated Collections
          </Link>
        </div>

        {/* Support & Details */}
        <div className="space-y-3 flex flex-col">
          <h4 className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-950">
            Customer Support
          </h4>
          <Link href="/faq" className="text-xs hover:text-amber-600 transition-colors">
            FAQs & Inquiries
          </Link>
          <Link href="/contact" className="text-xs hover:text-amber-600 transition-colors">
            Contact & Location
          </Link>
          <Link href="/order-tracking" className="text-xs hover:text-amber-600 transition-colors">
            Track Order
          </Link>
        </div>

        {/* Company & Legal */}
        <div className="space-y-3 flex flex-col">
          <h4 className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-950">
            Journal & More
          </h4>
          <Link href="/blog" className="text-xs hover:text-amber-600 transition-colors">
            Our Journal (Blog)
          </Link>
          <Link href="/about" className="text-xs hover:text-amber-600 transition-colors">
            Our Heritage Story
          </Link>
          <span className="text-xs text-stone-400 mt-2">
            Mbeya CBD, Forest Area
          </span>
        </div>
      </div>

      <div className="container-premium border-t border-stone-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 font-sans-luxury tracking-wider gap-4">
        <p>&copy; {currentYear} ZION CAKES AND BITES. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <a href="#instagram" className="hover:text-amber-600 transition-colors">INSTAGRAM</a>
          <a href="#whatsapp" className="hover:text-amber-600 transition-colors">WHATSAPP</a>
          <a href="#email" className="hover:text-amber-600 transition-colors">EMAIL</a>
        </div>
      </div>
    </footer>
  );
}

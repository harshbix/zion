'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsOpen: setCartOpen } = useCart();

  const navItems = [
    { label: 'Shop', href: '/shop' },
    { label: 'Categories', href: '/categories' },
    { label: 'Collections', href: '/collections' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Support', href: '/contact' },
  ];

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-stone-200/50 bg-[#FFFBF5]/90 backdrop-blur-md">
        <div className="container-premium flex h-20 items-center justify-between gap-6">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-75">
            <div className="relative h-10 w-10 overflow-hidden border border-stone-200 bg-white">
              <Image
                src="/logo.png"
                alt="Zion Cakes and Bites"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-sans-luxury text-xs font-black uppercase tracking-[0.28em] text-stone-900 leading-tight">
                Zion
              </p>
              <p className="font-sans-luxury text-[9px] font-semibold uppercase tracking-[0.24em] text-amber-700 leading-tight mt-0.5">
                Cakes & Bites
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans-luxury text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 hover:text-amber-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Action Icons (Cart, Account, Mobile Menu) */}
          <div className="flex items-center gap-2">
            <Link
              href="/account"
              aria-label="Account"
              className="inline-flex h-10 w-10 items-center justify-center border border-stone-200 text-stone-700 hover:bg-stone-950 hover:text-white transition-all duration-300"
            >
              <User className="h-4 w-4" />
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              type="button"
              aria-label="Cart"
              className="relative inline-flex h-10 w-10 items-center justify-center border border-stone-200 text-stone-700 hover:bg-stone-950 hover:text-white transition-all duration-300"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center bg-amber-600 text-[10px] font-black text-white rounded-full font-sans-luxury pulse-glow-amber">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center border border-stone-200 text-stone-700 hover:bg-stone-950 hover:text-white transition-all duration-300 md:hidden"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-stone-200 bg-[#FFFBF5] md:hidden">
            <div className="container-premium space-y-1 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-700 hover:text-amber-600 transition-colors font-sans-luxury"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Global Shopping Cart Side Drawer */}
      <CartDrawer />
    </>
  );
}


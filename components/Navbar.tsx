'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Shop', href: '/menu' },
    { label: 'Collections', href: '/#products' },
    { label: 'About', href: '/about' },
    { label: 'Support', href: '/contact' },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-sm">
      <div className="container-premium flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-75">
          <div className="relative h-10 w-10 overflow-hidden border border-black/10 bg-white">
            <Image
              src="/logo.png"
              alt="Zion Cakes and Bites"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black">Zion</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
              Cakes & Bites
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600 transition-colors hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Cart"
            className="inline-flex h-10 w-10 items-center justify-center border border-black/10 text-black transition-colors hover:bg-black hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-10 w-10 items-center justify-center border border-black/10 text-black transition-colors hover:bg-black hover:text-white md:hidden"
            aria-label="Open menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-black/10 bg-white md:hidden">
          <div className="container-premium space-y-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-0 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-700 transition-colors hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

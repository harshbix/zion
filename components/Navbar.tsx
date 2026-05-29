'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { businessData } from '@/lib/data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'About', href: '/about' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-md"
    >
      <div className="container-premium flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-stone-700 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:shadow-glow transition-all">
            Z
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-serif font-bold text-stone-900">Zion</h1>
            <p className="text-xs text-orange-600">Cakes & Bites</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-stone-700 hover:text-orange-600 transition-colors relative group"
            >
              {item.label}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={businessData.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            <Phone className="w-4 h-4" />
            Order Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-amber-100 rounded-lg transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-amber-50 border-t border-amber-200"
        >
          <div className="container-premium py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-stone-700 font-medium hover:bg-amber-200 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={businessData.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-glow transition-all text-center"
              onClick={() => setIsOpen(false)}
            >
              Order Now
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

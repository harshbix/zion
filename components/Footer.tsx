'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="container-premium flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-black">Zion</p>

        <nav className="flex flex-wrap items-center gap-5 text-sm text-neutral-600">
          <Link href="/menu" className="transition-colors hover:text-black">
            Shop
          </Link>
          <Link href="/contact" className="transition-colors hover:text-black">
            Shipping
          </Link>
          <Link href="/contact" className="transition-colors hover:text-black">
            Returns
          </Link>
          <Link href="/contact" className="transition-colors hover:text-black">
            Contact
          </Link>
          <a href="#social" className="transition-colors hover:text-black">
            Social
          </a>
        </nav>

        <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
          &copy; {currentYear} Zion Cakes and Bites
        </p>
      </div>
    </footer>
  );
}

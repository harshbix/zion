
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/services/cart-context';
import CartDrawer from './CartDrawer';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { CREAM_BLUR_PIXEL } from '@/services/image-utils';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsOpen: setCartOpen } = useCart();
  const pathname = useLocation().pathname;

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
      <nav
        aria-label="Main navigation"
        className="fixed left-0 right-0 top-0 z-40 border-b border-stone-200/50 bg-[#FFFBF5]/90 backdrop-blur-md"
      >
        <div className="container-premium flex h-20 items-center justify-between gap-6">
          {/* Logo Section */}
          <Link
            to="/"
            aria-label="Zion Cakes and Bites — Home"
            className="flex items-center gap-3 transition-opacity hover:opacity-75"
          >
            <div className="relative h-10 w-10 overflow-hidden border border-stone-200 bg-white">
              <img src="/logo.png"
                alt=""
                aria-hidden="true"
                
               
               
                className="object-cover"
               
                />
            </div>
            <div>
              <p className="font-sans-luxury text-xs font-black uppercase tracking-[0.28em] text-stone-900 leading-tight">
                Zion
              </p>
              <p className="font-sans-luxury text-[9px] font-semibold uppercase tracking-[0.24em] text-amber-700 leading-tight mt-0.5">
                Cakes &amp; Bites
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-8 md:flex h-full" role="menubar">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-sans-luxury text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center h-full border-b-2 py-4 ${
                    isActive
                      ? 'text-amber-600 border-amber-600'
                      : 'text-stone-600 hover:text-amber-600 border-transparent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons (Cart, Account, Mobile Menu) */}
          <div className="flex items-center gap-2">
            <Link
              to="/account"
              aria-label="My Account"
              className="inline-flex h-11 w-11 items-center justify-center border border-stone-200 text-stone-700 hover:bg-stone-950 hover:text-white transition-all duration-300"
            >
              <User className="h-5 w-5" aria-hidden="true" />
            </Link>

            <button
              id="cart-toggle-btn"
              onClick={() => setCartOpen(true)}
              type="button"
              aria-label={`Open shopping cart${cartCount > 0 ? `, ${cartCount} item${cartCount > 1 ? 's' : ''}` : ''}`}
              aria-haspopup="dialog"
              className="relative inline-flex h-11 w-11 items-center justify-center border border-stone-200 text-stone-700 hover:bg-stone-950 hover:text-white transition-all duration-300"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center bg-amber-600 text-[10px] font-black text-white rounded-full font-sans-luxury pulse-glow-amber"
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex h-11 w-11 items-center justify-center border border-stone-200 text-stone-700 hover:bg-stone-950 hover:text-white transition-all duration-300 md:hidden"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-nav"
            className="border-t border-stone-200 bg-[#FFFBF5] md:hidden"
          >
            <nav aria-label="Mobile navigation" className="container-premium space-y-1 py-4">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors font-sans-luxury border-l-2 pl-4 ${
                      isActive
                        ? 'text-amber-600 border-amber-600 bg-amber-50/5'
                        : 'text-stone-700 hover:text-amber-600 border-transparent'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </nav>

      {/* Global Shopping Cart Side Drawer */}
      <CartDrawer />
    </>
  );
}

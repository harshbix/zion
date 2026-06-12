import type { Metadata } from 'next';
import './layout.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkipLink from '@/components/SkipLink';
import { keywords } from '@/lib/data';
import '@/styles/globals.css';
import { CartProvider } from '@/lib/cart-context';
import { OrderProvider } from '@/lib/order-context';
import { ToastProvider } from '@/lib/toast-context';
import { AuthProvider } from '@/lib/auth-context';
import ConnectionBanner from '@/components/ConnectionBanner';

export const metadata: Metadata = {
  metadataBase: new URL('https://zioncakesandbites.co.tz'),
  title: {
    default: 'Zion | Premium Cakes and Bites in Mbeya',
    template: '%s | Zion Cakes & Bites',
  },
  description:
    'Minimal, premium cakes and bites crafted for quick browsing and effortless ordering in Mbeya.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Zion | Premium Cakes and Bites in Mbeya',
    description:
      'Minimal, premium cakes and bites crafted for quick browsing and effortless ordering in Mbeya.',
    url: 'https://zioncakesandbites.co.tz',
    siteName: 'Zion Cakes & Bites',
    type: 'website',
    locale: 'en_TZ',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Zion Cakes and Bites — Premium Bakery in Mbeya, Tanzania',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zion | Premium Cakes and Bites in Mbeya',
    description:
      'Minimal, premium cakes and bites crafted for quick browsing and effortless ordering in Mbeya.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://zioncakesandbites.co.tz',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Next.js App Router manages <head> automatically via the Metadata API.
          Do NOT add a manual <head> block here — it causes duplicate tags. */}
      <body className="bg-[#FFFBF5] text-stone-900 selection:bg-amber-600/10 selection:text-amber-900">
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <ToastProvider>
                <SkipLink />
                <ConnectionBanner />
                <Navbar />
                <main id="main-content" className="min-h-screen">
                  {children}
                </main>
                <Footer />
              </ToastProvider>
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

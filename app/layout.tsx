import type { Metadata } from 'next';
import './layout.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { keywords } from '@/lib/data';
import '@/styles/globals.css';
import { CartProvider } from '@/lib/cart-context';
import { OrderProvider } from '@/lib/order-context';

export const metadata: Metadata = {
  metadataBase: new URL('https://zioncakesandbites.co.tz'),
  title: 'Zion | Premium Cakes and Bites in Mbeya',
  description:
    'Minimal, premium cakes and bites crafted for quick browsing and effortless ordering in Mbeya.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Zion | Premium Cakes and Bites in Mbeya',
    description:
      'Minimal, premium cakes and bites crafted for quick browsing and effortless ordering in Mbeya.',
    url: 'https://zioncakesandbites.co.tz',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Zion Cakes and Bites',
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {metadata.description && <meta name="description" content={metadata.description} />}
        <link rel="canonical" href="https://zioncakesandbites.co.tz" />
      </head>
      <body className="bg-white text-neutral-950">
        <OrderProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </OrderProvider>
      </body>
    </html>
  );
}


import type { Metadata } from 'next';
import './layout.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import { businessData, keywords } from '@/lib/data';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Zion Cakes and Bites | Premium Bakery in Mbeya, Tanzania',
  description:
    'Experience freshly baked cakes, juices, and local Tanzanian cuisine in Mbeya. Premium quality, affordable prices, 4.0★ rated restaurant.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Zion Cakes and Bites',
    description: businessData.description,
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
    title: 'Zion Cakes and Bites',
    description: businessData.description,
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
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}

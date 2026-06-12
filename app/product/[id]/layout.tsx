import type { Metadata } from 'next';
import { menuItems } from '@/lib/menu';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = menuItems.find((i) => i.id === id);

  if (!item) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: item.name,
    description: `${item.description} | ${item.priceString} — Zion Cakes & Bites, Mbeya.`,
    alternates: { canonical: `https://zioncakesandbites.co.tz/product/${item.id}` },
    openGraph: {
      title: `${item.name} | Zion Cakes & Bites`,
      description: item.description,
      url: `https://zioncakesandbites.co.tz/product/${item.id}`,
      images: [{ url: item.image, width: 600, height: 600, alt: item.name }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item.name} | Zion Cakes & Bites`,
      description: item.description,
      images: [item.image],
    },
  };
}

export async function generateStaticParams() {
  return menuItems.map((item) => ({ id: item.id }));
}

export default function ProductIdLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

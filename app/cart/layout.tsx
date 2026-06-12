import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Bag',
  description: 'Review your selected artisan cakes, juices, and bites before proceeding to secure checkout.',
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

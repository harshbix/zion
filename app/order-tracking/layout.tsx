import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Tracking',
  description: 'Track your Zion Cakes & Bites order in real-time — from kitchen to your doorstep in Mbeya.',
  robots: { index: false, follow: false },
};

export default function OrderTrackingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

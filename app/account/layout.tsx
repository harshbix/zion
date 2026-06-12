import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Portal',
  description: 'Manage your Zion Cakes & Bites orders, track deliveries, and update your account details.',
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

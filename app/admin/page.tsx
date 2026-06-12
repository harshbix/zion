'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent animate-spin mx-auto" />
        <p className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-500">
          Accessing Zion Dashboard...
        </p>
      </div>
    </div>
  );
}

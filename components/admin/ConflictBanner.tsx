'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users } from 'lucide-react';

interface ConflictBannerProps {
  resourceName: string;
}

export default function ConflictBanner({ resourceName }: ConflictBannerProps) {
  const [show, setShow] = useState(false);
  const [conflictUser, setConflictUser] = useState('');

  const mockUsers = ['Amos M.', 'Salome K.', 'David L.', 'Grace Mbeya'];

  useEffect(() => {
    // Simulate checking for conflicts in background
    const timer = setTimeout(() => {
      // 60% chance to show conflict warning for realistic demo purposes
      if (Math.random() > 0.4) {
        const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        setConflictUser(randomUser);
        setShow(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [resourceName]);

  if (!show) return null;

  return (
    <div className="mb-6 border border-amber-600/30 bg-amber-50/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
      <div className="flex gap-3 items-start">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-sans-luxury text-xs font-bold uppercase tracking-widest text-amber-800">
            Shared Asset Notice
          </p>
          <p className="text-stone-600 text-xs mt-1" style={{ fontFamily: 'Inter' }}>
            <span className="font-semibold text-stone-900">{conflictUser}</span> was active on this {resourceName} structure (Last edited 2 mins ago).
          </p>
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[8px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-700 border border-amber-500/20">
          <Users className="w-3 h-3" /> Concurrent View
        </span>
      </div>
    </div>
  );
}

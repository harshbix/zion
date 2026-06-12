'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, Search, ExternalLink } from 'lucide-react';
import { CREAM_BLUR_PIXEL } from '@/lib/image-utils';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  category: 'cakes' | 'pastries' | 'meals' | 'juices' | 'baking';
}

const initialMediaItems: MediaItem[] = [
  {
    id: 'm1',
    title: 'Chocolate Ganache Cake',
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop',
    category: 'cakes',
  },
  {
    id: 'm2',
    title: 'Vanilla Cloud Layer Cake',
    url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=600&fit=crop',
    category: 'cakes',
  },
  {
    id: 'm3',
    title: 'Red Velvet White Ganache',
    url: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&h=600&fit=crop',
    category: 'cakes',
  },
  {
    id: 'm4',
    title: 'Fresh Baked Croissants',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
    category: 'pastries',
  },
  {
    id: 'm5',
    title: 'Volcanic Mango Fields',
    url: 'https://images.unsplash.com/photo-1546173152-fd1adac65050?w=600&h=400&fit=crop',
    category: 'baking',
  },
  {
    id: 'm6',
    title: 'Fresh Mango Sunrise Juice',
    url: 'https://images.unsplash.com/photo-1716441392930-b4daa288266a?w=600&h=600&fit=crop',
    category: 'juices',
  },
  {
    id: 'm7',
    title: 'Green Apple Ginger Tonic',
    url: 'https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=600&h=600&fit=crop',
    category: 'juices',
  },
  {
    id: 'm8',
    title: 'Spiced Half Grilled Chicken',
    url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&h=600&fit=crop',
    category: 'meals',
  },
  {
    id: 'm9',
    title: 'Traditional Maize Ugali & Beef',
    url: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&h=600&fit=crop',
    category: 'meals',
  },
  {
    id: 'm10',
    title: 'Cardamom Card Spiced Mandazi',
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&h=600&fit=crop',
    category: 'pastries',
  },
];

export default function MediaManagerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'cakes' | 'pastries' | 'meals' | 'juices' | 'baking'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const filteredMedia = initialMediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedFilter === 'all' || item.category === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Category filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-stone-200 text-xs bg-white focus:outline-none focus:border-amber-600 rounded-none"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 scrollbar-thin">
          {['all', 'cakes', 'pastries', 'meals', 'juices', 'baking'].map(f => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f as any)}
              className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest border transition-all ${
                selectedFilter === f 
                  ? 'bg-stone-950 text-white border-stone-950' 
                  : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Media grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredMedia.map(item => (
          <div key={item.id} className="bg-white border border-stone-200/50 p-3 flex flex-col justify-between group">
            {/* Aspect container */}
            <div className="relative aspect-square w-full overflow-hidden bg-stone-100 border border-stone-100">
              <Image 
                src={item.url} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-103"
                placeholder="blur"
                blurDataURL={CREAM_BLUR_PIXEL}
              />
              
              {/* Copy Overlay */}
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleCopyUrl(item.id, item.url)}
                  className="p-2 bg-white text-stone-950 border border-stone-200 shadow-md hover:bg-stone-100 transition-colors"
                  title="Copy Image URL"
                >
                  {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white text-stone-950 border border-stone-200 shadow-md hover:bg-stone-100 transition-colors"
                  title="Open source URL"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Title / details */}
            <div className="mt-3 space-y-1">
              <h5 className="font-sans-luxury text-[10px] font-bold uppercase tracking-wider text-stone-900 truncate">
                {item.title}
              </h5>
              <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-stone-400">
                <span>{item.category}</span>
                <span className="font-mono">{item.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

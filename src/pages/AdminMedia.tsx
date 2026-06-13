import React, { useState, useEffect } from 'react';
import { Copy, Check, Search, ExternalLink, Plus } from 'lucide-react';
import { menuItems } from '@/services/menu';
import { blogPosts } from '@/services/blog';
import ImageUploader from '@/components/admin/ImageUploader';
import { useToast } from '@/services/toast-context';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  category: string;
}

export default function MediaManagerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const toast = useToast();

  useEffect(() => {
    // 1. Load products
    let products = menuItems;
    const storedProducts = localStorage.getItem('zion_menu_items');
    if (storedProducts) {
      try { products = JSON.parse(storedProducts); } catch (e) {}
    }

    // 2. Load blog posts
    let blogs = blogPosts;
    const storedBlogs = localStorage.getItem('zion_blog_posts');
    if (storedBlogs) {
      try { blogs = JSON.parse(storedBlogs); } catch (e) {}
    }

    // 3. Load custom uploaded media
    let customMedia: MediaItem[] = [];
    const storedCustom = localStorage.getItem('zion_custom_media');
    if (storedCustom) {
      try { customMedia = JSON.parse(storedCustom); } catch (e) {}
    }

    // Map all into unified media array
    const mappedProducts: MediaItem[] = products.map((p) => ({
      id: p.id,
      title: p.name,
      url: p.image,
      category: p.category,
    }));

    const mappedBlogs: MediaItem[] = blogs.map((b) => ({
      id: b.slug,
      title: b.title,
      url: b.image,
      category: 'blog',
    }));

    // Merge everything (avoid duplicates by checking URL)
    const allMedia = [...customMedia, ...mappedProducts, ...mappedBlogs];
    const uniqueMediaMap = new Map<string, MediaItem>();
    allMedia.forEach(item => {
      if (item.url) {
        uniqueMediaMap.set(item.url, item);
      }
    });

    setMediaList(Array.from(uniqueMediaMap.values()));
  }, []);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('Image link copied to clipboard.');
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleNewUpload = (url: string) => {
    if (!url) return;
    
    const newMediaItem: MediaItem = {
      id: 'custom-' + Date.now(),
      title: 'Uploaded Media Asset',
      url: url,
      category: 'uploaded',
    };

    // Save to custom media storage
    const storedCustom = localStorage.getItem('zion_custom_media');
    const customList = storedCustom ? JSON.parse(storedCustom) : [];
    const updatedCustom = [newMediaItem, ...customList];
    localStorage.setItem('zion_custom_media', JSON.stringify(updatedCustom));

    // Update state
    setMediaList(prev => [newMediaItem, ...prev]);
    toast.success('Media asset successfully cataloged!');
    setUploadedUrl(''); // reset uploader
  };

  const filteredMedia = mediaList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedFilter === 'all' || item.category === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories for filtering tabs
  const categories = ['all', ...Array.from(new Set(mediaList.map(item => item.category)))];

  return (
    <div className="space-y-8">
      {/* Upload Panel */}
      <div className="bg-white border border-stone-200/50 p-6 space-y-4">
        <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-100 pb-3">
          Upload New Asset to Cloudinary
        </h4>
        <div className="max-w-xl">
          <ImageUploader 
            value={uploadedUrl}
            onChange={handleNewUpload}
          />
        </div>
      </div>

      {/* Search and Category filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search media assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-stone-200 text-xs bg-white focus:outline-none focus:border-amber-600 rounded-none"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest border transition-all rounded shrink-0 ${
                selectedFilter === cat 
                  ? 'bg-stone-950 text-white border-stone-950' 
                  : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMedia.length > 0 ? (
          filteredMedia.map(item => (
            <div key={item.id} className="bg-white border border-stone-200/50 p-3 flex flex-col justify-between group">
              {/* Aspect container */}
              <div className="relative aspect-square w-full overflow-hidden bg-stone-100 border border-stone-100">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                />
                
                {/* Copy Overlay */}
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleCopyUrl(item.id, item.url)}
                    className="p-2 bg-white text-stone-950 border border-stone-200 shadow-md hover:bg-stone-100 transition-colors cursor-pointer"
                    title="Copy Image URL"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white text-stone-950 border border-stone-200 shadow-md hover:bg-stone-100 transition-colors"
                    title="Open Source URL"
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
                  <span className="font-mono text-right truncate max-w-[80px]" title={item.id}>{item.id}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-stone-400 text-xs font-semibold">
            No media assets found.
          </div>
        )}
      </div>
    </div>
  );
}

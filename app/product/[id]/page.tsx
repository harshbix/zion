'use client';

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { menuItems } from '@/lib/menu';
import { formatCurrency } from '@/lib/utils';
import { Star, ShieldCheck, Truck, RotateCcw, ChevronDown, Plus, Minus, Check } from 'lucide-react';
import { WHATSAPP_URLS } from '@/lib/whatsapp';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const item = menuItems.find((i) => i.id === id);

  // Fallback if item is not found
  if (!item) {
    return (
      <div className="bg-[#FFFBF5] min-h-screen pt-40 pb-24 text-center">
        <div className="container-premium space-y-6">
          <h1 className="font-serif-luxury text-3xl text-stone-900">Delicacy Not Found</h1>
          <p className="text-stone-500 font-sans-luxury text-xs">The product you are trying to view does not exist or has been retired.</p>
          <Link href="/shop" className="premium-btn-primary">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Related products selection (exclude current item, match category)
  const crossSells = menuItems
    .filter((i) => i.category !== item.category)
    .slice(0, 2);

  // Configuration States
  const sizes = item.category === 'cakes'
    ? [
        { label: '6 inch (1.2kg)', priceModifier: 0 },
        { label: '8 inch (2.0kg)', priceModifier: 15000 },
        { label: '10 inch (3.0kg)', priceModifier: 30000 },
      ]
    : [
        { label: 'Standard Portion', priceModifier: 0 },
        { label: 'Double/Sharing Size', priceModifier: 8000 },
      ];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [customMessage, setCustomMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(item.image);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'process' | 'delivery'>('ingredients');

  // Alternative images gallery mock
  const productImages = [
    item.image,
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop',
  ];

  const basePrice = item.price + selectedSize.priceModifier;

  const handleAddToBag = () => {
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: basePrice,
        priceString: formatCurrency(basePrice),
        image: item.image,
        category: item.category,
        selectedSize: selectedSize.label,
        customMessage: customMessage.trim() !== '' ? customMessage : undefined,
      },
      quantity
    );
  };

  const handleInstantWhatsApp = () => {
    let text = `Hi! I want to order ${item.name} (${selectedSize.label}) x${quantity}.\n`;
    if (customMessage.trim() !== '') {
      text += `Custom inscription: "${customMessage}"\n`;
    }
    text += `Price: ${formatCurrency(basePrice * quantity)}\n`;
    text += `Please confirm baking slots.`;
    
    const url = `https://wa.me/255789123456?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24">
      <div className="container-premium">
        
        {/* Breadcrumbs */}
        <div className="mb-10 text-xs font-sans-luxury tracking-widest text-stone-500 uppercase flex items-center gap-2">
          <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-stone-900 transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-stone-900">{item.name}</span>
        </div>

        {/* Details Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Panel: Swappable Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square overflow-hidden bg-white border border-stone-200 p-2">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={activeImage}
                  alt={item.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Thumbnail row */}
            <div className="flex gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 aspect-square overflow-hidden border p-1 bg-white transition-all ${
                    activeImage === img ? 'border-amber-600 ring-1 ring-amber-600' : 'border-stone-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image src={img} alt={`${item.name} view ${index + 1}`} fill className="object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel: Configurations & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Product Info */}
              <div className="space-y-2">
                <span className="font-sans-luxury text-[10px] font-black text-amber-700 uppercase tracking-[0.25em]">
                  {item.category}
                </span>
                <h1 className="font-serif-luxury text-stone-900 text-3xl md:text-4xl font-bold leading-none">
                  {item.name}
                </h1>
                
                {/* Rating summary */}
                <div className="flex items-center gap-1.5 pt-2">
                  <div className="flex text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current text-stone-300" />
                  </div>
                  <span className="text-xs text-stone-500 font-sans-luxury tracking-widest">(4.0 / 82 Reviews)</span>
                </div>
              </div>

              {/* Price display */}
              <div className="border-t border-stone-200/50 pt-5">
                <p className="font-sans-luxury text-2xl font-black text-stone-900">
                  {formatCurrency(basePrice)}
                </p>
                <p className="text-[10px] text-stone-400 font-sans-luxury tracking-wider uppercase mt-1">
                  Tax included. Local Mbeya deliveries calculated at step.
                </p>
              </div>

              {/* Description */}
              <p className="text-stone-600 text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
                {item.description}
              </p>

              {/* Size Selector */}
              <div className="space-y-3">
                <h3 className="font-sans-luxury text-[10px] font-black uppercase tracking-widest text-stone-500">
                  Select Size Override
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSelectedSize(s)}
                      className={`font-sans-luxury text-[9px] font-bold uppercase tracking-wider p-3.5 border transition-all text-center ${
                        selectedSize.label === s.label
                          ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-stone-950'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inscription Customization (Only Cakes) */}
              {item.category === 'cakes' && (
                <div className="space-y-3">
                  <h3 className="font-sans-luxury text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Custom Message on Cake (Engraving)
                  </h3>
                  <input
                    type="text"
                    placeholder="e.g. Happy Birthday Sarah! (Max 35 chars)"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value.slice(0, 35))}
                    className="w-full bg-white border border-stone-200 px-4 py-3 text-xs tracking-wider text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-600"
                    style={{ fontFamily: 'Inter' }}
                  />
                </div>
              )}

              {/* Quantity Select & Add to Cart Group */}
              <div className="flex gap-4 items-end pt-2">
                <div className="space-y-3">
                  <h3 className="font-sans-luxury text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Quantity
                  </h3>
                  <div className="flex items-center border border-stone-200 bg-white h-14">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-4 text-sm font-bold font-sans-luxury text-stone-900 min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToBag}
                  className="flex-1 bg-stone-950 text-white font-sans-luxury text-[10px] font-bold uppercase tracking-widest h-14 hover:bg-amber-600 transition-colors"
                >
                  ADD TO BAG
                </button>
              </div>

              {/* WhatsApp Quick Link */}
              <button
                onClick={handleInstantWhatsApp}
                className="w-full border border-green-600 text-green-600 hover:bg-green-600/5 font-sans-luxury text-[10px] font-bold uppercase tracking-widest h-14 transition-colors"
              >
                Instant Order on WhatsApp
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 border-t border-stone-200/50 mt-8 pt-6 text-[10px] font-sans-luxury text-stone-500 uppercase tracking-widest text-center">
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>100% Organic</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Truck className="w-5 h-5 text-amber-600" />
                <span>Express Mbeya</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RotateCcw className="w-5 h-5 text-amber-600" />
                <span>Fresh Guarantee</span>
              </div>
            </div>

          </div>
        </div>

        {/* Collapsible details accordion tabs */}
        <div className="border-t border-stone-200 mt-20 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* Tabs Trigger List */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 border-b lg:border-b-0 border-stone-200 lg:border-r border-stone-200 pb-4 lg:pb-0 lg:pr-6">
              {[
                { id: 'ingredients', label: 'Ingredients & Sourcing' },
                { id: 'process', label: 'Baking & Kitchen Process' },
                { id: 'delivery', label: 'Delivery & Local Pickups' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`font-sans-luxury text-[11px] font-bold uppercase tracking-wider text-left px-4 py-3.5 border-b-2 lg:border-b-0 lg:border-l-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-amber-600 text-amber-700 font-black'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div className="lg:col-span-8 text-stone-600 text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
              <AnimatePresence mode="wait">
                {activeTab === 'ingredients' && (
                  <motion.div
                    key="ingredients"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p>We believe in pure sourcing. This delicacy contains premium, hand-picked ingredients including organic flour, unrefined sugars, and direct-trade cocoa. No artificial enhancers or generic hydrogenated creams are used in our kitchens.</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Pure Madagascar vanilla bean extracts</li>
                      <li>High-fat unsalted butter (82% butterfat)</li>
                      <li>Fresh dairy creams sourced from local Mbeya milk cooperatives</li>
                      <li>Swahili-coast cinnamon, cardamon, and natural honey sweeteners</li>
                    </ul>
                  </motion.div>
                )}

                {activeTab === 'process' && (
                  <motion.div
                    key="process"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p>Every cake is baked completely from scratch on the day of delivery. We maintain a temperature-controlled kitchen setup to ensure the precise setting of whipped creams and dark chocolate ganache spreads.</p>
                    <p>The baking process spans 4-6 hours from raw mixing to the final touch of the cake artist. Our master kitchen in Forest Area, Mbeya, adheres to international sanitation and gourmet food preservation regulations.</p>
                  </motion.div>
                )}

                {activeTab === 'delivery' && (
                  <motion.div
                    key="delivery"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p>We provide temperature-controlled deliveries across Mbeya Central District, Forest Area, Referral Hospital regions, and neighboring zones. Due to the delicate nature of pastry decorations, our team uses custom shock-absorbent boxes and cooling carriers.</p>
                    <p>Deliveries are executed from 9:00 AM to 8:00 PM daily. Pickups can also be arranged directly at our Referral Area bakery counter at designated time slots.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Cross-sells Section: Complete the Moment */}
        <div className="border-t border-stone-200 mt-20 pt-16">
          <h2 className="font-serif-luxury text-stone-900 text-2xl font-bold mb-10 text-center">
            Complete the Moment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {crossSells.map((cross) => (
              <div key={cross.id} className="bg-white border border-stone-200 p-4 flex gap-4 items-center">
                <div className="relative w-24 aspect-square overflow-hidden bg-stone-50">
                  <Image src={cross.image} alt={cross.name} fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="font-sans-luxury text-[8px] font-bold text-amber-700 uppercase tracking-widest">{cross.category}</span>
                  <h4 className="font-serif-luxury text-base font-bold text-stone-950">{cross.name}</h4>
                  <p className="font-sans-luxury text-xs font-bold text-stone-900">{cross.priceString}</p>
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      id: cross.id,
                      name: cross.name,
                      price: cross.price,
                      priceString: cross.priceString,
                      image: cross.image,
                      category: cross.category,
                    })
                  }
                  className="font-sans-luxury text-[9px] font-bold uppercase tracking-widest bg-stone-950 text-white px-4 py-3.5 hover:bg-amber-600 transition-colors"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

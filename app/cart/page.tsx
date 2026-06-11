'use client';

import { useCart } from '@/lib/cart-context';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [orderNotes, setOrderNotes] = useState('');

  // Surcharge/shipping cost estimate (simulated)
  const deliveryFee = cartItems.length > 0 ? 5000 : 0;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium max-w-5xl">
        
        {/* Page Title */}
        <div className="mb-12 border-b border-stone-200/50 pb-6 flex items-baseline justify-between">
          <h1 className="font-serif-luxury text-stone-900 text-3xl md:text-5xl font-bold">
            Shopping Bag
          </h1>
          <Link href="/shop" className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Continue Browsing
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-24 text-center space-y-6 bg-white border border-stone-200 p-8">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
            <h2 className="font-serif-luxury text-2xl font-bold text-stone-900">Your bag is empty</h2>
            <p className="text-stone-500 text-xs max-w-xs mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
              Browse our artisan collections to find cakes, pastries, grilled delicacies, and juices.
            </p>
            <div className="pt-2">
              <Link href="/shop" className="premium-btn-primary">
                Return to Shop
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Cart Items (col-span-7) */}
            <div className="lg:col-span-7 space-y-6 bg-white border border-stone-200 p-6 md:p-8">
              <h2 className="font-sans-luxury text-[11px] font-black uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4 mb-6">
                Order Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>

              <div className="space-y-6 divide-y divide-stone-100">
                {cartItems.map((item, idx) => (
                  <div key={`${item.id}-${item.selectedSize}`} className={`flex gap-4 ${idx > 0 ? 'pt-6' : ''}`}>
                    <div className="relative w-20 h-20 overflow-hidden bg-stone-50 border border-stone-200 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif-luxury text-base font-bold text-stone-950 leading-tight">
                            {item.name}
                          </h3>
                          <span className="font-sans-luxury text-sm font-bold text-stone-950">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                        {item.selectedSize && (
                          <span className="font-sans-luxury text-[9px] uppercase tracking-wider text-amber-700 font-bold block mt-1">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.customMessage && (
                          <span className="text-[10px] text-stone-500 italic block mt-1 bg-stone-50 px-2 py-1 border border-stone-100">
                            Message: "{item.customMessage}"
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-stone-200 bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)}
                            className="px-2.5 py-1 text-stone-500 hover:text-stone-900 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-stone-900 font-sans-luxury min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                            className="px-2.5 py-1 text-stone-500 hover:text-stone-900 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Trash */}
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="text-stone-400 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Notes */}
              <div className="pt-8 border-t border-stone-200/60 mt-8 space-y-3">
                <label className="premium-label">Special Baker Instructions / Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Please wrap the boxes individually or deliver at exactly 2:00 PM."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="premium-input text-xs resize-none"
                />
              </div>
            </div>

            {/* Right Column: Totals summary (col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-stone-200 p-6 md:p-8 space-y-6">
                <h2 className="font-sans-luxury text-[11px] font-black uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4">
                  Summary
                </h2>

                <div className="space-y-4 text-xs font-sans-luxury text-stone-600 tracking-wider">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span className="text-stone-950 font-bold">{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ESTIMATED DELIVERY</span>
                    <span className="text-stone-950 font-bold">{formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="border-t border-stone-100 pt-4 flex justify-between text-sm text-stone-950 font-bold">
                    <span>GRAND TOTAL</span>
                    <span className="text-amber-700 font-black text-lg">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/checkout?notes=${encodeURIComponent(orderNotes)}`}
                    className="w-full text-center premium-btn-primary h-14 flex items-center justify-center"
                  >
                    PROCEED TO CHECKOUT
                  </Link>
                </div>
              </div>

              {/* Secure banner */}
              <div className="bg-stone-50 border border-stone-200 p-6 text-center text-[10px] font-sans-luxury text-stone-500 uppercase tracking-widest">
                🔒 SSL Secure Checkout & Realtime Order Tracking
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

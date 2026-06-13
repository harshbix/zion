

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

import { Link } from 'react-router-dom';
import { useCart } from '@/services/cart-context';
import { formatCurrency } from '@/services/utils';
import { WHATSAPP_NUMBER } from '@/services/whatsapp';

export default function CartDrawer() {
  const { cartItems, isOpen, setIsOpen, updateQuantity, removeFromCart, cartTotal, addToCart, clearCart } = useCart();

  // Mini upsell products
  const upsells = [
    {
      id: 'j1',
      name: 'Mango Sunrise',
      price: 8000,
      priceString: '8,000 TZS',
      category: 'juices',
      image: 'https://images.unsplash.com/photo-1546173152-fd1adac65050?w=200&h=200&fit=crop',
    },
    {
      id: 's3',
      name: 'Chocolate Croissant',
      price: 8000,
      priceString: '8,000 TZS',
      category: 'snacks',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=200&fit=crop',
    },
  ];

  const handleWhatsAppCheckout = () => {
    let message = `Hello Zion Cakes! I'd like to place an order:\n\n`;
    cartItems.forEach((item) => {
      message += `- ${item.name} (${item.selectedSize || 'Standard'}) x${item.quantity} - ${formatCurrency(item.price * item.quantity)}\n`;
      if (item.customMessage) {
        message += `  *Message on Cake: "${item.customMessage}"*\n`;
      }
    });
    message += `\nTotal: ${formatCurrency(cartTotal)}\n`;
    message += `Please confirm availability and delivery. Thank you!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex h-full w-full flex-col bg-[#FFFBF5] shadow-2xl md:max-w-md border-l border-stone-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 p-6 bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-amber-600" />
                <h2 className="font-sans-luxury text-lg font-bold uppercase tracking-widest text-stone-900">
                  Your Bag
                </h2>
                <span className="bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600 rounded-full font-sans-luxury">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-11 h-11 flex items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 active:bg-stone-200/50"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex h-96 flex-col items-center justify-center text-center p-6 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-sans-luxury text-sm font-bold text-stone-900 uppercase tracking-widest mb-2">Your Bag is Empty</h3>
                    <p className="text-stone-500 text-xs max-w-xs leading-relaxed" style={{ fontFamily: 'Inter' }}>
                      Explore our handcrafted signature cakes, freshly squeezed organic juices, and local Tanzanian bites.
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    onClick={() => setIsOpen(false)}
                    className="premium-btn-primary w-full max-w-xs text-center"
                  >
                    Explore Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}`}
                      className="flex gap-4 border-b border-stone-100 pb-5"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-stone-100 border border-stone-200">
                        <img src={item.image}
                          alt={item.name}
                          
                          className="object-cover" />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h3 className="font-sans-luxury text-sm font-bold text-stone-900 leading-tight">
                              {item.name}
                            </h3>
                            <span className="font-sans-luxury text-xs font-bold text-stone-900 ml-2">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                          {item.selectedSize && (
                            <p className="text-[11px] font-sans-luxury text-stone-500 mt-1 uppercase tracking-wider">
                              Size: {item.selectedSize}
                            </p>
                          )}
                          {item.customMessage && (
                            <p className="text-[10px] text-amber-700 mt-1 bg-amber-50/50 border border-amber-100 px-2 py-1 italic">
                              "{item.customMessage}"
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-stone-200 bg-white">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1, item.selectedSize)
                              }
                              className="w-11 h-11 flex items-center justify-center text-stone-500 hover:text-stone-900 active:bg-stone-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="px-4 text-xs font-bold text-stone-900 font-sans-luxury min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1, item.selectedSize)
                              }
                              className="w-11 h-11 flex items-center justify-center text-stone-500 hover:text-stone-900 active:bg-stone-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="w-11 h-11 flex items-center justify-center text-stone-400 hover:text-red-600 active:bg-red-50/10 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Dynamic Upsell Suggestions */}
                  <div className="border border-stone-200 bg-white/50 p-4">
                    <h4 className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-3">
                      Complete the Moment
                    </h4>
                    <div className="space-y-3">
                      {upsells.map((up) => {
                        // Only suggest if not already in cart
                        const inCart = cartItems.some((item) => item.id === up.id);
                        if (inCart) return null;

                        return (
                          <div key={up.id} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 flex-shrink-0 bg-stone-100">
                                <img src={up.image}
                                  alt={up.name}
                                  
                                  className="object-cover" />
                              </div>
                              <div>
                                <p className="font-sans-luxury text-xs font-semibold text-stone-800">
                                  {up.name}
                                </p>
                                <p className="font-sans-luxury text-[10px] text-stone-500">
                                  {up.priceString}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                addToCart({
                                  id: up.id,
                                  name: up.name,
                                  price: up.price,
                                  priceString: up.priceString,
                                  image: up.image,
                                  category: up.category,
                                })
                              }
                              className="text-[10px] font-bold text-amber-600 hover:text-amber-700 font-sans-luxury uppercase tracking-wider border border-amber-600 px-4 py-2.5 hover:bg-amber-600 hover:text-white active:scale-[0.97] transition-all duration-300 min-h-[44px] flex items-center justify-center"
                            >
                              Add
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Totals and Action Buttons */}
            {cartItems.length > 0 && (
              <div className="border-t border-stone-200 bg-white p-6 space-y-4">
                <div className="flex items-center justify-between font-sans-luxury">
                  <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                    Estimated Total
                  </span>
                  <span className="text-lg font-bold text-stone-900">
                    {formatCurrency(cartTotal)}
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 leading-normal">
                  Shipping, local delivery taxes, and personalized options are calculated at checkout.
                </p>

                <div className="grid gap-2">
                  <Link
                    to="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center bg-stone-950 hover:bg-amber-600 text-white font-sans-luxury text-xs font-bold uppercase tracking-widest py-4 transition-colors active:scale-[0.98]"
                  >
                    Proceed to Checkout
                  </Link>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full flex items-center justify-center border border-green-600 hover:bg-green-600/5 text-green-600 font-sans-luxury text-xs font-bold uppercase tracking-widest py-4 transition-colors"
                  >
                    Instant WhatsApp Checkout
                  </button>

                  <button
                    onClick={() => { clearCart(); }}
                    className="w-full flex items-center justify-center text-stone-400 hover:text-red-600 font-sans-luxury text-[10px] font-bold uppercase tracking-widest py-2 transition-colors border border-stone-200 hover:border-red-300 active:scale-[0.98]"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

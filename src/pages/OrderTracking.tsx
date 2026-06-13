

import { useOrders, OrderStatus } from '@/services/order-context';
import { formatCurrency } from '@/services/utils';
import { useState } from 'react';
import { Package, Clock, MapPin, Truck, CheckCircle2, ChevronRight, Play, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrderTrackingPage() {
  const { activeOrder, setActiveOrder, orders, updateOrderStatus } = useOrders();
  const [searchId, setSearchId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find((o) => o.id.toLowerCase() === searchId.trim().toLowerCase());
    if (found) {
      setActiveOrder(found);
      setErrorMsg('');
    } else {
      setErrorMsg('Order ID not found. Try ZION-9812 or check your Account portal.');
    }
  };

  const advanceSimulation = () => {
    if (!activeOrder) return;
    const current = activeOrder.status;
    let next: OrderStatus = current;
    if (current === 'placed') next = 'baking';
    else if (current === 'baking') next = 'quality-checked';
    else if (current === 'quality-checked') next = 'delivering';
    else if (current === 'delivering') next = 'delivered';

    updateOrderStatus(activeOrder.id, next);
  };

  // Helper to get active step index
  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed': return 0;
      case 'baking': return 1;
      case 'quality-checked': return 2;
      case 'delivering': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const steps = [
    { label: 'Placed', desc: 'Order received and queued at master kitchen.' },
    { label: 'Baking', desc: 'Bakers have started mixing, shaping, and pre-heating.' },
    { label: 'Quality Checked', desc: 'Passed evaluation for decoration, textures, and dimensions.' },
    { label: 'Out for Delivery', desc: 'In transport inside a temperature-controlled cold carrier.' },
    { label: 'Delivered', desc: 'Safely arrived at delivery address.' },
  ];

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium max-w-4xl">
        
        {/* Page Header */}
        <div className="mb-12 border-b border-stone-200/50 pb-6 flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
          <div>
            <h1 className="font-sans-luxury text-stone-900 text-3xl md:text-5xl font-bold">
              Order Tracking
            </h1>
            <p className="text-stone-500 font-sans-luxury text-xs tracking-wider uppercase mt-1">
              Watch your gourmet order advance in real-time.
            </p>
          </div>

          <Link to="/account" className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2">
            Back to Portal <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 1. Lookup Box (if no active tracking order) */}
        {!activeOrder ? (
          <div className="bg-white border border-stone-200 p-8 space-y-6 max-w-xl mx-auto">
            <div className="text-center space-y-2">
              <Package className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="font-sans-luxury text-xl font-bold text-stone-900">Track an Order</h3>
              <p className="text-stone-500 text-xs leading-relaxed max-w-xs mx-auto" style={{ fontFamily: 'Inter' }}>
                Enter the Order ID from your receipt (e.g. <strong>ZION-9812</strong>) or choose from past portal orders.
              </p>
            </div>

            <form onSubmit={handleLookup} className="space-y-4">
              <div className="space-y-2">
                <label className="premium-label">Order ID</label>
                <input
                  required
                  type="text"
                 
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="premium-input text-xs tracking-widest text-center"
                />
              </div>

              {errorMsg && (
                <p className="text-red-600 text-xs text-center font-semibold" style={{ fontFamily: 'Inter' }}>
                  {errorMsg}
                </p>
              )}

              <button type="submit" className="w-full premium-btn-primary h-14">
                LOOKUP ORDER
              </button>
            </form>
          </div>
        ) : (
          /* 2. Active Order Tracker Dashboard */
          <div className="space-y-8">
            
            {/* Simulation Banner */}
            <div className="bg-amber-50 border border-amber-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-amber-600 pulse-glow-amber" />
                <p className="text-xs text-amber-800 font-semibold" style={{ fontFamily: 'Inter' }}>
                  Demo Mode: Timeline advances automatically, or override it instantly:
                </p>
              </div>
              <button
                onClick={advanceSimulation}
                className="bg-stone-900 text-white font-sans-luxury text-[9px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-amber-600 transition-colors flex items-center gap-1.5"
              >
                Advance Step <Play className="w-3 h-3 fill-current" />
              </button>
            </div>

            {/* Active Details Card */}
            <div className="bg-white border border-stone-200 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="font-sans-luxury text-[9px] text-stone-400 block uppercase tracking-wider">TRACKING ID</span>
                <span className="font-sans-luxury text-base font-black text-stone-900">{activeOrder.id}</span>
              </div>
              <div>
                <span className="font-sans-luxury text-[9px] text-stone-400 block uppercase tracking-wider">ESTIMATED DELIVERY</span>
                <span className="font-sans-luxury text-xs font-bold text-stone-700 block mt-1">Today inside 45 mins</span>
              </div>
              <div>
                <span className="font-sans-luxury text-[9px] text-stone-400 block uppercase tracking-wider">PAYMENT MODE</span>
                <span className="font-sans-luxury text-xs font-bold text-stone-700 block mt-1">{activeOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Cinematic Vertical Timeline */}
            <div className="bg-white border border-stone-200 p-6 md:p-8 space-y-12">
              <h2 className="font-sans-luxury text-[11px] font-black uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4 mb-6">
                Culinary Milestones
              </h2>

              <div className="relative pl-8 space-y-10 border-l border-stone-200">
                {steps.map((st, sIdx) => {
                  const activeIndex = getStepIndex(activeOrder.status);
                  const isCompleted = sIdx < activeIndex;
                  const isActive = sIdx === activeIndex;

                  return (
                    <div key={sIdx} className="relative">
                      {/* Timeline dot */}
                      <span className={`absolute -left-[41px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                        isCompleted
                          ? 'bg-green-600 border-green-600 text-white'
                          : isActive
                          ? 'bg-amber-600 border-amber-600 text-white pulse-glow-amber'
                          : 'bg-white border-stone-300 text-stone-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 fill-current text-white" />
                        ) : (
                          <span className="text-[10px] font-bold">{sIdx + 1}</span>
                        )}
                      </span>

                      {/* Content details */}
                      <div className="space-y-1">
                        <h3 className={`font-sans-luxury text-lg font-bold transition-colors ${
                          isActive ? 'text-amber-700' : isCompleted ? 'text-stone-900' : 'text-stone-400'
                        }`}>
                          {st.label}
                        </h3>
                        <p className={`text-xs leading-relaxed max-w-lg transition-colors ${
                          isActive ? 'text-stone-700' : 'text-stone-400'
                        }`} style={{ fontFamily: 'Inter' }}>
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Items Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Delivery info */}
              <div className="bg-white border border-stone-200 p-6 space-y-4">
                <div className="flex items-center gap-2 text-stone-950 font-sans-luxury text-xs font-bold uppercase tracking-widest">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Delivery Address Details</span>
                </div>
                <div className="text-xs text-stone-600 space-y-1.5" style={{ fontFamily: 'Inter' }}>
                  <p className="font-bold text-stone-800 uppercase font-sans-luxury text-[10px] tracking-wider">{activeOrder.shippingDetails.name}</p>
                  <p>{activeOrder.shippingDetails.address}</p>
                  <p>{activeOrder.shippingDetails.city}, Tanzania</p>
                  <p className="pt-2 font-bold">Contact Phone: {activeOrder.shippingDetails.phone}</p>
                  {activeOrder.shippingDetails.notes && (
                    <p className="italic text-stone-500 mt-2 bg-stone-50 border border-stone-100 p-2">"Instructions: {activeOrder.shippingDetails.notes}"</p>
                  )}
                </div>
              </div>

              {/* Items summary */}
              <div className="bg-white border border-stone-200 p-6 space-y-4">
                <div className="flex items-center gap-2 text-stone-950 font-sans-luxury text-xs font-bold uppercase tracking-widest">
                  <ShoppingBag className="w-4 h-4 text-amber-600" />
                  <span>Order Items Summary</span>
                </div>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {activeOrder.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex justify-between text-xs text-stone-600" style={{ fontFamily: 'Inter' }}>
                      <span>
                        {item.name} x{item.quantity} {item.selectedSize && `(${item.selectedSize})`}
                      </span>
                      <span className="font-bold text-stone-950">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-stone-100 pt-3 flex justify-between text-xs font-sans-luxury tracking-wider font-bold">
                  <span>TOTAL CHARGED</span>
                  <span className="text-amber-700 font-black">{formatCurrency(activeOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Cancel / lookup another order actions */}
            <div className="text-center pt-4">
              <button
                onClick={() => setActiveOrder(null)}
                className="font-sans-luxury text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900"
              >
                Track a different Order ID
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

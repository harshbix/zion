'use client';

import React, { useState, Suspense } from 'react';
import { useCart } from '@/lib/cart-context';
import { useOrders } from '@/lib/order-context';
import { useToast } from '@/lib/toast-context';
import { formatCurrency } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, Smartphone, ShieldCheck, Truck, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

type PaymentType = 'card' | 'mobile' | 'cod' | 'whatsapp';

function CheckoutForm() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { placeNewOrder } = useOrders();
  const toast = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const notesParam = searchParams.get('notes') || '';

  // Form Fields
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Mbeya',
    notes: notesParam,
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentType>('card');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');

  // Card details
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
  // Mobile money
  const [mobilePhone, setMobilePhone] = useState('');

  // Inline Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryFee = cartItems.length > 0 ? 5000 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const validateField = (name: string, value: string): boolean => {
    let err = '';
    if (name === 'name') {
      if (value.trim().length < 3) err = 'Full name must be at least 3 characters.';
    } else if (name === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = 'Provide a valid email address.';
    } else if (name === 'phone') {
      // Tanzanian numbers usually match (+255 or 0) followed by 6 or 7 and 8 digits
      const cleaned = value.replace(/\s+/g, '');
      if (!/^(\+?255|0)[67]\d{8}$/.test(cleaned)) {
        err = 'Provide a valid phone number (e.g. +255 789 123 456 or 0789 123 456).';
      }
    } else if (name === 'address') {
      if (value.trim().length < 8) err = 'Address landmark must be at least 8 characters.';
    } else if (name === 'cardNumber') {
      if (value.replace(/\s/g, '').length !== 16) err = 'Provide a valid 16-digit card number.';
    } else if (name === 'cardExpiry') {
      if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value)) err = 'Use MM/YY format.';
    } else if (name === 'cardCvc') {
      if (value.length !== 3) err = 'CVC must be exactly 3 digits.';
    } else if (name === 'mobilePhone') {
      const cleaned = value.replace(/\s+/g, '');
      if (!/^(\+?255|0)[67]\d{8}$/.test(cleaned)) {
        err = 'Provide a valid Mobile Wallet number (e.g., 0789 123 456).';
      }
    }

    setErrors((prev) => ({ ...prev, [name]: err }));
    return err === '';
  };

  const handleFieldChange = (field: string, value: string) => {
    if (field in shippingDetails) {
      setShippingDetails((prev) => ({ ...prev, [field]: value }));
    }
    validateField(field, value);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Add products before checkout.');
      return;
    }

    // Validate main shipping details
    const isNameValid = validateField('name', shippingDetails.name);
    const isEmailValid = validateField('email', shippingDetails.email);
    const isPhoneValid = validateField('phone', shippingDetails.phone);
    const isAddressValid = validateField('address', shippingDetails.address);

    let isPaymentValid = true;
    if (paymentMethod === 'card') {
      const isCardNum = validateField('cardNumber', cardDetails.number);
      const isCardExp = validateField('cardExpiry', cardDetails.expiry);
      const isCardCvc = validateField('cardCvc', cardDetails.cvc);
      isPaymentValid = isCardNum && isCardExp && isCardCvc;
    } else if (paymentMethod === 'mobile') {
      isPaymentValid = validateField('mobilePhone', mobilePhone);
    }

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isAddressValid || !isPaymentValid) {
      toast.error('Please resolve validation errors in the form.');
      return;
    }

    if (paymentMethod === 'whatsapp') {
      handleWhatsAppExport();
      return;
    }

    setLoading(true);

    // Simulate luxury verification
    setTimeout(() => {
      const orderItems = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        customMessage: item.customMessage,
      }));

      const newOrder = placeNewOrder({
        items: orderItems,
        total: grandTotal,
        shippingDetails: shippingDetails,
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card'
            : paymentMethod === 'mobile'
            ? 'Mobile Money'
            : 'Cash on Delivery',
      });

      setCreatedOrderId(newOrder.id);
      setLoading(false);
      setSuccess(true);
      clearCart();
      toast.success('Your order has been authorized and sent to our kitchens!');
    }, 2000);
  };

  const handleWhatsAppExport = () => {
    let text = `Hello Zion Cakes! I want to complete my order via WhatsApp:\n\n`;
    text += `Customer: ${shippingDetails.name}\n`;
    text += `Phone: ${shippingDetails.phone}\n`;
    text += `Delivery Address: ${shippingDetails.address}, ${shippingDetails.city}\n`;
    if (shippingDetails.notes) {
      text += `Notes: "${shippingDetails.notes}"\n`;
    }
    text += `\nItems:\n`;
    cartItems.forEach((item) => {
      text += `- ${item.name} (${item.selectedSize || 'Standard'}) x${item.quantity} - ${formatCurrency(item.price * item.quantity)}\n`;
      if (item.customMessage) {
        text += `  *Engraving: "${item.customMessage}"*\n`;
      }
    });
    text += `\nTotal (with Delivery): ${formatCurrency(grandTotal)}\n`;
    text += `Payment Method: WhatsApp Checkout\n`;

    const url = `https://wa.me/255789123456?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  if (success) {
    return (
      <div className="py-16 text-center space-y-6 max-w-md mx-auto">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
        <h2 className="font-sans-luxury text-2xl font-bold text-stone-900 uppercase tracking-widest">Payment Confirmed</h2>
        <p className="text-stone-500 text-xs leading-relaxed" style={{ fontFamily: 'Inter' }}>
          Your order <strong>#{createdOrderId}</strong> has been successfully received by our Mbeya kitchens. Our bakers have started pre-heating the ovens.
        </p>
        <div className="pt-6 flex flex-col gap-3">
          <button
            onClick={() => router.push(`/order-tracking`)}
            className="w-full premium-btn-primary h-14"
          >
            Track Your Baking Progress
          </button>
          <Link href="/shop" className="text-xs font-sans-luxury font-bold text-stone-500 uppercase hover:text-stone-900 tracking-widest pt-2">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left Column: Form Details (col-span-7) */}
      <div className="lg:col-span-7 space-y-8 bg-white border border-stone-200 p-6 md:p-8">
        
        {/* Shipping details */}
        <div className="space-y-6">
          <h2 className="font-sans-luxury text-xs font-black uppercase tracking-widest text-stone-950 border-b border-stone-100 pb-4">
            1. Client & Delivery Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="premium-label">Full Name</label>
              <input
                required
                type="text"
                placeholder="John Doe"
                value={shippingDetails.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                className={`premium-input text-xs uppercase tracking-wider ${errors.name ? 'error-input' : ''}`}
              />
              {errors.name && (
                <span className="text-[10px] text-red-600 font-semibold tracking-wide flex items-center gap-1 mt-1 font-sans-luxury uppercase">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.name}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <label className="premium-label">Email Address</label>
              <input
                required
                type="email"
                placeholder="john@example.com"
                value={shippingDetails.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                className={`premium-input text-xs uppercase tracking-wider ${errors.email ? 'error-input' : ''}`}
              />
              {errors.email && (
                <span className="text-[10px] text-red-600 font-semibold tracking-wide flex items-center gap-1 mt-1 font-sans-luxury uppercase">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="premium-label">Phone Number</label>
              <input
                required
                type="tel"
                placeholder="+255 789 123 456"
                value={shippingDetails.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                className={`premium-input text-xs uppercase tracking-wider ${errors.phone ? 'error-input' : ''}`}
              />
              {errors.phone && (
                <span className="text-[10px] text-red-600 font-semibold tracking-wide flex items-center gap-1 mt-1 font-sans-luxury uppercase">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.phone}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <label className="premium-label">City</label>
              <input
                required
                disabled
                type="text"
                value={shippingDetails.city}
                className="premium-input text-xs uppercase tracking-wider bg-stone-50 border-stone-200 text-stone-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="premium-label">Delivery Address / Landmark</label>
            <input
              required
              type="text"
              placeholder="e.g. Forest Area, Landmark near Referral Hospital Plot 14"
              value={shippingDetails.address}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              className={`premium-input text-xs uppercase tracking-wider ${errors.address ? 'error-input' : ''}`}
            />
            {errors.address && (
              <span className="text-[10px] text-red-600 font-semibold tracking-wide flex items-center gap-1 mt-1 font-sans-luxury uppercase">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.address}
              </span>
            )}
          </div>
        </div>

        {/* Payment options */}
        <div className="space-y-6 border-t border-stone-100 pt-8">
          <h2 className="font-sans-luxury text-xs font-black uppercase tracking-widest text-stone-950 border-b border-stone-100 pb-4">
            2. Choose Secure Payment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Credit card option */}
            <button
              type="button"
              onClick={() => { setPaymentMethod('card'); setErrors({}); }}
              className={`p-5 border flex items-center gap-4 text-left transition-all min-h-[44px] ${
                paymentMethod === 'card' ? 'border-amber-600 bg-amber-50/10' : 'border-stone-200 hover:border-stone-900 bg-white'
              }`}
            >
              <CreditCard className="w-5 h-5 text-amber-700 flex-shrink-0" />
              <div>
                <h4 className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-900">Credit / Debit Card</h4>
                <p className="text-[10px] text-stone-500 font-sans-luxury uppercase mt-0.5 tracking-wider">Visa, Mastercard</p>
              </div>
            </button>

            {/* Mobile money option */}
            <button
              type="button"
              onClick={() => { setPaymentMethod('mobile'); setErrors({}); }}
              className={`p-5 border flex items-center gap-4 text-left transition-all min-h-[44px] ${
                paymentMethod === 'mobile' ? 'border-amber-600 bg-amber-50/10' : 'border-stone-200 hover:border-stone-900 bg-white'
              }`}
            >
              <Smartphone className="w-5 h-5 text-amber-700 flex-shrink-0" />
              <div>
                <h4 className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-900">Mobile Money</h4>
                <p className="text-[10px] text-stone-500 font-sans-luxury uppercase mt-0.5 tracking-wider">M-Pesa, Tigo Pesa</p>
              </div>
            </button>

            {/* Cash on delivery */}
            <button
              type="button"
              onClick={() => { setPaymentMethod('cod'); setErrors({}); }}
              className={`p-5 border flex items-center gap-4 text-left transition-all min-h-[44px] ${
                paymentMethod === 'cod' ? 'border-amber-600 bg-amber-50/10' : 'border-stone-200 hover:border-stone-900 bg-white'
              }`}
            >
              <Truck className="w-5 h-5 text-amber-700 flex-shrink-0" />
              <div>
                <h4 className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-900">Cash on Delivery</h4>
                <p className="text-[10px] text-stone-500 font-sans-luxury uppercase mt-0.5 tracking-wider">Pay upon courier delivery</p>
              </div>
            </button>

            {/* WhatsApp Checkout */}
            <button
              type="button"
              onClick={() => { setPaymentMethod('whatsapp'); setErrors({}); }}
              className={`p-5 border flex items-center gap-4 text-left transition-all min-h-[44px] ${
                paymentMethod === 'whatsapp' ? 'border-amber-600 bg-amber-50/10' : 'border-stone-200 hover:border-stone-900 bg-white'
              }`}
            >
              <Image src="/logo.png" alt="WA Logo" width={20} height={20} className="object-contain" />
              <div>
                <h4 className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-900">WhatsApp Checkout</h4>
                <p className="text-[10px] text-stone-500 font-sans-luxury uppercase mt-0.5 tracking-wider">Checkout via chat support</p>
              </div>
            </button>
          </div>

          {/* Payment input fields container */}
          <div className="bg-stone-50 border border-stone-200 p-6 mt-4">
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="premium-label">Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={cardDetails.number}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 16);
                      setCardDetails({ ...cardDetails, number: val });
                      validateField('cardNumber', val);
                    }}
                    className={`premium-input text-xs tracking-widest ${errors.cardNumber ? 'error-input' : ''}`}
                  />
                  {errors.cardNumber && (
                    <span className="text-[10px] text-red-600 font-semibold tracking-wide flex items-center gap-1 mt-1 font-sans-luxury uppercase">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.cardNumber}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="premium-label">Expiration Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => {
                        const val = e.target.value.slice(0, 5);
                        setCardDetails({ ...cardDetails, expiry: val });
                        validateField('cardExpiry', val);
                      }}
                      className={`premium-input text-xs tracking-widest ${errors.cardExpiry ? 'error-input' : ''}`}
                    />
                    {errors.cardExpiry && (
                      <span className="text-[10px] text-red-600 font-semibold tracking-wide flex items-center gap-1 mt-1 font-sans-luxury uppercase">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.cardExpiry}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="premium-label">CVC / CVV</label>
                    <input
                      type="password"
                      required
                      placeholder="123"
                      value={cardDetails.cvc}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
                        setCardDetails({ ...cardDetails, cvc: val });
                        validateField('cardCvc', val);
                      }}
                      className={`premium-input text-xs tracking-widest ${errors.cardCvc ? 'error-input' : ''}`}
                    />
                    {errors.cardCvc && (
                      <span className="text-[10px] text-red-600 font-semibold tracking-wide flex items-center gap-1 mt-1 font-sans-luxury uppercase">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.cardCvc}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'mobile' && (
              <div className="space-y-4">
                <p className="text-xs text-stone-600 leading-relaxed" style={{ fontFamily: 'Inter' }}>
                  We will trigger a simulated mobile push prompt. Enter your M-Pesa or Tigo Pesa phone number below to receive the transaction query.
                </p>
                <div className="space-y-2">
                  <label className="premium-label">Mobile Wallet Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="0789 123 456"
                    value={mobilePhone}
                    onChange={(e) => {
                      const val = e.target.value;
                      setMobilePhone(val);
                      validateField('mobilePhone', val);
                    }}
                    className={`premium-input text-xs tracking-wider ${errors.mobilePhone ? 'error-input' : ''}`}
                  />
                  {errors.mobilePhone && (
                    <span className="text-[10px] text-red-600 font-semibold tracking-wide flex items-center gap-1 mt-1 font-sans-luxury uppercase">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.mobilePhone}
                    </span>
                  )}
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <p className="text-xs text-stone-600 leading-relaxed" style={{ fontFamily: 'Inter' }}>
                Your order is processed instantly. You will pay the delivery courier in cash or mobile money upon receiving your fresh bakes box.
              </p>
            )}

            {paymentMethod === 'whatsapp' && (
              <p className="text-xs text-stone-600 leading-relaxed" style={{ fontFamily: 'Inter' }}>
                Clicking the checkout button below will export your cart, shipping details, and items list, and redirect you directly to a WhatsApp chat thread to finalize.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Right Column: Totals (col-span-5) */}
      <div className="lg:col-span-5 space-y-6 sticky top-28">
        <div className="bg-white border border-stone-200 p-6 md:p-8 space-y-6">
          <h2 className="font-sans-luxury text-[11px] font-black uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4">
            Order Items
          </h2>

          <div className="max-h-48 overflow-y-auto space-y-4 pr-2 divide-y divide-stone-50">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${item.selectedSize}`} className={`flex gap-3 items-center justify-between ${index > 0 ? 'pt-3' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 overflow-hidden bg-stone-50 border border-stone-200">
                    <Image src={item.image} alt={item.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-sans-luxury text-xs font-bold text-stone-900 leading-tight">{item.name}</h4>
                    <p className="text-[9px] font-sans-luxury text-stone-400 mt-0.5">X{item.quantity} {item.selectedSize && `(${item.selectedSize})`}</p>
                  </div>
                </div>
                <span className="font-sans-luxury text-xs font-bold text-stone-900">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-200/60 pt-6 space-y-3 font-sans-luxury text-xs text-stone-600 tracking-wider">
            <div className="flex justify-between">
              <span>SUBTOTAL</span>
              <span className="text-stone-900 font-bold">{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>ESTIMATED DELIVERY</span>
              <span className="text-stone-900 font-bold">{formatCurrency(deliveryFee)}</span>
            </div>
            <div className="border-t border-stone-100 pt-4 flex justify-between text-sm text-stone-900 font-bold">
              <span>TOTAL DUE</span>
              <span className="text-amber-700 font-black text-lg">{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <button
            disabled={loading || cartItems.length === 0}
            type="submit"
            className="w-full premium-btn-primary h-14 flex items-center justify-center select-none active:scale-[0.98]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : paymentMethod === 'whatsapp' ? (
              'EXPORT & CHECKOUT VIA WHATSAPP'
            ) : (
              'AUTHORIZE PAYMENT & PLACE ORDER'
            )}
          </button>
        </div>

        <div className="bg-stone-50 border border-stone-200 p-6 flex items-start gap-4 text-stone-500">
          <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div className="space-y-1">
            <h4 className="font-sans-luxury text-[9px] font-bold uppercase tracking-widest text-stone-900">SSL Encryption Secure</h4>
            <p className="text-[10px] leading-normal" style={{ fontFamily: 'Inter' }}>Your credit card details are encrypted and processed locally inside your browser sandbox.</p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium max-w-6xl">
        
        {/* Breadcrumbs */}
        <div className="mb-12 border-b border-stone-200/50 pb-6 flex items-baseline justify-between">
          <h1 className="font-sans-luxury text-stone-900 text-3xl md:text-5xl font-bold uppercase tracking-wide">
            Checkout
          </h1>
          <Link href="/cart" className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Bag
          </Link>
        </div>

        <Suspense fallback={
          <div className="py-24 text-center">
            <span className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin inline-block" />
            <p className="text-stone-500 font-sans-luxury text-xs tracking-widest uppercase mt-4">Loading Secure Checkout...</p>
          </div>
        }>
          <CheckoutForm />
        </Suspense>

      </div>
    </div>
  );
}

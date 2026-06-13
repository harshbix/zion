import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How do I place an order for a custom celebration cake?',
      a: 'You can order custom cakes directly through our shop catalog by selecting the desired cake type and adding a custom message (inscription) in the custom message field. For complex, multi-tiered bespoke designs, please contact our support team via WhatsApp or the contact form, and we will get back to you with a direct design layout and quote.',
    },
    {
      q: 'Do you deliver in Mbeya, and what are the charges?',
      a: 'Yes! We deliver all cakes, meals, snacks, and juices across Mbeya city. Delivery is free for central Forest Area, and has a small calculated transit surcharge for peripheral zones. All delivery coordinates and estimated drop times will be simulated and confirmed upon placing your order.',
    },
    {
      q: 'What is your lead time for cake baking?',
      a: 'We require a minimum lead time of 24 hours for standard custom celebration cakes. For urgent same-day orders, please call us directly to see what fresh items we have ready in our display counter. Large custom event or wedding cakes require at least 3 to 5 days notice.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Cash on Delivery (CoD) and Mobile Money (M-Pesa, Tigopesa, Airtel Money). Credit card credentials entered on checkout are processed safely inside local sandbox environments for authorization simulation.',
    },
    {
      q: 'Can I cancel or modify my order?',
      a: 'Orders can be modified or cancelled up to 18 hours before the scheduled delivery time. Since our cakes are custom-baked to order, cancellations made less than 12 hours before delivery cannot be refunded as ingredients are already prepped and baking is in progress.',
    },
  ];

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium max-w-4xl">
        
        {/* Page Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            HAVE QUESTIONS?
          </span>
          <h1 className="font-sans-luxury text-stone-900 leading-tight text-5xl md:text-6xl font-black">
            Frequently Asked
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Find answers to common questions about custom orders, delivery services, baking timelines, and payment options.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-stone-200/60 transition-all duration-300"
              >
                {/* Header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer hover:bg-stone-50/50 transition-colors"
                >
                  <span className="font-sans-luxury text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-3">
                    <HelpCircle className={`w-4.5 h-4.5 shrink-0 ${isOpen ? 'text-amber-600' : 'text-stone-400'}`} />
                    {faq.q}
                  </span>
                  <span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Plus className="w-4 h-4 text-stone-400 hover:text-stone-900" />
                    )}
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div 
                        className="px-6 pb-6 pt-2 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100" 
                        style={{ fontFamily: 'Inter' }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-12 text-center p-8 bg-amber-50 border border-amber-100/50">
          <p className="font-sans-luxury text-xs font-bold uppercase tracking-wider text-stone-800">
            Still have questions?
          </p>
          <p className="text-[11px] text-stone-500 mt-1 max-w-md mx-auto" style={{ fontFamily: 'Inter' }}>
            Our support team is available from 8:00 AM to 10:00 PM to help you with orders and requests.
          </p>
          <div className="mt-4">
            <a
              href="https://wa.me/255789123456"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-amber-600 hover:bg-amber-700 text-stone-950 text-[9px] font-bold uppercase tracking-widest px-6 py-3 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';

type FAQItem = {
  question: string;
  answer: string;
  category: 'ordering' | 'delivery' | 'ingredients' | 'payments';
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'ordering', label: 'Ordering & Customizing' },
    { id: 'delivery', label: 'Delivery & Pickup' },
    { id: 'ingredients', label: 'Ingredients & Allergen info' },
    { id: 'payments', label: 'Payments & Operations' },
  ];

  const faqs: FAQItem[] = [
    {
      question: 'How far in advance do I need to order a custom cake?',
      answer: 'For standard cakes from our signature collection, we require at least 12-24 hours notice. For complex custom designs, weddings, or large corporate celebrations, we highly recommend placing your order 3-5 days in advance so we can reserve a baking slot and secure specialized ingredients.',
      category: 'ordering',
    },
    {
      question: 'Can I add a custom inscription or message onto my cake?',
      answer: 'Yes, absolutely. When viewing any cake in our shop, you will find a "Custom Message on Cake" field where you can input inscriptions (up to 35 characters). Our master cake artists will paint this text by hand using organic cream layers.',
      category: 'ordering',
    },
    {
      question: 'Where do you deliver in Mbeya, and what are the delivery hours?',
      answer: 'We deliver daily from 9:00 AM to 8:00 PM across Mbeya Central District, Forest Area, referral hospital areas, and immediate suburbs. We use shock-absorbent coolers to transport pastries safely. You can also pick up orders directly at our Referral counter.',
      category: 'delivery',
    },
    {
      question: 'Do you offer same-day deliveries?',
      answer: 'Yes, same-day delivery is available for select items (juices, snacks, grilled chicken plates, and pre-baked signature slices) if ordered before 2:00 PM. Customized celebration cakes always require a minimum 12-hour preparation timeline.',
      category: 'delivery',
    },
    {
      question: 'Do you use hydrogenated fats or artificial colorings?',
      answer: 'Never. One of our founding principles is purity. We use pure dairy cream, organic butter, and Swahili-coast unrefined spices. All colors are derived from natural fruit extracts (like strawberry slices for reds, mango pulp for yellow tones).',
      category: 'ingredients',
    },
    {
      question: 'What payment options do you support at checkout?',
      answer: 'We support secure online checkout with simulated credit/debit card processing, Mobile Money (M-Pesa, Tigo-Pesa, Airtel Money), Cash on Delivery, or completing your order via instant export to WhatsApp support chat.',
      category: 'payments',
    },
    {
      question: 'Can I modify or cancel my order after payment?',
      answer: 'Because our gourmet orders are made to order, cancelations and full refunds are only allowed up to 24 hours before your scheduled delivery slot. Within 24 hours, ingredients have already been prepped, and cancellations are subject to a 50% fee.',
      category: 'payments',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => activeCategory === 'all' || faq.category === activeCategory);

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium max-w-4xl">
        
        {/* Page Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            HAVE QUESTIONS?
          </span>
          <h1 className="font-serif-luxury text-stone-900 leading-tight">
            Frequently Answered
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Browse answers regarding custom bake times, regional delivery routes, organic ingredients, and mobile money payments.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`font-sans-luxury text-[9px] font-bold uppercase tracking-wider px-5 py-2.5 transition-colors border ${
                activeCategory === cat.id
                  ? 'bg-stone-900 border-stone-900 text-white'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-950'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion Grid */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="bg-white border border-stone-200">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-stone-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <h3 className="font-serif-luxury text-base font-bold text-stone-950">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-stone-100"
                    >
                      <div className="p-6 text-stone-600 text-xs md:text-sm leading-relaxed bg-[#FFFDF9]/60" style={{ fontFamily: 'Inter' }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-20 border border-stone-200 bg-white p-8 text-center space-y-4 max-w-2xl mx-auto">
          <MessageSquare className="w-8 h-8 text-amber-600 mx-auto" />
          <h3 className="font-serif-luxury text-xl font-bold text-stone-900">Still seeking answers?</h3>
          <p className="text-stone-500 text-xs max-w-md mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Our support desk responds instantly on WhatsApp. Ask about wedding custom quotes, special catering services, or modify orders in progress.
          </p>
          <div className="pt-2">
            <Link href="/contact" className="premium-btn-primary bg-amber-600 border border-amber-600 hover:bg-stone-950">
              Get in Touch
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

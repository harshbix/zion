import React, { useState } from 'react';
import { businessData } from '@/services/data';
import { useToast } from '@/services/toast-context';
import { Phone, Mail, MessageSquare, Clock, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill in all form fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Thank you! Your support ticket has been received.');
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium">
        
        {/* Page Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            WE ARE HERE TO HELP
          </span>
          <h1 className="font-sans-luxury text-stone-900 leading-tight text-5xl md:text-6xl font-black">
            Support & Contact
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Get in touch with our bakers and support desk. We respond to custom requests and feedback instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-stone-200 p-8 space-y-6">
            <h3 className="font-sans-luxury text-lg font-bold text-stone-900 uppercase tracking-widest border-b border-stone-100 pb-3">
              Send Support Request
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[9px] font-bold text-stone-500 uppercase tracking-widest">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-stone-50 border border-stone-250/60 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 focus:bg-white rounded-none"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] font-bold text-stone-500 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-stone-50 border border-stone-250/60 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 focus:bg-white rounded-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] font-bold text-stone-500 uppercase tracking-widest">
                  Detailed Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full bg-stone-50 border border-stone-250/60 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 focus:bg-white rounded-none resize-none"
                  placeholder="How can we assist you? Describe your order, reservation, or issue here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-stone-950 hover:bg-amber-600 hover:text-stone-950 text-white text-[10px] font-bold uppercase tracking-widest py-4 transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Submit Support Request
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white border border-stone-200 p-6 space-y-5">
              <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-100 pb-2.5">
                Contact Details
              </h4>
              <div className="space-y-4">
                <a
                  href={`tel:${businessData.contact.phone}`}
                  className="flex items-center gap-4 text-xs font-bold text-stone-700 hover:text-amber-600 transition-colors uppercase tracking-wider"
                >
                  <div className="p-2 bg-amber-50 border border-amber-100 rounded text-amber-700">
                    <Phone className="w-4 h-4" />
                  </div>
                  {businessData.contact.phone}
                </a>
                
                <a
                  href={`mailto:${businessData.contact.email}`}
                  className="flex items-center gap-4 text-xs font-bold text-stone-700 hover:text-amber-600 transition-colors uppercase tracking-wider"
                >
                  <div className="p-2 bg-amber-50 border border-amber-100 rounded text-amber-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  {businessData.contact.email}
                </a>

                <a
                  href={businessData.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-xs font-bold text-stone-700 hover:text-emerald-600 transition-colors uppercase tracking-wider"
                >
                  <div className="p-2 bg-emerald-50 border border-emerald-100 rounded text-emerald-700">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Hours & Location Card */}
            <div className="bg-white border border-stone-200 p-6 space-y-5">
              <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-100 pb-2.5">
                Baking Hours & Location
              </h4>
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-4 text-stone-600">
                  <div className="p-2 bg-stone-50 border border-stone-200/50 rounded shrink-0">
                    <MapPin className="w-4 h-4 text-stone-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-stone-900 uppercase tracking-wider">Address</p>
                    <p style={{ fontFamily: 'Inter' }} className="leading-relaxed">{businessData.location.address}</p>
                    <p style={{ fontFamily: 'Inter' }} className="text-[10px] text-amber-700 font-semibold">{businessData.location.landmark}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-stone-600">
                  <div className="p-2 bg-stone-50 border border-stone-200/50 rounded shrink-0">
                    <Clock className="w-4 h-4 text-stone-500" />
                  </div>
                  <div className="space-y-1 w-full">
                    <p className="font-bold text-stone-900 uppercase tracking-wider">Opening Hours</p>
                    <div className="divide-y divide-stone-100/50 text-[11px] font-semibold text-stone-500 space-y-1 pt-1">
                      <div className="flex justify-between py-1"><span>Mon - Thu</span><span>{businessData.hours.monday}</span></div>
                      <div className="flex justify-between py-1"><span>Fri - Sat</span><span>{businessData.hours.friday}</span></div>
                      <div className="flex justify-between py-1"><span>Sunday</span><span>{businessData.hours.sunday}</span></div>
                    </div>
                  </div>
                </div>

                {/* Embedded Map Panel */}
                <div className="w-full h-44 border border-stone-200 mt-4 overflow-hidden relative">
                  <iframe
                    title="Zion Location Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src="https://maps.google.com/maps?q=-8.9119495,33.4468727&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  />
                </div>
                <div className="pt-2 text-center">
                  <a
                    href="https://share.google/oO0VEODL3QWXZEcgI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] text-amber-700 hover:text-amber-800 font-bold uppercase tracking-wider transition-colors"
                  >
                    Open Live Location in Google Maps ➔
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

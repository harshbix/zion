'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle } from 'lucide-react';
import { businessData } from '@/lib/data';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium">
        
        {/* Page Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans-luxury text-xs font-black text-amber-600 uppercase tracking-[0.3em]">
            CONNECT WITH US
          </span>
          <h1 className="font-serif-luxury text-stone-900 leading-tight">
            Get in Touch
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Reach out regarding wholesale orders, corporate events catering, custom wedding designs, or general kitchen feedback.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Inquiry Form (col-span-7) */}
          <div className="lg:col-span-7 bg-white border border-stone-200 p-8">
            <h2 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">
              Send an Inquiry
            </h2>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="premium-label">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="premium-input text-xs uppercase tracking-wider"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="premium-label">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="premium-input text-xs uppercase tracking-wider"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="premium-label">Subject of Inquiry</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Wedding Custom Order Request"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="premium-input text-xs uppercase tracking-wider"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="premium-label">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your plans, dietary preferences, or order questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="premium-input text-xs uppercase tracking-wider resize-none"
                    />
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full premium-btn-primary h-14 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        SUBMIT INQUIRY <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                  <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">Inquiry Received</h3>
                  <p className="text-stone-500 text-xs max-w-sm mx-auto leading-relaxed" style={{ fontFamily: 'Inter' }}>
                    Thank you. Your inquiry has been logged in our system. A Zion baker or customer manager will reach out within 2 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="font-sans-luxury text-[10px] font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Address/Hours/Map (col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-stone-200 p-8 space-y-6">
              <h2 className="font-serif-luxury text-2xl font-bold text-stone-900 border-b border-stone-100 pb-4">
                Bakery Details
              </h2>
              
              <div className="space-y-6 text-sm text-stone-600">
                {/* Location */}
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-wider text-stone-900">Location Address</h4>
                    <p className="text-xs" style={{ fontFamily: 'Inter' }}>{businessData.location.address}</p>
                    <p className="text-[10px] text-stone-400 font-sans-luxury tracking-wider">NEAR REFERRAL HOSPITAL, FOREST AREA</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-wider text-stone-900">Phone & WhatsApp</h4>
                    <p className="text-xs" style={{ fontFamily: 'Inter' }}>{businessData.contact.phone}</p>
                    <p className="text-[10px] text-stone-400 font-sans-luxury tracking-wider">AVAILABLE 24/7 FOR INQUIRIES</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4 items-start">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-wider text-stone-900">Kitchen Operating Hours</h4>
                    <div className="text-xs space-y-1 text-stone-500" style={{ fontFamily: 'Inter' }}>
                      <p>Mon - Thu: 8:00 AM - 10:00 PM</p>
                      <p>Fri - Sat: 8:00 AM - 11:00 PM</p>
                      <p>Sunday: 10:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <div className="relative aspect-[4/3] overflow-hidden border border-stone-200 p-2 bg-white">
              <div className="relative w-full h-full bg-stone-100">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${businessData.location.lat},${businessData.location.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

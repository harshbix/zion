'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { WHATSAPP_URLS } from '@/lib/whatsapp';
import Link from 'next/link';
import { businessData } from '@/lib/data';

export default function LocationSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 md:py-32 bg-white"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl font-black text-amber-900 mb-4"
            style={{
              fontFamily: 'Montserrat',
              letterSpacing: '-0.03em',
            }}
          >
            Visit Us Today
          </h2>
          <p
            className="text-lg text-stone-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter', fontWeight: 300 }}
          >
            Located in the heart of Mbeya, steps away from Referral Hospital
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
              <div className="flex items-start gap-4">
                <MapPin size={28} className="text-amber-700 flex-shrink-0 mt-1" />
                <div>
                  <h3
                    className="text-xl font-bold text-amber-900 mb-2"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Address
                  </h3>
                  <p
                    className="text-amber-900 leading-relaxed"
                    style={{ fontFamily: 'Inter', fontWeight: 300 }}
                  >
                    Mbeya CBD, Forest Area
                    <br />
                    Near Mbeya Referral Hospital
                    <br />
                    Mbeya, Tanzania
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="flex items-start gap-4">
                <Clock size={28} className="text-green-700 flex-shrink-0 mt-1" />
                <div>
                  <h3
                    className="text-xl font-bold text-green-900 mb-2"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Hours
                  </h3>
                  <div
                    className="text-green-900 space-y-1 text-sm"
                    style={{ fontFamily: 'Inter', fontWeight: 300 }}
                  >
                    <p>Mon - Fri: 7am - 8pm</p>
                    <p>Saturday: 8am - 9pm</p>
                    <p>Sunday: 9am - 7pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="flex items-start gap-4">
                <Phone size={28} className="text-blue-700 flex-shrink-0 mt-1" />
                <div>
                  <h3
                    className="text-xl font-bold text-blue-900 mb-2"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Contact
                  </h3>
                  <p
                    className="text-blue-900 font-semibold"
                    style={{ fontFamily: 'Inter' }}
                  >
                    💬 WhatsApp Order
                  </p>
                  <p
                    className="text-sm text-blue-800"
                    style={{ fontFamily: 'Inter', fontWeight: 300 }}
                  >
                    Instant responses 24/7
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="relative h-96 md:h-full min-h-96 rounded-xl overflow-hidden shadow-lg border border-amber-100/50">
              <iframe
                src={`https://maps.google.com/maps?q=${businessData.location.lat},${businessData.location.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p
            className="text-lg text-stone-600 mb-6"
            style={{ fontFamily: 'Inter', fontWeight: 300 }}
          >
            Order ahead and pick up fresh, or request delivery
          </p>
          <Link
            href={WHATSAPP_URLS.order}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-all duration-300"
            style={{ fontFamily: 'Inter' }}
          >
            Message Us on WhatsApp
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

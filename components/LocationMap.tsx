'use client';

import { motion } from 'framer-motion';
import { businessData } from '@/lib/data';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function LocationMap() {
  return (
    <section id="location" className="section-padding bg-gradient-to-b from-white to-amber-50">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
            Visit Us Today
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Find us in the heart of Mbeya's vibrant food scene
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="card-premium">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-stone-900 mb-2">Location</h3>
                  <p className="text-stone-600 mb-2">{businessData.location.address}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      businessData.location.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="card-premium">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-stone-900 mb-2">Contact</h3>
                  <a
                    href={businessData.contact.phoneLink}
                    className="text-stone-600 hover:text-orange-600 font-medium"
                  >
                    {businessData.contact.phone}
                  </a>
                  <p className="text-stone-600 text-sm mt-2">Call or WhatsApp anytime</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="card-premium">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-stone-900 mb-2">Hours</h3>
                  <div className="space-y-1 text-sm text-stone-600">
                    <p>Mon-Thu: 8:00 AM - 10:00 PM</p>
                    <p>Fri-Sat: 8:00 AM - 11:00 PM</p>
                    <p>Sunday: 10:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden shadow-luxury-lg h-96"
          >
            {/* Placeholder Map */}
            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-stone-100 flex items-center justify-center relative">
              {/* Google Maps Iframe (working embed) */}
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${businessData.location.lat},${businessData.location.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

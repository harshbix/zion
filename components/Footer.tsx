'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { businessData } from '@/lib/data';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-amber-50 pt-16 pb-8">
      {/* Main Footer Content */}
      <div className="container-premium mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold">
                Z
              </div>
              <div>
                <h3 className="font-serif font-bold">Zion</h3>
                <p className="text-xs text-amber-300">Cakes & Bites</p>
              </div>
            </Link>
            <p className="text-amber-400 text-sm">
              Crafting premium cakes, juices, and local flavors in Mbeya with passion and quality.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-amber-100 mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-sm text-amber-400">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-orange-400 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-orange-400 transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-amber-100 mb-4 font-serif">Contact</h4>
            <ul className="space-y-3 text-sm text-amber-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-400" />
                <span>{businessData.location.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-orange-400" />
                <a
                  href={businessData.contact.phoneLink}
                  className="hover:text-orange-400 transition-colors"
                >
                  {businessData.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-orange-400" />
                <a
                  href={`mailto:${businessData.contact.email}`}
                  className="hover:text-orange-400 transition-colors"
                >
                  {businessData.contact.email}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-amber-100 mb-4 font-serif">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-amber-200/20 hover:bg-orange-500 rounded-lg transition-colors duration-300"
                title="Facebook"
              >
                <Heart className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-amber-200/20 hover:bg-orange-500 rounded-lg transition-colors duration-300"
                title="Instagram"
              >
                <Heart className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-amber-200/20 hover:bg-orange-500 rounded-lg transition-colors duration-300"
                title="Twitter"
              >
                <Heart className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-stone-800 mb-8" />

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container-premium"
      >
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-amber-400">
          <p>&copy; {currentYear} Zion Cakes and Bites. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-orange-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

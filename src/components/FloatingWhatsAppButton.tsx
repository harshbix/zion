

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URLS } from '@/services/whatsapp';

export default function FloatingWhatsAppButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Pulsing ring animation */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-green-500/20 rounded-full"
        style={{ width: '80px', height: '80px' }}
      />

      {/* WhatsApp Button */}
      <motion.a
        href={WHATSAPP_URLS.order}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300"
        title="Order on WhatsApp"
      >
        <MessageCircle size={24} />
      </motion.a>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute bottom-20 right-0 bg-stone-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
        style={{ pointerEvents: 'none' }}
      >
        Order on WhatsApp
      </motion.div>
    </motion.div>
  );
}

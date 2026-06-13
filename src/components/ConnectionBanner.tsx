
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';

export default function ConnectionBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    setIsOffline(!window.navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-2.5 px-6 shadow-lg flex items-center justify-between text-xs font-bold uppercase tracking-widest font-sans-luxury border-b border-red-700"
        >
          <div className="flex items-center gap-3.5 mx-auto">
            <WifiOff className="w-4 h-4 animate-pulse" />
            <span>You are currently offline. Checking connection...</span>
            <button
              onClick={() => window.location.reload()}
              className="ml-4 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded border border-white/10 flex items-center gap-1.5 transition-colors uppercase tracking-wider text-[9px] font-bold"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

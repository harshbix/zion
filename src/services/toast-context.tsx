
import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      dismissToast(id);
    }, 2000);
  }, [dismissToast]);

  const success = useCallback((msg: string) => showToast(msg, 'success'), [showToast]);
  const error = useCallback((msg: string) => showToast(msg, 'error'), [showToast]);
  const warning = useCallback((msg: string) => showToast(msg, 'warning'), [showToast]);
  const info = useCallback((msg: string) => showToast(msg, 'info'), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      {/* Toast Render Portal / Container */}
      <div className="fixed top-6 left-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none px-6 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto w-full bg-white border border-stone-200 p-4 shadow-luxury-md flex gap-3.5 items-start justify-between relative overflow-hidden"
            >
              {/* Type Accent Strip */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  toast.type === 'success'
                    ? 'bg-green-600'
                    : toast.type === 'error'
                    ? 'bg-red-600'
                    : toast.type === 'warning'
                    ? 'bg-amber-600'
                    : 'bg-stone-800'
                }`}
              />

              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5 ml-1">
                {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
                {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                {toast.type === 'info' && <Info className="w-5 h-5 text-stone-700" />}
              </div>

              {/* Message */}
              <p
                className="flex-1 text-xs text-stone-700 font-semibold leading-relaxed"
                style={{ fontFamily: 'Inter' }}
              >
                {toast.message}
              </p>

              {/* Close Button */}
              <button
                onClick={() => dismissToast(toast.id)}
                className="flex-shrink-0 p-1 text-stone-400 hover:text-stone-700 transition-colors"
                aria-label="Close alert"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

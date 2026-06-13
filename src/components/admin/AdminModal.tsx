
import React, { type ReactNode } from 'react';
import { X } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function AdminModal({ isOpen, onClose, title, children }: AdminModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl mx-auto my-6 z-10 px-4">
        <div className="relative flex flex-col w-full bg-[#FFFDF9] border border-stone-200/80 shadow-2xl p-6 md:p-8 outline-none focus:outline-none rounded-none">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200/50">
            <h3 className="font-sans-luxury text-lg font-bold uppercase tracking-widest text-stone-900">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 transition-colors p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Body */}
          <div className="relative py-6 flex-auto max-h-[70vh] overflow-y-auto pr-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

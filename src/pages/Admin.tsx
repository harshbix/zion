import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, checkAdminSession } from '@/services/admin-auth';
import { useToast } from '@/services/toast-context';
import { Shield, Key, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    checkAdminSession().then((isValid) => {
      if (isValid) {
        navigate('/admin/dashboard');
      } else {
        setIsChecking(false);
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId || !password) {
      toast.error('Please fill in all credentials.');
      return;
    }

    setIsSubmitting(true);
    const success = await adminLogin(adminId, password);
    setIsSubmitting(false);

    if (success) {
      toast.success('Access granted. Welcome back, Admin.');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid ID or password. Access Denied.');
    }
  };

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-950">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent animate-spin mx-auto" />
          <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Checking Session Status...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-900/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md bg-stone-900/80 border border-stone-800/80 backdrop-blur-xl p-8 shadow-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex p-3 bg-amber-950/40 border border-amber-800/20 text-amber-500 rounded-full mb-2">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="font-sans-luxury text-xl font-bold uppercase tracking-widest text-stone-100">
            ZION ADMIN
          </h1>
          <p className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
            Administrative Management Console
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User ID Field */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Admin Identifier
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-500 pointer-events-none">
                <UserCheck className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter admin ID"
                className="w-full bg-stone-950 border border-stone-800/80 focus:border-amber-600/60 focus:ring-0 text-stone-200 text-xs font-semibold py-3 pl-11 pr-4 rounded-none transition-all placeholder:text-stone-600"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Passphrase
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-500 pointer-events-none">
                <Key className="w-4 h-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-stone-950 border border-stone-800/80 focus:border-amber-600/60 focus:ring-0 text-stone-200 text-xs font-semibold py-3 pl-11 pr-4 rounded-none transition-all placeholder:text-stone-700"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-800/50 text-stone-950 text-xs font-bold uppercase tracking-widest py-3.5 px-4 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent animate-spin" />
            ) : (
              'Authenticate Securely'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

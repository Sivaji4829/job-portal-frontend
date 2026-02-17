"use client";

import React, { useState } from 'react';
import { 
  Target, 
  Lock, 
  Mail, 
  ArrowRight, 
  Loader2, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LoginPage - Enterprise CMS Edition
 * Features a high-density, professional authentication interface.
 * Design matches the Zinc/Indigo corporate aesthetic.
 * * NOTE: Navigation is handled via window.location for preview environment stability.
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate API call for authentication
      // In a real project, you would call your backend's /api/auth/login
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful login
      localStorage.setItem('hiresync_token', 'mock_jwt_session_active');
      localStorage.setItem('hiresync_user', JSON.stringify({ name: 'Admin User', role: 'SuperAdmin' }));
      
      // Navigate to dashboard
      window.location.href = '/';
    } catch (err) {
      setError('Invalid credentials or secure cluster timeout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] flex flex-col items-center justify-center p-6 selection:bg-indigo-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-2xl shadow-indigo-200">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">HireSync</h1>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Enterprise Management Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <ShieldCheck className="w-32 h-32 -mr-12 -mt-12 text-indigo-600" />
          </div>

          <div className="relative z-10">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Internal Access Only</h2>
            <p className="text-slate-500 text-sm mb-8 font-medium italic">Please authenticate to access the recruitment partition.</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Corporate Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all outline-none font-bold text-sm"
                    placeholder="admin@hiresync.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all outline-none font-bold text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-rose-600 text-xs font-bold"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                disabled={loading}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-slate-900 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
                SIGN IN TO CLUSTER
              </button>
            </form>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-6 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
            <span>System Partition: 4.2.1</span>
            <div className="w-1 h-1 bg-zinc-200 rounded-full" />
            <span>256-bit Encrypted</span>
          </div>
          <p className="text-slate-300 text-[10px] font-bold">Unauthorized access is strictly monitored and logged.</p>
        </div>
      </motion.div>
    </div>
  );
}
"use client";

import React, { useState } from 'react';
import { 
  Target, 
  Lock, 
  Mail, 
  ArrowRight, 
  Loader2, 
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  ArrowLeft,
  Server,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

/**
 * HIRESYNC ENTERPRISE IDENTITY GATEWAY - V4.2.1
 * ------------------------------------------------
 * DESIGN: High-End Corporate Split Layout
 * BRANDING: Prominent Title Highlight above high-res imagery.
 * AUTH: 
 * - Tier 1: Master Administrative Bypass (Hardcoded)
 * - Tier 2: Distributed MongoDB Cluster Sync (API)
 */

const API_URL = 'https://job-portal-backend-2uzz.onrender.com/api';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const establishSession = (token: string, user: any) => {
    localStorage.setItem('hiresync_token', token || 'session_active_secure');
    localStorage.setItem('hiresync_user', JSON.stringify(user));
    window.location.href = '/'; 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // --- MASTER BYPASS RULE ---
    const isMaster = email === 'admin@hiresync.com' && password === 'admin123';
    if (!isRegistering && isMaster) {
      establishSession('master_bypass_active_421', { email, role: 'admin' });
      return;
    }

    // --- MONGODB CLUSTER SYNC ---
    try {
      if (isRegistering) {
        const response = await axios.post(`${API_URL}/auth/register`, { email, password, role: 'admin' });
        setSuccess(response.data.message || 'Identity provisioned. Proceed to authorization.');
        setIsRegistering(false);
        setPassword('');
      } else {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        establishSession(response.data.token, response.data.user);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Cluster sync failed. Verify backend node status.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden selection:bg-indigo-100 antialiased font-sans">
      
      {/* LEFT COMPONENT: Brand Identity & Imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 items-start justify-center overflow-hidden border-r border-slate-800">
        <img 
          src="https://www.ey.com/adobe/dynamicmedia/deliver/dm-aid--b102e98b-ddbd-4690-b47e-7895baf99c5f/ey-coworkers-discussing-tablet-material.jpg?quality=85&preferwebp=true" 
          alt="Enterprise Hub"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />
        
        <div className="relative z-10 w-full h-full flex flex-col p-16">
          {/* HIRE SYNC TITLE HIGHLIGHT */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-auto"
          >
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-600/40 border border-white/20">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Hire<span className="text-indigo-500 not-italic">Sync™</span>
            </h1>
          </motion.div>

          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[0.85]">
                Corporate <br /> Governance <br /> Engine.
              </h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md">
                Access the administrative partition to manage global recruitment nodes and synchronize data with the MongoDB Atlas cluster.
              </p>
            </motion.div>
            
            <div className="mt-16 flex items-center gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Protocol</span>
                <span className="text-xs font-bold text-white uppercase tracking-widest">TLS 1.3 / AES-256</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Database</span>
                <span className="text-xs font-bold text-white uppercase tracking-widest">MongoDB Distributed</span>
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between text-slate-500">
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Partition: Core-421-V4</p>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Global Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COMPONENT: Administrative Gateway Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-20 bg-[#FDFDFE] relative overflow-y-auto">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile Identity (Logo shows only on mobile) */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-12">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic">Hire<span className="text-indigo-600 not-italic">Sync</span></h1>
          </div>

          <div className="space-y-3 mb-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full mb-4">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse" />
              <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Identity Partition Active</span>
            </div>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
              {isRegistering ? 'Provision identity.' : 'Secure Login.'}
            </h3>
            <p className="text-slate-400 font-bold text-sm">
              {isRegistering 
                ? 'Establish a new administrative record in the master database.' 
                : 'Input your security keys to authorize your current session.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Identity Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Administrative identity</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  required 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-sm shadow-inner" 
                  placeholder="admin@hiresync.com" 
                />
              </div>
            </div>

            {/* Access Key Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Security access key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  required 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-sm shadow-inner" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {/* Notification Modules */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black uppercase tracking-widest">Cluster Gateway Warning</p>
                    <p className="text-[11px] font-bold leading-tight">{error}</p>
                  </div>
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black uppercase tracking-widest">Identity Sync Success</p>
                    <p className="text-[11px] font-bold leading-tight">{success}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Trigger */}
            <button 
              disabled={loading} 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-slate-900 text-white py-4.5 rounded-2xl font-black text-sm shadow-2xl shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isRegistering ? <UserPlus className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  <span className="uppercase tracking-[0.2em]">{isRegistering ? 'Provision Node' : 'Authorize Session'}</span>
                </>
              )}
            </button>
          </form>

          {/* Identity Navigation */}
          <div className="mt-10 pt-8 border-t border-zinc-100 flex flex-col items-center gap-8">
            <button 
              onClick={() => { setIsRegistering(!isRegistering); setError(null); setSuccess(null); }}
              className="group flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors"
            >
              {isRegistering ? (
                <><ArrowLeft className="w-4 h-4" /> Return to Login</>
              ) : (
                <>New Admin Node? <span className="text-indigo-600 underline decoration-2 underline-offset-4">Register Cluster Identity</span></>
              )}
            </button>
            
            <div className="flex items-center gap-3 opacity-20 group grayscale hover:grayscale-0 transition-all duration-500">
               <ShieldCheck className="w-4 h-4 text-indigo-600" />
               <p className="text-[9px] font-black text-slate-900 uppercase tracking-[0.4em]">Enterprise Security Stack</p>
            </div>
          </div>
        </motion.div>

        <footer className="mt-12 lg:mt-auto pt-10 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] flex gap-10">
           <span>HireSync™ Security v4.2.1</span>
           <span className="hidden sm:inline">ISO 27001 Certified Access</span>
        </footer>
      </div>
    </div>
  );
}
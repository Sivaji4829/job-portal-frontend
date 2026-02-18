"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Sparkles, 
  Save, 
  Loader2, 
  Target, 
  Bell,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

/**
 * HIRESYNC ENTERPRISE CMS - CREATE PAGE
 * * FIX: Resolved 404 error by ensuring POST request targets the live Render cluster.
 * * FIX: Consolidated logic to bypass "next/navigation" and local import resolution issues.
 */

// --- Constants & Configuration ---
const API_URL = 'https://job-portal-backend-2uzz.onrender.com/api';

const LOCATIONS = ['Remote', 'New York, NY', 'San Francisco, CA', 'London, UK', 'Bangalore, IN', 'Berlin, DE', 'Singapore, SG', 'Toronto, CA', 'Austin, TX', 'Dublin, IE'];
const SALARY_RANGES = ['₹3 LPA - ₹5 LPA', '₹5 LPA - ₹8 LPA', '₹8 LPA - ₹12 LPA', '₹12 LPA - ₹18 LPA', '₹18 LPA - ₹25 LPA', '₹25 LPA - ₹40 LPA', '₹40 LPA - ₹60 LPA', '₹60 LPA+'];
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];

interface JobInput {
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  description: string;
}

// --- Reusable UI Components ---

const Navbar = () => (
  <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-10 z-20 sticky top-0">
    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.href = '/'}>
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:rotate-6 transition-transform">
        <Target className="w-6 h-6 text-white" />
      </div>
      <span className="text-xl font-black tracking-tighter text-slate-900 uppercase italic">Hire<span className="not-italic text-indigo-600">Sync</span></span>
    </div>
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Cluster Secure</span>
      </div>
      <button className="p-2.5 bg-zinc-50 text-slate-400 hover:text-indigo-600 rounded-xl">
        <Bell className="w-5 h-5" />
      </button>
    </div>
  </header>
);

// --- Main Page Component ---

export default function CreateJobPage() {
  const [formData, setFormData] = useState<JobInput>({
    title: '',
    company: '',
    location: LOCATIONS[0],
    salary: SALARY_RANGES[0],
    jobType: JOB_TYPES[0],
    description: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Direct POST to the live API endpoint
      await axios.post(`${API_URL}/jobs`, formData);
      // Native navigation for maximum reliability
      window.location.href = '/';
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Gateway Node error. Check backend logs.';
      setError(`Failed to create record: ${msg}`);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] antialiased text-slate-900 selection:bg-indigo-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <button 
          onClick={() => window.location.href = '/'} 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 mb-8 font-bold text-xs uppercase tracking-widest transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Console
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] border border-zinc-200 p-8 md:p-12 shadow-sm"
        >
          <div className="flex items-center gap-6 mb-12 border-b border-zinc-50 pb-10">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Post New Opportunity</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Admin Partition: Secure Node 421</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Job Title */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Job Designation</label>
                <input 
                  required 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  className="w-full px-5 py-4 bg-zinc-50/50 border border-zinc-200 rounded-2xl focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-800 shadow-inner" 
                  placeholder="e.g. Lead Software Architect"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Organization</label>
                <input 
                  required 
                  value={formData.company} 
                  onChange={e => setFormData({...formData, company: e.target.value})} 
                  className="w-full px-5 py-4 bg-zinc-50/50 border border-zinc-200 rounded-2xl focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-800 shadow-inner" 
                  placeholder="Acme Global Inc"
                />
              </div>

              {/* Geography */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Geography</label>
                <div className="relative group">
                  <select 
                    required 
                    value={formData.location} 
                    onChange={e => setFormData({...formData, location: e.target.value})} 
                    className="w-full px-5 py-4 bg-zinc-50/50 border border-zinc-200 rounded-2xl focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-800 shadow-inner appearance-none cursor-pointer"
                  >
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
                </div>
              </div>

              {/* Compensation */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Budget Allocation</label>
                <div className="relative group">
                  <select 
                    required 
                    value={formData.salary} 
                    onChange={e => setFormData({...formData, salary: e.target.value})} 
                    className="w-full px-5 py-4 bg-zinc-50/50 border border-zinc-200 rounded-2xl focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-800 shadow-inner appearance-none cursor-pointer"
                  >
                    {SALARY_RANGES.map(range => <option key={range} value={range}>{range}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
                </div>
              </div>

              {/* Job Type */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contract Classification</label>
                <div className="relative group">
                  <select 
                    required 
                    value={formData.jobType} 
                    onChange={e => setFormData({...formData, jobType: e.target.value})} 
                    className="w-full px-5 py-4 bg-zinc-50/50 border border-zinc-200 rounded-2xl focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-800 shadow-inner appearance-none cursor-pointer"
                  >
                    {JOB_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Role Description & Context</label>
              <textarea 
                required 
                rows={8} 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                className="w-full px-6 py-5 bg-zinc-50/50 border border-zinc-200 rounded-[2rem] focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-medium text-slate-600 resize-none leading-relaxed shadow-inner" 
                placeholder="Outline core responsibilities, technical requirements, and key performance metrics..."
              />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-center gap-3 text-rose-600">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-xs font-bold">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
              <button 
                type="submit" 
                disabled={saving}
                className="w-full sm:flex-[2] bg-indigo-600 hover:bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                <span className="uppercase tracking-widest">Publish Opportunity</span>
              </button>
              <button 
                type="button" 
                onClick={() => window.location.href = '/'}
                className="w-full sm:flex-1 bg-white text-slate-400 hover:text-slate-600 px-8 py-5 rounded-2xl font-bold border border-zinc-200 transition-all active:scale-[0.98]"
              >
                Discard
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
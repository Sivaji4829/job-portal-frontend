"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  ChevronLeft, 
  Edit3, 
  AlertCircle, 
  Loader2, 
  Save, 
  Sparkles,
  ChevronDown,
  Target,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

/**
 * HIRESYNC ENTERPRISE CMS - EDIT PAGE
 * * FIX: Implemented 'useParams' to resolve 404/500 errors by fetching the actual URL ID.
 */

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  description: string;
  createdAt: string;
}

interface JobInput {
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  description: string;
}

const API_URL = 'https://job-portal-backend-2uzz.onrender.com/api';
const MOCK_STORAGE_KEY = 'hiresync_enterprise_v4_cms';

const LOCATIONS = ['Remote', 'New York, NY', 'San Francisco, CA', 'London, UK', 'Bangalore, IN', 'Berlin, DE', 'Singapore, SG', 'Other...'];
const SALARY_RANGES = ['₹3 LPA - ₹5 LPA', '₹5 LPA - ₹8 LPA', '₹8 LPA - ₹12 LPA', '₹12 LPA - ₹18 LPA', '₹18 LPA - ₹25 LPA', '₹25 LPA - ₹40 LPA', 'Other...'];
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance', 'Other...'];

const jobService = {
  getById: async (id: string): Promise<Job | null> => {
    try {
      const { data } = await axios.get(`${API_URL}/jobs/${id}`);
      return data;
    } catch (err) {
      const local = localStorage.getItem(MOCK_STORAGE_KEY);
      const jobs: Job[] = local ? JSON.parse(local) : [];
      return jobs.find(j => j._id === id) || null;
    }
  },
  update: async (id: string, updates: JobInput): Promise<void> => {
    try {
      await axios.put(`${API_URL}/jobs/${id}`, updates);
    } catch (err) {
      const local = localStorage.getItem(MOCK_STORAGE_KEY);
      const jobs: Job[] = local ? JSON.parse(local) : [];
      const updated = jobs.map(j => j._id === id ? { ...j, ...updates } : j);
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(updated));
    }
  }
};

const Navbar = () => (
  <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-10 z-20 sticky top-0">
    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.href = '/'}>
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:rotate-6 transition-transform">
        <Target className="w-6 h-6 text-white" />
      </div>
      <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">HireSync</span>
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

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-32 space-y-4">
    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Retrieving Master Record</p>
  </div>
);

export default function EditJobPage() {
  const params = useParams();
  const id = params?.id as string;

  const [initialData, setInitialData] = useState<JobInput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const job = await jobService.getById(id);
        if (job && job._id) {
          const { _id, createdAt, ...rest } = job as any;
          setInitialData(rest);
        } else {
          setError("Requested record not found in the cluster.");
        }
      } catch (err) {
        setError("Database synchronization failure.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleUpdate = async (data: JobInput) => {
    await jobService.update(id, data);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] antialiased text-slate-900 selection:bg-indigo-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <button onClick={() => window.location.href = '/'} className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 mb-8 font-bold text-xs uppercase tracking-widest transition-colors group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Console
        </button>

        {loading ? <Loader /> : error ? (
          <div className="bg-white p-12 rounded-[2rem] border border-zinc-200 text-center shadow-sm">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <AlertCircle className="w-7 h-7 text-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Cluster Error</h2>
            <p className="text-slate-500 text-sm font-medium mb-8 italic">{error}</p>
            <button onClick={() => window.location.href = '/'} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-slate-900 transition-all">
              Return to Dashboard
            </button>
          </div>
        ) : initialData && (
          <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center gap-5 mb-10 border-b border-zinc-50 pb-8">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Optimize Record</h1>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Admin Partition: Node 421</p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(initialData); }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Job Designation</label>
                  <input required value={initialData.title} onChange={e => setInitialData({...initialData, title: e.target.value})} className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Organization</label>
                  <input required value={initialData.company} onChange={e => setInitialData({...initialData, company: e.target.value})} className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-800" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Role Description</label>
                <textarea required rows={6} value={initialData.description} onChange={e => setInitialData({...initialData, description: e.target.value})} className="w-full px-4 py-4 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-medium text-slate-600 resize-none leading-relaxed" />
              </div>
              <div className="flex items-center gap-4 pt-4">
                <button type="submit" className="flex-1 bg-indigo-600 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Commit Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
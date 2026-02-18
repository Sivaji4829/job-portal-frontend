"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
    ChevronLeft, 
    MapPin, 
    Briefcase, 
    IndianRupee, 
    Calendar, 
    Globe, 
    Share2, 
    Pencil,
    Trash2,
    Clock,
    Loader2,
    Bell,
    Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

/**
 * HIRESYNC ENTERPRISE CMS - JOB DETAILS
 * * FIX: Implemented 'useParams' to resolve 404 errors by fetching the actual URL ID.
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

const API_URL = 'https://job-portal-backend-2uzz.onrender.com/api';
const MOCK_STORAGE_KEY = 'hiresync_enterprise_v4_cms';

const jobService = {
  getById: async (id: string): Promise<Job> => {
    try {
      const { data } = await axios.get(`${API_URL}/jobs/${id}`);
      return data;
    } catch (err) {
      const local = localStorage.getItem(MOCK_STORAGE_KEY);
      const jobs: Job[] = local ? JSON.parse(local) : [];
      return jobs.find(j => j._id === id) || ({} as Job);
    }
  },
  delete: async (id: string) => {
    try {
      await axios.delete(`${API_URL}/jobs/${id}`);
    } catch (err) {
      const local = localStorage.getItem(MOCK_STORAGE_KEY);
      const jobs: Job[] = local ? JSON.parse(local) : [];
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(jobs.filter(j => j._id !== id)));
    }
  }
};

const Navbar = () => (
  <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-10 z-20 sticky top-0">
    <div className="flex items-center gap-10">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.href = '/'}>
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:rotate-6 transition-transform">
          <Target className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">HireSync</span>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Cluster Secure</span>
      </div>
      <button className="p-2.5 bg-zinc-50 text-slate-400 hover:text-indigo-600 rounded-xl relative">
        <Bell className="w-5 h-5" />
      </button>
    </div>
  </header>
);

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-32 space-y-4">
    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Synchronizing Identity</p>
  </div>
);

export default function JobDetailsPage() {
    const params = useParams();
    const id = params?.id as string;
    
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;

        const fetchJobDetails = async () => {
            setLoading(true);
            try {
                const data = await jobService.getById(id);
                setJob(data._id ? data : null);
            } catch (error) {
                console.error("CMS Synchronization Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Permanently purge this record from the master database?")) return;
        try {
            await jobService.delete(id);
            window.location.href = "/";
        } catch (error) {
            console.error("Delete failed");
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Loader />
        </div>
    );

    if (!job) return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="text-center py-24 px-6">
                <div className="bg-rose-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-rose-500 opacity-50" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Record Not Found</h2>
                <p className="text-slate-400 font-bold mt-2 italic">The requested vacancy listing could not be synchronized with the cluster.</p>
                <button onClick={() => window.location.href = "/"} className="text-indigo-600 font-black mt-8 hover:underline">
                    Return to Dashboard
                </button>
            </div>
        </div>
    );

    const postDate = new Date(job.createdAt || Date.now()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-[#FDFDFE] antialiased text-slate-900 selection:bg-indigo-100">
            <Navbar />
            
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1"
                    >
                        <button 
                            onClick={() => window.location.href = "/"}
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 mb-8 font-bold text-xs uppercase tracking-widest transition-colors group"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                            Back to Master Index
                        </button>
                        
                        <div className="flex items-start gap-6">
                            <div className="hidden sm:flex w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-2xl items-center justify-center text-indigo-600 shadow-inner">
                                <Globe className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-lg uppercase tracking-widest border border-indigo-200">
                                        {job.jobType}
                                    </span>
                                    <span className="text-slate-200">•</span>
                                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" /> Posted {postDate}
                                    </span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-2 leading-[1.1]">
                                    {job.title}
                                </h1>
                                <p className="text-xl text-slate-400 font-bold italic">{job.company}</p>
                            </div>
                        </div>
                    </motion.div>
                    
                    <div className="flex gap-3 w-full md:w-auto">
                        <button 
                            onClick={() => window.location.href = `/jobs/edit/${job._id}`}
                            className="flex-1 md:flex-none px-6 py-4 bg-white text-slate-700 rounded-2xl hover:bg-slate-50 transition-all border border-slate-200 flex items-center justify-center gap-2 font-bold shadow-sm"
                        >
                            <Pencil className="w-4 h-4 text-indigo-600" />
                            <span>Modify</span>
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="flex-1 md:flex-none px-6 py-4 bg-white text-rose-600 rounded-2xl hover:bg-rose-50 transition-all border border-rose-100 flex items-center justify-center gap-2 font-bold shadow-sm"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Purge</span>
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <div className="w-1 h-6 bg-indigo-600 rounded-full" />
                                Role Description & Context
                            </h2>
                            <div className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                                {job.description}
                            </div>
                        </section>

                        <section className="bg-zinc-50/50 rounded-[2.5rem] p-8 sm:p-10 border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-widest opacity-60">Record Snapshot</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compensation</p>
                                    <p className="text-xl font-black text-emerald-600 flex items-center gap-1">
                                        <IndianRupee className="w-4 h-4" /> {job.salary}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Geography</p>
                                    <p className="text-xl font-bold text-slate-700 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-indigo-400" /> {job.location}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contract Classification</p>
                                    <p className="text-xl font-bold text-slate-700 flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-indigo-400" /> {job.jobType}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Created On</p>
                                    <p className="text-xl font-bold text-slate-700 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-slate-300" /> {postDate}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                    
                    <div className="space-y-8">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-100 sticky top-24 overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                              <Briefcase className="w-32 h-32 -mr-12 -mt-12" />
                            </div>
                            <div className="relative z-10">
                              <div className="flex justify-between items-center mb-6">
                                  <h3 className="text-lg font-black uppercase tracking-tighter">HireSync™ Console</h3>
                                  <Share2 className="w-5 h-5 text-slate-500 cursor-pointer hover:text-indigo-400 transition-colors" />
                              </div>
                              <p className="text-slate-400 font-bold mb-8 leading-relaxed">
                                  You are viewing a production record within the enterprise recruitment partition.
                              </p>
                              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-white hover:text-indigo-600 transition-all shadow-lg active:scale-95">
                                  Manage Applicants (0)
                              </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
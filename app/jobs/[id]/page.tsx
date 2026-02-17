"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Modular Imports
import { jobService } from '../../../services/api';
import { Job } from '../../../lib/constants';
import Navbar from '../../../components/Navbar';
import Loader from '../../../components/Loader';

/**
 * JobDetailsPage - Enterprise Edition
 * Displays detailed information about a specific vacancy.
 * Marked with "use client" to support data fetching and interactivity.
 */
export default function JobDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (!id) return;
            try {
                const data = await jobService.getById(id);
                setJob(data);
            } catch (error) {
                console.error("CMS Synchronization Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, [id]);

    const handleDelete = async () => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to permanently purge this record from the master database?")) return;
        try {
            await jobService.delete(id);
            router.push('/');
        } catch (error) {
            alert("Purge operation failed. Record remains in database.");
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
                <Link href="/" className="text-indigo-600 font-black mt-8 inline-block hover:underline underline-offset-8">
                    Return to Dashboard
                </Link>
            </div>
        </div>
    );

    const postDate = new Date(job.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-[#FDFDFE] antialiased text-slate-900">
            <Navbar />
            
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1"
                    >
                        <Link 
                            href="/"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 mb-8 font-bold text-xs uppercase tracking-widest transition-colors group"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                            Back to Master Index
                        </Link>
                        
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
                    
                    {/* Action Hub */}
                    <div className="flex gap-3 w-full md:w-auto">
                        <Link 
                            href={`/jobs/edit/${id}`}
                            className="flex-1 md:flex-none px-6 py-4 bg-white text-slate-700 rounded-2xl hover:bg-slate-50 transition-all border border-slate-200 flex items-center justify-center gap-2 font-bold shadow-sm"
                        >
                            <Pencil className="w-4 h-4 text-indigo-600" />
                            <span>Modify</span>
                        </Link>
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
                        {/* Summary Description */}
                        <section>
                            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <div className="w-1 h-6 bg-indigo-600 rounded-full" />
                                Role Description & Context
                            </h2>
                            <div className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                                {job.description}
                            </div>
                        </section>

                        {/* High-Density Data Grid */}
                        <section className="bg-zinc-50/50 rounded-[2.5rem] p-8 sm:p-10 border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-widest opacity-60">Record Snapshot</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compensation (LPA)</p>
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
                    
                    {/* Sidebar Call-to-Action */}
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
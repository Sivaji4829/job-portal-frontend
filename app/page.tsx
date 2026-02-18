"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Briefcase, 
  Users, 
  Target, 
  TrendingUp, 
  Download, 
  LayoutDashboard, 
  Settings, 
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  Search,
  Bell,
  LogOut,
  Building2,
  MapPin,
  Eye,
  Pencil,
  Trash2,
  IndianRupee,
  Loader2,
  SearchCheck,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

/**
 * HIRESYNC ENTERPRISE CMS - STABLE PREVIEW EDITION
 * * FIX: Consolidated all components and logic to resolve path resolution errors.
 * * FIX: Replaced Next.js router with window.location for preview environment stability.
 * * DESIGN: High-density SaaS with Off-canvas Mobile Navigation.
 */

// --- Internal Constants & Types ---
const API_URL = 'https://job-portal-backend-2uzz.onrender.com/api';
const MOCK_STORAGE_KEY = 'hiresync_enterprise_v4_cms';

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

interface AppNotification {
  msg: string;
  type: 'success' | 'error';
}

// --- Internal Service Logic ---
const jobService = {
  getAll: async (): Promise<Job[]> => {
    try {
      const { data } = await axios.get(`${API_URL}/jobs`);
      return data;
    } catch (err) {
      const local = localStorage.getItem(MOCK_STORAGE_KEY);
      return local ? JSON.parse(local) : [];
    }
  },
  delete: async (id: string) => {
    try {
      await axios.delete(`${API_URL}/jobs/${id}`);
    } catch (err) {
      const jobs = await jobService.getAll();
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(jobs.filter(j => j._id !== id)));
    }
  }
};

// --- Inlined Sub-components ---

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-20 md:py-32 space-y-4">
    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Synchronizing Cluster</p>
  </div>
);

const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <div className="flex flex-col items-center justify-center py-20 bg-zinc-50/30 rounded-2xl border-2 border-dashed border-zinc-200 px-8 text-center mx-auto w-full">
    <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-zinc-100">
      <SearchCheck className="w-7 h-7 text-indigo-500" />
    </div>
    <div className="max-w-xs space-y-2 mb-8">
      <h3 className="text-xl font-bold text-slate-900 tracking-tight">No Vacancies Found</h3>
      <p className="text-slate-500 text-sm font-medium leading-relaxed">The recruitment database is currently empty. Start by defining a new job record.</p>
    </div>
    <button onClick={onAdd} className="group flex items-center gap-2 bg-indigo-600 hover:bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all active:scale-[0.98]">
      <Plus className="w-4 h-4 stroke-[3]" />
      New Opportunity
    </button>
  </div>
);

const JobCard = ({ job, onView, onEdit, onDelete }: any) => (
  <tr className="hover:bg-slate-50/50 transition-colors group">
    <td className="px-6 lg:px-8 py-4 md:py-5">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
          <Building2 className="w-4.5 h-4.5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-none mb-1 truncate">{job.title}</p>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest truncate">{job.company}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 text-center text-xs font-bold text-slate-500 italic">{job.location}</td>
    <td className="px-6 py-4 text-center">
      <span className="px-2.5 py-1 bg-slate-100 text-zinc-500 text-[9px] font-black rounded-md uppercase tracking-widest border border-zinc-200">
        {job.jobType}
      </span>
    </td>
    <td className="px-6 py-4 text-center text-sm font-black text-emerald-600 whitespace-nowrap">
      <IndianRupee className="inline w-3.5 h-3.5 mr-0.5" />{job.salary}
    </td>
    <td className="px-6 md:px-8 py-4 md:py-5 text-right">
      <div className="flex items-center justify-end gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all transform md:translate-x-2 md:group-hover:translate-x-0">
        <button onClick={() => onView(job._id)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Inspect Record">
          <Eye className="w-4 h-4" />
        </button>
        <button onClick={() => onEdit(job._id)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Modify Entry">
          <Pencil className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(job._id)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors" title="Purge Record">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
);

// --- Main Application ---

export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<AppNotification | null>(null);

  // --- Auth Guard Logic ---
  useEffect(() => {
    const token = localStorage.getItem('hiresync_token');
    if (!token) {
      window.location.href = '/login';
    } else {
      fetchJobs();
    }
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getAll();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      showNotify('Cluster sync failure', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotify = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('hiresync_token');
    localStorage.removeItem('hiresync_user');
    window.location.href = '/login';
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently purge this record?")) return;
    try {
      await jobService.delete(id);
      fetchJobs();
      showNotify('Record Purged');
    } catch (err) {
      showNotify('Operation failed', 'error');
    }
  };

  const filteredJobs = useMemo(() => {
    const s = searchTerm.toLowerCase();
    return jobs.filter(j => 
      j.title.toLowerCase().includes(s) || 
      j.company.toLowerCase().includes(s)
    );
  }, [jobs, searchTerm]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="h-20 flex items-center px-6 border-b border-zinc-50">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
          <Target className="w-6 h-6 text-white" />
        </div>
        {(isMobileMenuOpen || !sidebarCollapsed) && (
          <span className="ml-3 text-xl font-black tracking-tighter text-slate-900 uppercase whitespace-nowrap">HireSync</span>
        )}
      </div>

      <div className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        <button className="w-full flex items-center p-3 rounded-xl bg-indigo-50 text-indigo-700 shadow-sm font-bold">
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          {(isMobileMenuOpen || !sidebarCollapsed) && <span className="ml-3 text-sm">Dashboard</span>}
        </button>
        <button className="w-full flex items-center p-3 rounded-xl text-slate-500 hover:bg-zinc-50 transition-all font-bold">
          <Users className="w-5 h-5 shrink-0" />
          {(isMobileMenuOpen || !sidebarCollapsed) && <span className="ml-3 text-sm">Applicants</span>}
        </button>
        
        <div className="pt-6 pb-2 px-3 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
          {(isMobileMenuOpen || !sidebarCollapsed) ? 'Operations' : '---'}
        </div>
        
        <button onClick={handleLogout} className="w-full flex items-center p-3 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all group">
          <LogOut className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
          {(isMobileMenuOpen || !sidebarCollapsed) && <span className="ml-3 text-sm font-bold">Sign Out</span>}
        </button>
      </div>

      {!isMobileMenuOpen && (
        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-4 border-t border-zinc-100 text-slate-400 hover:text-indigo-600 transition-colors flex justify-center hidden lg:flex">
          <ChevronLeft className={`w-5 h-5 transition-transform duration-500 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-[#FDFDFE] overflow-hidden selection:bg-indigo-100">
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Responsive Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-white border-r border-zinc-200 transition-all duration-300 transform
        lg:relative lg:translate-x-0 
        ${isMobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:flex lg:flex-col'}
        ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'}
      `}>
        <SidebarContent />
        {isMobileMenuOpen && (
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 -right-12 p-2 bg-white rounded-xl shadow-lg lg:hidden">
            <X className="w-5 h-5 text-slate-900" />
          </button>
        )}
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-[#F9FAF8] overflow-y-auto lg:overflow-hidden">
        {/* Header Section */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-zinc-200 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-600 hover:bg-zinc-100 rounded-lg lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative max-w-md w-full group">
              <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Global record search..." 
                className="w-full pl-9 lg:pl-11 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none shadow-inner" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>
          <div className="flex items-center gap-3 lg:gap-6 ml-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Cluster Secure</span>
            </div>
            <button className="p-2.5 bg-zinc-50 text-slate-400 hover:text-indigo-600 rounded-xl relative transition-all shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Main View */}
        <main className="flex-1 lg:overflow-y-auto p-4 lg:p-10 max-w-[1600px] mx-auto w-full space-y-6">
          {/* Analytics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {[
              { label: 'Active Postings', value: jobs.length, icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Pipeline Growth', value: '+14%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'System Uptime', value: '100%', icon: Target, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Node Status', value: 'Verified', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 lg:p-6 rounded-2xl lg:rounded-[1.5rem] border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-xl lg:text-2xl font-black text-slate-900 leading-none">{stat.value}</p>
                </div>
                <div className={`p-2.5 lg:p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-5 h-5 lg:w-6 h-6" />
                </div>
              </div>
            ))}
          </div>

          {/* Records Table Container */}
          <div className="bg-white border border-zinc-200 rounded-2xl lg:rounded-[2rem] shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 lg:p-6 border-b border-zinc-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-50/30">
              <h2 className="text-base lg:text-lg font-black text-slate-900 tracking-tight">Master Recruitment Index</h2>
              <button onClick={() => window.location.href = '/jobs/create'} className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-95">
                <Plus className="w-4 h-4 stroke-[3]" /> New Listing
              </button>
            </div>

            {loading ? <Loader /> : filteredJobs.length > 0 ? (
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-6 lg:px-8 py-4">Opportunity Detail</th>
                      <th className="px-6 py-4 text-center">Geography</th>
                      <th className="px-6 py-4 text-center">Contract</th>
                      <th className="px-6 py-4 text-center">Salary Band</th>
                      <th className="px-6 lg:px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredJobs.map((job) => (
                      <JobCard 
                        key={job._id} 
                        job={job} 
                        onView={(id: string) => window.location.href = `/jobs/${id}`} 
                        onEdit={(id: string) => window.location.href = `/jobs/edit/${id}`} 
                        onDelete={handleDelete} 
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState onAdd={() => window.location.href = '/jobs/create'} />
            )}
          </div>
        </main>
        
        {/* Responsive Footer */}
        <footer className="h-14 bg-white border-t border-zinc-100 px-6 lg:px-10 flex items-center justify-between text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] shrink-0">
           <span>HireSync™ Security Partition 4.2.1 Stable</span>
           <div className="hidden sm:flex gap-8 opacity-60">
              <span>Next.js Architecture</span>
              <span>MongoDB Atlas Node</span>
           </div>
        </footer>
      </div>

      {/* System Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className={`fixed top-24 right-4 lg:right-8 z-[100] flex items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl shadow-2xl border ${notification.type === 'error' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-slate-900 border-slate-800 text-white'}`}>
            {notification.type === 'error' ? <AlertCircle className="w-4 lg:w-5 h-4 lg:h-5" /> : <CheckCircle2 className="w-4 lg:w-5 h-4 lg:h-5 text-emerald-400" />}
            <span className="font-black text-[10px] lg:text-xs tracking-tight">{notification.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
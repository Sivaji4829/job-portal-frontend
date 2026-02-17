"use client";

import React, { useState } from 'react';
import { Save, Loader2, Edit3, Sparkles, ChevronDown, X } from 'lucide-react';

/**
 * HIRESYNC ENTERPRISE CMS - JOB FORM (High-Density)
 * A refined, professional form for administrative record management.
 * Optimized for scannability and precision in a corporate SaaS dashboard.
 * Now supports custom "Other" inputs for all dropdown selections.
 */

// --- Component-specific Interfaces ---
export interface JobInput {
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  description: string;
}

// Standardized options for professional data consistency
const LOCATIONS = [
  'Remote',
  'New York, NY',
  'San Francisco, CA',
  'London, UK',
  'Bangalore, IN',
  'Berlin, DE',
  'Singapore, SG',
  'Toronto, CA',
  'Austin, TX',
  'Dublin, IE',
  'Other...'
];

const SALARY_RANGES = [
  '₹3 LPA - ₹5 LPA',
  '₹5 LPA - ₹8 LPA',
  '₹8 LPA - ₹12 LPA',
  '₹12 LPA - ₹18 LPA',
  '₹18 LPA - ₹25 LPA',
  '₹25 LPA - ₹40 LPA',
  '₹40 LPA - ₹60 LPA',
  '₹60 LPA+',
  'Other...'
];

const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Freelance',
  'Other...'
];

interface JobFormProps {
  initialData?: JobInput;
  onSubmit: (data: JobInput) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ initialData, onSubmit, onCancel, isEditing }) => {
  // Check if initial values match existing constants, otherwise they are "Other"
  const getInitialValue = (val: string, options: string[]) => {
    return options.includes(val) ? val : (val ? 'Other...' : options[0]);
  };

  const [formData, setFormData] = useState<JobInput>(initialData || {
    title: '',
    company: '',
    location: LOCATIONS[0],
    salary: SALARY_RANGES[0],
    jobType: JOB_TYPES[0],
    description: ''
  });

  // Track custom inputs for "Other" options
  const [customLocation, setCustomLocation] = useState(!LOCATIONS.includes(initialData?.location || '') ? (initialData?.location || '') : '');
  const [customSalary, setCustomSalary] = useState(!SALARY_RANGES.includes(initialData?.salary || '') ? (initialData?.salary || '') : '');
  const [customJobType, setCustomJobType] = useState(!JOB_TYPES.includes(initialData?.jobType || '') ? (initialData?.jobType || '') : '');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Prepare final data by merging custom inputs if "Other..." was selected
    const finalData: JobInput = {
      ...formData,
      location: formData.location === 'Other...' ? customLocation : formData.location,
      salary: formData.salary === 'Other...' ? customSalary : formData.salary,
      jobType: formData.jobType === 'Other...' ? customJobType : formData.jobType,
    };

    try {
      await onSubmit(finalData);
    } catch (error) {
      console.error("CMS Form Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm max-w-4xl mx-auto">
      {/* Refined Form Header */}
      <div className="flex items-center gap-5 mb-10 border-b border-zinc-50 pb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 shrink-0">
           {isEditing ? <Edit3 className="w-6 h-6 text-white" /> : <Sparkles className="w-6 h-6 text-white" />}
        </div>
        <div>
           <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
             {isEditing ? 'Optimize Listing' : 'Define New Vacancy'}
           </h1>
           <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
             Administrative Console Partition
           </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Job Designation</label>
            <input 
              required 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-800" 
              placeholder="e.g. Staff Software Engineer"
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Organization</label>
            <input 
              required 
              value={formData.company} 
              onChange={e => setFormData({...formData, company: e.target.value})} 
              className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-800" 
              placeholder="e.g. Acme Corp"
            />
          </div>
          
          {/* Geography Dropdown */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Geography</label>
            <div className="relative group">
              <select 
                required 
                value={LOCATIONS.includes(formData.location) ? formData.location : 'Other...'} 
                onChange={e => setFormData({...formData, location: e.target.value})} 
                className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-800 appearance-none cursor-pointer"
              >
                {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" />
            </div>
            {formData.location === 'Other...' && (
              <input 
                required
                value={customLocation}
                onChange={e => setCustomLocation(e.target.value)}
                className="w-full px-4 py-2 mt-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-medium animate-in slide-in-from-top-1 duration-200"
                placeholder="Enter custom location..."
              />
            )}
          </div>

          {/* Salary Band Dropdown */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Budget Allocation</label>
            <div className="relative group">
              <select 
                required 
                value={SALARY_RANGES.includes(formData.salary) ? formData.salary : 'Other...'} 
                onChange={e => setFormData({...formData, salary: e.target.value})} 
                className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-emerald-600 appearance-none cursor-pointer"
              >
                {SALARY_RANGES.map(range => <option key={range} value={range}>{range}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" />
            </div>
            {formData.salary === 'Other...' && (
              <input 
                required
                value={customSalary}
                onChange={e => setCustomSalary(e.target.value)}
                className="w-full px-4 py-2 mt-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-sm font-medium animate-in slide-in-from-top-1 duration-200"
                placeholder="Enter custom salary..."
              />
            )}
          </div>

          {/* Employment Type Dropdown */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Contract Classification</label>
            <div className="relative group">
              <select 
                required 
                value={JOB_TYPES.includes(formData.jobType) ? formData.jobType : 'Other...'} 
                onChange={e => setFormData({...formData, jobType: e.target.value})} 
                className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-800 appearance-none cursor-pointer"
              >
                {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" />
            </div>
            {formData.jobType === 'Other...' && (
              <input 
                required
                value={customJobType}
                onChange={e => setCustomJobType(e.target.value)}
                className="w-full px-4 py-2 mt-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-medium animate-in slide-in-from-top-1 duration-200"
                placeholder="Enter custom contract type..."
              />
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-2">
           <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Role Description & Context</label>
           <textarea 
             required 
             rows={6} 
             value={formData.description} 
             onChange={e => setFormData({...formData, description: e.target.value})} 
             className="w-full px-4 py-4 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 focus:bg-white transition-all outline-none font-medium text-slate-600 resize-none leading-relaxed" 
             placeholder="Outline core responsibilities and technical requirements..."
           />
        </div>

        {/* Standardized Action Row */}
        <div className="flex items-center gap-4 pt-4">
          <button 
            disabled={loading} 
            type="submit" 
            className="flex-1 bg-indigo-600 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Commit Record
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            className="flex-1 bg-white text-slate-500 px-6 py-3 rounded-xl font-bold text-sm border border-zinc-200 hover:bg-zinc-50 transition-all active:scale-[0.98]"
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
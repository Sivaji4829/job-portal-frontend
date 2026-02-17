"use client";

import React from 'react';
import { 
  Building2, 
  MapPin, 
  Eye, 
  Pencil, 
  Trash2, 
  IndianRupee
} from 'lucide-react';
import { Job } from '../lib/constants';

interface JobCardProps {
  job: Job;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * JobCard Component - Enterprise SaaS Edition
 * Re-designed as a high-density table row to maximize data visibility
 * and management efficiency in a corporate CMS environment.
 * Icons and currency symbols updated for standard professional recognition.
 */
const JobCard: React.FC<JobCardProps> = ({ job, onView, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group border-b border-zinc-100 last:border-0">
      {/* Role & Company Information */}
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-300">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {job.title}
            </p>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.1em]">
              {job.company}
            </p>
          </div>
        </div>
      </td>

      {/* Geography / Location */}
      <td className="px-8 py-5">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 italic">
          <MapPin className="w-3.5 h-3.5 text-zinc-300" />
          {job.location}
        </div>
      </td>

      {/* Contract Type Badge */}
      <td className="px-8 py-5 text-center">
        <span className="inline-flex px-2.5 py-1 bg-slate-100 text-zinc-500 text-[9px] font-black rounded-md uppercase tracking-widest border border-zinc-200">
          {job.jobType}
        </span>
      </td>

      {/* Compensation Band (Updated to Indian Rupee) */}
      <td className="px-8 py-5">
        <div className="flex items-center gap-1 text-sm font-black text-emerald-600 whitespace-nowrap">
          <IndianRupee className="w-3.5 h-3.5" />
          {job.salary}
        </div>
      </td>

      {/* Date Created (Condensed) */}
      <td className="px-8 py-5 text-center">
        <p className="text-[10px] font-bold text-slate-400">
          {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      </td>

      {/* Inline Actions (Updated with known icons) */}
      <td className="px-8 py-5 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
          <button 
            onClick={() => onView(job._id)} 
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onEdit(job._id)} 
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            title="Edit Listing"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(job._id)} 
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
            title="Delete Permanently"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default JobCard;
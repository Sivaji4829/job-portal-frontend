"use client";

import React from 'react';
import { SearchCheck, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAdd: () => void;
}

/**
 * EmptyState Component - Corporate CMS Edition (High-Density)
 * A refined, professional fallback for empty database states.
 * Scaled down for enterprise management dashboard integration.
 */
const EmptyState: React.FC<EmptyStateProps> = ({ onAdd }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-zinc-50/30 rounded-2xl border-2 border-dashed border-zinc-200 px-8 text-center mx-auto w-full">
      {/* Refined Visual Indicator */}
      <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-zinc-100 animate-in fade-in zoom-in duration-700">
        <SearchCheck className="w-7 h-7 text-indigo-500" />
      </div>

      {/* Professional Typography Hierarchy */}
      <div className="max-w-xs space-y-2 mb-8">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          No Vacancies Found
        </h3>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          The recruitment database is currently empty. Start your pipeline by defining a new job record.
        </p>
      </div>

      {/* Standardized CMS Action Button */}
      <button 
        onClick={onAdd}
        className="group flex items-center gap-2 bg-indigo-600 hover:bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md shadow-indigo-100 transition-all active:scale-[0.98]"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        New Opportunity
      </button>
      
      {/* Subdued Meta Info */}
      <div className="mt-10 flex items-center gap-3 text-[9px] font-black text-slate-300 uppercase tracking-widest opacity-80">
        <span>Master Index Console</span>
        <div className="w-1 h-1 bg-zinc-200 rounded-full" />
        <span>V4.2.1 Stable</span>
      </div>
    </div>
  );
};

export default EmptyState;
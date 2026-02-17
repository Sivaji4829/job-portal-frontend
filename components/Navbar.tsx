"use client";

import React from 'react';
import { Briefcase, Bell, Users, Search } from 'lucide-react';

interface NavbarProps {
  onHome?: () => void;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHome, searchTerm, onSearchChange }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-zinc-200 flex items-center justify-between px-10 z-20 sticky top-0">
      <div className="flex items-center gap-10">
        <div onClick={onHome} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:rotate-6 transition-transform">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">HireSync</span>
        </div>

        {onSearchChange && (
          <div className="relative max-w-md w-64 lg:w-96 group hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search records..." 
              className="w-full pl-11 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Live Sync active</span>
        </div>
        <div className="flex items-center gap-4">
           <button className="p-2.5 bg-zinc-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative">
             <Bell className="w-5 h-5" />
             <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
           </button>
           <div className="w-px h-8 bg-slate-200" />
           <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-white shadow-md flex items-center justify-center text-white font-black text-xs uppercase">AD</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
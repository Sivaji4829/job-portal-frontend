import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Loader Component - A reusable loading spinner for the Job Portal.
 * Designed to provide visual feedback during API calls and data fetching.
 */
const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 w-full bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100">
      <div className="relative">
        {/* Main spinning loader */}
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        
        {/* Subtle pulsing background effect */}
        <div className="absolute inset-0 w-12 h-12 text-blue-200 animate-ping opacity-20">
          <Loader2 />
        </div>
      </div>
      
      {/* Loading text with tracking for a premium feel */}
      <p className="text-gray-500 font-bold mt-6 tracking-widest uppercase text-xs">
        Syncing Data
      </p>
    </div>
  );
};

export default Loader;
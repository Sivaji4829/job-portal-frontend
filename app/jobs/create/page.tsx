"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
// These imports assume your local project structure
import { jobService } from '../../../services/api';
import { JobInput } from '../../../lib/constants';
import JobForm from '../../../components/JobForm';
import Navbar from '../../../components/Navbar';

/**
 * CreateJobPage - The Page component for posting a new job listing.
 * This follows the Next.js App Router structure.
 */
export default function CreateJobPage() {
    const router = useRouter();

    const handleCreate = async (data: JobInput) => {
        try {
            await jobService.create(data);
            // Redirect to the dashboard upon successful creation
            router.push('/');
        } catch (error) {
            console.error("Failed to create job:", error);
            // In a production app, you might show a toast notification here
        }
    };

    const handleCancel = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50/50 antialiased">
            {/* Navbar component with a home navigation handler */}
            <Navbar onHome={() => router.push('/')} />
            
            <div className="max-w-3xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 font-semibold transition-colors group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
                        Back to Dashboard
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-10">
                        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Post New Opportunity</h1>
                            <p className="text-gray-500">Reach thousands of talented professionals instantly.</p>
                        </div>
                    </div>

                    {/* Reusable JobForm component 
                        Passes handleCreate as the submission handler
                    */}
                    <JobForm 
                        onSubmit={handleCreate} 
                        onCancel={handleCancel} 
                    />
                </motion.div>
            </div>
        </div>
    );
}
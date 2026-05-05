"use client";

import { useState, useMemo } from "react";
import JobCard from "../JobCard";
import Pagination from "../pagination/PaginationTmp";
import { Icon } from "../ui/Icon";
import { motion } from "framer-motion"; // Opsional: Untuk animasi halus

export default function JobGrid({ jobs }: { jobs: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  
  const currentJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return jobs.slice(startIndex, startIndex + itemsPerPage);
  }, [jobs, currentPage]);

  if (jobs.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-28 px-8 text-center"
      >

        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/10 blur-[40px] rounded-full scale-150" />
          
          <div className="relative flex items-center justify-center w-24 h-24 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-2xl rounded-[2.5rem] transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Icon 
              name="database" 
              size={36} 
              className="text-slate-300 dark:text-slate-600" 
            />
            
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-full border-4 border-white dark:border-[#020617]" />
          </div>
        </div>

        <div className="space-y-3 max-w-sm">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            No data available yet
          </h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed px-4">
            Your application list is currently empty. Start by adding a new job position to begin tracking your journey.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-800" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600">
            Awaiting Records
          </span>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-800" />
        </div>
      </motion.div>
    );
  }
  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <div className="pt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" }); 
          }}
        />
      </div>
    </div>
  );
}
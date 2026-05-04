"use client";

import { useState } from "react";
import { useJobs } from "@/hooks/useJobs";
import { Icon } from "@/components/ui/Icon";

import Sidebar from "@/components/navigation/Navigationtmp";
import StatusFilter from "@/components/applications/StatusFilter";
import JobList from "@/components/applications/JobList";
import AddJobModal from "@/components/applications/AddJobModal";

export default function ApplicationsPage() {
  const { jobs, fetchJobs } = useJobs();
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState(""); // State untuk search

  // Filter jobs berdasarkan status dan input pencarian
  const filteredJobs = jobs.filter((job: any) => {
    const matchesStatus = statusFilter === "ALL" || job.status === statusFilter;
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (job.position && job.position.toLowerCase().includes(searchLower)) ||
      (job.company && job.company.toLowerCase().includes(searchLower));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-300">
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <div className="max-w-[1400px] p-4 md:p-8 lg:p-10 space-y-8">
          
          {/* PAGE HEADER SECTION */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-blue-800 dark:bg-slate-900/40 p-6 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-100 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
                <Icon name="briefcase" size={14} />
                <span>Career Management</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-200 dark:text-white tracking-tight">
                Job Applications
              </h1>
              <p className="text-sm text-gray-100 dark:text-slate-400">
                You have <span className="text-gray-100 dark:text-blue-400 font-semibold">{jobs.length} total</span> applications tracked.
              </p>
            </div>

            {/* ACTION BUTTON (Desktop) */}
            <button
              onClick={() => setOpen(true)}
              className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Icon name="plus" size={20} strokeWidth={3} />
              Add New Position
            </button>
          </div>

          {/* FILTER AND SEARCH BAR SECTION */}
          <div className="sticky top-4 z-30 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 md:p-5 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-950/5 transition-all">
            {/* SEARCH INPUT */}
            <div className="flex items-center gap-3 bg-slate-100/80 dark:bg-slate-800/80 px-4 py-3.5 rounded-2xl text-slate-400 w-full lg:flex-1 lg:max-w-md ring-offset-background focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white dark:focus-within:bg-slate-950/40 focus-within:shadow-sm transition-all">
              <Icon name="search" size={18} className="text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by position or company..."
                className="bg-transparent border-none outline-none text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 w-full font-medium"
              />
            </div>

            {/* FILTER STATUS */}
            <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2 px-2 py-2 rounded-xl text-slate-500 dark:text-slate-400">
                <Icon name="filter" size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Status:</span>
              </div>
              <div className="w-auto">
                <StatusFilter
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                />
              </div>
            </div>
          </div>

          {/* JOB LIST CONTENT */}
          <div className="pb-24 md:pb-10">
            <JobList jobs={filteredJobs} />
          </div>
        </div>
      </main>

      {/* FLOATING ACTION BUTTON (Mobile Only) */}
      <div className="md:hidden fixed bottom-[100px] right-6 z-40">
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-500/40 flex items-center justify-center hover:bg-blue-700 transition-all active:scale-90"
        >
          <Icon name="plus" size={28} strokeWidth={3} />
        </button>
      </div>

      <AddJobModal
        open={open}
        setOpen={setOpen}
        fetchJobs={fetchJobs}
      />
    </div>
  );
}
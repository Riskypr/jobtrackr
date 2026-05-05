"use client";

import { useState, useRef, useEffect } from "react"; // Tambahkan useRef & useEffect
import { useJobs } from "@/hooks/useJobs";
import { Icon } from "@/components/ui/Icon";
import { motion, AnimatePresence } from "framer-motion"; // Untuk animasi dropdown

import Sidebar from "@/components/navigation/Navigationtmp";
import StatusFilter from "@/components/applications/StatusFilter";
import JobList from "@/components/applications/JobList";
import AddJobModal from "@/components/applications/AddJobModal";

export default function ApplicationsPage() {
  const { jobs, fetchJobs, loading, error } = useJobs();
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState(""); 
  
  // State dropdown mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statuses = ["ALL", "APPLIED", "INTERVIEW", "OFFER", "REJECTED", "ACCEPTED", "NO_RESPONSE"];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredJobs = jobs.filter((job: any) => {
    const matchesStatus = statusFilter === "ALL" || job.status === statusFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (job.position && job.position.toLowerCase().includes(searchLower)) ||
      (job.company && job.company.toLowerCase().includes(searchLower));

    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1 mt-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
          </div>
          <p className="text-md font-bold text-slate-700 dark:text-slate-300 tracking-wide">Loading your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-300">
      <main className="flex-1">
        <div className="max-w-[1400px] p-4 md:p-8 lg:p-10 space-y-8">
          
          {/* PAGE HEADER (Tetap Sama) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-blue-800 dark:bg-slate-900/40 p-6 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm relative overflow-hidden">
             <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-100 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
                <Icon name="briefcase" size={14} />
                <span>Career Management</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-200 dark:text-white tracking-tight">Job Applications</h1>
              <p className="text-sm text-gray-100 dark:text-slate-400">
                You have <span className="text-gray-100 dark:text-blue-400 font-semibold">{jobs.length} total</span> applications.
              </p>
            </div>
            <button onClick={() => setOpen(true)} className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold shadow-lg transition-all hover:scale-[1.02]">
              <Icon name="plus" size={20} strokeWidth={3} /> Add New Position
            </button>
          </div>

          {/* FILTER AND SEARCH BAR */}
          <div className="sticky top-4 z-30 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 md:p-5 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl">
            
            {/* SEARCH INPUT */}
            <div className="flex items-center gap-3 bg-slate-100/80 dark:bg-slate-800/80 px-4 py-3.5 rounded-2xl text-slate-400 w-full lg:flex-1 lg:max-w-md focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <Icon name="search" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search position or company..."
                className="bg-transparent border-none outline-none text-sm text-slate-800 dark:text-slate-100 w-full font-medium"
              />
            </div>

            {/* RESPONSIVE FILTER STATUS */}
            <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
              <div className="hidden lg:flex items-center gap-2 px-2 py-2 text-slate-500">
                <Icon name="filter" size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Status:</span>
              </div>

              <div className="lg:hidden relative w-full" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl shadow-sm active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="filter" size={16} className="text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      {statusFilter === "ALL" ? "All Status" : statusFilter}
                    </span>
                  </div>
                  <Icon name="chevron-down" size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-2 space-y-1">
                        {statuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              setStatusFilter(status);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                              statusFilter === status 
                                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400" 
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                          >
                            {status === "ALL" ? "All Status" : status}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden lg:block w-auto">
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

      {/* FLOATING ACTION BUTTON */}
      <div className="md:hidden fixed bottom-[100px] right-6 z-40">
        <button onClick={() => setOpen(true)} className="w-14 h-14 bg-blue-600 text-white rounded-xl shadow-2xl flex items-center justify-center active:scale-90 transition-all">
          <Icon name="plus" size={28} strokeWidth={3} />
        </button>
      </div>

      <AddJobModal open={open} setOpen={setOpen} fetchJobs={fetchJobs} />
    </div>
  );
}
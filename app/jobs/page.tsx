"use client";

import { useState } from "react";
import { useJobs } from "@/hooks/useJobs";
import { Briefcase, Plus, Search, Filter } from "lucide-react"; // Icon tambahan

import Sidebar from "@/components/navigation/navigation";
import Header from "@/components/header/Header";
import StatusFilter from "@/components/applications/StatusFilter";
import JobList from "@/components/applications/JobList";
import AddJobModal from "@/components/applications/AddJobModal";

export default function ApplicationsPage() {
  const { jobs, fetchJobs } = useJobs();
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredJobs = jobs.filter((job: any) =>
    statusFilter === "ALL" || job.status === statusFilter
  );

  return (
    <div className="flex md:pl-64 min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-300">
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <div className="max-w-[1400px] p-4 md:p-8 lg:p-10 space-y-8">
          
          <Header />

          {/* PAGE HEADER SECTION */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/50 dark:bg-slate-900/40 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
                <Briefcase size={14} />
                <span>Career Management</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Job Applications
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                You have <span className="text-blue-600 dark:text-blue-400 font-semibold">{jobs.length} total</span> applications tracked.
              </p>
            </div>

            {/* ACTION BUTTON (Desktop) */}
            <button
              onClick={() => setOpen(true)}
              className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Plus size={20} strokeWidth={3} />
              Add New Position
            </button>
          </div>

          {/* FILTER BAR SECTION */}
          <div className="sticky top-4 z-30 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-full md:w-auto flex items-center gap-2 px-3 text-slate-400">
              <Filter size={18} />
              <span className="text-xs font-bold uppercase tracking-tighter">Filter Status:</span>
              <StatusFilter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            </div>
            
            {/* SEARCH PLACEHOLDER (Optional visual) */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-slate-400 min-w-[250px]">
              <Search size={16} />
              <span className="text-sm">Search applications...</span>
            </div>
          </div>

          {/* JOB LIST CONTENT */}
          <div className="pb-24 md:pb-10">
            <JobList jobs={filteredJobs} />
          </div>
        </div>
      </main>

      {/* FLOATING ACTION BUTTON (Mobile Only) */}
      <div className="md:hidden fixed bottom-24 right-6 z-50">
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-500/40 flex items-center justify-center hover:bg-blue-700 transition-all active:scale-90"
        >
          <Plus size={28} strokeWidth={3} />
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
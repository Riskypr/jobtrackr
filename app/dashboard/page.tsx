"use client";

import { useState } from "react";
import { useJobs } from "@/hooks/useJobs";
import { CalendarDays, LayoutGrid, Zap } from "lucide-react"; // Icon tambahan

import Sidebar from "@/components/navigation/navigation";
import Header from "@/components/header/Header";
import Analytics from "@/components/analytics/Analytics";
import YearDistribution from "@/components/analytics/YearDistribution";
import ActivityFeed from "@/components/analytics/ActivityFeed";

export default function Dashboard() {
  const { jobs } = useJobs();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [yearFilter, setYearFilter] = useState(currentYear);

  const filteredJobs = (jobs || []).filter((job: any) => {
    const jobYear = new Date(job.appliedAt).getFullYear();
    return jobYear === yearFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
      {/* SIDEBAR - Pastikan sudah fixed seperti instruksi sebelumnya */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 md:pl-64 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto p-4 md:p-8 lg:p-10 space-y-10">
          
          {/* TOP SECTION: Header & Welcome */}
          <div className="space-y-6">
            <Header />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm mb-1">
                  <Zap size={16} fill="currentColor" />
                  <span>Welcome back!</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Dashboard
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">
                  You have applied to <span className="font-semibold text-slate-900 dark:text-slate-200">{filteredJobs.length}</span> jobs in {yearFilter}.
                </p>
              </div>

              {/* MODERN YEAR FILTER */}
              <div className="inline-flex p-1 bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-700">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setYearFilter(year)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      yearFilter === year
                        ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 1: KEY METRICS */}
          <section className="relative">
            <div className="flex items-center gap-2 mb-4 text-slate-400 text-xs uppercase tracking-widest font-bold">
              <LayoutGrid size={14} />
              <span>Key Performance</span>
            </div>
            <Analytics jobs={filteredJobs} />
          </section>

          {/* SECTION 2: BENTO GRID ANALYTICS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT: Distribution (Visual Data) */}
            <div className="lg:col-span-8 group">
              <div className="h-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-2 hover:border-blue-500/30 transition-colors shadow-sm">
                <div className="p-4 flex items-center justify-between">
                   <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 px-2">Contribution Graph</h3>
                   <CalendarDays size={18} className="text-slate-400" />
                </div>
                <YearDistribution jobs={filteredJobs} />
              </div>
            </div>

            {/* RIGHT: Activity Feed */}
            <div className="lg:col-span-4">
              <div className="h-full">
                <ActivityFeed jobs={filteredJobs} />
              </div>
            </div>

          </section>

          {/* FOOTER / DECORATION (Optional) */}
          <footer className="text-center py-10">
             <p className="text-xs text-slate-400 dark:text-slate-600">
                JobTrackr &copy; {currentYear} • Stay Productive
             </p>
          </footer>

        </div>
      </main>
    </div>
  );
}
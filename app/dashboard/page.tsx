"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import AddJobForm from "@/components/AddJobForm";
import Analytics from "@/components/Analytics";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Plus,
  X,
  Briefcase,
  LayoutDashboard,
} from "lucide-react";

const statusLabel: Record<string, string> = {
  ALL: "All",
  APPLIED: "Applied",
  INTERVIEW: "Interview",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState("ALL");

  async function fetchJobs() {
    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data);
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job: any) => {
    return statusFilter === "ALL" || job.status === statusFilter;
  });

  return (
    <div className="flex min-h-screen 
    bg-gradient-to-br from-slate-50 via-white to-slate-100 
    dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">

      {/* 🔥 SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col border-r 
      bg-white/70 backdrop-blur 
      dark:bg-gray-900 dark:border-gray-800 p-6">

        <h2 className="text-xl font-bold mb-8 text-gray-900 dark:text-white">
          JobTrackr
        </h2>

        <nav className="space-y-2 text-sm">

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl 
          bg-blue-100 dark:bg-blue-900/30 
          text-blue-600 dark:text-blue-400 font-medium">
            <LayoutDashboard size={16} />
            Dashboard
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl 
          text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
            <Briefcase size={16} />
            Applications
          </div>

        </nav>
      </aside>

      {/* 🔥 MAIN */}
      <main className="flex-1 p-6 space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track your job applications & progress
            </p>
          </div>

          <ThemeToggle />
        </div>

        {/* 🔥 FILTER (MODERN PILL) */}
        <div className="flex flex-wrap gap-2">

          {Object.keys(statusLabel).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
              ${
                statusFilter === status
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {statusLabel[status]}
            </button>
          ))}
        </div>

        {/* 🔥 ANALYTICS */}
        <Analytics jobs={filteredJobs} />

        {/* 🔥 JOB LIST */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job: any) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p className="text-lg">No applications yet 🚀</p>
              <p className="text-sm">
                Click the + button to start tracking
              </p>
            </div>
          )}
        </div>
      </main>

      {/* 🔥 FLOATING BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full 
        bg-gradient-to-r from-blue-600 to-indigo-600 
        text-white shadow-xl hover:scale-110 hover:shadow-2xl 
        transition flex items-center justify-center"
      >
        <Plus size={24} />
      </button>

      {/* 🔥 MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl relative border dark:border-gray-800">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <AddJobForm
              onSuccess={() => {
                fetchJobs();
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
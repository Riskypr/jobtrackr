"use client";

import { useState } from "react";
import { Building2, Briefcase, Calendar, Plus, Loader2, Sparkles } from "lucide-react";

export default function AddJobForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [appliedAt, setAppliedAt] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, position, appliedAt }),
      });

      setCompany("");
      setPosition("");
      setAppliedAt("");
      onSuccess?.();
    } catch (err) {
      console.error("Error adding job:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 px-6 py-4">
      
      {/* --- HEADER SECTION --- */}
      <div className="relative">
        <div className="absolute -left-5 top-1 w-1.5 h-10 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          New Opportunity
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 flex items-center gap-2">
          Ready to track your next big move? <Sparkles size={14} className="text-blue-500 animate-pulse" />
        </p>
      </div>

      {/* --- INPUT GROUP --- */}
      <div className="space-y-6">
        
        {/* COMPANY FIELD */}
        <div className="group space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 group-focus-within:text-blue-600 transition-colors ml-1">
             Company name
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Building2 size={18} strokeWidth={2.5} />
            </div>
            <input
              type="text"
              placeholder="e.g. Google, Stripe, Tesla"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 rounded-[1.25rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-blue-400 focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 outline-none text-slate-900 dark:text-white font-medium transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm"
            />
          </div>
        </div>

        {/* POSITION FIELD */}
        <div className="group space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 group-focus-within:text-blue-600 transition-colors ml-1">
            Job Position
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Briefcase size={18} strokeWidth={2.5} />
            </div>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Engineer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 rounded-[1.25rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-blue-400 focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 outline-none text-slate-900 dark:text-white font-medium transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm"
            />
          </div>
        </div>

        {/* DATE FIELD */}
        <div className="group space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 group-focus-within:text-blue-600 transition-colors ml-1">
            Application Date
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Calendar size={18} strokeWidth={2.5} />
            </div>
            <input
              type="date"
              value={appliedAt}
              onChange={(e) => setAppliedAt(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 rounded-[1.25rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-blue-400 focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 outline-none text-slate-900 dark:text-white font-medium transition-all shadow-sm [color-scheme:light] dark:[color-scheme:dark]"
            />
          </div>
        </div>
      </div>

      {/* --- ACTION BUTTON --- */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="relative w-full group overflow-hidden"
        > 
          <div className="relative flex items-center justify-center gap-3 py-6 rounded-[1.25rem] bg-blue-700 hover:bg-blue-800 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl transition-all active:translate-y-[0px] active:scale-[0.98] disabled:opacity-70">
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Plus size={16} strokeWidth={3} />
                <span>Add Application</span>
              </>
            )}
          </div>
        </button>
      </div>
    </form>
  );
}
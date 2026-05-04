"use client";

import { useState } from "react";
import { 
  X, 
  CheckCircle2, 
  Send, 
  Users, 
  Trophy, 
  Ban, 
  Ghost, 
  Loader2,
  ChevronRight
} from "lucide-react";

const STATUSES = [
  { 
    id: "APPLIED", 
    label: "Applied", 
    desc: "Application sent to company",
    icon: Send, 
    color: "text-blue-500", 
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  { 
    id: "INTERVIEW", 
    label: "Interview", 
    desc: "Ongoing recruitment process",
    icon: Users, 
    color: "text-yellow-500", 
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20"
  },
  { 
    id: "ACCEPTED", 
    label: "Offer", 
    desc: "Received a job offer",
    icon: Trophy, 
    color: "text-purple-500", 
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  { 
    id: "REJECTED", 
    label: "Rejected", 
    desc: "Not selected this time",
    icon: Ban, 
    color: "text-red-500", 
    bg: "bg-red-500/10",
    border: "border-red-500/20"
  },
  { 
    id: "NO_RESPONSE", 
    label: "Ghosted", 
    desc: "No update for a long time",
    icon: Ghost, 
    color: "text-slate-500", 
    bg: "bg-slate-500/10",
    border: "border-slate-500/20"
  },
];

export default function StatusUpdateModal({ job, onClose, onSuccess, onRefresh }: any) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(job?.status);

  const handleUpdate = async () => {
    if (selected === job?.status) {
      onClose();
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selected }),
      });
      if (res.ok) onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay dengan Blur lebih kuat */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Update Status
          </h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Current Progress:</span>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase">
              {job?.status}
            </span>
          </div>
        </div>

        {/* Status Selection Grid */}
        <div className="space-y-3">
          {STATUSES.map((s) => {
            const Icon = s.icon;
            const isSelected = selected === s.id;

            return (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={`w-full group flex items-center justify-between p-4 rounded-[1.25rem] border-2 transition-all duration-200 ${
                  isSelected 
                  ? "border-blue-600 bg-blue-50/50 dark:bg-blue-600/10 shadow-sm" 
                  : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-transparent"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-colors ${s.bg} ${s.color}`}>
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-bold leading-none ${isSelected ? "text-blue-700 dark:text-blue-400" : "text-slate-900 dark:text-white"}`}>
                      {s.label}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-1 font-medium">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className={`transition-all duration-300 ${isSelected ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:opacity-100"}`}>
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <CheckCircle2 size={14} className="text-white" />
                    </div>
                  ) : (
                    <ChevronRight size={18} className="text-slate-300" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          disabled={loading}
          onClick={handleUpdate}
          className="w-full mt-8 py-4 bg-blue-700 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold text-sm poppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-900/20 dark:shadow-white/5 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Processing...
            </>
          ) : (
            "Confirm Update"
          )}
        </button>
      </div>
    </div>
  );
}
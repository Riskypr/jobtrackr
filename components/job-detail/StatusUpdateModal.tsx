"use client";

import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

const STATUSES = [
  { id: "APPLIED", label: "Applied", color: "bg-blue-500" },
  { id: "INTERVIEW", label: "Interview", color: "bg-yellow-500" },
  { id: "OFFER", label: "Offer", color: "bg-purple-500" },
  { id: "REJECTED", label: "Rejected", color: "bg-red-500" },
  { id: "GHOSTED", label: "Ghosted", color: "bg-slate-500" },
];

export default function StatusUpdateModal({ job, onClose, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(job.status);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs/${job.id}/status`, {
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
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Update Status</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium uppercase tracking-wider">
          Current: <span className="text-blue-600">{job.status}</span>
        </p>

        <div className="grid grid-cols-1 gap-3">
          {STATUSES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                selected === s.id 
                ? "border-blue-600 bg-blue-50 dark:bg-blue-500/10 shadow-md" 
                : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${s.color}`} />
                <span className={`font-bold ${selected === s.id ? "text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"}`}>
                  {s.label}
                </span>
              </div>
              {selected === s.id && <CheckCircle2 size={20} className="text-blue-600" />}
            </button>
          ))}
        </div>

        <button
          disabled={loading}
          onClick={handleUpdate}
          className="w-full mt-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50"
        >
          {loading ? "Updating..." : "Confirm Status"}
        </button>
      </div>
    </div>
  );
}
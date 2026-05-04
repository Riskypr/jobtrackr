"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, Pencil, Trash2, RefreshCw, MoreVertical } from "lucide-react";

export default function JobActionMenu({ job, onEdit, onUpdateStatus, onDelete }: any) {
  const [open, setOpen] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`p-2.5 rounded-xl transition-all duration-200 ${
          open 
          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg" 
          : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 shadow-sm"
        }`}
      >
        <MoreVertical size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-1.5">
            {/* UPDATE STATUS */}
            <button
              onClick={() => { setOpen(false); onUpdateStatus(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all group"
            >
              <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              Update Status
            </button>

            {/* EDIT TIMELINE */}
            <button
              onClick={() => { setOpen(false); onEdit(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            >
              <Pencil size={16} />
              Edit Timeline
            </button>

            <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />

            {/* DELETE */}
            <button
              onClick={() => { setOpen(false); onDelete(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
            >
              <Trash2 size={16} />
              Delete Job
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}
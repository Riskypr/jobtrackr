"use client";

import { Icon } from "@/components/ui/Icon"

export default function DeleteModal({ onClose, onDelete }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* BACKDROP - Efek blur yang modern */}
      <div 
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />

      {/* MODAL CONTENT */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-10 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        
        {/* CLOSE BUTTON (Top Corner) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <Icon name="x" size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* ICON DANGER */}
          <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 ring-8 ring-red-50 dark:ring-red-500/5">
            <Icon name="alert-triangle" className="text-red-600 dark:text-red-500" size={32} strokeWidth={2.5} />
          </div>

          {/* TEXT CONTENT */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Delete Application?
          </h2>
          
          <p className="mt-3 text-slate-500 dark:text-slate-400 leading-relaxed">
            Are you sure you want to remove this job? This action is permanent and <span className="text-red-600 dark:text-red-400 font-semibold">cannot be undone</span>.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
          >
            No, Keep it
          </button>
          
          <button
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Icon name="trash2" size={16} />
            Yes, Delete
          </button>
        </div>

      </div>
    </div>
  );
}
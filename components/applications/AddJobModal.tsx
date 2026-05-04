"use client";

import { X } from "lucide-react";
import AddJobForm from "@/components/AddJobForm";
import { motion, AnimatePresence } from "framer-motion";

interface AddJobModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  fetchJobs: () => void;
}

export default function AddJobModal({ open, setOpen, fetchJobs }: AddJobModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" 
          />

          {/* Modal Content Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[700px] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl relative z-10 p-8 md:p-12"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute z-50 right-8 top-8 p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:rotate-90 transition-all duration-300 text-slate-500"
            >
              <X size={20} />
            </button>

            {/* Render the Form */}
            <AddJobForm setOpen={setOpen} fetchJobs={fetchJobs} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
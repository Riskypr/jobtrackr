"use client";

import { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { motion } from "framer-motion";
import {useRouter} from "next/navigation";

interface LegalLayoutProps {
  children: ReactNode;
  title: string;
  lastUpdated: string;
}

export default function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-300">
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        
        {/* Breadcrumb & Back Link */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
           onClick={() => router.back()}  
            className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Icon name="arrowleft" size={16} />
            Back 
          </button>
        </motion.div>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-12"
        >
          <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
            Legal Document
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Icon name="clock" size={14} />
            Last Updated: <span className="font-semibold text-slate-700 dark:text-slate-200">{lastUpdated}</span>
          </p>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-950/5"
        >
          <div className="prose prose-slate dark:prose-invert max-w-none 
            prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-800 dark:prose-headings:text-white
            prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed
            prose-li:text-slate-600 dark:prose-li:text-slate-400">
            {children}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600">
          © 2026 Career Assistant • All Rights Reserved
        </div>
      </main>
    </div>
  );
}
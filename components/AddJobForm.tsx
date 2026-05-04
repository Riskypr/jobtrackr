"use client";

import { useState } from "react";
import { 
  Sparkles, Loader2, Briefcase, Calendar, FileText, 
  Plus, Upload, Building2, MapPin, ChevronRight, CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { notify } from "@/utils/notification"; 

interface AddJobFormProps {
  setOpen: (open: boolean) => void;
  fetchJobs: () => void;
}

export default function AddJobForm({ setOpen, fetchJobs }: AddJobFormProps) {
  const [mode, setMode] = useState<"manual" | "ai">("manual");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  const [formData, setFormData] = useState({
    company: "", position: "", appliedAt: "", location: "", deadline: "", requirements: ""
  });
  const [jobDescription, setJobDescription] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleParse = async () => {
    if (!jobDescription) return notify.error("Please enter the job description text first.");
    
    setIsParsing(true);
    try {
      const response = await fetch("/api/jobs/parse-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to extract data.");

      setFormData({
        company: data.company || "",
        position: data.position || "",
        location: data.location || "",
        deadline: data.deadline || "",
        requirements: data.requirements || "",
        appliedAt: formData.appliedAt
      });

      notify.success("AI successfully extracted data!");
      setMode("manual");
    } catch (error: any) {
      notify.error(error.message);
    } finally {
      setIsParsing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to save.");
      
      notify.success("Job posting added!");
      setOpen(false);
      fetchJobs();
    } catch (error: any) {
      notify.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* HEADER SECTION */}
      <header className="mb-5 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest">
          <Plus size={12} strokeWidth={3} /> Career Management
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          New <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Job Tracker</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl font-medium">
          Input your next big opportunity manually or let our AI assist you in seconds.
        </p>
      </header>

      {/* MODE TABS */}
      <div className="inline-flex p-1.5 bg-slate-100 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-700/50 mb-10">
        <button
          onClick={() => setMode("manual")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
            mode === "manual" 
            ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm ring-1 ring-black/5" 
            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Briefcase size={14} /> Manual Entry
        </button>
        <button
          onClick={() => setMode("ai")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
            mode === "ai" 
            ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm ring-1 ring-black/5" 
            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Sparkles size={14} className="text-amber-500 animate-pulse" /> AI Smart Parser
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {mode === "manual" ? (
              <motion.form
                key="manual-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit}
                className="space-y-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-blue-500/5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Company Name", icon: Building2, field: "company", placeholder: "e.g., Google Indonesia" },
                    { label: "Job Position", icon: Briefcase, field: "position", placeholder: "e.g., Frontend Developer" },
                    { label: "Application Date", icon: Calendar, field: "appliedAt", type: "date" },
                    { label: "Location", icon: MapPin, field: "location", placeholder: "e.g., Jakarta / Remote" },
                  ].map((input) => (
                    <div key={input.field} className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{input.label}</label>
                      <div className="group relative">
                        <input.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input
                          type={input.type || "text"}
                          value={(formData as any)[input.field]}
                          onChange={(e) => handleInputChange(input.field, e.target.value)}
                          placeholder={input.placeholder}
                          className="w-full py-4 pl-12 pr-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-100 shadow-sm"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Requirements Preview</label>
                  <textarea
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => handleInputChange("requirements", e.target.value)}
                    placeholder="Briefly list key requirements..."
                    className="w-full p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Plus size={18} strokeWidth={3} /> Finalize & Save</>}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="ai-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-indigo-500/5"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Paste Job Description</label>
                    <span className="text-[10px] font-bold text-indigo-500 animate-pulse">AI Powered</span>
                  </div>
                  <textarea
                    rows={12}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Drop the full job text here... our AI will find the company, role, location, and dates automatically."
                    className="w-full p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2rem] text-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-800 dark:text-slate-100 leading-relaxed shadow-inner"
                  />
                </div>
                <button 
                  onClick={handleParse} 
                  disabled={isParsing} 
                  className="w-full py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all"
                >
                  {isParsing ? <Loader2 className="animate-spin" size={20} /> : <><Sparkles size={18} fill="currentColor" /> Magic Extract</>}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SIDEBAR - FEATURE CARDS */}
        <div className="space-y-6">
          <div className="relative overflow-hidden p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white shadow-2xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-colors" />
            <h3 className="text-lg font-black flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500 rounded-xl shadow-lg shadow-blue-500/40"><FileText size={18} /></div>
              How it works
            </h3>
            
            <div className="space-y-6 relative z-10">
              {[
                { title: "Manual Control", desc: "For direct inputs when you have specific data ready.", color: "text-blue-400" },
                { title: "AI Extraction", desc: "Paste long descriptions and let AI do the boring work.", color: "text-indigo-400" },
                { title: "Smart Tracking", desc: "Everything is saved in your personalized dashboard.", color: "text-emerald-400" }
              ].map((step, i) => (
                <div key={i} className="flex gap-4 group/item">
                  <div className="shrink-0 w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-black group-hover/item:border-blue-500 group-hover/item:text-blue-500 transition-colors">
                    {i + 1}
                  </div>
                  <div className="space-y-1">
                    <p className={`text-xs font-black uppercase tracking-tight ${step.color}`}>{step.title}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
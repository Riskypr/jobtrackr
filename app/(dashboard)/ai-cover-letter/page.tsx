"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check, Briefcase, FileText, Download } from "lucide-react";
import { notify } from "@/utils/notification";

export default function CoverLetterPage() {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeData, setResumeData] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription || !resumeData || !companyName || !position) {
      notify.error("Please fill out all fields first!");
      return;
    }

    setIsGenerating(true);
    setCoverLetter("");

    try {
      const response = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          resumeData,
          companyName,
          position,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate draft");
      }

      setCoverLetter(data.coverLetter);
      notify.success("Cover letter draft generated successfully!");
    } catch (error: any) {
      notify.error(error.message || "An error occurred, please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    setIsCopied(true);
    notify.success("Copied to clipboard successfully!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Function to download Word file (.doc) compatible with Word 2019 and below
  const exportToWord = () => {
    if (!coverLetter) return;
    
    const blob = new Blob([coverLetter], { type: "application/msword;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Cover_Letter_${companyName.replace(/\s+/g, "_")}.doc`;
    link.click();
    URL.revokeObjectURL(url);
    notify.success("Word file (.doc) downloaded successfully!");
  };

  return (
    <div className="min-h-screen px-4 py-12 md:px-8 max-w-6xl mx-auto">
      {/* HEADER SECTION */}
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
          AI <span className="text-blue-600">Cover Letter</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 text-sm">
          <Sparkles size={16} className="text-yellow-500 fill-yellow-500" />
          Automate the creation of cover letters for fast and personalized job applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* INPUT FORM */}
        <form onSubmit={handleGenerate} className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase size={18} className="text-blue-600" /> Enter Job Details
          </h2>

          <div className="space-y-4">
            {/* Input Company Name */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-2 block">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., TechCorp Inc."
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium transition-all text-slate-800 dark:text-slate-100"
                required
              />
            </div>

            {/* Input Position Applied */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-2 block">
                Position Applied
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="e.g., Software Engineer"
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium transition-all text-slate-800 dark:text-slate-100"
                required
              />
            </div>

            {/* Input Job Description */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-2 block">
                Job Description
              </label>
              <textarea
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job details or position description here..."
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium transition-all text-slate-800 dark:text-slate-100"
                required
              />
            </div>

            {/* Input Resume Summary */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-2 block">
                Resume Summary / Experience
              </label>
              <textarea
                rows={3}
                value={resumeData}
                onChange={(e) => setResumeData(e.target.value)}
                placeholder="Write about your educational background, skills, and achievements..."
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium transition-all text-slate-800 dark:text-slate-100"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Sparkles size={16} /> Generate Draft
              </>
            )}
          </button>
        </form>

        {/* OUTPUT DRAFT */}
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 min-h-[520px] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText size={18} className="text-green-600" /> Draft Result
              </h3>

              {coverLetter && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center gap-2 hover:bg-slate-200 transition-all"
                  >
                    {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    {isCopied ? "Copied" : "Copy"}
                  </button>
                </div>
              )}
            </div>

            <div className="prose dark:prose-invert max-w-none text-left text-xs text-slate-700 dark:text-slate-300 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl min-h-[300px] max-h-[340px] overflow-y-auto border border-slate-100 dark:border-slate-800 leading-relaxed whitespace-pre-wrap">
              {coverLetter || (
                <div className="h-60 flex flex-col items-center justify-center text-center text-slate-400 gap-2">
                  <Sparkles size={32} className="text-slate-300 opacity-50" />
                  <p className="text-xs font-bold tracking-tight">No draft generated yet</p>
                  <span className="text-[10px] text-slate-400 max-w-[280px]">
                    Fill out the form on the left and click the button to generate a draft.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Tombol Export */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              disabled={!coverLetter}
              onClick={exportToWord}
              className="w-full py-3.5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase hover:bg-blue-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Download size={14} /> Download Word (.doc)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
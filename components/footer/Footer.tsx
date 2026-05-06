"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 pb-20 md:pb-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* TOP SECTION: Branding & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                <Icon name="zap" className="text-white" size={20} />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                Job<span className="text-blue-600">Trackr</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Elevate your career journey with a modern application tracker. Stay organized, stay focused, and land your dream job.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/dashboard" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors">
                  <Icon name="dashboard" size={16} /> Dashboard
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors">
                  <Icon name="briefcase" size={16} /> Applications
                </Link>
              </li>
              <li>
                <Link href="/ai-cover-letter" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors">
                  <Icon name="sparkles" size={16} /> AI Cover Letter
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@jobtrackr.com" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors">
                  <Icon name="mail" size={16} /> Contact Support
                </a>
              </li>
              <li className="flex gap-4 pt-2">
                <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center w-9 h-9">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 008 10.94c.58.1.79-.25.79-.55v-2.15c-3.25.71-3.94-1.57-3.94-1.57-.53-1.34-1.3-1.7-1.3-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.05 1.8 2.76 1.28 3.43.98.1-.76.41-1.28.75-1.57-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.33 1.21-3.15-.12-.3-.52-1.5.11-3.13 0 0 .98-.31 3.2 1.2a11.1 11.1 0 015.82 0c2.22-1.51 3.2-1.2 3.2-1.2.63 1.63.23 2.83.11 3.13.75.82 1.21 1.87 1.21 3.15 0 4.51-2.74 5.5-5.35 5.8.42.36.8 1.08.8 2.18v3.23c0 .3.21.65.8.55A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
                </svg>
                </a>
                <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-400 hover:text-white transition-all flex items-center justify-center w-9 h-9">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M22 5.92c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.73 1.04 4.28 4.28 0 00-7.3 3.9A12.15 12.15 0 013 4.89a4.28 4.28 0 001.32 5.72 4.26 4.26 0 01-1.94-.54v.05a4.29 4.29 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54 12.13 12.13 0 008.56 21c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.7 8.7 0 0022 5.92z" />
                </svg>
                </a>
                <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-700 hover:text-white transition-all flex items-center justify-center w-9 h-9">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6 1.11 6 0 4.88 0 3.5 0 2.12 1.11 1 2.49 1c1.38 0 2.49 1.12 2.49 2.5zM.5 8h4v12h-4V8zm7.5 0h3.6v1.64h.05c.5-.95 1.73-1.95 3.55-1.95 3.8 0 4.5 2.5 4.5 5.74V20h-4v-5.7c0-1.36-.03-3.1-1.89-3.1-1.9 0-2.2 1.48-2.2 3V20h-4V8z" />
                </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* AI CV Analysis / CTA */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-full">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">AI-Powered Resume Analysis</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                will be available soon in English
              </p>
            </div>
            <button 
              disabled 
              className="w-full py-3 bg-blue-600/50 text-white/80 text-xs font-bold rounded-xl cursor-not-allowed transition-all shadow-lg shadow-blue-500/10"
            >
              Coming soon
            </button>
          </div>

        </div>

        {/* BOTTOM SECTION: Copyright */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
            © {currentYear} JobTrackr. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
            <span>Made with</span>
            <Icon name="heart" size={12} className="text-red-500 fill-red-500" />
            <span>UjangDev</span>
          </div>

          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
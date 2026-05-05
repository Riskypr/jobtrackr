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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.63 7.63 0 0 1 8 6.5c.66 0 1.33.09 1.95.28 1.52-1.03 2.19-.82 2.19-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-400 hover:text-white transition-all flex items-center justify-center w-9 h-9">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-700 hover:text-white transition-all flex items-center justify-center w-9 h-9">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .514.522 0 1.165 0h13.67C15.478 0 16 .514 16 1.146v13.708c0 .632-.522 1.146-1.165 1.146H1.165C.522 16 0 15.486 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.213a1.383 1.383 0 1 1 0-2.766 1.383 1.383 0 0 1 0 2.766zM8.638 13.394V8.583c0-2.618 1.428-3.04 2.723-3.04 1.574 0 1.874 1.146 1.874 2.872v4.979h2.392V8.169c0-3.333-.787-5.753-4.596-5.753-1.874 0-3.036 1.026-3.535 2.016h-.035V2.417H5.253v10.977h2.385z"/>
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
            <Link href="/#" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link href="/#" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
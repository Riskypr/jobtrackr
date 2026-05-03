"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon"
// import { 
//   Mail, 
//   Zap,
//   LayoutDashboard,
//   Briefcase,
//   User,
//   Heart
// } from "lucide-react";

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
                <Link href="/profile" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors">
                  <Icon name="user" size={16} /> Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@jobtrackr.com" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 flex items-center gap-2 transition-colors">
                  <Icon name="mail" size={16} /> Contact Support
                </a>
              </li>
              <li className="flex gap-4 pt-2">
                <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  {/* <Github size={18} /> */}
                </a>
                <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-400 hover:text-white transition-all">
                  {/* <Twitter size={18} /> */}
                </a>
                <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-700 hover:text-white transition-all">
                  {/* <Linkedin size={18} /> */}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Ready for the next step?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Start tracking your applications today and see the difference.</p>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95">
              Get Started Free
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
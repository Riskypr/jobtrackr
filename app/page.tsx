"use client";

import { useState, useEffect } from "react"; // Tambahkan ini
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import { 
  Zap, 
  ChevronRight, 
  LayoutDashboard, 
  CheckCircle2, 
  BarChart3, 
  Clock,
  Briefcase
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  // Logic untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-500 overflow-x-hidden">
      
      {/* NAVBAR AREA */}
      <nav 
        className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "top-4 w-[90%] max-w-5xl bg-white/70 dark:bg-[#020617]/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl py-3 shadow-2xl shadow-blue-500/10" 
            : "top-0 w-full bg-transparent border-b border-transparent py-8"
        }`}
        >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="text-white" size={18} />
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
              Job<span className="text-blue-600">Trackr</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link href="/auth/login" className="hidden sm:block text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                Sign In
            </Link>
            <Link href="/auth/register">
                <button className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-xl shadow-slate-900/10 dark:shadow-white/5 hover:scale-105 active:scale-95 transition-all">
                  Sign Up
                </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6"> 
        {/* Animated Background Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
            <Zap size={14} /> New: AI Career Insights
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            Manage Applications <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Effortlessly.
            </span>
          </h1>

          <p className="mt-8 text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The modern toolkit for job seekers. Organize your journey, visualize your progress, and get hired faster.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <button className="group px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-2xl shadow-blue-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                Launch Dashboard <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* HERO VISUAL (Preview Dashboard) */}
        <div className="mt-20 max-w-6xl mx-auto relative group">
           <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent blur-3xl opacity-20 -z-10" />
           <div className="rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden p-4 md:p-6 transition-transform duration-700 group-hover:scale-[1.01]">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                 </div>
                 <div className="mx-auto bg-slate-100 dark:bg-slate-800 px-4 py-1 rounded-lg text-[10px] text-slate-400 font-mono">jobtrackr.io/dashboard</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                 <div className="col-span-2 space-y-4">
                    <div className="h-40 bg-slate-50 dark:bg-slate-800/50 rounded-3xl animate-pulse" />
                    <div className="h-64 bg-slate-50 dark:bg-slate-800/50 rounded-3xl" />
                 </div>
                 <div className="col-span-1 space-y-4">
                    <div className="h-full bg-blue-50 dark:bg-blue-500/5 rounded-3xl border border-blue-100 dark:border-blue-500/10" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FEATURES - Bento Grid Style */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">Built for High-Growth Careers</h2>
           <p className="text-slate-500 mt-4">Everything you need to scale your job search.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between group hover:border-blue-500/50 transition-colors">
            <div>
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Visual Analytics</h3>
              <p className="text-slate-500 dark:text-slate-400">Track your conversion rates from application to interview with beautifully crafted charts.</p>
            </div>
            <div className="mt-8 flex gap-2">
               {[1,2,3,4,5].map(i => <div key={i} className="h-2 flex-1 bg-blue-100 dark:bg-blue-500/20 rounded-2xl" />)}
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-900 dark:bg-white p-8 rounded-3xl text-white dark:text-slate-900 flex flex-col justify-between overflow-hidden relative">
            <LayoutDashboard className="absolute -right-8 -top-8 w-40 h-40 opacity-10 rotate-12" />
            <h3 className="text-2xl font-bold mb-4">Centralized Hub</h3>
            <p className="text-slate-400 dark:text-slate-500 text-sm">One place for all your resumes, notes, and contact info.</p>
            <div className="mt-8 flex items-center gap-2 font-bold text-sm">
               Explore Hub <ChevronRight size={16} />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
             <Clock className="text-blue-600 mb-4" size={32} />
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Timeline View</h3>
             <p className="text-slate-500 dark:text-slate-400 text-sm">Never miss an interview or a follow-up deadline again.</p>
          </div>

          {/* Feature 4 */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-1 rounded-3xl">
             <div className="bg-white dark:bg-slate-900 h-full w-full rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Smart Status Tracking</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Automated status updates and reminders for your ongoing applications.</p>
                   <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 rounded-lg text-xs font-bold tracking-tight">Interviewing</span>
                      <span className="px-3 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-600 rounded-lg text-xs font-bold tracking-tight">Offer Received</span>
                   </div>
                </div>
                <div className="w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center border-8 border-slate-100 dark:border-slate-800">
                   <CheckCircle2 className="text-blue-600" size={48} />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900 dark:bg-white rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-blue-600/10 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-bold text-white dark:text-slate-900 mb-6 relative">Ready to land your dream job?</h2>
          <p className="text-slate-400 dark:text-slate-500 mb-10 relative">Join 10,000+ developers tracking their career moves with JobTrackr.</p>
          <Link href="/dashboard">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all hover:scale-105 shadow-xl shadow-blue-500/20 relative uppercase tracking-widest text-sm">
              Start Tracking Now — It's Free
            </button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
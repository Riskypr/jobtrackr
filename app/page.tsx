"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import FooterSide from "@/components/footer/FooterSide";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  ChevronRight,
  LayoutDashboard,
  Clock,
  Sparkles,
  Cpu,
  Shield,
  FileText,
  LineChart,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const features = [
    {
      title: "Analytics",
      description: "Monitor your application progress and conversion rates with easy-to-understand metrics.",
      icon: LineChart,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
    },
    {
      title: "Centralized Dashboard",
      description: "Manage all stages of your job application within a single clean and intuitive workspace.",
      icon: LayoutDashboard,
      color: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
    },
    {
      title: "Timeline & Reminder",
      description: "Never miss an interview deadline again with smart, automated reminders.",
      icon: Clock,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
    },
    {
      title: "AI Writing Assistant",
      description: "Generate highly personalized cover letters in just a few seconds using advanced AI.",
      icon: FileText,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
    },
    {
      title: "Auto-Data Extraction",
      description: "Record job details automatically using our cutting-edge AI technology.",
      icon: Cpu,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
    },
    {
      title: "Secure Access",
      description: "Log in safely through Google SSO authentication with multi-layer security.",
      icon: Shield,
      color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
    }
  ];

  return (
    <main className="min-h-screen  bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-500 overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-600 dark:selection:text-blue-400">

      {/* NAVBAR AREA */}
      <nav
        className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${isScrolled
          ? "top-4 w-[90%] max-w-6xl bg-white/70 dark:bg-[#020617]/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl py-3 shadow-2xl shadow-blue-500/5"
          : "top-0 w-full bg-transparent border-b border-transparent py-8 px-2 md:px-8"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
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
              <button className="px-5 py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-xl shadow-slate-900/10 dark:shadow-white/5 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-44 pb-24 px-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -left-12 top-12 hidden md:flex items-center gap-3 px-4 py-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/30 dark:shadow-slate-950/20 border border-slate-100 dark:border-slate-800"
          >
            <Cpu className="text-blue-500 animate-pulse" size={18} />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">AI Automation</span>
          </motion.div>

          <motion.div
            animate={{
              y: [-8, 8, -8],
              rotate: [1, -1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -right-12 top-24 hidden md:flex items-center gap-3 px-4 py-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/30 dark:shadow-slate-950/20 border border-slate-100 dark:border-slate-800"
          >
            <Shield className="text-emerald-500" size={18} />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">Gmail Auth SSO</span>
          </motion.div>

          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles size={14} /> New: AI Insights & Automation
            </span>
          </motion.div>

          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight"
          >
            Manage Applications <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Effortlessly.
            </span>
          </motion.h1>

          <motion.p variants={fadeIn} initial="hidden" animate="visible" className="mt-8 text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The modern toolkit for job seekers. Organize your journey, automate your inputs, and get hired faster.
          </motion.p>

          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <button className="group px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-2xl shadow-blue-500/40 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2">
                Launch Dashboard <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all">
              Watch Demo
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 max-w-6xl mx-auto relative group"
        >
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
            <div className="grid grid-cols-3 gap-4 h-[380px]">
              <div className="col-span-2 space-y-4">
                <div className="h-40 bg-slate-50 dark:bg-slate-800/50 rounded-3xl animate-pulse flex flex-col justify-between p-6">
                  <span className="text-xs text-slate-400 font-bold">Total Applications</span>
                  <span className="text-3xl font-black text-slate-800 dark:text-slate-100">14 Active</span>
                </div>
                <div className="h-44 bg-slate-50 dark:bg-slate-800/50 rounded-3xl" />
              </div>
              <div className="col-span-1 space-y-4">
                <div className="h-full bg-blue-50 dark:bg-blue-500/5 rounded-3xl border border-blue-100 dark:border-blue-500/10 flex flex-col justify-between p-6">
                  <div className="space-y-4">
                    <Sparkles size={28} className="text-blue-600" />
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">AI Tools Ready</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Integrate your jobs faster than ever before using the power of AI automation.</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-600/10 text-blue-500 rounded-lg text-[10px] font-bold uppercase tracking-wider w-fit">Free Tier Included</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* NEW SECTION: AI INTEGRATION FEATURES */}
      <section className="py-24 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 border-y border-slate-200/30 dark:border-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Supercharge Your Job Search</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 font-medium max-w-xl mx-auto text-sm">Cut down manual labor and stand out to recruiters using state-of-the-art AI tools.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="group relative p-8 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-200/30 dark:shadow-none transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.3)] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300" />
              <div className="p-3 w-12 h-12 bg-blue-50 dark:bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">AI Job Data Extraction</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                No more manual copy-pasting. Simply input the job board URL or description, and our AI will automatically parse and record the company, position, and requirements.
              </p>
              <span className="text-xs font-black tracking-widest uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-xl">
                Automatic Input
              </span>
            </div>

            <div className="group relative p-8 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-200/30 dark:shadow-none transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.3)] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300" />
              <div className="p-3 w-12 h-12 bg-emerald-50 dark:bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">AI Cover Letter Writer</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Tailor your applications in seconds. Provide your resume summary and the target job description to generate a highly personalized, professional cover letter draft.
              </p>
              <span className="text-xs font-black tracking-widest uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl">
                One-click Drafts
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - Sticky Left & Scroll Right */}
      <section className="py-24 max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* LEFT */}
          <div className="md:col-span-5 md:sticky md:top-32 space-y-6">
            <span className="text-blue-500 font-bold text-xs uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-xl">
              JobTrackr Features
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Everything You Need <br />
              <span className="text-blue-600">To Get Hired Faster.</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Explore a modern toolkit designed to optimize your job application process from start to finish.
            </p>
          </div>

          {/* RIGHT - TIMELINE */}
          <div className="md:col-span-7 h-[400px] overflow-y-auto pr-4 space-y-10 relative py-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.2 }}
                className="relative pl-12 group"
              >

                {/* GARIS VERTIKAL */}
                {index !== features.length - 1 && (
                  <div className="absolute left-[18px] top-10 bottom-[-40px] w-[2px] bg-gradient-to-b from-blue-500 via-indigo-400 to-transparent opacity-60" />
                )}

                {/* DOT / NUMBER */}
                <div className="absolute left-[0px] top-2 w-10 h-10 rounded-full bg-blue-600 border-4 border-white dark:border-[#020617] shadow-xl flex items-center justify-center text-sm font-extrabold text-white group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>

                {/* CARD */}
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl hover:shadow-2xl hover:shadow-slate-900/5 dark:hover:shadow-none hover:border-blue-500/40 transition-all">

                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl mb-4 border ${item.color}`}>
                    <item.icon size={18} />
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>

                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA - Modern Glow Section */}
      <section className="py-24 px-6">
        <div className="relative max-w-4xl mx-auto text-center p-12 bg-gradient-to-tr from-blue-600/10 via-indigo-500/5 to-transparent border border-blue-500/20 rounded-[40px] shadow-2xl shadow-blue-500/5 backdrop-blur-xl">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -z-10" />

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Start tracking your job <br />
            applications today.
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
            Simple, fast, and free to get started. No setup needed.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <button className="group px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all hover:scale-[1.03] active:scale-95 shadow-2xl shadow-blue-500/30 flex items-center gap-3 mx-auto">
                Get Started <ArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
              </button>
            </Link>

            <button className="px-7 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition mx-auto">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <FooterSide />
    </main>
  );
}
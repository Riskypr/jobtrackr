"use client";

import { signIn } from "next-auth/react";
import { Icon } from "@/components/ui/Icon";
import { motion } from "framer-motion";

export default function AuthCard({ type }: { type: "login" | "register" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[440px] p-8 md:p-12 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-500/5"
    >
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Logo */}
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-3">
          <Icon name="zap" size={32} className="text-white" fill="currentColor" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {type === "login" ? "Welcome Back" : "Get Started"}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium px-4">
            {type === "login" 
              ? "Manage your job applications and track your career progress." 
              : "Create an account to start tracking your professional journey."}
          </p>
        </div>

        {/* Social Login Button */}
        <div className="w-full pt-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="group w-full flex items-center justify-center gap-4 py-4 px-6 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-bold text-slate-700 dark:text-slate-200 transition-all hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 active:scale-[0.98]"
          >
            <img src="https://authjs.dev/img/providers/google.svg" className="w-6 h-6" alt="Google" />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="relative w-full py-2">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100 dark:border-slate-800"></span></div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black text-slate-400">
            <span className="bg-white dark:bg-slate-900 px-4">Protected Access</span>
          </div>
        </div>

        {/* Info Footer */}
        <p className="text-[11px] text-slate-400 leading-relaxed">
          By continuing, you agree to our <span className="text-blue-500 font-bold cursor-pointer">Terms of Service</span> and <span className="text-blue-500 font-bold cursor-pointer">Privacy Policy</span>.
        </p>

        {/* Toggle Login/Register */}
        <div className="pt-4 text-sm font-bold text-slate-500">
          {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <a 
            href={type === "login" ? "/auth/register" : "/auth/login"} 
            className="text-blue-600 hover:underline"
          >
            {type === "login" ? "Sign Up" : "Log In"}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
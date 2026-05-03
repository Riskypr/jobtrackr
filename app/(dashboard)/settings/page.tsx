"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  Lock, 
  Globe, 
  Trash2, 
  Shield, 
  Smartphone, 
  Eye, 
  ChevronRight,
  Sparkles
} from "lucide-react";

export default function SettingsPage() {
  const [activeToggles, setActiveToggles] = useState({
    notifications: true,
    public: false,
    twoFactor: true
  });

  const toggleSwitch = (key: string) => {
    setActiveToggles(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 md:px-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-12"
      >
        {/* HEADER */}
        <div className="space-y-2 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={12} /> System Preferences
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
            Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Tailor your JobTrackr experience to fit your workflow.
          </p>
        </div>

        {/* SETTINGS SECTIONS */}
        <div className="grid gap-10">
          
          {/* SECTION: GENERAL */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-6">
              General Preferences
            </h3>
            <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <SettingItem 
                icon={Bell} 
                title="Email Notifications" 
                description="Get instant alerts about your job application status."
                active={activeToggles.notifications}
                onClick={() => toggleSwitch('notifications')}
              />
              <SettingItem 
                icon={Globe} 
                title="Public Profile Visibility" 
                description="Allow verified recruiters to find your profile."
                active={activeToggles.public}
                onClick={() => toggleSwitch('public')}
              />
              <SettingItem 
                icon={Eye} 
                title="Tracking History" 
                description="Keep a detailed log of all your dashboard activities."
                active={true}
                onClick={() => {}}
              />
            </div>
          </section>

          {/* SECTION: SECURITY */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-6">
              Security & Privacy
            </h3>
            <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <SettingItem 
                icon={Smartphone} 
                title="Two-Factor Authentication" 
                description="Secure your account with an extra layer of protection."
                active={activeToggles.twoFactor}
                onClick={() => toggleSwitch('twoFactor')}
              />
              <div className="flex items-center justify-between p-6 md:p-8 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400">
                    <Lock size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Change Password</h4>
                    <p className="text-sm text-slate-500">Update your account password regularly.</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          </section>

          {/* SECTION: DANGER ZONE */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-red-500/60 uppercase tracking-[0.3em] px-6">
              Danger Zone
            </h3>
            <div className="bg-red-50/30 dark:bg-red-500/5 rounded-[3.5rem] border border-red-100 dark:border-red-500/20 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-[2rem] flex items-center justify-center text-red-600">
                  <Trash2 size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-red-600">Delete Account</h4>
                  <p className="text-sm text-red-500/70 max-w-xs">
                    This action is permanent and will erase all your job tracking data.
                  </p>
                </div>
              </div>
              <button className="w-full md:w-auto px-10 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 active:scale-95">
                Delete Permanently
              </button>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}

// Sub-komponen untuk item setting agar kode lebih bersih
function SettingItem({ icon: Icon, title, description, active, onClick }: any) {
  return (
    <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 last:border-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
      <div className="flex gap-5">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
          <Icon size={22} />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
          <p className="text-sm text-slate-500 pr-4">{description}</p>
        </div>
      </div>
      
      {/* Custom Switch Component */}
      <button 
        onClick={onClick}
        className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${
          active ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
        }`}
      >
        <motion.div 
          animate={{ x: active ? 28 : 4 }}
          className="w-6 h-6 bg-white rounded-full shadow-lg"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
} 
"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, Zap, Star, MapPin, ExternalLink } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { useState, useEffect } from "react"; // Tambah useEffect jika perlu sinkronisasi ekstra
import EditProfileModal from "@/components/modals/EditProfileModal";

export default function ProfilePage() {
  // Ambil session dan fungsi update
  const { data: session, update } = useSession();
  const user = session?.user;

  // Animasi variants (tetap sama)
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const { stats } = useJobs();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const [localUser, setLocalUser] = useState(user);
  const { fetchJobs } = useJobs();

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  return (
    <div className="min-h-screen px-4 py-12 md:px-8">
      {user && (
        <EditProfileModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          currentUser={user} 
          onSuccess={() => fetchJobs()}
        />
      )}

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-4">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
              Account <span className="text-blue-600">Space</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              {/* Nama akan otomatis terupdate di sini karena session bersifat reaktif */}
              Welcome back, {localUser?.name?.split(' ')[0] || 'User'}. Your profile is looking great.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* LEFT COLUMN */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-blue-500/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full" />
                  <img 
                    src={localUser?.image || `https://ui-avatars.com/api/?name=${localUser?.name || 'User'}&background=2563eb&color=fff`}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-[3rem] border-4 border-white dark:border-slate-800 shadow-2xl object-cover relative z-10"
                    alt="Avatar"
                    referrerPolicy="no-referrer"
                  />
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-2xl shadow-xl z-20 border-4 border-white dark:border-slate-900"
                  >
                    <ShieldCheck size={24} />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                    {localUser?.name} {/* Ini akan otomatis sinkron */}
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    <MapPin size={12} className="text-blue-500" /> 
                    Indonesia
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-6" />

                <div className="grid grid-cols-2 w-full gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Jobs Applied</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white">{stats.total}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Success Rate</p>
                    <p className="text-xl font-black text-green-500">{stats.successRate}%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-600">
                    <User size={18} />
                  </div>
                  Personal Details
                </h3>
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1"
                >
                  Edit <ExternalLink size={12} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                  <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                    <User size={20} className="text-slate-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      {localUser?.name}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
                  <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                    <Mail size={20} className="text-slate-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-100 truncate">{user?.email}</span>
                  </div>
                </div>
              </div>
              
              {/* Banner (tetap sama) */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                      <Zap size={32} fill="white" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-white italic tracking-tight">Coming soon</h4>
                      <p className="text-blue-100 text-xs font-bold opacity-80">AI Analysis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
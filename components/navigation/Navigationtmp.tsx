"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react"; 
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  User, 
  LogOut, 
  ChevronUp,
  Zap,
  Settings,
  Sun,
  Moon,
  Sparkle
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession(); // Ambil data session
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  // Shortcut data user
  const user = session?.user;
  const userInitials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : "U";
  const avatarUrl = user?.image || `https://ui-avatars.com/api/?name=${user?.name || "User"}&background=2563eb&color=fff`;

  const menu = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Applications", href: "/jobs", icon: Briefcase },
    { name: "AI Cover Letter", href: "/ai-cover-letter", icon: Sparkle },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col bg-slate-50/50 dark:bg-[#020617] border-r border-slate-200 dark:border-slate-800 z-50 transition-colors duration-500">
        
        {/* LOGO SECTION */}
        <div className="p-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm shadow-blue-500/5"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="text-white" size={20} fill="currentColor" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
              Job<span className="text-blue-600">Trackr</span>
            </h2>
          </motion.div>
        </div>

        {/* MENU NAVIGATION */}
        <nav className="flex-1 px-6 mt-4">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 opacity-70">
            Main Navigation
          </p>
          <div className="space-y-2 relative">
            {menu.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className="relative block">
                  <motion.div
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-colors relative z-10 ${
                      active ? "text-blue-600 dark:text-white border-2 border-blue-600" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                    }`}
                  >
                    <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                    <span className="text-sm font-medium uppercase tracking-tight">{item.name}</span>
                    
                    {active && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white dark:bg-blue-600 rounded-2xl shadow-md border border-slate-200/50 dark:border-blue-400/20 -z-10"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* PROFILE SECTION (DESKTOP) */}
        <div className="p-6 relative" ref={profileRef}>
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-6 right-6 mb-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl shadow-blue-500/10 overflow-hidden z-[100]"
              >
                <div className="p-4 space-y-1">
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
                    <User size={16} strokeWidth={2.5} /> Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
                    <Settings size={16} strokeWidth={2.5} /> Settings
                  </Link>
                  
                  {/* Theme Toggle */}
                  <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl relative mt-2 h-11">
                    <motion.div 
                      className="absolute h-9 w-[47%] bg-white dark:bg-blue-600 rounded-xl shadow-sm"
                      animate={{ x: currentTheme === "light" ? 0 : "106%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button onClick={() => setTheme("light")} className={`relative z-10 flex-1 flex justify-center p-2 transition-colors ${currentTheme === "light" ? "text-blue-600" : "text-slate-400"}`}>
                      <Sun size={16} strokeWidth={2.5} />
                    </button>
                    <button onClick={() => setTheme("dark")} className={`relative z-10 flex-1 flex justify-center p-2 transition-colors ${currentTheme === "dark" ? "text-white" : "text-slate-400"}`}>
                      <Moon size={16} strokeWidth={2.5} />
                    </button>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                  
                  {/* Logout Button */}
                  <button 
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all"
                  >
                    <LogOut size={16} strokeWidth={2.5} /> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-full flex items-center gap-3 p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all"
          >
            <div className="relative shrink-0">
              <img 
                src={session?.user?.image || "/default-avatar.png"}
                alt="P" 
                className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm object-cover" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-sm font-black text-slate-900 dark:text-white leading-none truncate">
                {user?.name || "User"}
              </p>
              <p className="text-[10px] font-medium text-slate-400">
                {user?.email || "lorem@gmail.com"}
              </p>
            </div>
            <ChevronUp size={16} className={`mr-2 text-slate-300 transition-transform duration-500 ${isProfileOpen ? "rotate-180" : ""}`} />
          </motion.button>
        </div>

      </aside>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[50] w-[90%] max-w-[400px]">
        <div className="flex items-center p-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl relative shadow-blue-500/10">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="flex-1 relative py-4 rounded-md flex justify-center">
                <Icon size={20} className={`relative z-10 transition-colors ${active ? "text-white dark:text-slate-900" : "text-slate-400"}`} strokeWidth={2.5} />
                {active && (
                  <motion.div 
                    layoutId="mobileNavActive"
                    className="absolute inset-1.5 bg-blue-800 dark:bg-white rounded-xl -z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
          
          {/* Avatar Trigger Mobile */}
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex-1 flex justify-center py-2 relative">
             <motion.img 
              animate={isProfileOpen ? { scale: 1.1, border: "2px solid #2563eb" } : { scale: 1, border: "2px solid transparent" }}
              src={session?.user?.image || "/default-avatar.png"}
              alt="P" 
              className="w-9 h-9 rounded-full shadow-sm object-cover" 
             />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-[100%] left-0 right-0 mb-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-4 z-50"
              >
                  <div className="text-center py-2">
                    <p className="text-sm font-black dark:text-white leading-tight">{user?.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate px-4">{user?.email}</p>
                  </div>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                  
                  {/* Mobile Theme Toggle */}
                  <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl relative h-12 border border-slate-200/50 dark:border-slate-800">
                    <motion.div 
                      className="absolute h-10 w-[47%] bg-white dark:bg-blue-600 rounded-xl shadow-sm"
                      animate={{ x: currentTheme === "light" ? 0 : "106%" }}
                    />
                    <button onClick={() => setTheme("light")} className={`relative z-10 flex-1 flex items-center justify-center gap-2 font-black text-[10px] uppercase ${currentTheme === "light" ? "text-blue-600" : "text-slate-400"}`}>
                      <Sun size={14} strokeWidth={2.5} /> Light
                    </button>
                    <button onClick={() => setTheme("dark")} className={`relative z-10 flex-1 flex items-center justify-center gap-2 font-black text-[10px] uppercase ${currentTheme === "dark" ? "text-white" : "text-slate-400"}`}>
                      <Moon size={14} strokeWidth={2.5} /> Dark
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full mt-3 flex items-center justify-center gap-2 py-4 text-[10px] font-black text-red-500 uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all"
                  >
                    <LogOut size={16} /> Sign Out Account
                  </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
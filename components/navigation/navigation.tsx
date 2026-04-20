"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  User, 
  LogOut, 
  ChevronUp,
  Settings
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menu = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Applications", href: "/jobs", icon: Briefcase },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col bg-white dark:bg-[#020617] border-r border-slate-200 dark:border-slate-800 z-50">
        
        {/* LOGO SECTION */}
        <div className="p-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Briefcase className="text-white" size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                JobTrackr
              </h2>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Pro Dash</span>
            </div>
          </div>
        </div>

        {/* MENU SECTION */}
        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
            Main Menu
          </p>
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group
                ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span className={`font-semibold ${active ? "text-white" : ""}`}>
                  {item.name}
                </span>
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/40" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* PROFILE SECTION */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 relative" ref={profileRef}>
          {/* Pop Up Menu */}
          {isProfileOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="p-2">
                <Link href="/profile" className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <User size={16} />
                  Lihat Profil
                </Link>
                <Link href="/settings" className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <Settings size={16} />
                  Pengaturan
                </Link>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                  <LogOut size={16} />
                  Keluar Akun
                </button>
              </div>
            </div>
          )}

          {/* User Trigger */}
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`w-full flex items-center gap-3 p-2 rounded-2xl transition-all duration-200 ${
              isProfileOpen ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
            }`}
          >
            <div className="relative">
              <img 
                src="https://ui-avatars.com/api/?name=User+Name&background=0D8ABC&color=fff" 
                alt="Profile" 
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#020617] rounded-full" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Alex Doe</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">alex@example.com</p>
            </div>
            <ChevronUp size={16} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[60] mx-4 mb-4 p-2 rounded-2xl shadow-2xl
        bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl 
        border border-slate-200 dark:border-slate-800">
        <div className="flex justify-around items-center">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
                  active ? "text-blue-600 dark:text-blue-400" : "text-slate-400"
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] mt-1 font-bold tracking-tighter uppercase">{item.name}</span>
              </Link>
            );
          })}
          {/* Mobile Profile Avatar */}
          <button className="flex flex-col items-center justify-center p-2">
             <img 
                src="https://ui-avatars.com/api/?name=User+Name" 
                alt="P" 
                className="w-6 h-6 rounded-lg border border-slate-300"
              />
              <span className="text-[10px] mt-1 font-bold text-slate-400 uppercase tracking-tighter">Profil</span>
          </button>
        </div>
      </nav>
    </>
  );
}
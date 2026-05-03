"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center py-1 px-1 bg-slate-100 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl shadow-inner relative">
      {/* Slider Indicator */}
      <div 
        className={`absolute h-8 w-8 bg-white dark:bg-blue-600 rounded-xl shadow-sm transition-all duration-300 ease-out z-0 ${
          theme === "light" ? "left-1" : "left-[35px]"
        }`}
      />

      {/* Light Button */}
      <button
        onClick={() => setTheme("light")}
        className={`relative z-10 p-2 rounded-xl transition-colors duration-300 ${
          theme === "light" ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
        }`}
        title="Light Mode"
      >
        <Sun size={16} strokeWidth={2.5} />
      </button>

      {/* Dark Button */}
      <button
        onClick={() => setTheme("dark")}
        className={`relative z-10 p-2 rounded-xl transition-colors duration-300 ${
          theme === "dark" ? "text-white" : "text-slate-400 hover:text-slate-300"
        }`}
        title="Dark Mode"
      >
        <Moon size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}
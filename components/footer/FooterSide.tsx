"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function FooterSide() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-24">
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[900px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 pb-12">

                {/* Glass Container */}
                <div className="rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl px-8 py-8 shadow-xl shadow-slate-200/20 dark:shadow-none">

                    {/* Top Row */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        {/* Brand */}
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <Icon name="zap" className="text-white" size={18} />
                            </div>
                            <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                                Job<span className="text-blue-600">Trackr</span>
                            </span>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                            <Link href="/dashboard" className="hover:text-blue-600 transition">
                                Dashboard
                            </Link>
                            <Link href="/jobs" className="hover:text-blue-600 transition">
                                Jobs
                            </Link>
                            <Link href="/profile" className="hover:text-blue-600 transition">
                                Profile
                            </Link>
                        </div>

                        {/* Social */}
                        <div className="flex items-center gap-3">

                            {/* GitHub */}
                            <a
                                href="#"
                                className="p-2 rounded-xl text-slate-500 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 008 10.94c.58.1.79-.25.79-.55v-2.15c-3.25.71-3.94-1.57-3.94-1.57-.53-1.34-1.3-1.7-1.3-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.05 1.8 2.76 1.28 3.43.98.1-.76.41-1.28.75-1.57-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.33 1.21-3.15-.12-.3-.52-1.5.11-3.13 0 0 .98-.31 3.2 1.2a11.1 11.1 0 015.82 0c2.22-1.51 3.2-1.2 3.2-1.2.63 1.63.23 2.83.11 3.13.75.82 1.21 1.87 1.21 3.15 0 4.51-2.74 5.5-5.35 5.8.42.36.8 1.08.8 2.18v3.23c0 .3.21.65.8.55A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
                                </svg>
                            </a>

                            {/* Twitter */}
                            <a
                                href="#"
                                className="p-2 rounded-xl text-slate-500 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M22 5.92c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.73 1.04 4.28 4.28 0 00-7.3 3.9A12.15 12.15 0 013 4.89a4.28 4.28 0 001.32 5.72 4.26 4.26 0 01-1.94-.54v.05a4.29 4.29 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54 12.13 12.13 0 008.56 21c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.7 8.7 0 0022 5.92z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="#"
                                className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6 1.11 6 0 4.88 0 3.5 0 2.12 1.11 1 2.49 1c1.38 0 2.49 1.12 2.49 2.5zM.5 8h4v12h-4V8zm7.5 0h3.6v1.64h.05c.5-.95 1.73-1.95 3.55-1.95 3.8 0 4.5 2.5 4.5 5.74V20h-4v-5.7c0-1.36-.03-3.1-1.89-3.1-1.9 0-2.2 1.48-2.2 3V20h-4V8z" />
                                </svg>
                            </a>

                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

                    {/* Bottom */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">

                        <p>© {currentYear} JobTrackr</p>

                        <div className="flex items-center gap-4">
                            <Link href="#" className="hover:text-slate-800 dark:hover:text-white transition">
                                Privacy
                            </Link>
                            <Link href="#" className="hover:text-slate-800 dark:hover:text-white transition">
                                Terms
                            </Link>
                        </div>

                        <div className="flex items-center gap-1">
                            <span>Made with</span>
                            <Icon name="heart" size={12} className="text-red-500 fill-red-500" />
                            <span>UjangDev</span>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}
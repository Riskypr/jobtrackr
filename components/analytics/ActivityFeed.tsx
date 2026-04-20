"use client";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link"; // 🔥 Import Link untuk navigasi
import { ChevronRight } from "lucide-react"; // Opsional: Untuk icon panah

export default function ActivityFeed({ jobs }: { jobs: any[] }) {
  // 🔥 Slice diubah menjadi 0, 3 untuk menampilkan 3 terbaru saja
  const sorted = [...jobs]
    .sort(
      (a, b) =>
        new Date(b.appliedAt).getTime() -
        new Date(a.appliedAt).getTime()
    )
    .slice(0, 3);

  return (
    <div className="mb-[100px] md:mb-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm transition-colors duration-300">
      
      <h2 className="text-sm font-semibold mb-5 text-gray-600 dark:text-gray-300">
        Recent Activity
      </h2>

      <div className="space-y-4 relative">
        {/* Garis Vertikal Timeline */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-100 dark:bg-gray-800" />

        {sorted.map((job) => (
          <div key={job.id} className="relative pl-7">
            {/* Dot/Titik Timeline */}
            <div className="absolute left-0 top-[18px] w-4 h-4 rounded-full bg-blue-500 border-[3px] border-white dark:border-gray-900 z-10" />

            {/* Card Konten */}
            <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors cursor-default">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {job.position}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {job.company}
              </p>

              <p className="text-[11px] text-blue-500 dark:text-blue-400 font-medium mt-1">
                {formatDistanceToNow(new Date(job.appliedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 TOMBOL VIEW MORE */}
      <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800">
        <Link 
          href="/jobs" 
          className="flex items-center justify-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
        >
          See more activities
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
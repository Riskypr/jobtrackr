"use client";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon"

export default function ActivityFeed({ jobs }: { jobs: any[] }) {
  const sorted = [...jobs]
    .sort(
      (a, b) =>
        new Date(b.appliedAt).getTime() -
        new Date(a.appliedAt).getTime()
    )
    .slice(0, 2);

  // Helper untuk menentukan warna berdasarkan status
  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "INTERVIEW": return "bg-yellow-500";
      case "ACCEPTED": return "bg-green-500";
      case "REJECTED": return "bg-red-500";
      case "APPLIED": return "bg-blue-500";
      default: return "bg-slate-400";
    }
  };

  return (
    <div className="bg-blue-700 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all duration-300">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
            <Icon name="zap" size={16} fill="currentColor" />
          </div>
          <h2 className="text-md font-bold poppercase text-slate-100 dark:text-slate-300">
            Recent Activity
          </h2>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md">
          LIVE
        </span>
      </div>

      {/* FEED LIST */}
      <div className="space-y-6 relative">
        {/* Garis Vertikal Timeline (Dibuat lebih halus/gradient) */}
        <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-blue-500/50 via-slate-200 dark:via-slate-800 to-transparent" />

        {sorted.map((job) => (
          <div key={job.id} className="relative pl-9 group">
            {/* Dot Timeline dengan Ring Animasi */}
            <div className={`absolute left-0 top-[18px] w-[22px] h-[22px] rounded-full border-4 border-white dark:border-slate-900 z-10 transition-transform group-hover:scale-125 ${getStatusColor(job.status)}`} />

            {/* Card Konten */}
            <Link href={`/jobs/${job.id}`}>
              <div className="group/card relative bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-transparent hover:border-blue-500/20 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 dark:text-white group-hover/card:text-blue-600 transition-colors line-clamp-1">
                      {job.position}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      at <span className="font-medium text-slate-700 dark:text-slate-200">{job.company}</span>
                    </p>
                  </div>
                  <Icon name="arrow-up-right" size={14} className="text-slate-300 group-hover/card:text-blue-500 transition-colors" />
                </div>

                <div className="mt-3 flex items-center justify-between">
                   <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(job.status)}`} />
                      <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">
                        {job.status || "Applied"}
                      </span>
                   </div>
                   <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 italic">
                    {formatDistanceToNow(new Date(job.appliedAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* FOOTER ACTION */}
      <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link 
          href="/jobs" 
          className="flex items-center justify-center gap-2 text-sm font-medium poppercase text-gray-100 dark:text-blue-400 hover:text-gray-200 dark:hover:text-blue-300 transition-all group"
        >
          View Full Timeline
          <Icon name="chevronright" size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
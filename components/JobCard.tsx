"use client";

import { formatDistanceToNow } from "date-fns";
import StatusBadge from "./StatusBadge";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

type Job = {
  id: string;
  company: string;
  position: string;
  status: "APPLIED" | "INTERVIEW" | "REJECTED" | "ACCEPTED" | "NO_RESPONSE";
  appliedAt: string;
};

export default function JobCard({ job }: { job: Job }) {
  const router = useRouter();
  const bgImage = "/card-bg.jpg";

  return (
    <div
      onClick={() => router.push(`/jobs/${job.id}`)}
      className="group cursor-pointer relative p-5 rounded-3xl border 
        bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800
        hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 
        transition-all duration-500 overflow-hidden"
    >
      
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none select-none overflow-hidden">
        {/* Image Layer */}
        <img 
          src={bgImage} 
          alt="background" 
          className="w-full h-full object-cover opacity-[0.50] dark:opacity-[0.15] grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white to-white dark:via-gray-900 dark:to-gray-900" />
      </div>

      <div className="relative z-10">
        {/* TOP BAR */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3">
            {/* ICON */}
            <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-gray-800 border border-blue-100/50 dark:border-gray-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <Icon 
                name="briefcase" 
                className="text-blue-600 dark:text-blue-400 group-hover:text-white" 
                size={20} 
              />
            </div>

            {/* TITLE */}
            <div>
              <h2 className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
                {job.position ? job.position.charAt(0).toUpperCase() + job.position.slice(1).toLowerCase() : ""}
              </h2>

              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                <Icon name="building2" size={14} className="opacity-70" />
                {job.company}
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div className="scale-90 origin-right">
            <StatusBadge status={job.status} />
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-gray-100 via-gray-50 to-transparent dark:from-gray-800 dark:via-gray-800 dark:to-transparent my-4" />

        {/* FOOTER INFO */}
        <div className="flex items-center justify-between">
          {/* TIME */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 dark:text-gray-500">
            <Icon name="clock" size={13} />
            <span>
              Applied {formatDistanceToNow(new Date(job.appliedAt), { addSuffix: true })}
            </span>
          </div>

          <button
            className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 
            bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white 
            dark:hover:bg-blue-500 transition-all active:scale-95"
          >
            View Details
            <Icon name="arrowright" size={14} />
          </button>
        </div>
      </div>

      {/* HOVER GLOW EFFECT */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
        bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
    </div>
  );
}
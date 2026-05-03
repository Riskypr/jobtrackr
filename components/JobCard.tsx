import { formatDistanceToNow } from "date-fns";
import StatusBadge from "./StatusBadge";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon"


type Job = {
  id: string;
  company: string;
  position: string;
  status: "APPLIED" | "INTERVIEW" | "REJECTED" | "ACCEPTED" | "NO_RESPONSE";
  appliedAt: string;
};


export default function JobCard({ job }: { job: Job }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/jobs/${job.id}`)}
      className="group cursor-pointer relative p-5 rounded-2xl border 
    bg-white/70 backdrop-blur 
    dark:bg-gray-900 dark:border-gray-800
    hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ">

      {/* TOP BAR */}
      <div className="flex justify-between items-start mb-3">

        <div className="flex items-start gap-3">
          {/* ICON */}
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-gray-800">
            <Icon name="briefcase" className="text-blue-600 dark:text-blue-400" size={18} />
          </div>

          {/* TITLE */}
          <div>
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
              {job.position}
            </h2>

            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Icon name="building2" size={14} />
              {job.company}
            </div>
          </div>
        </div>

        {/* STATUS */}
        <StatusBadge status={job.status} />
      </div>

      {/* DIVIDER */}
      <div className="h-px bg-gray-100 dark:bg-gray-800 my-3" />

      {/* FOOTER INFO */}
      <div className="flex items-center justify-between">

        {/* TIME */}
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Icon name="clock" size={14} />
          Applied{" "}
          {formatDistanceToNow(new Date(job.appliedAt), {
            addSuffix: true,
          })}
        </div>


        <button
          className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:gap-2 transition-all">
          View
          <Icon name="arrowright" size={14} />
        </button>
      </div>

      {/* HOVER GLOW EFFECT */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none
        bg-gradient-to-r from-blue-500/10 to-indigo-500/10" />
    </div>
  );
}
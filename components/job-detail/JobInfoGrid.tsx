import { Calendar } from "lucide-react";
import { format } from "date-fns";
import StatusBadge from "@/components/StatusBadge";

export default function JobInfoGrid({ job }: any) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-4">

      <div className="p-4 bg-gray-50 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-xl">
        <p className="text-xs text-gray-500">Applied Date</p>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Calendar size={14} />
          {format(new Date(job.appliedAt), "dd MMM yyyy")}
        </div>
      </div>

      <div className="p-4 bg-gray-50 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-xl">
        <p className="text-xs text-gray-500">Status</p>
        <StatusBadge status={job.status} />
      </div>

    </div>
  );
}
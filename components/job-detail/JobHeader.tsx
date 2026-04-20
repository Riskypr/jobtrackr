import { Briefcase, Building2, Trash } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

export default function JobHeader({ job, onDelete }: any) {
  return (
    <div className="flex justify-between items-start mb-2">

      <div className="space-y-2">

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Briefcase size={16} />
          Job Position
        </div>

        <h1 className="text-2xl font-bold">{job.position}</h1>

        <div className="flex items-center gap-2 text-gray-500 text-md">
          <Building2 size={18} />
          {job.company}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <StatusBadge status={job.status} />

        {/* <button
          onClick={onDelete}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
        >
          <Trash size={20} />
        </button> */}
      </div>

    </div>
  );
}
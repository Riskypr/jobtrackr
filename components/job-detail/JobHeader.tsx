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
      </div>

    </div>
  );
}
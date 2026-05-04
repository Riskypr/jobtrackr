import JobTimeline from "@/components/JobTimeline";
import { Pencil } from "lucide-react";

export default function JobTimelineSection({
  steps,
  editing,
  setEditing,
  children,
}: any) {
  return (
    <div>

      <div className="flex justify-between mb-3">
        <p className="text-sm text-gray-500">Process Timeline</p>
      </div>

      <JobTimeline steps={steps} />

      {children}

    </div>
  );
}
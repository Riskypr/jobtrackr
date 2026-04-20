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

        {/* <button
          onClick={() => setEditing(!editing)}
          className="text-md flex items-center gap-1 text-blue-600"
        >
          <Pencil size={20} />
          Edit
        </button> */}
      </div>

      <JobTimeline steps={steps} />

      {children}

    </div>
  );
}
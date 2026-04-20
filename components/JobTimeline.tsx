import {
  CheckCircle2,
  Circle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";

type Step = {
  name: string;
  done: boolean;
  date?: string | null;
  result?: "PASSED" | "FAILED" | null;
};

export default function JobTimeline({
  steps,
}: {
  steps: Step[];
}) {
  const activeIndex = steps.findIndex((s) => !s.done);

  return (
    <div className="relative space-y-6">

      {steps.map((step, i) => {
        const isActive = i === activeIndex;
        const isDone = step.done;
        const isFailed = step.result === "FAILED";

        return (
          <div key={i} className="flex gap-4">

            {/* 🔥 LEFT SIDE */}
            <div className="flex flex-col items-center">

              {/* DOT */}
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full  z-10 transition
                ${
                  isFailed
                    ? "border-red-500 bg-red-100 dark:bg-red-900/20"
                    : isDone
                    ? "border-green-500 bg-green-100 dark:bg-green-900/20"
                    : isActive
                    ? "border-blue-500 bg-blue-100 dark:bg-blue-900/20 animate-pulse"
                    : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                }`}
              >
                {isFailed ? (
                  <XCircle size={14} className="text-red-500" />
                ) : isDone ? (
                  <CheckCircle2 size={14} className="text-green-500" />
                ) : (
                  <Circle size={12} className="text-gray-400 dark:text-gray-500" />
                )}
              </div>

              {/* 🔥 DASHED LINE */}
              {i !== steps.length - 1 && (
                <div className="flex-1 w-px border-l-2 border-dashed border-gray-300 dark:border-gray-700 my-1" />
              )}
            </div>

            {/* 🔥 RIGHT CONTENT */}
            <div
              className={`flex-1 p-4 rounded-xl  transition-all
              ${
                isActive
                  ? "bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800 shadow-sm"
                  : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
              }`}
            >
              {/* TITLE */}
              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-semibold ${
                    isFailed
                      ? "text-red-500"
                      : isDone
                      ? "text-green-600 dark:text-green-400"
                      : isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.name}
                </p>

                {/* DATE */}
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {step.date
                    ? format(new Date(step.date), "dd MMM")
                    : "-"}
                </span>
              </div>

              {/* RESULT */}
              {step.result && (
                <p className="text-xs mt-2">
                  {step.result === "PASSED" && (
                    <span className="px-2 py-0.5 rounded-full 
                    bg-green-100 text-green-700 
                    dark:bg-green-900/20 dark:text-green-400">
                      Lolos
                    </span>
                  )}

                  {step.result === "FAILED" && (
                    <span className="px-2 py-0.5 rounded-full 
                    bg-red-100 text-red-700 
                    dark:bg-red-900/20 dark:text-red-400">
                      Tidak Lolos
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
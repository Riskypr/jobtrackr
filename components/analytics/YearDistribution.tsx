"use client";

import { useMemo } from "react";
import SmartTooltip from "@/components/ui/SmartTooltip";

type Job = {
  appliedAt: string;
  position?: string;
  company?: string;
};

const COLORS = {
  0: "bg-slate-100 dark:bg-slate-800",
  1: "bg-blue-200/70 dark:bg-blue-900/40",
  2: "bg-blue-400/70 dark:bg-blue-700/60",
  3: "bg-blue-500 dark:bg-blue-500",
  4: "bg-blue-700 dark:bg-blue-400",
};

function getLevel(count: number) {
  if (count === 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function YearDistribution({
  jobs,
  year,
}: {
  jobs: Job[];
  year: number | "all";
}) {

  const { weeks, jobMap } = useMemo(() => {
    const map = new Map<string, number>();
    const jobMap = new Map<string, Job[]>();

    const filteredJobs =
      year === "all"
        ? jobs
        : jobs.filter(
            (job) =>
              new Date(job.appliedAt).getFullYear() === year
          );

    filteredJobs.forEach((job) => {
      const key = new Date(job.appliedAt)
        .toISOString()
        .split("T")[0];

      map.set(key, (map.get(key) || 0) + 1);

      if (!jobMap.has(key)) jobMap.set(key, []);
      jobMap.get(key)!.push(job);
    });

    const targetYear =
      year === "all" ? new Date().getFullYear() : year;

    const start = new Date(targetYear, 0, 1);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(targetYear, 11, 31);

    const weeks: any[][] = [];
    let week: any[] = [];
    let current = new Date(start);

    while (current <= end) {
      const key = current.toISOString().split("T")[0];
      const count = map.get(key) || 0;

      week.push({
        date: new Date(current),
        key,
        count,
        level: getLevel(count),
      });

      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }

      current.setDate(current.getDate() + 1);
    }

    return { weeks, jobMap };
  }, [jobs, year]);

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl">

      <div className="overflow-x-auto pt-[10px] pb-2 [&::-webkit-scrollbar]:hidden">
        <div className="inline-flex flex-col">

          {/* MONTH LABEL */}
          <div className="flex gap-[18px] mb-3">
            {weeks.map((week, i) => {
              const month = week[0].date.getMonth();
              const prevMonth = weeks[i - 1]?.[0]?.date?.getMonth();
              const show = month !== prevMonth;

              return (
                <div key={i} className="w-3 text-[10px] text-slate-400">
                  {show ? MONTHS[month] : ""}
                </div>
              );
            })}
          </div>

          {/* GRID */}
          <div className="flex gap-[6px]">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[4px]">
                {week.map((day, j) => {
                  const jobsToday = jobMap.get(day.key) || [];

                  return (
                    <SmartTooltip
                      key={j}
                      content={
                        <div>
                          <div className="font-semibold mb-1">
                            {day.count} Application
                          </div>

                          <div className="text-[9px] text-slate-500 dark:text-slate-400 mb-2">
                            {new Intl.DateTimeFormat("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }).format(new Date(day.key))}
                          </div>

                          {jobsToday.length > 0 ? (
                            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                              {jobsToday.map((job, idx) => (
                                <div
                                  key={idx}
                                  className="pb-1 border-b last:border-none border-slate-200 dark:border-slate-700"
                                >
                                  <div className="font-medium text-[11px] leading-tight">
                                    {job.position || "Unknown Position"}
                                  </div>
                                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                    {job.company || "Unknown Company"}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              No activity
                            </div>
                          )}
                        </div>
                      }
                    >
                      <div
                        className={`
                          w-6 h-6 rounded-md
                          cursor-pointer transition-all duration-200
                          ${COLORS[day.level as 0 | 1 | 2 | 3 | 4]}

                          hover:scale-125
                          hover:ring-2 hover:ring-blue-400/60
                          hover:shadow-lg hover:shadow-blue-500/20
                        `}
                      />
                    </SmartTooltip>
                  );
                })}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* LEGEND */}
      <div className="flex items-center gap-2 mt-4 text-[11px] text-slate-500">
        <span>Less</span>
        <div className="flex gap-[4px]">
          {Object.values(COLORS).map((color, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
          ))}
        </div>
        <span>More</span>
      </div>

    </div>
  );
}
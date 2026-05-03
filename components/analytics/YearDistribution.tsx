"use client";

import { useMemo } from "react";

const COLORS = {
  0: "bg-gray-100 dark:bg-gray-800",
  1: "bg-blue-100 dark:bg-blue-900/30",
  2: "bg-blue-300 dark:bg-blue-700/50",
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

export default function YearDistribution({ jobs }: { jobs: any[] }) {

  const { weeks } = useMemo(() => {
    const map = new Map<string, number>();

    jobs.forEach((job) => {
      const key = new Date(job.appliedAt)
        .toISOString()
        .split("T")[0];
      map.set(key, (map.get(key) || 0) + 1);
    });

    const year = new Date().getFullYear();
    const start = new Date(year, 0, 1);
    const day = start.getDay();
    start.setDate(start.getDate() - day);

    const end = new Date(year, 11, 31);
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
    return { weeks };
  }, [jobs]);

  return (
    <div className="bg-white dark:bg-gray-900 dark:border-gray-800 p-4 rounded-2xl transition-colors duration-300">

      {/* CONTAINER SCROLL */}
      <div className="overflow-x-auto pb-2 custom-scrollbar">
        <div className="inline-flex flex-col">
          
          {/* LABEL BULAN */}
          <div className="flex gap-[18px] mb-2">
            {weeks.map((week, i) => {
              const month = week[0].date.getMonth();
              const prevMonth = weeks[i - 1]?.[0]?.date?.getMonth?.();
              const show = i === 0 ? (month !== 11) : (month !== prevMonth);

              return (
                <div
                  key={i}
                  className="w-3 flex-shrink-0 flex justify-center text-[10px] text-gray-400 dark:text-gray-500"
                >
                  {show ? MONTHS[month] : ""}
                </div>
              );
            })}
          </div>

          {/* GRID KOTAK */}
          <div className="flex gap-[6px]">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {week.map((day, j) => (
                  <div
                    key={j}
                    title={`${day.key} • ${day.count} activity`}
                    className={`w-6 h-6 rounded-sm flex-shrink-0 transition-colors ${
                      COLORS[day.level as 0 | 1 | 2 | 3 | 4]
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
          
        </div>
      </div>

      {/* LEGEND (Sesuai dengan warna biru) */}
      <div className="flex items-center gap-2 mt-4 text-[11px] text-gray-500 dark:text-gray-400">
        <span>Less</span>
        <div className="flex gap-[3px]">
          <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
          <div className="w-3 h-3 rounded-sm bg-blue-100 dark:bg-blue-900/30" />
          <div className="w-3 h-3 rounded-sm bg-blue-300 dark:bg-blue-700/50" />
          <div className="w-3 h-3 rounded-sm bg-blue-500 dark:bg-blue-500" />
          <div className="w-3 h-3 rounded-sm bg-blue-700 dark:bg-blue-400" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
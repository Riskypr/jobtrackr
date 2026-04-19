"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Briefcase,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";

const COLORS = ["#3B82F6", "#F59E0B", "#EF4444", "#10B981", "#6B7280"];

export default function Analytics({ jobs }: any) {
  const total = jobs.length;

  const interview = jobs.filter((j: any) => j.status === "INTERVIEW").length;
  const accepted = jobs.filter((j: any) => j.status === "ACCEPTED").length;
  const rejected = jobs.filter((j: any) => j.status === "REJECTED").length;

  const successRate =
    total > 0 ? ((accepted / total) * 100).toFixed(1) : 0;

  const rejectedRate =
    total > 0 ? ((rejected / total) * 100).toFixed(1) : 0;

  const statusCount = Object.values(
    jobs.reduce((acc: any, job: any) => {
      acc[job.status] = acc[job.status] || {
        name: job.status,
        value: 0,
      };
      acc[job.status].value++;
      return acc;
    }, {})
  );

  return (
    <div className="grid lg:grid-cols-3 gap-6">

      {/* 🔥 LEFT: SUMMARY */}
      <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">

        {/* TOTAL */}
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition border flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Briefcase className="text-blue-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Apply</p>
            <h2 className="text-2xl font-bold">{total}</h2>
          </div>
        </div>

        {/* INTERVIEW */}
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition border flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-xl">
            <TrendingUp className="text-yellow-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Interview</p>
            <h2 className="text-2xl font-bold">{interview}</h2>
          </div>
        </div>

        {/* SUCCESS */}
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition border flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <CheckCircle className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Success Rate</p>
            <h2 className="text-2xl font-bold">{successRate}%</h2>
          </div>
        </div>

        {/* REJECTED */}
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition border flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-xl">
            <XCircle className="text-red-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Rejected Rate</p>
            <h2 className="text-2xl font-bold">{rejectedRate}%</h2>
          </div>
        </div>
      </div>

      {/* 🔥 RIGHT: PIE CHART */}
      <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 p-6 rounded-2xl shadow-sm border flex flex-col">
        {/* <h2 className="font-semibold mb-4">
          Status Distribution
        </h2> */}

        <div className="flex-1 h-">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={statusCount} dataKey="value">
                {statusCount.map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🔥 MINI LEGEND */}
        {/* <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {statusCount.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              {item.name}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
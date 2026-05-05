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
  Target,
  Activity
} from "lucide-react";

// Palet warna yang lebih vibrant dan modern
const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#6366F1"];

export default function Analytics({ jobs }: any) {
  const total = jobs.length;
  const interview = jobs.filter((j: any) => j.status === "INTERVIEW").length;
  const accepted = jobs.filter((j: any) => j.status === "ACCEPTED").length;
  const rejected = jobs.filter((j: any) => j.status === "REJECTED").length;

  const successRate = total > 0 ? ((accepted / total) * 100).toFixed(1) : 0;
  const rejectedRate = total > 0 ? ((rejected / total) * 100).toFixed(1) : 0;

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

      {/*  LEFT: GRID STATS */}
      <div className="lg:col-span-2 grid grid-cols-2 gap-4 md:gap-6">
        
        {/* TOTAL APPLICATIONS */}
        <StatCard 
          label="Total Applications" 
          value={total} 
          icon={Briefcase} 
          color="blue" 
          description="Total jobs tracked"
        />

        {/* INTERVIEWS */}
        <StatCard 
          label="Interviews" 
          value={interview} 
          icon={TrendingUp} 
          color="yellow" 
          description="Ongoing processes"
        />

        {/* SUCCESS RATE */}
        <StatCard 
          label="Success Rate" 
          value={`${successRate}%`} 
          icon={CheckCircle} 
          color="green" 
          description="Offer conversion"
        />

        {/* REJECTION RATE */}
        <StatCard 
          label="Rejected Rate" 
          value={`${rejectedRate}%`} 
          icon={XCircle} 
          color="red" 
          description="Market feedback"
        />
      </div>

      {/* 🔥 RIGHT: DONUT CHART CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm flex flex-col relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
            <Target size={16} />
          </div>
          <h2 className="text-md font-bold poppercase text-slate-700 dark:text-slate-300">
            Distribution
          </h2>
        </div>

        <div className="flex-1 min-h-[220px] relative">
          {/* Centered Text inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{total}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusCount}
                innerRadius={65}
                outerRadius={85}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {statusCount.map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} className="focus:outline-none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* MODERN LEGEND */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {statusCount.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 truncate uppercase tracking-tighter">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Komponen Card Statis terpisah agar lebih rapi
function StatCard({ label, value, icon: Icon, color, description }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50 dark:bg-blue-500/10",
    yellow: "text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10",
    green: "text-green-600 bg-green-50 dark:bg-green-500/10",
    red: "text-red-600 bg-red-50 dark:bg-red-500/10",
  };

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 ${colors[color]}`}>
            <Icon size={24} strokeWidth={2.5} />
          </div>
          <Activity size={16} className="text-slate-200 dark:text-slate-700" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 mb-1">
            {label}
          </p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {value}
          </h2>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon"
import Link from "next/link";

import JobHeader from "@/components/job-detail/JobHeader";
import JobInfoGrid from "@/components/job-detail/JobInfoGrid";
import JobTimelineSection from "@/components/job-detail/JobTimelineSection";
import EditStepsPanel from "@/components/job-detail/EditStepsPanel";
import DeleteModal from "@/components/job-detail/DeleteModal";
import JobActionMenu from "@/components/job-detail/JobActions";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState<any>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  async function fetchJob() {
    const res = await fetch(`/api/jobs/${id}`);
    const data = await res.json();
    setJob(data);
  }

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);

  useEffect(() => {
    if (job?.steps) setSteps(job.steps);
  }, [job]);

  if (!job) return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
          <Icon name="sparkles" className="text-blue-500 animate-spin" size={24} />
        </div>
        <p className="text-slate-500 font-medium">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
      {/* <Sidebar /> */}

      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10 space-y-8">
          
          {/* TOP NAV & BREADCRUMB */}
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/jobs')}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all shadow-sm"
              >
                <Icon name="arrowleft" size={20} />
              </button>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Applications</span>
                  <Icon name="chevronright" size={12} />
                  <span className="text-blue-600 dark:text-blue-400">Details</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <JobActionMenu
                  job={job}
                  onEdit={() => setEditing(true)}
                  onDelete={() => setShowDelete(true)}
                  onRefresh={fetchJob}
                />
            </div>
          </nav>

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDE: Header & Info (8 Columns) */}
            <div className="lg:col-span-8 space-y-8">
              <section className="relative overflow-hidden bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-xl -mr-16 -mt-16 blur-3xl" />
                
                <JobHeader job={job} />
                <div className="mt-8">
                   <JobInfoGrid job={job} />
                </div>
              </section>

              {/* TIMELINE SECTION */}
              <section className="bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Application Journey</h3>
                    <div className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">
                       {steps.length} Steps Total
                    </div>
                 </div>

                 <JobTimelineSection
                    steps={steps}
                    editing={editing}
                    setEditing={setEditing}
                  >
                    {editing && (
                      <div className="mt-6 animate-in slide-in-from-top-4 duration-300">
                        <EditStepsPanel
                          steps={steps}
                          setSteps={setSteps}
                          onCancel={() => setEditing(false)}
                          onSave={async () => {
                            await fetch(`/api/jobs/${id}`, {
                              method: "PATCH",
                              body: JSON.stringify({ steps }),
                            });
                            setEditing(false);
                            fetchJob();
                          }}
                        />
                      </div>
                    )}
                  </JobTimelineSection>
              </section>
            </div>

            {/* RIGHT SIDE: Summary / Support Info (4 Columns) */}
            <aside className="mb-[95px] md:mb-0 lg:col-span-4 space-y-6 ">
               <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20">
                  <h4 className="font-bold text-lg mb-2">Good Luck! 🚀</h4>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Be prepared for your next step. Consistency is the key to landing your dream job.
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-blue-200 text-[10px] uppercase font-bold tracking-wider">Status</span>
                        <span className="font-bold uppercase tracking-tight">{job.status}</span>
                     </div>
                     <Icon name="calendar" size={24} className="opacity-40" />
                  </div>
               </div>

               {/* Helpful Note Box */}
               <div className="bg-slate-100 dark:bg-slate-800/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Quick Tip</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Always update your timeline as soon as you get a response to keep your analytics accurate.
                  </p>
               </div>
            </aside>
          </div>
        </div>
      </main>

      {/* show modal delete */}
      {showDelete && (
        <DeleteModal
          onClose={() => setShowDelete(false)}
          onDelete={async () => {
            await fetch(`/api/jobs/${id}`, { method: "DELETE" });
            router.push("/jobs");
          }}
        />
      )}

    </div>
  );
}
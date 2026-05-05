"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image"; // Tambahkan import Image
import {
  ArrowLeft, MapPin, Building2, Calendar,
  ClipboardList, Clock, Trophy, RefreshCw, Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { notify } from "@/utils/notification";
import JobTimelineSection from "@/components/job-detail/JobTimelineSection";
import EditStepsModal from "@/components/modals/EditStepsModal";
import StatusUpdateModal from "@/components/modals/StatusUpdateModal";
import DeleteModal from "@/components/modals/DeleteModal";
import JobActionMenu from "@/components/job-detail/JobActions";
import { formatStatus } from "@/utils/format";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState<any>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  async function fetchJob() {
    try {
      const res = await fetch(`/api/jobs/${id}`);
      const data = await res.json();
      setJob(data);
    } catch (e) {
      console.error("Failed to fetch job", e);
    }
  }

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);

  useEffect(() => {
    if (job?.steps) setSteps(job.steps);
  }, [job]);

  if (!job) {

    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden">
        {/* BACKGROUND GLOW */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="flex flex-col items-center gap-4">

          {/* DOTS ANIMATION */}
          <div className="flex gap-1 mt-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
          </div>

          {/* TEXT */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-md font-bold text-slate-700 dark:text-slate-300 tracking-wide">
              Loading your data
            </p>
            <p className="text-[12px] text-slate-400 dark:text-slate-500 animate-pulse">
              Please wait a moment...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-[#020617] text-slate-800 dark:text-slate-100 antialiased pb-16">

      {/* Header */}
      <header className="border-b border-slate-200/50 dark:border-slate-900 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={() => router.push('/jobs')} className="group flex items-center gap-2 p-2 sm:p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-bold pr-1 hidden sm:inline">Back</span>
            </button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs md:text-xs font-bold uppercase tracking-widest text-slate-400">
              <span className="hidden sm:inline">Application</span>
              <span className="hidden sm:inline">/</span>
              <span className="text-blue-600 dark:text-blue-400">Job Details</span>
            </div>
          </div>
          <JobActionMenu job={job} onEdit={() => setEditing(true)} onUpdateStatus={() => setShowStatusModal(true)} onDelete={() => setShowDelete(true)} onRefresh={fetchJob} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-6 sm:pt-8 items-start">
        <section className="lg:col-span-7 space-y-4 sm:space-y-6">

          {/* JOB DETAILS CARD WITH FULL IMAGE */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none backdrop-blur-sm relative overflow-hidden group">
            <div className="relative h-48 sm:h-64 w-full overflow-hidden">
              <img
                src="/card-bg.jpg"
                className="w-full h-full object-cover"
              />
              {/* Overlay Gradient (Agar gambar menyatu dengan kartu di bagian bawah) */}
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-black/20" />

              {/* Floating Badge (Location) di atas gambar */}
              <div className="absolute bottom-4 left-6 sm:left-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-lg">
                  <MapPin size={12} /> {job.location || "Remote / Not Specified"}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-4 sm:pt-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-slate-400 font-bold text-[10px] capitalize tracking-wider">
                  <Building2 size={12} /> {job.company || "Company Name"}
                </span>
                <h1 className="text-xl sm:text-3xl font-black tracking-tight text-slate-800 dark:text-white leading-tight">
                  {job.position || "Job Position"}
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Calendar size={12} /> Applied At
                  </p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {job.appliedAt ? new Date(job.appliedAt).toLocaleDateString('en-US', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    }) : "-"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Clock size={12} /> Status
                  </p>
                  <p className="text-sm font-bold tracking-tight text-blue-600 dark:text-blue-400">
                    {formatStatus(job.status || "APPLIED")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* REQUIREMENTS CARD */}
          {job.requirements && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                  <ClipboardList size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">Requirements</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Details and qualifications</p>
                </div>
              </div>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 bg-slate-50/40 dark:bg-slate-950/20 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 whitespace-pre-wrap font-medium">
                {job.requirements}
              </div>
            </motion.div>
          )}
        </section>

        {/* KOLOM KANAN */}
        <aside className="lg:col-span-5 space-y-6">

          <div className="bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 sm:p-8">
            <header className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Application Pipeline</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Process history</p>
              </div>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-[10px] font-black tracking-widest text-slate-500">
                {steps.length} Steps
              </span>
            </header>
            <JobTimelineSection steps={steps} editing={editing} setEditing={setEditing} />
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-2xl sm:rounded-3xl border border-slate-800 shadow-xl relative group overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-all" />
            <h4 className="text-sm md:text-md font-bold tracking-[0.2em] capitalize text-indigo-400 mb-4 flex items-center gap-2">
              <span className="w-0.5 h-4 bg-indigo-500 rounded-full" /> Preparation Tip
            </h4>
            <p className="text-sm md:text-md leading-relaxed text-slate-400 font-medium">
              Before your interview, take the time to review the details
              in the <strong>Requirements</strong> section and tailor your portfolio.
            </p>
            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[8px] sm:text-[9px] font-black text-slate-600 uppercase tracking-widest">
                Career Assistant v2.0
              </div>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* MODAL EDIT STEPS */}
      <EditStepsModal
        isOpen={editing}
        onClose={() => setEditing(false)}
        steps={steps}
        setSteps={setSteps}
        onCancel={() => setEditing(false)}
        onSave={async () => {
          const loadingId = notify.loading("Updating steps...");
          try {
            const response = await fetch(`/api/jobs/${id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ steps }),
            });

            if (!response.ok) throw new Error();

            notify.dismiss(loadingId);
            notify.success("Steps updated successfully!");
            setEditing(false);
            fetchJob();
          } catch (e) {
            notify.dismiss(loadingId);
            notify.error("Failed to update steps, please try again.");
          }
        }}
      />

      {/* MODAL UPDATE STATUS */}
      {showStatusModal && (
        <StatusUpdateModal
          job={job}
          onClose={() => setShowStatusModal(false)}
          onSuccess={() => {
            setShowStatusModal(false);
            fetchJob();
            notify.success("Status updated successfully!");
          }}
        />
      )}

      {/* MODAL DELETE */}
      {showDelete && (
        <DeleteModal
          onClose={() => setShowDelete(false)}
          onDelete={async () => {
            const loadingId = notify.loading("Deleting job...");
            try {
              const response = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
              if (!response.ok) throw new Error();

              notify.dismiss(loadingId);
              notify.success("Job deleted successfully!");
              router.push("/jobs");
            } catch (e) {
              notify.dismiss(loadingId);
              notify.error("Failed to delete job, please try again.");
            }
          }}
        />
      )}
    </div>
  );
}
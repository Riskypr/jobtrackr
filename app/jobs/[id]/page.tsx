"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import StatusBadge from "@/components/StatusBadge";
import JobTimeline from "@/components/JobTimeline";
import { Trash2, Pencil } from "lucide-react";

import {
  ArrowLeft,
  Building2,
  Briefcase,
  Calendar,
} from "lucide-react";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);

  const [job, setJob] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [steps, setSteps] = useState<any[]>([]);

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

  if (!job) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen 
    bg-gradient-to-br from-slate-50 via-white to-slate-100 
    dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 p-6">

      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* 🔥 CARD */}
        <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-black/30 
        rounded-2xl p-6 shadow-lg space-y-6">

          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Briefcase size={16} />
                Job Position
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {job.position}
              </h1>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Building2 size={16} />
                {job.company}
              </div>
            </div>

            {/* 🔥 RIGHT ACTION */}
            <div className="flex items-center gap-3">
              <StatusBadge status={job.status} />

              <button
                onClick={() => setShowDelete(true)}
                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-px bg-gray-100 dark:bg-gray-800" />

          {/* DETAILS */}
          <div className="grid sm:grid-cols-2 gap-4">

            <div className="bg-gray-50/80 dark:bg-gray-800/60 
border border-gray-100 dark:border-gray-700 p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">
                Applied Date
              </p>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calendar size={14} />
                {format(new Date(job.appliedAt), "dd MMM yyyy")}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">
                Status
              </p>
              <StatusBadge status={job.status} />
            </div>
          </div>

          {/* 🔥 TIMELINE */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Process Timeline</p>

              <button
                onClick={() => setEditing(!editing)}
                className="text-xs flex items-center gap-1 text-blue-600"
              >
                <Pencil size={14} />
                Edit
              </button>
            </div>

            <JobTimeline steps={steps} />
            {/* edit modal */}
            {editing && (
              <div className="mt-6 space-y-4">

                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 space-y-3"
                  >
                    {/* 🔥 TOP ROW */}
                    <div className="flex items-center gap-3">

                      {/* NAME */}
                      <input
                        value={step.name}
                        onChange={(e) => {
                          const updated = [...steps];
                          updated[i].name = e.target.value;
                          setSteps(updated);
                        }}
                        className="flex-1 px-3 py-2 rounded-lg border text-sm
            bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                      />

                      {/* DONE */}
                      <label className="flex items-center gap-1 text-xs text-gray-500">
                        <input
                          type="checkbox"
                          checked={step.done}
                          onChange={() => {
                            const updated = [...steps];
                            updated[i].done = !updated[i].done;

                            if (updated[i].done && !updated[i].date) {
                              updated[i].date = new Date().toISOString().slice(0, 10);
                            }

                            setSteps(updated);
                          }}
                        />
                        Done
                      </label>
                    </div>

                    {/* 🔥 BOTTOM ROW */}
                    <div className="grid grid-cols-2 gap-3">

                      {/* RESULT */}
                      <select
                        value={step.result || ""}
                        onChange={(e) => {
                          const updated = [...steps];
                          updated[i].result = e.target.value || null;
                          setSteps(updated);
                        }}
                        className="px-3 py-2 rounded-lg border text-sm
            bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="">Status</option>
                        <option value="PASSED">Lolos</option>
                        <option value="FAILED">Tidak Lolos</option>
                      </select>

                      {/* DATE */}
                      <input
                        type="date"
                        value={step.date || ""}
                        onChange={(e) => {
                          const updated = [...steps];
                          updated[i].date = e.target.value;
                          setSteps(updated);
                        }}
                        className="px-3 py-2 rounded-lg border text-sm
            bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                      />
                    </div>
                  </div>
                ))}

                {/* 🔥 ACTIONS */}
                <div className="flex justify-between items-center mt-4">

                  <button
                    onClick={() =>
                      setSteps([
                        ...steps,
                        { name: "New Step", done: false },
                      ])
                    }
                    className="text-sm text-blue-600 hover:underline"
                  >
                    + Add Step
                  </button>

                  <div className="flex gap-2">

                    <button
                      onClick={() => setEditing(false)}
                      className="px-4 py-2 text-sm rounded-lg 
                      border border-gray-200 dark:border-gray-700 
                      hover:bg-gray-100 dark:hover:bg-gray-800 
                      transition"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={async () => {
                        let newStatus = job.status;

                        const hasFailed = steps.some(
                          (s) => s.result === "FAILED"
                        );

                        if (hasFailed) {
                          newStatus = "REJECTED";
                        } else {
                          const lastDone = [...steps]
                            .reverse()
                            .find((s) => s.done);

                          if (lastDone) {
                            if (lastDone.name.toLowerCase().includes("interview")) {
                              newStatus = "INTERVIEW";
                            }

                            if (lastDone.name.toLowerCase().includes("offering")) {
                              newStatus = "ACCEPTED";
                            }
                          }
                        }

                        await fetch(`/api/jobs/${id}`, {
                          method: "PATCH",
                          body: JSON.stringify({
                            steps,
                            status: newStatus,
                          }),
                        });

                        setEditing(false);
                        fetchJob();
                      }}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg 
                      border border-blue-200 dark:border-gray-700 
                      hover:bg-blue-400 dark:hover:bg-gray-800 
                      transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
          {showDelete && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-xl border dark:border-gray-800">

                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Delete Job?
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                  This action cannot be undone.
                </p>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowDelete(false)}
                    className="px-4 py-2 text-sm rounded-lg border dark:border-gray-700"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={async () => {
                      await fetch(`/api/jobs/${id}`, {
                        method: "DELETE",
                      });
                      router.push("/dashboard");
                    }}
                    className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
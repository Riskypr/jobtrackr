"use client";

import { useState } from "react";
import { Building2, Briefcase, Calendar } from "lucide-react";

export default function AddJobForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [appliedAt, setAppliedAt] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          position,
          appliedAt,
        }),
      });

      setCompany("");
      setPosition("");
      setAppliedAt("");

      onSuccess?.();
    } catch (err) {
      console.error("Error adding job:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* 🔥 HEADER */}
      <div>
        <h2 className="text-2xl  font-semibold text-gray-900 dark:text-white">
          Add Job Application
        </h2>
        <p className="text-md text-gray-500">
          Track your new opportunity 🚀
        </p>
      </div>

      {/* 🔥 INPUT GROUP */}
      <div className="space-y-4">

        {/* COMPANY */}
        <div className="space-y-1">
          <label className="text-md text-gray-500">Company</label>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border 
          bg-white/70 backdrop-blur 
          dark:bg-gray-800 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500">

            <Building2 size={20} className="text-gray-400" />

            <input
              type="text"
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-md text-gray-800 dark:text-white placeholder-gray-400 p-2"
            />
          </div>
        </div>

        {/* POSITION */}
        <div className="space-y-1">
          <label className="text-md text-gray-500">Position</label>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border 
          bg-white/70 backdrop-blur 
          dark:bg-gray-800 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500">

            <Briefcase size={20} className="text-gray-400" />

            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="w-full p-2 bg-transparent outline-none text-md text-gray-800 dark:text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* DATE */}
        <div className="space-y-1">
          <label className="text-md text-gray-500">Applied Date</label>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border 
          bg-white/70 backdrop-blur 
          dark:bg-gray-800 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500">

            <Calendar size={20} className="text-gray-400" />

            <input
              type="date"
              value={appliedAt}
              onChange={(e) => setAppliedAt(e.target.value)}
              className="w-full p-2 bg-transparent outline-none text-md text-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl font-medium text-white 
        bg-gradient-to-r from-blue-600 to-indigo-600 
        hover:scale-[1.02] hover:shadow-lg 
        transition-all duration-200 
        disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Job"}
      </button>
    </form>
  );
}
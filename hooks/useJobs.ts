"use client";

import { useEffect, useState } from "react";

export function useJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    successRate: 0,
  });
  const [loading, setLoading] = useState(true); // 🔥 langsung true biar gak flicker
  const [error, setError] = useState<string | null>(null);

  async function fetchJobs() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/jobs");

      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data = await res.json();

      setJobs(data.jobs || []);
      setStats(
        data.stats || {
          total: 0,
          success: 0,
          successRate: 0,
        }
      );
    } catch (err: any) {
      console.error("Fetch Jobs Error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = await res.json();

        if (!mounted) return;

        setJobs(data.jobs || []);
        setStats(
          data.stats || {
            total: 0,
            success: 0,
            successRate: 0,
          }
        );
      } catch (err: any) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false; // 🔥 fix warning React
    };
  }, []);

  return { jobs, stats, loading, error, fetchJobs };
}
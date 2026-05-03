"use client";

import { useEffect, useState } from "react";

export function useJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    successRate: 0,
  });
  const [loading, setLoading] = useState(false);

  async function fetchJobs() {
    setLoading(true);
    const res = await fetch("/api/jobs");
    const data = await res.json();

    setJobs(data.jobs);
    setStats(data.stats);

    setLoading(false);
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return { jobs, stats, loading, fetchJobs };
}

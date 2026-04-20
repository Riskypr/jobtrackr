"use client";

import { useEffect, useState } from "react";

export function useJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchJobs() {
    setLoading(true);
    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return { jobs, setJobs, fetchJobs, loading };
}
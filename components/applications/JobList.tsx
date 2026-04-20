"use client";

import { useState, useMemo } from "react";
import JobCard from "../JobCard";
import Pagination from "../pagination/PaginationTmp";

export default function JobGrid({ jobs }: { jobs: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  
  //  Jumlah item per halaman
  const itemsPerPage = 9; 

  // Logic Pagination
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  
  const currentJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return jobs.slice(startIndex, startIndex + itemsPerPage);
  }, [jobs, currentPage]);

  // Handle Empty State langsung di sini
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 dark:bg-gray-800/20 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
        <div className="text-4xl mb-4">🚀</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          No applications yet
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[250px] mt-1">
          Click the + button to start tracking your career journey.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* GRID DAFTAR JOB */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* COMPONENT PAGINATION */}
      <div className="pt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" }); //  Scroll ke atas saat ganti halaman
          }}
        />
      </div>
    </div>
  );
}
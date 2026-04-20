const statusLabel: Record<string, string> = {
  ALL: "All",
  APPLIED: "Applied",
  INTERVIEW: "Interview",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export default function StatusFilter({
  statusFilter,
  setStatusFilter,
}: any) {
  return (
    <div className="flex flex-wrap gap-2">

      {Object.keys(statusLabel).map((status) => (
        <button
          key={status}
          onClick={() => setStatusFilter(status)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
          ${
            statusFilter === status
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
          }`}
        >
          {statusLabel[status]}
        </button>
      ))}
    </div>
  );
}
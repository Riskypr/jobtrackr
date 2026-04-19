import {
  Briefcase,
  Clock,
  XCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

type Status =
  | "APPLIED"
  | "INTERVIEW"
  | "REJECTED"
  | "ACCEPTED"
  | "NO_RESPONSE";

export default function StatusBadge({ status }: { status: Status }) {
  const base =
    "px-2 py-1 text-xs rounded-full font-medium flex items-center gap-1 w-fit";

  const statusConfig: Record<
    Status,
    {
      label: string;
      style: string;
      icon: any;
    }
  > = {
    APPLIED: {
      label: "Applied",
      style:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      icon: Briefcase,
    },
    INTERVIEW: {
      label: "Interview",
      style:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      icon: Clock,
    },
    REJECTED: {
      label: "Rejected",
      style:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      icon: XCircle,
    },
    ACCEPTED: {
      label: "Accepted",
      style:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      icon: CheckCircle,
    },
    NO_RESPONSE: {
      label: "No Response",
      style:
        "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
      icon: AlertCircle,
    },
  };

  const { label, style, icon: Icon } = statusConfig[status];

  return (
    <span className={`${base} ${style}`}>
      <Icon size={12} />
      {label}
    </span>
  );
}
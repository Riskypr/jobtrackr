import toast from "react-hot-toast";

export const notify = {
  success: (message: string) => {
    toast.success(message, {
      duration: 3000,
      className: "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl text-xs font-bold !p-4",
    });
  },
  error: (message: string) => {
    toast.error(message, {
      duration: 4000,
      className: "bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl text-xs font-bold !p-4",
    });
  },
  loading: (message: string) => {
    return toast.loading(message, {
      className: "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl text-xs font-bold !p-4",
    });
  },
  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  }
};
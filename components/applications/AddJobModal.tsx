import { Icon } from "@/components/ui/Icon"
import AddJobForm from "@/components/AddJobForm";

export default function AddJobModal({
  open,
  setOpen,
  fetchJobs,
}: any) {
  if (!open) return null;

  return (
    <div className="fixed px-4 inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-md relative">

        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-400"
        >
          <Icon name="x" size={30} />
        </button>

        <AddJobForm
          onSuccess={() => {
            fetchJobs();
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
}
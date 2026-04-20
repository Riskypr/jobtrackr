import { Plus } from "lucide-react";

export default function FloatingAddButton({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 mb-6 md:mb-0 md:bottom-5 right-6 w-14 h-14 rounded-2xl flex items-center justify-center 
      bg-gradient-to-r from-blue-600 to-indigo-600 
      text-white shadow-xl hover:scale-110 transition"
    >
      <Plus size={24} />
    </button>
  );
}
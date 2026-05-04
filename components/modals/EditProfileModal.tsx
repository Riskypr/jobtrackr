"use client";

import { useState } from "react";
import { useSession } from "next-auth/react"; 
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Loader2 } from "lucide-react";
import { notify } from "@/utils/notification"; // <-- Menggunakan utilitas reusable

export default function EditProfileModal({ isOpen, onClose, currentUser, onSuccess }: any) {
  const [name, setName] = useState(currentUser.name || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { update } = useSession(); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Gagal update");

      const data = await res.json();

      await update({
        ...currentUser,
        name: data.user.name,
        image: data.user.image,
      });

      // Panggil notifikasi sukses reusable
      notify.success("Profile updated!");
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (err) {
      // Panggil notifikasi error reusable
      notify.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99]"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Edit Profile</h2>
                  <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Avatar Edit */}
                  <div className="flex flex-col items-center">
                    <div className="relative group cursor-pointer">
                      <img
                        src={currentUser.image || "https://ui-avatars.com/api/?name=User"}
                        className="w-24 h-24 rounded-3xl object-cover border-4 border-blue-500/20"
                        alt="Preview"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-white" size={24} />
                      </div>
                    </div>
                    <p className="mt-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">Change Photo</p>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-4 px-6 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-4 px-6 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
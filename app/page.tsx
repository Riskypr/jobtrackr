"use client";

import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col items-center px-6 py-12">
      <ThemeToggle />

      {/* HERO */}
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Track Your Job Journey
          <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Like a Pro 🚀
          </span>
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          JobTrackr helps you organize applications, visualize progress,
          and stay on top of every opportunity.
        </p>

        {/* CTA */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/dashboard">
            <button className="px-6 py-3 rounded-xl bg-blue-600 text-white">
              Get Started
            </button>
          </Link>

          <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* HERO VISUAL (fake dashboard preview) */}
      <div className="mt-16 w-full max-w-5xl">
        <div className="rounded-2xl bg-white shadow-2xl p-6 border">
          <div className="space-y-4">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl"></div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-5xl w-full">

        <div className="group p-6 bg-white/70 backdrop-blur rounded-2xl shadow-sm hover:shadow-xl transition border">
          <div className="text-3xl mb-3">📅</div>
          <h3 className="font-semibold text-lg mb-1">
            Timeline View
          </h3>
          <p className="text-sm text-gray-600">
            Visualize your job applications in a clean and interactive timeline.
          </p>
        </div>

        <div className="group p-6 bg-white/70 backdrop-blur rounded-2xl shadow-sm hover:shadow-xl transition border">
          <div className="text-3xl mb-3">🔔</div>
          <h3 className="font-semibold text-lg mb-1">
            Smart Reminder
          </h3>
          <p className="text-sm text-gray-600">
            Automatically get notified when recruiters don’t respond.
          </p>
        </div>

        <div className="group p-6 bg-white/70 backdrop-blur rounded-2xl shadow-sm hover:shadow-xl transition border">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-semibold text-lg mb-1">
            Analytics
          </h3>
          <p className="text-sm text-gray-600">
            Track your success rate and improve your strategy.
          </p>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Ready to take control of your career?
        </h2>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:scale-105 transition"
        >
          Start Tracking Now
        </button>
      </div>
    </main>
  );
}
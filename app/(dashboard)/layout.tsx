// app/dashboard/layout.tsx
import Sidebar from "@/components/navigation/Navigationtmp"
import Footer from "@/components/footer/Footer"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:pl-64 flex flex-col transition-all duration-300">
        <div className="flex-1">
          {children} 
        </div>
        <Footer />
      </main>
    </div>
  );
}
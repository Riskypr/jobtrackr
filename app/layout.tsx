import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google"; 
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Inisialisasi Nunito
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
});

export const metadata: Metadata = {
  title: "JobTrackr",
  description: "Track your job applications, interviews, and offers all in one place with JobTrackr.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${nunito.variable} h-full`}>
      <body className={`${nunito.className} antialiased bg-[#F8FAFC] dark:bg-[#020617]`}>
        <Providers>
          <SessionProvider>
            <Toaster position="top-right" />
            {children} 
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
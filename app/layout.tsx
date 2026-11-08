
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sacrament Meeting Planner",
  description: "Plan and view weekly sacrament meetings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} min-h-screen flex flex-col bg-green-50 text-gray-900`}
      >
        <Header />

        <main className="mx-auto w-full max-w-5xl flex-1 p-6">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

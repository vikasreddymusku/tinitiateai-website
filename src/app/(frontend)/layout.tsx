import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NextDemoBar } from "@/components/layout/NextDemoBar";
import { UpcomingBatchPopup } from "@/components/UpcomingBatchPopup";
import { getSiteSettings } from "@/lib/siteSettings";
import { getNextDemoSlot } from "@/lib/nextDemo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TinitiateAI — Practical IT & AI Training",
  description: "Job-ready training programs in Full Stack Development, Generative AI, Machine Learning, Data Science, and MLOps.",
};

// All pages under this layout read live content from Payload (courses, demo
// slots, site settings, etc.), which changes via the CMS at any time. Force
// dynamic rendering everywhere so admin edits show up immediately instead of
// waiting for the next build/deploy.
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, nextDemo] = await Promise.all([getSiteSettings(), getNextDemoSlot()]);

  const nextDemoCourse = nextDemo && typeof nextDemo.course === "object" ? nextDemo.course : null;
  const nextDemoTrainer =
    nextDemoCourse && typeof nextDemoCourse.trainer === "object" ? nextDemoCourse.trainer : null;

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {nextDemo && (
          <UpcomingBatchPopup
            slotId={nextDemo.id}
            startsAt={nextDemo.startsAt}
            courseTitle={nextDemoCourse?.title ?? null}
            trainerName={nextDemoTrainer?.name ?? null}
          />
        )}
        <div className="sticky top-0 z-50">
          <NextDemoBar slot={nextDemo} />
          <Navbar siteName={settings.siteName} />
        </div>
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}

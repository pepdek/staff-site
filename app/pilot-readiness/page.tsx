import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ArchivalLabel from "@/components/ArchivalLabel";
import GatedChecklist from "@/components/GatedChecklist";
import { PILOT_READINESS_SECTIONS } from "@/lib/pilotReadiness";

export const metadata: Metadata = {
  title: "What to Have Ready Before Your $295 Trial Starts — Meridian",
  description:
    "Software access, current open items, and reference material to have ready before your Meridian trial starts, so the two weeks count.",
  alternates: { canonical: "/pilot-readiness" },
  openGraph: {
    title: "What to have ready before your $295 trial starts",
    description:
      "QuickBooks/Xero access, open items, and last month's close package — get these ready before your trial starts.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What to have ready before your $295 trial starts",
    description:
      "What to have ready before your Meridian trial starts.",
  },
};

export default function PilotReadinessPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Nav />
      <section className="border-b border-hairline px-6 pb-16 pt-20 print:hidden md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <ArchivalLabel className="mb-3 block">
              Fig. 01 — Pilot readiness
            </ArchivalLabel>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[56px] md:leading-[1.1]">
              What to have ready before your $295 trial starts
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
              Software access, current open items, and reference material —
              have these ready so the two weeks count.
            </p>
          </Reveal>
        </div>
      </section>
      <div className="mx-auto max-w-2xl px-6 pb-28 pt-16">
        <Reveal>
          <GatedChecklist
            sections={PILOT_READINESS_SECTIONS}
            source="pilot-readiness"
            unlockCopy="Unlock the full readiness checklist — current state and reference material."
          />
        </Reveal>
      </div>
      <Footer />
    </main>
  );
}

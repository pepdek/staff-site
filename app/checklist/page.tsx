import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ArchivalLabel from "@/components/ArchivalLabel";
import GatedChecklist from "@/components/GatedChecklist";
import { CLOSE_CHECKLIST_SECTIONS } from "@/lib/checklist";

export const metadata: Metadata = {
  title: "Monthly Close Checklist for Small Accounting Firms — Meridian",
  description:
    "A practical, structured monthly close checklist covering reconciliations, journal entries, AP/AR review, and close package prep.",
  openGraph: {
    title: "Monthly Close Checklist for Small Accounting Firms",
    description:
      "Reconciliations, journal entries, AP/AR review, and close package prep — a checklist you can actually use.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monthly Close Checklist for Small Accounting Firms",
    description:
      "A practical monthly close checklist for small accounting firms.",
  },
};

export default function ChecklistPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Nav />
      <section className="border-b border-hairline px-6 pb-16 pt-20 print:hidden md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <ArchivalLabel className="mb-3 block">
              Fig. 01 — Monthly close checklist
            </ArchivalLabel>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[56px] md:leading-[1.1]">
              The monthly close checklist for small accounting firms
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
              Reconciliations, journal entries, AP/AR review, and close
              package prep — in the order you&apos;ll actually use them.
            </p>
          </Reveal>
        </div>
      </section>
      <div className="mx-auto max-w-2xl px-6 pb-28 pt-16">
        <Reveal>
          <GatedChecklist
            sections={CLOSE_CHECKLIST_SECTIONS}
            source="checklist"
            unlockCopy="Unlock the full checklist — reconciliations, AP/AR, and close package prep."
          />
        </Reveal>
      </div>
      <Footer />
    </main>
  );
}

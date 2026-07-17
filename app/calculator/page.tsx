import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CalculatorWidget from "@/components/CalculatorWidget";
import ArchivalLabel from "@/components/ArchivalLabel";

export const metadata: Metadata = {
  title: "Cost & Speed Calculator — Meridian",
  description:
    "See exactly how much you'd save and how many days faster your monthly close could run with a same-timezone Meridian bookkeeper, vs. in-house or offshore staff.",
  openGraph: {
    title: "How much could same-timezone bookkeeping save your firm?",
    description:
      "Compare in-house, offshore (Philippines/India), and Meridian's LatAm staffing on cost and close speed — updates live as you adjust the inputs.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How much could same-timezone bookkeeping save your firm?",
    description:
      "Compare in-house, offshore, and Meridian staffing on cost and close speed.",
  },
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Nav />
      <section className="border-b border-hairline px-6 pb-16 pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <ArchivalLabel className="mb-3 block">
              Fig. 01 — Cost &amp; speed calculator
            </ArchivalLabel>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[56px] md:leading-[1.1]">
              What is the Philippines timezone gap actually costing you?
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
              Adjust your firm size, close time, and current cost below to
              see a live, side-by-side comparison.
            </p>
          </Reveal>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-6 pb-28 pt-16">
        <Reveal>
          <CalculatorWidget />
        </Reveal>
      </div>
      <Footer />
    </main>
  );
}

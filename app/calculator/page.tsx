import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MeshBackground from "@/components/MeshBackground";
import Reveal from "@/components/Reveal";
import CalculatorWidget from "@/components/CalculatorWidget";

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
    <main className="min-h-screen bg-navy">
      <Nav />
      <section className="relative overflow-hidden px-6 pb-16 pt-20 md:pt-28">
        <MeshBackground />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-[56px] md:leading-[1.05]">
              What is the Philippines timezone gap actually costing you?
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              Adjust your firm size, close time, and current cost below to
              see a live, side-by-side comparison.
            </p>
          </Reveal>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-6 pb-28">
        <Reveal>
          <CalculatorWidget />
        </Reveal>
      </div>
      <Footer />
    </main>
  );
}

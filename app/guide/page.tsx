import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import GuideTable from "@/components/GuideTable";
import ArchivalLabel from "@/components/ArchivalLabel";

export const metadata: Metadata = {
  title: "Philippines vs. Latin America vs. In-House Bookkeeping — Meridian",
  description:
    "A side-by-side comparison of timezone overlap, response time, cost, and setup for in-house, Philippines/offshore, and LatAm bookkeeping staff.",
  openGraph: {
    title: "Philippines vs. Latin America vs. In-House Bookkeeping",
    description:
      "The comparison guide CPA firms use to decide how to staff monthly close — timezone overlap, cost, response time, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Philippines vs. Latin America vs. In-House Bookkeeping",
    description:
      "The comparison guide CPA firms use to decide how to staff monthly close.",
  },
};

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-paper">
      <Nav />
      <section className="border-b border-hairline px-6 pb-16 pt-20 print:hidden md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <ArchivalLabel className="mb-3 block">
              Fig. 01 — Comparison
            </ArchivalLabel>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[56px] md:leading-[1.1]">
              Philippines vs. Latin America vs. In-House Bookkeeping
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
              A side-by-side comparison for firms deciding how to staff
              monthly close.
            </p>
          </Reveal>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-6 pb-28 pt-16">
        <Reveal>
          <GuideTable />
        </Reveal>
      </div>
      <Footer />
    </main>
  );
}

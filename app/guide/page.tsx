import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MeshBackground from "@/components/MeshBackground";
import Reveal from "@/components/Reveal";
import GuideTable from "@/components/GuideTable";

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
    <main className="min-h-screen bg-navy">
      <Nav />
      <section className="relative overflow-hidden px-6 pb-16 pt-20 md:pt-28 print:hidden">
        <MeshBackground />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-[56px] md:leading-[1.05]">
              Philippines vs. Latin America vs. In-House Bookkeeping
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              A side-by-side comparison for firms deciding how to staff
              monthly close.
            </p>
          </Reveal>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-6 pb-28">
        <Reveal>
          <GuideTable />
        </Reveal>
      </div>
      <Footer />
    </main>
  );
}

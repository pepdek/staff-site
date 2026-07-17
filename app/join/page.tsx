import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import LedgerCard from "@/components/LedgerCard";
import ArchivalLabel from "@/components/ArchivalLabel";
import TalentWizard from "@/components/TalentWizard";

export const metadata: Metadata = {
  title: "Bookkeepers & Staff Accountants — See Your Pay Range Before You Apply — Meridian",
  description:
    "Apply to work with US CPA and bookkeeping firms through Meridian. Pay shown upfront, one paid skills assessment, and full visibility into your application status at every stage.",
};

const differentiators = [
  "See your pay range before you apply — not after",
  "One assessment, reviewed once — no separate client interview gauntlet",
  "Paid skills assessment — we don't ask for free work",
];

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Nav />

      <section className="border-b border-hairline px-6 pb-16 pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[56px] md:leading-[1.1]">
              Bookkeepers and staff accountants — see your pay range before
              you apply
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
              Pay is shown upfront, and you can see exactly where you stand
              at every stage — no ghosting.
            </p>
            <a
              href="#apply"
              className="btn-primary mt-8 inline-block rounded-lg px-6 py-3 text-base font-medium"
            >
              See the pay range
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-hairline px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <ArchivalLabel className="mb-3 block text-center">
              Fig. 01 — How this is different
            </ArchivalLabel>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {differentiators.map((point) => (
              <Reveal key={point}>
                <LedgerCard className="h-full p-8">
                  <p className="text-base font-medium text-ink">{point}</p>
                </LedgerCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-hairline px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <ArchivalLabel className="mb-3 block text-center">
              Fig. 02 — Meridian Academy
            </ArchivalLabel>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              A credential, not a perk
            </h2>
            {/*
              v1 program description — placeholder structure only. Needs
              real curriculum details (modules, hours, certifying body if
              any, renewal requirements) confirmed before launch.
            */}
            <p className="mx-auto mt-6 max-w-2xl text-center text-ink-muted">
              Every placed bookkeeper and staff accountant has access to an
              ongoing training track: GAAP fundamentals, QuickBooks/Xero
              certification, and close-process training. It&apos;s built to
              be a credential on your resume, not a one-time onboarding
              video.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="apply" className="px-6 py-28">
        <div className="mx-auto max-w-xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Start your application
            </h2>
            <p className="mt-3 text-center text-ink-muted">
              See the pay range first, then a few quick questions.
            </p>
          </Reveal>
          <div className="mt-10">
            <Reveal>
              <TalentWizard />
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

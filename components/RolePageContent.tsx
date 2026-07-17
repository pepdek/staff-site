import Nav from "./Nav";
import Footer from "./Footer";
import Reveal from "./Reveal";
import LedgerCard from "./LedgerCard";
import ArchivalLabel from "./ArchivalLabel";
import IntakeWizard from "./IntakeWizard";
import Pricing from "./Pricing";
import Trust from "./Trust";
import FAQList, { type FAQItem } from "./FAQList";
import FAQJsonLd from "./FAQJsonLd";

export interface RolePageContentProps {
  role: string; // e.g. "bookkeeper" — captured on wizard submissions from this page
  heroHeadline: string;
  painPoints: string[];
  tasks: string[];
  faqs: FAQItem[];
}

// Shared structure for role-specific landing pages (/bookkeeper,
// /staff-accountant, and future role pages) — content varies via props,
// layout and shared sections (pricing, trust) stay identical.
export default function RolePageContent({
  role,
  heroHeadline,
  painPoints,
  tasks,
  faqs,
}: RolePageContentProps) {
  return (
    <main className="min-h-screen bg-paper">
      <Nav />

      <section className="border-b border-hairline px-6 pb-16 pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[56px] md:leading-[1.1]">
              {heroHeadline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
              Same price as Philippines-based providers, real-time
              collaboration during your business hours, no long-term
              contract.
            </p>
            <a
              href="#contact"
              className="btn-primary mt-8 inline-block rounded-lg px-6 py-3 text-base font-medium"
            >
              Start your $295 trial
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-hairline px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <ArchivalLabel className="mb-3 block text-center">
              Fig. 01 — What&apos;s actually slowing you down
            </ArchivalLabel>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {painPoints.map((point) => (
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
              Fig. 02 — What they&apos;ll handle
            </ArchivalLabel>
          </Reveal>
          <Reveal>
            <ul className="mt-10 space-y-3">
              {tasks.map((task) => (
                <li
                  key={task}
                  className="ledger-card flex items-center gap-3 rounded-xl px-5 py-4"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent"
                  >
                    ✓
                  </span>
                  <span className="text-sm text-ink">{task}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Pricing />
      <Trust />

      <section className="border-b border-hairline px-6 py-28">
        <FAQJsonLd items={faqs} />
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Questions specific to hiring a {role.replace("-", " ")}
            </h2>
          </Reveal>
          <div className="mt-10">
            <FAQList items={faqs} />
          </div>
          <p className="mt-6 text-center text-sm text-ink-muted">
            <a href="/#faq" className="underline hover:text-ink">
              See the full FAQ
            </a>
          </p>
        </div>
      </section>

      <section id="contact" className="px-6 py-28">
        <div className="mx-auto max-w-xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Get matched with your {role.replace("-", " ")}
            </h2>
            <p className="mt-3 text-center text-ink-muted">
              A few quick questions, then we&apos;ll recommend a plan and get
              your trial started.
            </p>
          </Reveal>
          <div className="mt-10">
            <Reveal>
              <IntakeWizard role={role} />
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

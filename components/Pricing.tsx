import Reveal from "./Reveal";
import LedgerCard from "./LedgerCard";
import ArchivalLabel from "./ArchivalLabel";
import GuaranteeCallout from "./GuaranteeCallout";

const tiers = [
  {
    name: "Starter",
    desc: "For a solo practitioner with light monthly volume.",
    includes:
      "Part-time dedicated bookkeeper, ~20 hrs/week, same-business-day response during your working hours.",
    price: "$1,100/mo",
  },
  {
    name: "Standard",
    desc: "For a small firm that needs one client-facing bookkeeper.",
    includes:
      "Full-time dedicated bookkeeper, ~40 hrs/week, same-business-day response.",
    price: "$2,000/mo",
    featured: true,
    annotation:
      "Same monthly rate as Philippines-based providers — source: TOA Global published range, $1,800–$2,500/mo",
  },
  {
    name: "Firm",
    desc: "For firms with 5+ clients needing multiple dedicated staff.",
    includes:
      "$1,850/mo per additional FTE (3+ FTEs), same terms as Standard.",
    price: "$1,850/mo per FTE",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-hairline px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <ArchivalLabel className="mb-3 block text-center">
            Fig. 04 — Pricing
          </ArchivalLabel>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Pricing
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-muted">
            Published rates, no custom quotes.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <Reveal key={t.name}>
              <LedgerCard
                className={`h-full p-8 ${t.featured ? "border-accent" : ""}`}
              >
                {t.featured && (
                  <ArchivalLabel className="mb-2 block text-accent">
                    Recommended
                  </ArchivalLabel>
                )}
                <h3 className="text-lg font-semibold text-ink">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {t.desc}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {t.includes}
                </p>
                <div className="mt-6 text-2xl font-semibold text-ink">
                  {t.price}
                </div>
                {t.annotation && (
                  <ArchivalLabel className="mt-2 block">
                    {t.annotation}
                  </ArchivalLabel>
                )}
              </LedgerCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-base font-medium text-ink">
          No setup fees. No long-term contract. Month-to-month, cancel with
          30 days&apos; notice.
        </p>
        <Reveal>
          <GuaranteeCallout className="mx-auto mt-8 max-w-2xl" />
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";
import LedgerCard from "./LedgerCard";
import ArchivalLabel from "./ArchivalLabel";

const tiers = [
  {
    name: "Starter",
    desc: "A part-time bookkeeper, ~20 hrs/mo — good fit for a solo practice or a single small-business client load.",
    price: "$900–1,200/mo",
  },
  {
    name: "Standard",
    desc: "A full-time dedicated bookkeeper covering your whole book of business.",
    price: "$1,600–2,200/mo",
    featured: true,
  },
  {
    name: "Firm",
    desc: "Multiple staff for firms serving several clients — scoped to your client count and close complexity.",
    price: "$3,000+/mo",
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
            Example pricing shown below — update once you&apos;ve confirmed
            real costs. No long-term contracts on any tier.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <Reveal key={t.name}>
              <LedgerCard
                className={`h-full p-8 ${t.featured ? "border-accent" : ""}`}
              >
                <h3 className="text-lg font-semibold text-ink">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {t.desc}
                </p>
                <div className="mt-6 text-2xl font-semibold text-ink">
                  {t.price}
                </div>
                <ArchivalLabel className="mt-1 block">
                  Illustrative estimate — confirm real pricing before launch
                </ArchivalLabel>
              </LedgerCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-muted">
          No long-term contracts — cancel or adjust hours month to month.
        </p>
      </div>
    </section>
  );
}

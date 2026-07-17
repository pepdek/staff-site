import Reveal from "./Reveal";
import GlassCard from "./GlassCard";

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
    <section id="pricing" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Pricing
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/60">
            Example pricing shown below — update once you&apos;ve confirmed
            real costs. No long-term contracts on any tier.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <Reveal key={t.name}>
              <GlassCard featured={t.featured} className="h-full p-8">
                <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {t.desc}
                </p>
                <div className="mt-6 text-2xl font-semibold text-white">
                  {t.price}
                </div>
                <p className="mt-1 text-xs text-white/40">
                  Placeholder — confirm real pricing before launch
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-white/50">
          No long-term contracts — cancel or adjust hours month to month.
        </p>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";
import LedgerCard from "./LedgerCard";
import ArchivalLabel from "./ArchivalLabel";

const problems = [
  {
    title: "The Philippines gap",
    body: "You send a question about a reconciling item at 4pm your time. It's 4am in Manila. You get an answer the next morning — if you're lucky, before your client calls asking why close isn't done yet.",
  },
  {
    title: "The generalist trap",
    body: "Offshore VAs are often trained for data entry and calendar scheduling, not GAAP, not accrual adjustments, not the judgment calls a real close requires. You end up re-checking everything anyway.",
  },
  {
    title: "The DIY grind",
    body: "So you do it yourself. Books at midnight, client work during the day. It works until the month you have three closes due at once and something breaks.",
  },
];

export default function Problem() {
  return (
    <section className="border-t border-hairline px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <ArchivalLabel className="mb-3 block text-center">
            Fig. 01 — The problem
          </ArchivalLabel>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            You&apos;ve tried to solve this before.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {problems.map((p) => (
            <Reveal key={p.title}>
              <LedgerCard className="h-full p-8">
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {p.body}
                </p>
              </LedgerCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

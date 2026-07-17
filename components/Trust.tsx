import Reveal from "./Reveal";
import FlipCard from "./FlipCard";
import ArchivalLabel from "./ArchivalLabel";

const checklist = [
  {
    claim: "NDA signed",
    detail: "Signed prior to engagement start, before any client data is shared.",
  },
  {
    claim: "GAAP familiarity verified",
    detail: "Verified in a working interview on real close scenarios, not just a resume.",
  },
  {
    claim: "References checked",
    detail: "Checked with prior firms or clients, see onboarding record.",
  },
  {
    claim: "Trial period before commitment",
    detail: "2 weeks on your real books before any ongoing engagement begins.",
  },
];

export default function Trust() {
  return (
    <section className="border-t border-hairline px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <ArchivalLabel className="mb-3 block text-center">
            Fig. 05 — Trust &amp; compliance
          </ArchivalLabel>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Vetted before they touch your books
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-ink-muted">
            Click or hover a card to see how each claim is verified.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {checklist.map((item) => (
              <FlipCard
                key={item.claim}
                className="h-32"
                front={
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-ink">
                      {item.claim}
                    </span>
                  </div>
                }
                back={
                  <p className="text-sm text-ink">{item.detail}</p>
                }
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";

const checklist = [
  "NDA signed before any client data is shared",
  "GAAP familiarity verified in a working interview, not just a resume",
  "References checked with prior firms or clients",
  "2-week trial period on your real books before any ongoing commitment",
];

export default function Trust() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Vetted before they touch your books
          </h2>
        </Reveal>
        <Reveal>
          <ul className="mt-12 space-y-4">
            {checklist.map((item) => (
              <li
                key={item}
                className="glass-card flex items-center gap-3 rounded-xl px-5 py-4"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-light">
                  ✓
                </span>
                <span className="text-sm text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

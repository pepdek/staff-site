import Reveal from "./Reveal";
import GlassCard from "./GlassCard";

const steps = [
  {
    step: "1",
    title: "15-minute scoping call",
    body: "We walk through your current close process — what software you use, where the bottlenecks are, and what a working day looks like for your firm.",
  },
  {
    step: "2",
    title: "Matched to your hours",
    body: "You're matched with a bookkeeper based in Latin America whose working hours overlap yours — no more waiting until tomorrow for an answer.",
  },
  {
    step: "3",
    title: "2-week trial on your real books",
    body: "Your bookkeeper works your actual close, not a sample account. You see real output before you commit to anything ongoing.",
  },
  {
    step: "4",
    title: "Ongoing close, with visibility",
    body: "Monthly close continues with your matched bookkeeper. A live status dashboard is coming soon — for now, you get a weekly written status update.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            How it works
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <Reveal key={s.step}>
              <GlassCard className="h-full p-6">
                <span className="text-sm font-semibold text-accent-light">
                  Step {s.step}
                </span>
                <h3 className="mt-2 text-base font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {s.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

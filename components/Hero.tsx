import MeshBackground from "./MeshBackground";
import CountUpNumber from "./CountUpNumber";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-32">
      <MeshBackground />
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-[64px] md:leading-[1.05]">
          Bookkeeping help that answers you the same business day.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
          Most offshore bookkeeping staff work from the Philippines — a 12–13
          hour gap that means your questions during close sit overnight.
          Meridian staffs you with Latin America-based bookkeepers who work
          your EST/CST hours, so close doesn&apos;t stall waiting on a reply.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#contact"
            className="btn-primary rounded-lg px-6 py-3 text-base font-medium text-white"
          >
            Book a 15-minute call
          </a>
          <a
            href="#how-it-works"
            className="rounded-lg border border-white/15 px-6 py-3 text-base font-medium text-white/80 hover:border-white/30 hover:text-white"
          >
            See how it works
          </a>
        </div>

        {/* Placeholder stats — replace with real figures once available */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div>
            <div className="text-3xl font-semibold text-white">
              <CountUpNumber value={40} suffix="+" />
            </div>
            <p className="mt-1 text-sm text-white/50">
              firms onboarded <span className="text-white/30">(placeholder)</span>
            </p>
          </div>
          <div>
            <div className="text-3xl font-semibold text-white">
              &lt;<CountUpNumber value={2} />
              hrs
            </div>
            <p className="mt-1 text-sm text-white/50">
              avg. response time <span className="text-white/30">(placeholder)</span>
            </p>
          </div>
          <div>
            <div className="text-3xl font-semibold text-white">
              <CountUpNumber value={6} suffix="hr" />
            </div>
            <p className="mt-1 text-sm text-white/50">
              business-hour overlap <span className="text-white/30">(placeholder)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

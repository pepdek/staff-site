import CountUpNumber from "./CountUpNumber";
import ArchivalLabel from "./ArchivalLabel";

export default function Hero() {
  return (
    <section className="px-6 pb-24 pt-20 md:pt-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[56px] md:leading-[1.1]">
          Bookkeeping help that answers you the same business day.
        </h1>
        <p className="mt-4 font-label text-sm uppercase tracking-widest text-accent sm:text-base">
          Same price as the Philippines. Awake when you need us.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
          Most offshore bookkeeping staff work from the Philippines — a 12–13
          hour gap that means your questions during close sit overnight.
          Meridian staffs you with Latin America-based bookkeepers who work
          your EST/CST hours, so close doesn&apos;t stall waiting on a reply.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#contact"
            className="btn-primary rounded-lg px-6 py-3 text-base font-medium"
          >
            Book a 15-minute call
          </a>
          <a
            href="#how-it-works"
            className="rounded-lg border border-hairline px-6 py-3 text-base font-medium text-ink-muted hover:border-ink-muted hover:text-ink"
          >
            See how it works
          </a>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 border-t border-hairline pt-8 sm:grid-cols-3">
          <div>
            <div className="text-3xl font-semibold text-ink">
              <CountUpNumber value={40} suffix="+" />
            </div>
            <p className="mt-1 text-sm text-ink-muted">firms onboarded</p>
            <ArchivalLabel className="mt-1 block">
              Illustrative estimate
            </ArchivalLabel>
          </div>
          <div>
            <div className="text-3xl font-semibold text-ink">
              &lt;<CountUpNumber value={2} />
              hrs
            </div>
            <p className="mt-1 text-sm text-ink-muted">avg. response time</p>
            <ArchivalLabel className="mt-1 block">
              Illustrative estimate
            </ArchivalLabel>
          </div>
          <div>
            <div className="text-3xl font-semibold text-ink">
              <CountUpNumber value={6} suffix="hr" />
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              business-hour overlap
            </p>
            <ArchivalLabel className="mt-1 block">
              Illustrative estimate
            </ArchivalLabel>
          </div>
        </div>
      </div>
    </section>
  );
}

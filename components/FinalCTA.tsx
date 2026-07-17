import Reveal from "./Reveal";
import LeadForm from "./LeadForm";

export default function FinalCTA() {
  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Get answers on your close the same day you ask.
          </h2>
          <p className="mt-3 text-center text-white/60">
            15 minutes to see if a timezone-matched bookkeeper is a fit for
            your firm.
          </p>
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

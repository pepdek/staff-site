import Reveal from "./Reveal";
import CalculatorWidget from "./CalculatorWidget";

export default function CalculatorSection() {
  return (
    <section id="calculator" className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            See what same-timezone staffing is worth to your firm
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/60">
            Compare your current cost and close time against Meridian —
            updates live as you adjust the inputs.
          </p>
        </Reveal>
        <div className="mt-12">
          <Reveal>
            <CalculatorWidget />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

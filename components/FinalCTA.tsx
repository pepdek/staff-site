import Reveal from "./Reveal";
import IntakeWizard from "./IntakeWizard";
import type { FirmSize } from "@/lib/calculator";

const VALID_FIRM_SIZES: FirmSize[] = ["solo", "small", "growing"];

export default function FinalCTA({
  searchParams,
}: {
  searchParams?: { firmSize?: string; closeDays?: string };
}) {
  const rawFirmSize = searchParams?.firmSize;
  const firmSize = VALID_FIRM_SIZES.includes(rawFirmSize as FirmSize)
    ? (rawFirmSize as FirmSize)
    : undefined;
  const closeDays = searchParams?.closeDays ? Number(searchParams.closeDays) : undefined;

  // Coming from the calculator means steps 1-2 are already answered —
  // skip straight to the qualifying pain-point step.
  const startStep = firmSize ? 3 : 1;

  return (
    <section id="contact" className="border-t border-hairline px-6 py-28">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Get answers on your close the same day you ask.
          </h2>
          <p className="mt-3 text-center text-ink-muted">
            A few quick questions, then we&apos;ll recommend a plan and get
            your trial started.
          </p>
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <IntakeWizard
              initialFirmSize={firmSize}
              initialCloseDays={closeDays}
              startStep={startStep}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

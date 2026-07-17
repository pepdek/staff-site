"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WizardShell, OptionChip } from "./WizardShell";
import ClientStatusTracker from "./ClientStatusTracker";
import { recommendedTier, type FirmSize } from "@/lib/calculator";
import { trackEvent } from "@/lib/analytics";

type Software = "qbo" | "qbd" | "xero" | "other";
type CurrentProcess = "diy" | "in-house" | "outsourcing" | "behind";

const PRACTICE_OPTIONS: { value: FirmSize; label: string }[] = [
  { value: "solo", label: "Solo practitioner" },
  { value: "small", label: "Small firm (2-5)" },
  { value: "growing", label: "Growing firm (6+)" },
];

const SOFTWARE_OPTIONS: { value: Software; label: string }[] = [
  { value: "qbo", label: "QuickBooks Online" },
  { value: "qbd", label: "QuickBooks Desktop" },
  { value: "xero", label: "Xero" },
  { value: "other", label: "Other" },
];

const PROCESS_OPTIONS: { value: CurrentProcess; label: string }[] = [
  { value: "diy", label: "Doing it myself" },
  { value: "in-house", label: "In-house employee" },
  { value: "outsourcing", label: "Already outsourcing (offshore or domestic)" },
  { value: "behind", label: "Falling behind, no consistent process" },
];

const PAIN_POINT_OPTIONS = [
  "Waiting on client documents",
  "Reconciliation backlog",
  "No one available during my business hours",
  "Staff turnover with current provider",
  "Manual data entry",
];

const TOTAL_STEPS = 4;

interface IntakeWizardProps {
  initialFirmSize?: FirmSize;
  initialCloseDays?: number;
  startStep?: number;
  // Which landing page the lead came from (e.g. "bookkeeper",
  // "staff-accountant"). Captured silently — not a visible form field.
  role?: string;
}

export default function IntakeWizard({
  initialFirmSize,
  initialCloseDays,
  startStep = 1,
  role,
}: IntakeWizardProps) {
  const [step, setStep] = useState(startStep);
  const [direction, setDirection] = useState(1);

  const [firmSize, setFirmSize] = useState<FirmSize | null>(initialFirmSize ?? null);
  const [software, setSoftware] = useState<Software | null>(null);
  const [otherSoftware, setOtherSoftware] = useState("");
  const [closeDays, setCloseDays] = useState(initialCloseDays ?? 8);
  const [currentProcess, setCurrentProcess] = useState<CurrentProcess | null>(null);
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [otherPain, setOtherPain] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const submittedRef = useRef(false);

  function goTo(next: number) {
    if (next > step) {
      trackEvent("IntakeWizard: Step Completed", { step });
    }
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }

  function togglePainPoint(point: string) {
    setPainPoints((prev) =>
      prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]
    );
  }

  function buildPayload(partial: boolean) {
    return {
      name,
      email,
      firmSize,
      software,
      otherSoftware,
      closeDays,
      currentProcess,
      painPoints,
      otherPain,
      source: "wizard",
      role: role || null,
      partial,
    };
  }

  // Best-effort capture of partial answers if the visitor leaves before
  // finishing — not critical if the browser drops it.
  useEffect(() => {
    function handleBeforeUnload() {
      if (submittedRef.current || step < 2) return;
      const payload = buildPayload(true);
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon?.("/api/lead", blob);
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, firmSize, software, otherSoftware, closeDays, currentProcess, painPoints, otherPain, name, email]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(false)),
    });

    if (res.ok) {
      submittedRef.current = true;
      setStatus("success");
      trackEvent("IntakeWizard: Submitted", { firmSize: firmSize || "", role: role || "" });
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-6">
        <ClientStatusTracker />
        <p className="text-center text-sm text-ink-muted">
          Trial starting soon?{" "}
          <Link href="/pilot-readiness" className="text-accent underline">
            See what to have ready before it starts
          </Link>
        </p>
      </div>
    );
  }

  const recommendation = firmSize ? recommendedTier(firmSize) : null;

  return (
    <WizardShell
      step={step}
      totalSteps={TOTAL_STEPS}
      direction={direction}
      showNav={step < TOTAL_STEPS}
      onBack={() => goTo(step - 1)}
      onContinue={() => goTo(step + 1)}
    >
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-base font-medium text-ink">
              How would you describe your practice?
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {PRACTICE_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt.value}
                  selected={firmSize === opt.value}
                  onClick={() => setFirmSize(opt.value)}
                >
                  {opt.label}
                </OptionChip>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-base font-medium text-ink">
              What software do you use for bookkeeping?
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {SOFTWARE_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt.value}
                  selected={software === opt.value}
                  onClick={() => setSoftware(opt.value)}
                >
                  {opt.label}
                </OptionChip>
              ))}
            </div>
            {software === "other" && (
              <input
                value={otherSoftware}
                onChange={(e) => setOtherSoftware(e.target.value)}
                placeholder="What do you use?"
                className="mt-3 w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-sm text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
              />
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-base font-medium text-ink">
              How many business days does your monthly close currently
              take?{" "}
              <span className="font-semibold text-accent">
                {closeDays} day{closeDays === 1 ? "" : "s"}
              </span>
            </label>
            <input
              type="range"
              min={1}
              max={15}
              value={closeDays}
              onChange={(e) => setCloseDays(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>

          <div>
            <p className="mb-3 text-base font-medium text-ink">
              How are you currently handling bookkeeping?
            </p>
            <div className="grid gap-2">
              {PROCESS_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt.value}
                  selected={currentProcess === opt.value}
                  onClick={() => setCurrentProcess(opt.value)}
                >
                  {opt.label}
                </OptionChip>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="mb-1 text-base font-medium text-ink">
            Which of these are part of your monthly close pain?
          </p>
          <p className="mb-3 text-sm text-ink-muted">
            Select all that apply — there&apos;s no wrong answer here.
          </p>
          <div className="grid gap-2">
            {PAIN_POINT_OPTIONS.map((point) => (
              <OptionChip
                key={point}
                selected={painPoints.includes(point)}
                onClick={() => togglePainPoint(point)}
              >
                {point}
              </OptionChip>
            ))}
          </div>
          <input
            value={otherPain}
            onChange={(e) => setOtherPain(e.target.value)}
            placeholder="Other (optional)"
            className="mt-2 w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-sm text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
          />
        </div>
      )}

      {step === 4 && (
        <form onSubmit={handleSubmit}>
          {recommendation && (
            <p className="mb-6 rounded-lg border border-accent/30 bg-accent-light px-4 py-3 text-sm text-ink">
              Based on what you told us, the{" "}
              <strong>
                {recommendation.name} plan (${recommendation.monthlyCost.toLocaleString()}/mo)
              </strong>{" "}
              is likely the right fit — you&apos;ll confirm this on your
              trial call.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-ink-muted" htmlFor="wizard-name">
                Name
              </label>
              <input
                id="wizard-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
                placeholder="Jane Rivera"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink-muted" htmlFor="wizard-email">
                Email
              </label>
              <input
                id="wizard-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
                placeholder="jane@yourfirm.com"
              />
            </div>
          </div>

          {status === "error" && (
            <p className="mt-3 text-sm text-red-700">{error}</p>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="rounded-lg border border-hairline px-5 py-2.5 text-sm font-medium text-ink-muted hover:border-ink-muted hover:text-ink"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary rounded-lg px-6 py-3 text-base font-medium disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Start your $295 trial"}
            </button>
          </div>
        </form>
      )}
    </WizardShell>
  );
}

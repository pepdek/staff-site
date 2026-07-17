"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import LedgerCard from "./LedgerCard";
import ArchivalLabel from "./ArchivalLabel";
import { recommendedTier, type FirmSize } from "@/lib/calculator";

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

function OptionChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`ledger-card w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
        selected ? "border-accent bg-accent-light text-ink" : "text-ink-muted"
      }`}
    >
      {children}
    </button>
  );
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
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <LedgerCard className="p-8 text-center">
        <h3 className="text-lg font-semibold text-ink">
          Thanks — we&apos;ll be in touch shortly.
        </h3>
        <p className="mt-2 text-sm text-ink-muted">
          We typically respond within one business day to schedule your
          trial.
        </p>
      </LedgerCard>
    );
  }

  const recommendation = firmSize ? recommendedTier(firmSize) : null;

  return (
    <LedgerCard className="p-8">
      <ArchivalLabel className="mb-4 block">
        Step {String(step).padStart(2, "0")} of {String(TOTAL_STEPS).padStart(2, "0")}
      </ArchivalLabel>

      {/*
        Deliberately not AnimatePresence: its exit-then-enter sequencing
        depends on the outgoing element's exit animation firing an
        onExitComplete callback before the next step mounts. If that
        callback ever stalls (throttled frames, reduced motion, certain
        automated/headless browsers), the wizard gets stuck showing the
        previous step forever. A plain keyed motion.div unmounts the old
        step and mounts the new one synchronously via React, so there's
        nothing to get stuck on — it still animates the entrance.
      */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: direction > 0 ? 16 : -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
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
        </motion.div>

      {step < 4 && (
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            disabled={step === 1}
            className="rounded-lg border border-hairline px-5 py-2.5 text-sm font-medium text-ink-muted hover:border-ink-muted hover:text-ink disabled:opacity-0"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => goTo(step + 1)}
            className="btn-primary rounded-lg px-6 py-2.5 text-sm font-medium"
          >
            Continue
          </button>
        </div>
      )}
    </LedgerCard>
  );
}

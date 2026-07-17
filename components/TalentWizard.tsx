"use client";

import { useState } from "react";
import { WizardShell, OptionChip } from "./WizardShell";
import ArchivalLabel from "./ArchivalLabel";
import StatusTracker from "./StatusTracker";

type Role = "bookkeeper" | "staff-accountant" | "not-sure";
type Software = "qbo" | "qbd" | "xero" | "other";

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "bookkeeper", label: "Bookkeeper" },
  { value: "staff-accountant", label: "Staff accountant" },
  { value: "not-sure", label: "Not sure yet" },
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5+ years",
];

const SOFTWARE_OPTIONS: { value: Software; label: string }[] = [
  { value: "qbo", label: "QuickBooks Online" },
  { value: "qbd", label: "QuickBooks Desktop" },
  { value: "xero", label: "Xero" },
  { value: "other", label: "Other" },
];

const TIMEZONE_OPTIONS = [
  "Full overlap (9am-5pm ET)",
  "Partial overlap (afternoons ET)",
  "Flexible / can shift hours",
];

const AVAILABILITY_OPTIONS = [
  "Full availability",
  "Part-time available",
  "Currently placed, open to move",
];

const TOTAL_STEPS = 4;

export default function TalentWizard() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const [role, setRole] = useState<Role | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [software, setSoftware] = useState<Software[]>([]);
  const [otherSoftware, setOtherSoftware] = useState("");
  const [timezone, setTimezone] = useState<string | null>(null);
  const [availability, setAvailability] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeLink, setResumeLink] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function goTo(next: number) {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }

  function toggleSoftware(value: Software) {
    setSoftware((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const res = await fetch("/api/talent-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        resumeLink,
        role,
        experience,
        software,
        otherSoftware,
        timezone,
        availability,
        source: "talent-wizard",
      }),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return <StatusTracker />;
  }

  return (
    <WizardShell
      step={step}
      totalSteps={TOTAL_STEPS}
      direction={direction}
      showNav={step > 1 && step < TOTAL_STEPS}
      onBack={() => goTo(step - 1)}
      onContinue={() => goTo(step + 1)}
    >
      {step === 1 && (
        <div>
          {/*
            TODO: placeholder pay-band figures — replace with real internal
            pay-band data before launch.
          */}
          <p className="mb-4 text-base font-medium text-ink">
            Here&apos;s the pay range before you tell us anything about
            yourself:
          </p>
          <div className="space-y-3">
            <div className="ledger-card rounded-xl px-5 py-4">
              <p className="text-sm font-semibold text-ink">
                Bookkeeper roles: $8-14/hr
              </p>
            </div>
            <div className="ledger-card rounded-xl px-5 py-4">
              <p className="text-sm font-semibold text-ink">
                Staff accountant roles: $12-20/hr
              </p>
            </div>
          </div>
          <ArchivalLabel className="mt-3 block">
            Placeholder pay bands — pending confirmed internal figures
          </ArchivalLabel>
          <button
            type="button"
            onClick={() => goTo(2)}
            className="btn-primary mt-6 w-full rounded-lg px-6 py-3 text-base font-medium"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-base font-medium text-ink">
              Which role fits you best?
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {ROLE_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt.value}
                  selected={role === opt.value}
                  onClick={() => setRole(opt.value)}
                >
                  {opt.label}
                </OptionChip>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-base font-medium text-ink">
              Years of experience with US-based clients or US GAAP?
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {EXPERIENCE_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt}
                  selected={experience === opt}
                  onClick={() => setExperience(opt)}
                >
                  {opt}
                </OptionChip>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-base font-medium text-ink">
              Which software are you proficient in?
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {SOFTWARE_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt.value}
                  selected={software.includes(opt.value)}
                  onClick={() => toggleSoftware(opt.value)}
                >
                  {opt.label}
                </OptionChip>
              ))}
            </div>
            {software.includes("other") && (
              <input
                value={otherSoftware}
                onChange={(e) => setOtherSoftware(e.target.value)}
                placeholder="What else do you use?"
                className="mt-3 w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-sm text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
              />
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-base font-medium text-ink">
              What US timezone hours can you work?
            </p>
            <div className="grid gap-2">
              {TIMEZONE_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt}
                  selected={timezone === opt}
                  onClick={() => setTimezone(opt)}
                >
                  {opt}
                </OptionChip>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-base font-medium text-ink">
              Are you currently working with other clients?
            </p>
            <div className="grid gap-2">
              {AVAILABILITY_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt}
                  selected={availability === opt}
                  onClick={() => setAvailability(opt)}
                >
                  {opt}
                </OptionChip>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-ink-muted" htmlFor="talent-name">
                Name
              </label>
              <input
                id="talent-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
                placeholder="Maria Fernandez"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink-muted" htmlFor="talent-email">
                Email
              </label>
              <input
                id="talent-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
                placeholder="maria@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink-muted" htmlFor="talent-phone">
                Phone (optional)
              </label>
              <input
                id="talent-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
                placeholder="+52 55 1234 5678"
              />
            </div>
            <div>
              {/*
                Link input instead of a file upload: an upload needs
                multipart handling and storage (S3/Resend attachment,
                etc.) that's out of scope for this pass. A link (Drive,
                Dropbox, LinkedIn) covers the same need with zero new
                infrastructure. Swap in real file upload if a link proves
                too much friction for applicants.
              */}
              <label className="mb-1 block text-sm text-ink-muted" htmlFor="talent-resume">
                Resume link (optional)
              </label>
              <input
                id="talent-resume"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
                placeholder="Link to resume, LinkedIn, or portfolio"
              />
            </div>
          </div>

          <p className="mt-6 rounded-lg border border-accent/30 bg-accent-light px-4 py-3 text-sm text-ink">
            Next: a short, paid skills assessment (1 hour, compensated at
            your quoted rate). You&apos;ll be able to track your status the
            whole way through.
          </p>

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
              {status === "loading" ? "Sending…" : "Submit application"}
            </button>
          </div>
        </form>
      )}
    </WizardShell>
  );
}

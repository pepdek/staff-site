"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { WizardShell, OptionChip } from "./WizardShell";
import ArchivalLabel from "./ArchivalLabel";
import StatusTracker from "./StatusTracker";
import { trackEvent } from "@/lib/analytics";

type Role = "bookkeeper" | "staff-accountant" | "not-sure";
type Software = "qbo" | "qbd" | "xero" | "other";
type Experience = "lt1" | "1to3" | "3to5" | "5plus";
type Timezone = "full" | "partial" | "flexible";
type Availability = "full" | "part" | "placed";

const TOTAL_STEPS = 4;

export default function TalentWizard() {
  const t = useTranslations("TalentWizard");
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const [role, setRole] = useState<Role | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [software, setSoftware] = useState<Software[]>([]);
  const [otherSoftware, setOtherSoftware] = useState("");
  const [timezone, setTimezone] = useState<Timezone | null>(null);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeLink, setResumeLink] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  // Stable, locale-independent codes are the payload values; only the
  // displayed label is translated, so submitted data stays identical
  // regardless of which language the applicant used.
  const ROLE_OPTIONS: { value: Role; label: string }[] = [
    { value: "bookkeeper", label: t("roleBookkeeper") },
    { value: "staff-accountant", label: t("roleStaffAccountant") },
    { value: "not-sure", label: t("roleNotSure") },
  ];

  const EXPERIENCE_OPTIONS: { value: Experience; label: string }[] = [
    { value: "lt1", label: t("experienceLt1") },
    { value: "1to3", label: t("experience1to3") },
    { value: "3to5", label: t("experience3to5") },
    { value: "5plus", label: t("experience5plus") },
  ];

  const SOFTWARE_OPTIONS: { value: Software; label: string }[] = [
    { value: "qbo", label: "QuickBooks Online" },
    { value: "qbd", label: "QuickBooks Desktop" },
    { value: "xero", label: "Xero" },
    { value: "other", label: t("softwareOther") },
  ];

  const TIMEZONE_OPTIONS: { value: Timezone; label: string }[] = [
    { value: "full", label: t("timezoneFull") },
    { value: "partial", label: t("timezonePartial") },
    { value: "flexible", label: t("timezoneFlexible") },
  ];

  const AVAILABILITY_OPTIONS: { value: Availability; label: string }[] = [
    { value: "full", label: t("availabilityFull") },
    { value: "part", label: t("availabilityPart") },
    { value: "placed", label: t("availabilityPlaced") },
  ];

  function goTo(next: number) {
    if (next > step) {
      trackEvent("TalentWizard: Step Completed", { step });
    }
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
      trackEvent("TalentWizard: Submitted", { role: role || "" });
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error || t("genericError"));
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
      backLabel={t("back")}
      continueLabel={t("continue")}
      progressLabel={t("stepProgress", {
        step: String(step).padStart(2, "0"),
        total: String(TOTAL_STEPS).padStart(2, "0"),
      })}
    >
      {step === 1 && (
        <div>
          {/*
            TODO: placeholder pay-band figures — replace with real internal
            pay-band data before launch. These numbers stay identical
            across all three locales; only the surrounding copy translates.
          */}
          <p className="mb-4 text-base font-medium text-ink">{t("step1Intro")}</p>
          <div className="space-y-3">
            <div className="ledger-card rounded-xl px-5 py-4">
              <p className="text-sm font-semibold text-ink">{t("step1Bookkeeper")}</p>
            </div>
            <div className="ledger-card rounded-xl px-5 py-4">
              <p className="text-sm font-semibold text-ink">{t("step1StaffAccountant")}</p>
            </div>
          </div>
          <ArchivalLabel className="mt-3 block">
            {t("step1PlaceholderNote")}
          </ArchivalLabel>
          <button
            type="button"
            onClick={() => goTo(2)}
            className="btn-primary mt-6 w-full rounded-lg px-6 py-3 text-base font-medium"
          >
            {t("continue")}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-base font-medium text-ink">
              {t("step2RoleQuestion")}
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
              {t("step2ExperienceQuestion")}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {EXPERIENCE_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt.value}
                  selected={experience === opt.value}
                  onClick={() => setExperience(opt.value)}
                >
                  {opt.label}
                </OptionChip>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-base font-medium text-ink">
              {t("step2SoftwareQuestion")}
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
                placeholder={t("softwareOtherPlaceholder")}
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
              {t("step3TimezoneQuestion")}
            </p>
            <div className="grid gap-2">
              {TIMEZONE_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt.value}
                  selected={timezone === opt.value}
                  onClick={() => setTimezone(opt.value)}
                >
                  {opt.label}
                </OptionChip>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-base font-medium text-ink">
              {t("step3AvailabilityQuestion")}
            </p>
            <div className="grid gap-2">
              {AVAILABILITY_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt.value}
                  selected={availability === opt.value}
                  onClick={() => setAvailability(opt.value)}
                >
                  {opt.label}
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
                {t("nameLabel")}
              </label>
              <input
                id="talent-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
                placeholder={t("namePlaceholder")}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink-muted" htmlFor="talent-email">
                {t("emailLabel")}
              </label>
              <input
                id="talent-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink-muted" htmlFor="talent-phone">
                {t("phoneLabel")}
              </label>
              <input
                id="talent-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
                placeholder={t("phonePlaceholder")}
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
                {t("resumeLabel")}
              </label>
              <input
                id="talent-resume"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
                placeholder={t("resumePlaceholder")}
              />
            </div>
          </div>

          <p className="mt-6 rounded-lg border border-accent/30 bg-accent-light px-4 py-3 text-sm text-ink">
            {t("nextStepsNote")}
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
              {t("back")}
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary rounded-lg px-6 py-3 text-base font-medium disabled:opacity-60"
            >
              {status === "loading" ? t("submitting") : t("submit")}
            </button>
          </div>
        </form>
      )}
    </WizardShell>
  );
}

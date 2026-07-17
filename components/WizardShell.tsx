"use client";

import { motion } from "framer-motion";
import LedgerCard from "./LedgerCard";
import ArchivalLabel from "./ArchivalLabel";

// Shared by IntakeWizard (client-facing, English-only) and TalentWizard
// (talent-facing, localized) so both multi-step flows look and behave
// identically without duplicating the progress indicator / step
// transition wrapper. All copy is passed in by the caller (defaults are
// English) so this file has no i18n dependency of its own.

export function OptionChip({
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

export function WizardShell({
  step,
  totalSteps,
  direction,
  children,
  onBack,
  onContinue,
  showNav = true,
  continueDisabled = false,
  backLabel = "Back",
  continueLabel = "Continue",
  progressLabel,
}: {
  step: number;
  totalSteps: number;
  direction: number;
  children: React.ReactNode;
  onBack?: () => void;
  onContinue?: () => void;
  showNav?: boolean;
  continueDisabled?: boolean;
  backLabel?: string;
  continueLabel?: string;
  progressLabel?: string;
}) {
  return (
    <LedgerCard className="p-8">
      <ArchivalLabel className="mb-4 block">
        {progressLabel ??
          `Step ${String(step).padStart(2, "0")} of ${String(totalSteps).padStart(2, "0")}`}
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
        {children}
      </motion.div>

      {showNav && (
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={step === 1}
            className="rounded-lg border border-hairline px-5 py-2.5 text-sm font-medium text-ink-muted hover:border-ink-muted hover:text-ink disabled:opacity-0"
          >
            {backLabel}
          </button>
          <button
            type="button"
            onClick={onContinue}
            disabled={continueDisabled}
            className="btn-primary rounded-lg px-6 py-2.5 text-sm font-medium disabled:opacity-60"
          >
            {continueLabel}
          </button>
        </div>
      )}
    </LedgerCard>
  );
}

"use client";

import { useTranslations } from "next-intl";
import LedgerCard from "./LedgerCard";
import ArchivalLabel from "./ArchivalLabel";

// TODO: the timeframe strings below ("scheduled within 2 business days",
// etc., see messages/*.json) are placeholder timing pending real internal
// SLA data — confirm actual review/matching turnaround before launch.
export default function StatusTracker() {
  const t = useTranslations("StatusTracker");

  const stages = [
    {
      title: t("appliedTitle"),
      body: t("appliedBody"),
      timeframe: t("appliedTimeframe"),
      done: true,
    },
    {
      title: t("scheduledTitle"),
      body: t("scheduledBody"),
      timeframe: t("scheduledTimeframe"),
      done: false,
    },
    {
      title: t("reviewedTitle"),
      body: t("reviewedBody"),
      timeframe: t("reviewedTimeframe"),
      done: false,
    },
    {
      title: t("matchedTitle"),
      body: t("matchedBody"),
      timeframe: t("matchedTimeframe"),
      done: false,
    },
  ];

  return (
    <LedgerCard className="p-8">
      <ArchivalLabel className="mb-4 block">{t("heading")}</ArchivalLabel>
      <div className="space-y-4">
        {stages.map((stage, i) => (
          <div
            key={stage.title}
            className={`flex gap-4 rounded-xl border px-5 py-4 ${
              stage.done ? "border-accent bg-accent-light" : "border-hairline"
            }`}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                stage.done ? "bg-accent text-white" : "bg-paper text-ink-muted"
              }`}
            >
              {stage.done ? "✓" : i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{stage.title}</p>
              <p className="mt-1 text-sm text-ink-muted">{stage.body}</p>
              <ArchivalLabel className="mt-1 block">{stage.timeframe}</ArchivalLabel>
            </div>
          </div>
        ))}
      </div>
    </LedgerCard>
  );
}

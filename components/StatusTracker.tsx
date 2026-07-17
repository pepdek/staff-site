"use client";

import { useTranslations } from "next-intl";
import PipelineStages from "./PipelineStages";

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

  return <PipelineStages heading={t("heading")} stages={stages} />;
}

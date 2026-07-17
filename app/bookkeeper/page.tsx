import type { Metadata } from "next";
import RolePageContent from "@/components/RolePageContent";

export const metadata: Metadata = {
  title: "Hire a Bookkeeper for Your CPA Firm — Meridian",
  description:
    "Outsource bookkeeping for your small accounting firm to a dedicated bookkeeper who works your business hours — same price as Philippines-based providers, no long-term contract.",
  alternates: { canonical: "/bookkeeper" },
  openGraph: {
    title: "Need a bookkeeper for your firm who's awake during your close?",
    description:
      "A dedicated, timezone-matched bookkeeper for your CPA or bookkeeping firm — transaction coding, reconciliations, GL maintenance, AP/AR. Same price as Philippines-based providers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Need a bookkeeper for your firm who's awake during your close?",
    description:
      "A dedicated, timezone-matched bookkeeper for your CPA or bookkeeping firm. Same price as Philippines-based providers.",
  },
};

const painPoints = [
  "Reconciliations pile up between visits",
  "Transaction coding backlog before every filing deadline",
  "No one answers when a client emails after 3pm",
];

const tasks = [
  "Transaction coding",
  "Bank and credit card reconciliations",
  "General ledger maintenance",
  "AP/AR support",
];

const faqs = [
  {
    q: "Can they work inside our existing QuickBooks/Xero setup?",
    a: "Yes — direct access to your existing software, no new tools to install or configure.",
  },
  {
    q: "Do they work with our whole client list, or one client at a time?",
    a: "Whatever fits your workflow — most firms start with a subset of clients during the trial, then expand once the fit is confirmed.",
  },
  {
    q: "What if a client's books are a mess when we start?",
    a: "We flag scope issues during the 15-minute call before matching, so cleanup work is priced and expected upfront, not a surprise mid-engagement.",
  },
];

export default function BookkeeperPage() {
  return (
    <RolePageContent
      role="bookkeeper"
      heroHeadline="Need a bookkeeper for your firm who's awake during your close?"
      painPoints={painPoints}
      tasks={tasks}
      faqs={faqs}
    />
  );
}

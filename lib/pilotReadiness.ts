import type { ChecklistSection } from "./checklist";

// First section is shown to everyone; the rest are gated behind email capture.
export const PILOT_READINESS_SECTIONS: ChecklistSection[] = [
  {
    title: "Software access",
    items: [
      "QuickBooks Online or Xero login access (or an invite sent to your bookkeeper)",
      "Bank feed connections active and syncing",
      "Chart of accounts up to date",
    ],
  },
  {
    title: "Current state",
    items: [
      "A list of current open items or known issues in the books",
      "Any pending reconciling items flagged",
      "Outstanding AP/AR items your bookkeeper should know about upfront",
    ],
  },
  {
    title: "Reference material",
    items: [
      "Last month's close package, if available, for reference",
      "Any standing client-specific notes or exceptions",
      "Names/contacts for anyone else who touches the books",
    ],
  },
];

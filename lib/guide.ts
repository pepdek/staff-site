// Qualitative comparison rows (fluency, setup time, etc.) below are
// illustrative — not independently verified. The cost row is not: its
// figures are sourced (see sourceLabel on that row) and should be kept in
// sync with lib/calculator.ts's benchmark constants.

export interface ComparisonRow {
  label: string;
  inHouse: string;
  offshore: string;
  meridian: string;
  sourceLabel?: string;
  illustrative?: boolean;
}

// First two rows are shown to everyone; the rest are gated behind email capture.
export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "Timezone overlap",
    inHouse: "Full — same office hours",
    offshore: "0-2 hrs (12-13 hr gap, Philippines)",
    meridian: "6-8 hrs (EST/CST overlap)",
    illustrative: true,
  },
  {
    label: "Typical response time",
    inHouse: "Immediate",
    offshore: "Next business day",
    meridian: "Same business day",
    illustrative: true,
  },
  {
    label: "Typical monthly cost",
    inHouse: "$3,500–5,000/mo (fully loaded)",
    offshore: "India: $1,200–2,000/mo · Philippines: $1,800–2,500/mo",
    meridian: "$1,100–2,000/mo depending on tier",
    sourceLabel:
      "In-house: industry salary data, fully loaded. Offshore: published industry ranges (QX/Entigrity-type providers; TOA Global). Meridian: published pricing.",
  },
  {
    label: "English fluency",
    inHouse: "Native",
    offshore: "Variable, often trained for scripted support",
    meridian: "Strong, business-fluent",
    illustrative: true,
  },
  {
    label: "GAAP / US accounting familiarity",
    inHouse: "Depends on hire",
    offshore: "Often limited to data entry",
    meridian: "Vetted for GAAP and close workflows",
    illustrative: true,
  },
  {
    label: "Setup time",
    inHouse: "Weeks (recruiting, onboarding)",
    offshore: "1-2 weeks",
    meridian: "1-2 weeks, trial-first",
    illustrative: true,
  },
  {
    label: "Contract flexibility",
    inHouse: "Low (employment obligations)",
    offshore: "Varies by vendor",
    meridian: "No long-term contract",
    illustrative: true,
  },
];

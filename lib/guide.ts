// TODO: replace with verified benchmark data before launch, current figures
// are illustrative estimates based on published industry ranges — same
// caveat as lib/calculator.ts.

export interface ComparisonRow {
  label: string;
  inHouse: string;
  offshore: string;
  meridian: string;
}

// First two rows are shown to everyone; the rest are gated behind email capture.
export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "Timezone overlap",
    inHouse: "Full — same office hours",
    offshore: "0-2 hrs (12-13 hr gap, Philippines)",
    meridian: "6-8 hrs (EST/CST overlap)",
  },
  {
    label: "Typical response time",
    inHouse: "Immediate",
    offshore: "Next business day",
    meridian: "Same business day",
  },
  {
    label: "Typical monthly cost range",
    inHouse: "$5,000-7,500 (fully loaded)",
    offshore: "$900-3,200",
    meridian: "$1,200-4,200",
  },
  {
    label: "English fluency",
    inHouse: "Native",
    offshore: "Variable, often trained for scripted support",
    meridian: "Strong, business-fluent",
  },
  {
    label: "GAAP / US accounting familiarity",
    inHouse: "Depends on hire",
    offshore: "Often limited to data entry",
    meridian: "Vetted for GAAP and close workflows",
  },
  {
    label: "Setup time",
    inHouse: "Weeks (recruiting, onboarding)",
    offshore: "1-2 weeks",
    meridian: "1-2 weeks, trial-first",
  },
  {
    label: "Contract flexibility",
    inHouse: "Low (employment obligations)",
    offshore: "Varies by vendor",
    meridian: "No long-term contract",
  },
];

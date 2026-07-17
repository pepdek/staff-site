export interface ChecklistSection {
  title: string;
  items: string[];
}

// First section is shown to everyone; the rest are gated behind email capture.
export const CLOSE_CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    title: "Reconciliations",
    items: [
      "Bank accounts reconciled to statement balance",
      "Credit card accounts reconciled to statement balance",
      "Uncleared transactions over 60 days reviewed and resolved",
    ],
  },
  {
    title: "Journal entries",
    items: [
      "Recurring accruals posted (rent, payroll, depreciation)",
      "Prepaid expenses amortized for the period",
      "Journal entries reviewed for correct account coding",
    ],
  },
  {
    title: "AP / AR review",
    items: [
      "AP aging reviewed for anything overdue or disputed",
      "AR aging reviewed for anything overdue or uncollectible",
      "Open bills and invoices matched to supporting documentation",
    ],
  },
  {
    title: "Close package prep",
    items: [
      "P&L and balance sheet reviewed for anomalies vs. prior month",
      "Supporting schedules attached for all material balance sheet items",
      "Close package assembled and ready for client/partner review",
    ],
  },
];

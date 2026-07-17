// Figures sourced from published industry pricing (TOA Global, QX
// Accounting, Entigrity, Madras Accountancy) and fully-loaded domestic
// salary data as of mid-2026. Update if these providers change published
// pricing.

export type FirmSize = "solo" | "small" | "growing";
export type CostMode = "in-house" | "outsourcing";

export const FIRM_SIZE_LABELS: Record<FirmSize, string> = {
  solo: "Solo (1 person)",
  small: "Small (2-5)",
  growing: "Growing (6-15)",
};

export interface CalculatorInputs {
  firmSize: FirmSize;
  closeDays: number; // current monthly close time, in business days
  costMode: CostMode;
  inHouseSalary: number; // annual, used when costMode === "in-house"
  outsourcingMonthlyCost: number; // used when costMode === "outsourcing"
}

export interface ColumnResult {
  label: string;
  monthlyCost: number;
  closeDays: number;
  sameDayResponse: boolean;
  costSourceLabel: string;
}

export interface CalculatorResult {
  inHouse: ColumnResult;
  offshore: ColumnResult;
  meridian: ColumnResult;
  annualSavingsVsCurrent: number;
  daysFasterVsCurrent: number;
}

// Fully-loaded in-house cost includes payroll taxes, benefits, and overhead
// on top of base salary — a common industry rule of thumb, not a quote.
const IN_HOUSE_OVERHEAD_MULTIPLIER = 1.28;
const IN_HOUSE_MONTHLY_RANGE = [3500, 5000] as const;

export const OFFSHORE_INDIA_MONTHLY_RANGE = [1200, 2000] as const;
const OFFSHORE_PHILIPPINES_MONTHLY_RANGE = [1800, 2500] as const;

const MERIDIAN_STARTER = 1100;
const MERIDIAN_STANDARD = 2000;
const MERIDIAN_FIRM_PER_FTE = 1850;

// The calculator doesn't collect an exact FTE count — this is the assumed
// headcount per firm-size tier, used to scale the per-FTE benchmarks above.
const ASSUMED_FTE_COUNT: Record<FirmSize, number> = {
  solo: 1,
  small: 1,
  growing: 3, // Firm tier applies at 3+ FTEs
};

// Offshore (Philippines/India) close-time multiplier vs. Meridian, reflecting
// the ~12-13hr timezone gap adding a full day of round-trip latency per
// close cycle on average.
const OFFSHORE_CLOSE_DAYS_PENALTY = 2;

// Baseline close-time estimate by firm size — not a pricing figure, kept
// separate from the cost benchmarks above.
const BASE_CLOSE_DAYS: Record<FirmSize, number> = {
  solo: 5,
  small: 8,
  growing: 10,
};

const midpoint = (range: readonly [number, number]) => (range[0] + range[1]) / 2;

function meridianMonthlyFor(firmSize: FirmSize): number {
  if (firmSize === "solo") return MERIDIAN_STARTER;
  if (firmSize === "small") return MERIDIAN_STANDARD;
  return MERIDIAN_FIRM_PER_FTE * ASSUMED_FTE_COUNT.growing;
}

export function calculate(inputs: CalculatorInputs): CalculatorResult {
  const fteCount = ASSUMED_FTE_COUNT[inputs.firmSize];

  const currentMonthlyCost =
    inputs.costMode === "in-house"
      ? (inputs.inHouseSalary * IN_HOUSE_OVERHEAD_MULTIPLIER) / 12
      : inputs.outsourcingMonthlyCost;

  const inHouse: ColumnResult = {
    label: "In-house",
    monthlyCost:
      inputs.costMode === "in-house"
        ? currentMonthlyCost
        : midpoint(IN_HOUSE_MONTHLY_RANGE) * fteCount,
    closeDays: inputs.closeDays,
    sameDayResponse: false,
    costSourceLabel:
      inputs.costMode === "in-house"
        ? "Cost: your entered salary, fully loaded. Close-time: your entry."
        : "Cost: industry salary data, fully loaded. Close-time: illustrative estimate.",
  };

  const meridianMonthly = meridianMonthlyFor(inputs.firmSize);
  const meridianCloseDays = Math.max(
    2,
    Math.round(BASE_CLOSE_DAYS[inputs.firmSize] * 0.6)
  );

  // Offshore benchmark uses the Philippines figure — the direct parity
  // comparison Meridian's pricing is pegged to (see FAQ: "why aren't you
  // cheaper than India"). India's lower range is shown in the guide table.
  const offshore: ColumnResult = {
    label: "Offshore (Philippines/India)",
    monthlyCost: midpoint(OFFSHORE_PHILIPPINES_MONTHLY_RANGE) * fteCount,
    closeDays: meridianCloseDays + OFFSHORE_CLOSE_DAYS_PENALTY,
    sameDayResponse: false,
    costSourceLabel:
      "Cost: published industry range (TOA Global). Close-time: illustrative estimate.",
  };

  const meridian: ColumnResult = {
    label: "Meridian (LatAm, same-timezone)",
    monthlyCost: meridianMonthly,
    closeDays: meridianCloseDays,
    sameDayResponse: true,
    costSourceLabel:
      "Cost: Meridian published pricing. Close-time: illustrative estimate.",
  };

  const annualSavingsVsCurrent = Math.max(
    0,
    Math.round((currentMonthlyCost - meridian.monthlyCost) * 12)
  );
  const daysFasterVsCurrent = Math.max(0, inputs.closeDays - meridian.closeDays);

  return { inHouse, offshore, meridian, annualSavingsVsCurrent, daysFasterVsCurrent };
}

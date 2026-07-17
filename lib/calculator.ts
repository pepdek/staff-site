// TODO: replace with verified benchmark data before launch, current figures
// are illustrative estimates based on published industry ranges.

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

// Offshore (Philippines/India) close-time multiplier vs. Meridian, reflecting
// the ~12-13hr timezone gap adding a full day of round-trip latency per
// close cycle on average.
const OFFSHORE_CLOSE_DAYS_PENALTY = 2;

// Benchmark monthly cost ranges by firm size — midpoint used for the
// headline numbers, illustrative only.
const BENCHMARKS: Record<
  FirmSize,
  { offshoreMonthly: number; meridianMonthly: number; baseCloseDays: number }
> = {
  solo: { offshoreMonthly: 900, meridianMonthly: 1200, baseCloseDays: 5 },
  small: { offshoreMonthly: 1800, meridianMonthly: 2400, baseCloseDays: 8 },
  growing: { offshoreMonthly: 3200, meridianMonthly: 4200, baseCloseDays: 10 },
};

export function calculate(inputs: CalculatorInputs): CalculatorResult {
  const benchmark = BENCHMARKS[inputs.firmSize];

  const currentMonthlyCost =
    inputs.costMode === "in-house"
      ? (inputs.inHouseSalary * IN_HOUSE_OVERHEAD_MULTIPLIER) / 12
      : inputs.outsourcingMonthlyCost;

  const inHouse: ColumnResult = {
    label: "In-house",
    monthlyCost:
      inputs.costMode === "in-house"
        ? currentMonthlyCost
        : (55000 * IN_HOUSE_OVERHEAD_MULTIPLIER) / 12, // default benchmark salary when not the user's current mode
    closeDays: inputs.closeDays,
    sameDayResponse: false,
  };

  const meridianCloseDays = Math.max(2, Math.round(benchmark.baseCloseDays * 0.6));

  const offshore: ColumnResult = {
    label: "Offshore (Philippines/India)",
    monthlyCost: benchmark.offshoreMonthly,
    closeDays: meridianCloseDays + OFFSHORE_CLOSE_DAYS_PENALTY,
    sameDayResponse: false,
  };

  const meridian: ColumnResult = {
    label: "Meridian (LatAm, same-timezone)",
    monthlyCost: benchmark.meridianMonthly,
    closeDays: meridianCloseDays,
    sameDayResponse: true,
  };

  const annualSavingsVsCurrent = Math.max(
    0,
    Math.round((currentMonthlyCost - meridian.monthlyCost) * 12)
  );
  const daysFasterVsCurrent = Math.max(0, inputs.closeDays - meridian.closeDays);

  return { inHouse, offshore, meridian, annualSavingsVsCurrent, daysFasterVsCurrent };
}

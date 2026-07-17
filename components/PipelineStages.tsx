import LedgerCard from "./LedgerCard";
import ArchivalLabel from "./ArchivalLabel";

export interface PipelineStage {
  title: string;
  body: string;
  timeframe: string;
  done: boolean;
}

// Shared visual pattern for both the talent-side StatusTracker and the
// client-side ClientStatusTracker — a persistent pipeline view, not a
// one-line thank-you message.
export default function PipelineStages({
  heading,
  stages,
}: {
  heading: string;
  stages: PipelineStage[];
}) {
  return (
    <LedgerCard className="p-8">
      <ArchivalLabel className="mb-4 block">{heading}</ArchivalLabel>
      <div className="space-y-4">
        {stages.map((stage, i) => (
          <div
            key={stage.title}
            className={`flex gap-4 rounded-xl border px-5 py-4 ${
              stage.done ? "border-accent bg-accent-light" : "border-hairline"
            }`}
          >
            <div
              aria-hidden="true"
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                stage.done ? "bg-accent text-white" : "bg-paper text-ink-muted"
              }`}
            >
              {stage.done ? "✓" : i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">
                <span className="sr-only">
                  {stage.done ? "Completed: " : "Upcoming: "}
                </span>
                {stage.title}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{stage.body}</p>
              <ArchivalLabel className="mt-1 block">{stage.timeframe}</ArchivalLabel>
            </div>
          </div>
        ))}
      </div>
    </LedgerCard>
  );
}

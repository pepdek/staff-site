import PipelineStages from "./PipelineStages";
import DedicatedContactCard from "./DedicatedContactCard";

// TODO: the timeframe strings below are placeholder timing pending real
// internal SLA data — confirm actual scheduling/review turnaround before
// launch, consistent with the equivalent note in StatusTracker.tsx.
const STAGES = [
  {
    title: "Submitted",
    body: "We've received your application.",
    timeframe: "Confirmed immediately",
    done: true,
  },
  {
    title: "Trial scheduled",
    body: "Your $295 trial gets scheduled on your real books.",
    timeframe: "Scheduled within 2 business days",
    done: false,
  },
  {
    title: "Trial in progress",
    body: "Your matched bookkeeper works your actual close for the 2-week trial period.",
    timeframe: "2 weeks",
    done: false,
  },
  {
    title: "Proposal sent",
    body: "You get a plan recommendation and pricing based on how the trial went.",
    timeframe: "Sent within 3 business days of trial completion",
    done: false,
  },
];

export default function ClientStatusTracker() {
  return (
    <div className="space-y-6">
      <PipelineStages heading="Your application status" stages={STAGES} />
      <DedicatedContactCard />
    </div>
  );
}

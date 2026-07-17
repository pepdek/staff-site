export default function FlipCard({
  front,
  back,
  className = "",
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      tabIndex={0}
      className={`flip-card h-full rounded-xl outline-none ${className}`}
    >
      <div className="flip-card-inner">
        <div className="flip-card-face flip-card-front ledger-card flex h-full flex-col justify-center rounded-xl p-6">
          {front}
        </div>
        <div className="flip-card-face flip-card-back ledger-card flex h-full flex-col justify-center rounded-xl bg-accent-light p-6">
          {back}
        </div>
      </div>
    </div>
  );
}

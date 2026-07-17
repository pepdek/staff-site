export default function ArchivalLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-label text-xs uppercase tracking-widest text-ink-muted ${className}`}
    >
      {children}
    </span>
  );
}

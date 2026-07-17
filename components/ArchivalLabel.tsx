export default function ArchivalLabel({
  children,
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<"span"> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-label text-xs uppercase tracking-widest text-ink-muted ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}

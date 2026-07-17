export default function GlassCard({
  children,
  className = "",
  featured = false,
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`glass-card rounded-2xl ${
        featured ? "border-accent/40 ring-1 ring-accent/30" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

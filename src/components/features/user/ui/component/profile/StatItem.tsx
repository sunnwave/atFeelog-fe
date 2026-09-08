type StatItemProps = {
  value: number | undefined;
  label: string;
  onClick?: () => void;
  hasBorderLeft?: boolean;
};

export default function StatItem({
  value,
  label,
  onClick,
  hasBorderLeft,
}: StatItemProps) {
  return (
    <div
      onClick={onClick}
      className={`px-6 py-4 ${hasBorderLeft ? "border-l border-border" : ""} ${onClick ? "cursor-pointer hover:bg-surface-soft transition-colors" : ""}`}
    >
      <div className="text-2xl font-black tracking-[-0.05em] leading-none text-foreground">
        {value ?? 0}
      </div>
      <div className="mt-1 text-xs font-bold text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

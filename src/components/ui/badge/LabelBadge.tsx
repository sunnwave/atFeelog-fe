import { cn } from "@/shared/utils/cn";

type LabelBadgeVariant = "light" | "dark" | "point";
type LabelBadgeSize = "responsive" | "fixed";

type LabelBadgeProps = {
  variant?: LabelBadgeVariant;
  /** responsive: 카드 안 반응형 뱃지 / fixed: 일반 고정 크기 뱃지 (default) */
  size?: LabelBadgeSize;
  className?: string;
  children: React.ReactNode;
};

const variants: Record<LabelBadgeVariant, string> = {
  light: "border border-foreground bg-accent text-foreground",
  dark: "border border-white/25 bg-white/10 text-white/55",
  point: "bg-point text-white",
};

const sizes: Record<LabelBadgeSize, string> = {
  responsive: "text-[10px] md:text-xs px-2 py-0.5 md:px-2.5 md:py-1",
  fixed: "h-6 px-2.5 text-[10px]",
};

export default function LabelBadge({
  variant = "light",
  size = "fixed",
  className,
  children,
}: LabelBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-black tracking-widest uppercase",
        sizes[size],
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

import { cn } from "@/shared/utils/cn";

type LabelBadgeVariant = "light" | "dark" | "point" | "muted";
type LabelBadgeSize = "card" | "fixed";

type LabelBadgeProps = {
  variant?: LabelBadgeVariant;
  /**
   * card  : 카드 CQ 반응형 뱃지 — 반드시 @container card 컨텍스트 안에서 사용
   * fixed : 고정 크기 뱃지 (default)
   */
  size?: LabelBadgeSize;
  className?: string;
  children: React.ReactNode;
};

const variants: Record<LabelBadgeVariant, string> = {
  light: "border border-foreground bg-accent text-foreground",
  dark: "border border-white/25 bg-white/10 text-white/55",
  point: "bg-point  text-white",
  muted: "border border-forground bg-muted text-muted-foreground",
};

const sizes: Record<LabelBadgeSize, string> = {
  card: "text-[6px] @card-xs:text-[8px] @card-sm:text-[10px] @card-md:text-xs  px-1.5 py-0.5 ",
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

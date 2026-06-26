import { cn } from "@/shared/utils/cn";

type LabelBadgeVariant = "light" | "dark";

type LabelBadgeProps = {
  variant?: LabelBadgeVariant;
  className?: string;
  children: React.ReactNode;
};

export default function LabelBadge({ variant = "light", className, children }: LabelBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center px-2.5 text-[10px] font-black tracking-[0.16em] uppercase",
        variant === "dark"
          ? "border border-white/25 bg-white/10 text-white/55"
          : "border border-foreground bg-accent text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

import { cn } from "@/shared/utils/cn";

type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  size?: LogoSize;
  className?: string;
};

const sizeStyles: Record<
  LogoSize,
  {
    root: string;
    markBox: string;
    content: string;
    text: string;
  }
> = {
  sm: {
    root: "h-9",
    markBox: "w-9 text-sm",
    content: "px-2.5",
    text: "text-lg",
  },
  md: {
    root: "h-11",
    markBox: "w-11 text-base",
    content: "px-3",
    text: "text-xl",
  },
  lg: {
    root: "h-14",
    markBox: "w-14 text-lg",
    content: "px-4",
    text: "text-[28px]",
  },
};

export default function Logo({ size = "md", className }: LogoProps) {
  const styles = sizeStyles[size];

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden",
        "border-[1.5px] border-foreground bg-card text-foreground",
        styles.root,
        className,
      )}
      aria-label="atFeelog"
    >
      <div
        className={cn(
          "flex h-full shrink-0 items-center justify-center",
          "border-r border-dashed border-foreground bg-accent",
          "font-black tracking-[-0.08em]",
          styles.markBox,
        )}
        aria-hidden="true"
      >
        @
      </div>

      <div className={cn("min-w-0", styles.content)}>
        <div
          className={cn(
            "font-black leading-none tracking-[-0.08em]",
            styles.text,
          )}
        >
          atFeelog
          <span className="ml-1 text-point">.</span>
        </div>
      </div>
    </div>
  );
}

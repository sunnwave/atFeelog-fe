import Link from "next/link";
import { cn } from "@/shared/utils/cn";

type LogoWordmarkSize = "sm" | "md" | "lg";

type LogoWordmarkProps = {
  size?: LogoWordmarkSize;
  className?: string;
  clickable?: boolean;
};

const sizeStyles: Record<LogoWordmarkSize, string> = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-[36px]",
};

const baseClassName = "block font-black tracking-[-0.06em] text-foreground leading-none";

export default function LogoWordmark({ size = "md", className, clickable = true }: LogoWordmarkProps) {
  const resolvedClassName = cn(baseClassName, sizeStyles[size], className);
  const content = <>@atFeelog<span className="text-point">.</span></>;

  if (!clickable) {
    return <span className={resolvedClassName}>{content}</span>;
  }

  return (
    <Link href="/" aria-label="atFeelog 홈으로" className={resolvedClassName}>
      {content}
    </Link>
  );
}
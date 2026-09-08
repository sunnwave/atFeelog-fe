import { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { Ghost } from "lucide-react";

type EmptyStateProps = {
  variant?: "section" | "inline";
  title?: string;
  description: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export default function EmptyState({
  variant = "section",
  title,
  description,
  icon,
  children,
  className,
}: EmptyStateProps) {
  if (variant === "section") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 py-24 text-center text-muted-foreground",
          className,
        )}
      >
        {icon ?? <Ghost className="h-10 w-10" />}
        {title && (
          <p className="text-base font-semibold text-foreground">{title}</p>
        )}
        <p className="text-xs">{description}</p>
        {children}
      </div>
    );
  }

  // inline
  return (
    <p
      className={cn(
        "py-4 text-center text-xs text-muted-foreground",
        className,
      )}
    >
      {description}
    </p>
  );
}

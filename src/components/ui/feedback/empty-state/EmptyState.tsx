import { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { AlertCircle, Ghost } from "lucide-react";

type EmptyStateProps = {
  variant?: "section" | "inline";
  status?: "empty" | "error";
  title?: string;
  description: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
};

const DEFAULT_ICONS = {
  empty: <Ghost className="h-10 w-10" />,
  error: <AlertCircle className="h-10 w-10 text-destructive" />,
};

export default function EmptyState({
  variant = "section",
  status = "empty",
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
        {icon ?? DEFAULT_ICONS[status]}
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
        status === "error" && "text-destructive",
        className,
      )}
    >
      {description}
    </p>
  );
}

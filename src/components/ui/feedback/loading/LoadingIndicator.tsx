import { cn } from "@/shared/utils/cn";

type LoadingIndicatorProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
};

const SIZE_MAP = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
};

const LABEL_SIZE_MAP = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm",
};

export default function LoadingIndicator({
  size = "sm",
  label,
  className,
}: LoadingIndicatorProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      <div
        className={cn(
          "animate-spin rounded-full border-transparent border-t-muted-foreground border-r-muted-foreground border-b-muted-foreground",
          SIZE_MAP[size],
          className,
        )}
      />
      {label && (
        <p className={cn("text-muted-foreground", LABEL_SIZE_MAP[size])}>
          {label}
        </p>
      )}
    </div>
  );
}

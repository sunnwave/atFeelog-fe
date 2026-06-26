import { cn } from "@/shared/utils/cn";

export interface ToggleOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface Props<T extends string = string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  variant?: "soft" | "outline";
  className?: string;
}

export default function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
  variant = "soft",
  className,
}: Props<T>) {
  const isOutline = variant === "outline";

  return (
    <div
      className={cn(
        "flex items-center",
        isOutline
          ? "p-1 border-[1.5px] border-foreground rounded-full"
          : "gap-1 p-1 bg-muted rounded-xl w-fit",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "flex items-center gap-1.5 cursor-pointer transition-colors",
            isOutline
              ? [
                  "px-3 py-1.5 rounded-full border-[1.5px] text-xs font-black tracking-widest uppercase",
                  value === option.value
                    ? "bg-accent text-foreground border-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                ]
              : [
                  "px-4 py-1.5 rounded-lg text-sm font-medium",
                  value === option.value
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                ],
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
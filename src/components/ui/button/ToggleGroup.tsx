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
  className?: string;
}

export default function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
  className,
}: Props<T>) {
  return (
    <div
      className={cn(
        "flex items-center p-1 w-fit rounded-full border-[1.5px] border-foreground",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] text-xs font-black tracking-widest uppercase cursor-pointer transition-colors",
            value === option.value
              ? "bg-accent text-foreground border-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}

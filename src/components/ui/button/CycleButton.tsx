import { cn } from "@/shared/utils/cn";
import { ToggleOption } from "./ToggleGroup";

interface Props<T extends string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export default function CycleButton<T extends string>({
  options,
  value,
  onChange,
  className,
}: Props<T>) {
  const currentIndex = options.findIndex((o) => o.value === value);
  const next = options[(currentIndex + 1) % options.length];
  const current = options[currentIndex] ?? options[0];

  return (
    <button
      type="button"
      onClick={() => onChange(next.value)}
      className={cn(
        "flex items-center gap-1.5 px-3 py-2.5 border-[1.5px] cursor-pointer border-foreground rounded-full text-xs font-black tracking-widest transition-colors bg-background text-foreground",
        className,
      )}
    >
      {current.icon}
      {current.label}
      <span className="text-muted-foreground">↕</span>
    </button>
  );
}

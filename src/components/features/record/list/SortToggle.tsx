import { Clock, Flame } from "lucide-react";
import { cn } from "@/shared/utils";

export type SortMode = "recent" | "best";

export default function SortToggle({
  value,
  onChange,
}: {
  value: SortMode;
  onChange: (mode: SortMode) => void;
}) {
  const options: { mode: SortMode; label: string; icon: React.ReactNode }[] = [
    { mode: "recent", label: "최신순", icon: <Clock className="w-3.5 h-3.5" /> },
    { mode: "best", label: "인기순", icon: <Flame className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-xl w-fit">
      {options.map(({ mode, label, icon }) => (
        <button
          key={mode}
          type="button"
          onClick={() => onChange(mode)}
          className={cn(
            "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
            value === mode
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}
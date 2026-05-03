import { Calendar } from "lucide-react";
import { JSX } from "react";

export default function DateFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: {
  startDate: string;
  endDate: string;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
}): JSX.Element {
  return (
    <div className="flex items-center gap-2 md:flex-shrink-0">
      <div className="relative">
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          max={endDate || undefined}
          className="w-full max-w-[120px] h-10 pl-9 pr-3 text-sm rounded-lg border border-border bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        <label
          htmlFor="startDate"
          className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-muted-foreground" />
        </label>
      </div>
      <span className="text-xs text-muted-foreground">~</span>
      <div className="relative">
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          min={startDate || undefined}
          className="w-full max-w-[120px] h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        <label
          htmlFor="endDate"
          className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-muted-foreground" />
        </label>
      </div>
    </div>
  );
}

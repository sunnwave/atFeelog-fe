import { Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { DAY_PICKER_CLASS_NAMES } from "@/components/commons/datePicker/dayPickerClassNames";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange | undefined>(undefined);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const close = () => {
    closingRef.current = true;
    (document.activeElement as HTMLElement | null)?.blur();
    setOpen(false);
    setTimeout(() => {
      closingRef.current = false;
    }, 200);
  };

  const handleOpen = () => {
    if (closingRef.current) return;
    setTempRange({
      from: startDate ? parseISO(startDate) : undefined,
      to: endDate ? parseISO(endDate) : undefined,
    });
    setOpen(true);
  };

  const handleSelect = (range: DateRange | undefined) => {
    if (
      range?.from &&
      range?.to &&
      format(range.from, "yyyy-MM-dd") === format(range.to, "yyyy-MM-dd")
    ) {
      setTempRange({ from: range.from, to: undefined });
    } else {
      setTempRange(range);
    }
  };

  const handleApply = () => {
    onStartDateChange(
      tempRange?.from ? format(tempRange.from, "yyyy-MM-dd") : "",
    );
    onEndDateChange(tempRange?.to ? format(tempRange.to, "yyyy-MM-dd") : "");
    close();
  };

  const handleReset = () => {
    onStartDateChange("");
    onEndDateChange("");
    setTempRange(undefined);
    close();
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const dateLabel =
    startDate || endDate
      ? `${startDate || "시작일"} ~ ${endDate || "종료일"}`
      : "날짜 선택";

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={handleOpen}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        aria-expanded={open}
      >
        <Calendar className="w-4 h-4" />
        <span className="whitespace-nowrap hidden sm:inline">{dateLabel}</span>
      </button>

      {open && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute top-full right-0 mt-2 z-50 p-4 rounded-2xl border border-border bg-background shadow-lg"
        >
          <DayPicker
            mode="range"
            selected={tempRange}
            onSelect={handleSelect}
            disabled={{ after: new Date() }}
            locale={ko}
            classNames={DAY_PICKER_CLASS_NAMES}
          />
          <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              초기화
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="text-xs font-medium text-primary-foreground px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 transition-colors"
            >
              적용
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
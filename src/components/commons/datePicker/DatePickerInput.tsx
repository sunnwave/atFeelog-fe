import { Calendar, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import type { FieldError } from "react-hook-form";
import { cn } from "@/shared/utils";
import { DAY_PICKER_CLASS_NAMES } from "./dayPickerClassNames";

interface DatePickerInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: FieldError;
  className?: string;
}

export default function DatePickerInput({
  value,
  onChange,
  placeholder = "날짜 선택",
  error,
  className,
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const selected = value ? parseISO(value) : undefined;

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
    setOpen(true);
  };

  const handleSelect = (date: Date | undefined) => {
    onChange(date ? format(date, "yyyy-MM-dd") : "");
    close();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
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

  const displayValue = selected ? format(selected, "yyyy년 MM월 dd일") : "";

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        data-testid="date-picker-trigger"
        onClick={handleOpen}
        className={cn(
          "w-full h-11 px-4 rounded-xl border bg-card transition-all duration-200",
          "flex items-center gap-2 text-sm",
          "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50",
          error ? "border-red-500 focus:ring-red-500/50" : "border-border",
          className,
        )}
      >
        <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
        <span
          className={cn(
            "flex-1 text-left",
            displayValue ? "text-foreground" : "text-muted-foreground/50",
          )}
        >
          {displayValue || placeholder}
        </span>
      </button>

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-muted transition-colors"
          aria-label="날짜 초기화"
        >
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      )}

      {open && (
        <div
          data-testid="date-picker-calendar"
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute top-full left-0 mt-2 z-50 p-4 rounded-2xl border border-border bg-background shadow-lg"
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            disabled={{ after: new Date() }}
            locale={ko}
            classNames={DAY_PICKER_CLASS_NAMES}
          />
        </div>
      )}
    </div>
  );
}

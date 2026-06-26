import { DayPicker } from "react-day-picker";
import { parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { DAY_PICKER_CLASS_NAMES } from "@/components/commons/datePicker/dayPickerClassNames";

type Props = {
  label: string;
  value: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (date: Date | undefined) => void;
  onReset: () => void;
  popupAlign?: "left" | "right";
};

export default function DatePickerCell({
  label,
  value,
  isOpen,
  onToggle,
  onSelect,
  onReset,
  popupAlign = "left",
}: Props) {
  return (
    <div className="relative border-r border-border">
      <button
        type="button"
        onClick={onToggle}
        className="flex h-14 w-full items-center gap-2 px-4 hover:bg-muted/40 transition-colors"
      >
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </span>
        <span
          className={`text-xs font-semibold truncate ${value ? "text-foreground" : "text-muted-foreground/40"}`}
        >
          {value || "——"}
        </span>
      </button>

      {isOpen && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className={`absolute top-full z-50 mt-1 p-3 border border-border bg-popover shadow-lg ${popupAlign === "right" ? "right-0" : "left-0"}`}
        >
          <DayPicker
            mode="single"
            selected={value ? parseISO(value) : undefined}
            onSelect={onSelect}
            disabled={{ after: new Date() }}
            locale={ko}
            classNames={DAY_PICKER_CLASS_NAMES}
          />
          {value && (
            <div className="pt-2 border-t border-border">
              <button
                type="button"
                onClick={onReset}
                className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                초기화
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
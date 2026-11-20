import { JSX, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import SearchInput from "./SearchInput";
import DatePickerCell from "./DatePickerCell";
import { Button } from "@/components/ui/button/Button";

type SearchBarBaseProps = {
  search: string;
  onSearchChange: (v: string) => void;
  onSubmit?: () => void;
  onReset?: () => void;
};

type SearchBarOnlySearchProps = SearchBarBaseProps & {
  variant: "onlySearch";
};

type SearchBarWithDateProps = SearchBarBaseProps & {
  variant: "withDate";
  startDate: string;
  endDate: string;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
};

type SearchBarProps = SearchBarOnlySearchProps | SearchBarWithDateProps;

const submitButtonClass =
  "h-14 bg-foreground text-xs font-black uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-80 active:opacity-70";

export default function SearchBar(props: SearchBarProps): JSX.Element {
  const { variant, search, onSearchChange, onSubmit, onReset } = props;

  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const startDate = variant === "withDate" ? props.startDate : "";
  const endDate = variant === "withDate" ? props.endDate : "";
  const onStartDateChange =
    variant === "withDate" ? props.onStartDateChange : () => {};
  const onEndDateChange =
    variant === "withDate" ? props.onEndDateChange : () => {};

  useEffect(() => {
    if (!activeField) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setActiveField(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [activeField]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.();
  };

  const handleFromSelect = (date: Date | undefined) => {
    onStartDateChange(date ? format(date, "yyyy-MM-dd") : "");
    setActiveField(null);
  };

  const handleToSelect = (date: Date | undefined) => {
    onEndDateChange(date ? format(date, "yyyy-MM-dd") : "");
    setActiveField(null);
  };

  if (variant === "onlySearch") {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between h-12 w-full border-[1.5px] border-foreground bg-card "
      >
        <div className="flex w-full h-full items-center gap-3 border-border px-4">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            onReset={onReset}
          />
        </div>

        <Button
          type="submit"
          size="sm"
          className="h-full font-black uppercase tracking-[0.12em]"
        >
          Search
        </Button>
      </form>
    );
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className={[
          "grid w-full border-[1.5px] border-foreground bg-card",
          "grid-cols-[1fr_1fr_auto] md:grid-cols-[1fr_auto_auto_auto] items-center ",
          "md:h-12 h-24",
        ].join(" ")}
      >
        <div
          className={[
            "col-span-3 md:col-span-1",
            "flex h-full items-center gap-3 px-4",
            "border-b border-border md:border-b-0 md:border-r",
          ].join(" ")}
        >
          <SearchInput
            value={search}
            onChange={onSearchChange}
            onReset={onReset}
          />
        </div>

        <DatePickerCell
          label="From"
          value={startDate}
          isOpen={activeField === "from"}
          onToggle={() =>
            setActiveField(activeField === "from" ? null : "from")
          }
          onSelect={handleFromSelect}
          onReset={() => {
            onStartDateChange("");
            setActiveField(null);
          }}
          popupAlign="left"
        />

        <DatePickerCell
          label="To"
          value={endDate}
          isOpen={activeField === "to"}
          onToggle={() => setActiveField(activeField === "to" ? null : "to")}
          onSelect={handleToSelect}
          onReset={() => {
            onEndDateChange("");
            setActiveField(null);
          }}
          popupAlign="right"
        />

        <Button
          type="submit"
          size="sm"
          className="h-full font-black uppercase tracking-[0.12em]"
        >
          Search
        </Button>
      </form>
    </div>
  );
}

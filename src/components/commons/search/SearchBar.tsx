import { Search, X } from "lucide-react";
import { JSX } from "react";
import DateRangePicker from "./DateRangePicker";

type SearchBarBaseProps = {
  search: string;
  onSearchChange: (v: string) => void;
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

export default function SearchBar(props: SearchBarProps): JSX.Element {
  const { variant, search, onSearchChange } = props;

  return (
    <div className="flex items-center gap-2 w-full px-4 py-2.5 rounded-full border border-border bg-background shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
      <Search className="w-4 h-4 text-muted-foreground shrink-0" />
      <input
        type="text"
        placeholder="제목, 공연명, 아티스트명, 내용 검색..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 text-sm bg-transparent outline-none min-w-0"
      />
      {search && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          className="p-0.5 rounded-full hover:bg-muted transition-colors shrink-0"
          aria-label="검색어 초기화"
        >
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      )}
      {variant === "withDate" && (
        <>
          <div className="w-px h-4 bg-border shrink-0" />
          <DateRangePicker
            startDate={props.startDate}
            endDate={props.endDate}
            onStartDateChange={props.onStartDateChange}
            onEndDateChange={props.onEndDateChange}
          />
        </>
      )}
    </div>
  );
}
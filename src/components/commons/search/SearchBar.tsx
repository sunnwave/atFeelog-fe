import { Search, X } from "lucide-react";
import { JSX } from "react";
import DateFilter from "./DateFilter";

type SearchVariant = "withDate" | "onlySearch";

export default function SearchBar({
  variant,
  search,
  startDate,
  endDate,
  onSearchChange,
  onStartDateChange,
  onEndDateChange,
}: {
  variant: SearchVariant;
  search: string;
  startDate: string;
  endDate: string;
  onSearchChange: (v: string) => void;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
}): JSX.Element {
  return (
    <div className="w-full flex flex-col md:flex-row gap-2">
      <div className="relative w-full flex items-center">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="제목, 작성자, 내용 검색..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-2 rounded-xl text-sm border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>
      {variant === "withDate" && (
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      )}
    </div>
  );
}

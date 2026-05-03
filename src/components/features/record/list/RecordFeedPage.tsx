import Header from "@/components/commons/layout/Header/Header";
import SearchBar from "@/components/commons/search/SearchBar";
import { JSX, useState } from "react";
import RecordFeed from "./RecordFeed";
import { useDebounce } from "@/shared/hooks/ui/useDebounce";
import { localDateToRfc3339NoonUtc } from "@/shared/utils";

export default function RecordFeedPage(): JSX.Element {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const debouncedSearch = useDebounce(search);

  const filter = {
    search: debouncedSearch || undefined,
    startDate: startDate ? localDateToRfc3339NoonUtc(startDate) : undefined,
    endDate: endDate ? localDateToRfc3339NoonUtc(endDate) : undefined,
  };

  return (
    <div className="min-h-screen bg-background px-6 py-4 lg:px-6 lg:py-8">
      <div className="max-w-5xl space-y-2 lg:space-y-4">
        <Header text="필로그" />
        <SearchBar
          variant="withDate"
          search={search}
          startDate={startDate}
          endDate={endDate}
          onSearchChange={setSearch}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <RecordFeed filter={filter} />
      </div>
    </div>
  );
}

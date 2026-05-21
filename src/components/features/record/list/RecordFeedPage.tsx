import Header from "@/components/commons/layout/Header/Header";
import SearchBar from "@/components/commons/search/SearchBar";
import { JSX, useState } from "react";
import RecordFeed from "./RecordFeed";
import { useDebounce } from "@/shared/hooks/ui/useDebounce";
import { localDateToRfc3339NoonUtc } from "@/shared/utils";
import { useRouter } from "next/router";
import SortToggle, { SortMode } from "./SortToggle";

export default function RecordFeedPage(): JSX.Element {
  const router = useRouter();

  const [sortMode, setSortMode] = useState<SortMode>(
    router.query.view === "best" ? "best" : "recent",
  );

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const debouncedSearch = useDebounce(search);

  const filter = {
    search: debouncedSearch || undefined,
    startDate: startDate ? localDateToRfc3339NoonUtc(startDate) : undefined,
    endDate: endDate ? localDateToRfc3339NoonUtc(endDate) : undefined,
  };

  const isBest = sortMode === "best";

  return (
    <div className="px-4 py-4 md:px-0 md:py-0">
      <div className="space-y-2 lg:space-y-4">
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
        <SortToggle value={sortMode} onChange={setSortMode} />

        <RecordFeed filter={filter} best={isBest} />
      </div>
    </div>
  );
}

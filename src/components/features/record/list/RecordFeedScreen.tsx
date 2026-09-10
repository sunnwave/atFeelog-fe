import SearchBar from "@/components/commons/search/SearchBar";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import { JSX } from "react";
import RecordFeed from "./ui/RecordFeed";
import RecordFilterBar from "./ui/RecordFilterBar";
import { useRecordFeedFilters } from "./hooks/useRecordFeedFilters";
import FollowingFeed from "./ui/FollowingFeed";

export default function RecordFeedScreen(): JSX.Element {
  const {
    search,
    startDate,
    endDate,
    setSearch,
    setStartDate,
    setEndDate,
    sortMode,
    feedMode,
    setSortMode,
    setFeedMode,
    submitSearch,
    resetSearch,
    filter,
  } = useRecordFeedFilters();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ResponsiveLayout
        contentType="wide"
        className="py-4 space-y-2 lg:space-y-4"
      >
        <SearchBar
          variant="withDate"
          search={search}
          startDate={startDate}
          endDate={endDate}
          onSearchChange={setSearch}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onSubmit={submitSearch}
          onReset={resetSearch}
        />

        <RecordFilterBar
          sortMode={sortMode}
          feedMode={feedMode}
          onSortChange={setSortMode}
          onFeedChange={setFeedMode}
        />

        {feedMode === "all" && <RecordFeed filter={filter} />}
        {feedMode === "following" && <FollowingFeed filter={filter} />}
      </ResponsiveLayout>
    </div>
  );
}

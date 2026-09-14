import { JSX } from "react";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import ShowFilterBar from "./ShowFilterBar";
import ShowsFeed from "./ShowsFeed";
import { useShowsFeedFilters } from "./hooks/useShowsFeedFilters";
import { SearchBar } from "@/components/commons/search";

export default function ShowsScreen(): JSX.Element {
  const {
    search,
    startDate,
    endDate,
    filter,
    setGenre,
    setStatus,
    setArea,
    setKidstate,
    setSearch,
    setStartDate,
    setEndDate,
    submitSearch,
    resetSearch,
  } = useShowsFeedFilters();

  return (
    <div className="min-h-screen bg-background">
      <ResponsiveLayout contentType="wide" className="py-6 space-y-6">
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

        <ShowFilterBar
          filter={filter}
          onKidChange={setKidstate}
          onGenreChange={setGenre}
          onStatusChange={setStatus}
          onAreaChange={setArea}
        />

        <ShowsFeed filter={filter} />
      </ResponsiveLayout>
    </div>
  );
}

import { JSX, useState } from "react";
import SearchBar from "@/components/commons/search/SearchBar";
import {
  SHOW_GENRES,
  SHOW_REGIONS,
  SHOW_STATUSES,
} from "@/shared/constants/kopis";
import { ShowFilters } from "./hooks/useShowBrowser";

type Props = {
  filters: ShowFilters;
  onSearch: (q: string, stdate: string, eddate: string) => void;
  onGenreChange: (genre: ShowFilters["genre"]) => void;
  onStatusChange: (status: ShowFilters["status"]) => void;
  onAreaChange: (area: ShowFilters["area"]) => void;
};

export default function ShowFilterBar({
  filters,
  onSearch,
  onGenreChange,
  onStatusChange,
  onAreaChange,
}: Props): JSX.Element {
  const [localQ, setLocalQ] = useState(filters.q);
  const [localStart, setLocalStart] = useState(filters.stdate);
  const [localEnd, setLocalEnd] = useState(filters.eddate);

  const handleSubmit = () => {
    onSearch(localQ, localStart, localEnd);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 검색바 (기존 컴포넌트 재사용) */}
      <SearchBar
        variant="withDate"
        search={localQ}
        onSearchChange={setLocalQ}
        startDate={localStart}
        endDate={localEnd}
        onStartDateChange={setLocalStart}
        onEndDateChange={setLocalEnd}
        onSubmit={handleSubmit}
      />

      {/* 장르 탭 */}
      <div className="flex flex-row gap-2 overflow-x-auto pb-1 no-scrollbar">
        {SHOW_GENRES.map((g) => {
          const active = filters.genre === g.shcate;
          return (
            <button
              key={g.shcate}
              onClick={() => onGenreChange(g.shcate)}
              className={`shrink-0 text-xs font-bold px-3 py-1.5 border-[1.5px] transition-colors duration-150 ${
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-foreground hover:bg-foreground/10"
              }`}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* 공연 상태 탭 */}
      <div className="flex flex-row gap-2 overflow-x-auto pb-1 no-scrollbar">
        {SHOW_STATUSES.map((s) => {
          const active = filters.status === s.prfstate;
          return (
            <button
              key={s.prfstate}
              onClick={() => onStatusChange(s.prfstate)}
              className={`shrink-0 text-xs font-bold px-3 py-1.5 border-[1.5px] transition-colors duration-150 ${
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-foreground hover:bg-foreground/10"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* 지역 탭 */}
      <div className="flex flex-row gap-2 overflow-x-auto pb-1 no-scrollbar">
        {SHOW_REGIONS.map((r) => {
          const active = filters.area === r.signgucode;
          return (
            <button
              key={r.signgucode}
              onClick={() => onAreaChange(r.signgucode)}
              className={`shrink-0 text-xs font-bold px-3 py-1.5 border-[1.5px] transition-colors duration-150 ${
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-foreground hover:bg-foreground/10"
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

import { JSX } from "react";
import {
  SHOW_GENRES,
  SHOW_AREAS,
  SHOW_STATUSES,
  ShowGenre,
  ShowStatus,
  ShowArea,
  ShowKidstate,
} from "@/shared/constants/kopis";
import { ShowFilters } from "./type/type";
import ToggleGroup, { ToggleOption } from "@/components/ui/button/ToggleGroup";

type Props = {
  filter: ShowFilters;
  onKidChange: (kidstate: ShowKidstate) => void;
  onGenreChange: (genre: ShowGenre) => void;
  onStatusChange: (status: ShowStatus) => void;
  onAreaChange: (area: ShowArea) => void;
};

const KID_STATE_OPTION: ToggleOption<ShowKidstate>[] = [
  { value: "", label: "전체" },
  { value: "Y", label: "아동극" },
];

function FilterTabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 text-xs font-bold px-3 py-1.5 border-[1.5px] transition-colors duration-150 ${
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-background text-foreground border-foreground hover:bg-foreground/10"
      }`}
    >
      {label}
    </button>
  );
}

export default function ShowFilterBar({
  filter,
  onKidChange,
  onGenreChange,
  onStatusChange,
  onAreaChange,
}: Props): JSX.Element {
  return (
    <div className="flex flex-col gap-3">
      <ToggleGroup
        options={KID_STATE_OPTION}
        value={filter.kidstate}
        onChange={onKidChange}
      />

      {/* 장르 탭 */}
      <div className="flex flex-row gap-2 overflow-x-auto pb-1 no-scrollbar">
        {SHOW_GENRES.map((g) => (
          <FilterTabButton
            key={g.shcate}
            label={g.label}
            active={filter.genre === g.shcate}
            onClick={() => onGenreChange(g.shcate)}
          />
        ))}
      </div>

      {/* 공연 상태 탭 */}
      <div className="flex flex-row gap-2 overflow-x-auto pb-1 no-scrollbar">
        {SHOW_STATUSES.map((s) => (
          <FilterTabButton
            key={s.prfstate}
            label={s.label}
            active={filter.status === s.prfstate}
            onClick={() => onStatusChange(s.prfstate)}
          />
        ))}
      </div>

      {/* 지역 탭 */}
      <div className="flex flex-row gap-2 overflow-x-auto pb-1 no-scrollbar">
        {SHOW_AREAS.map((r) => (
          <FilterTabButton
            key={r.signgucode}
            label={r.label}
            active={filter.area === r.signgucode}
            onClick={() => onAreaChange(r.signgucode)}
          />
        ))}
      </div>
    </div>
  );
}

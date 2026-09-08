import { JSX, useState } from "react";
import { Trophy } from "lucide-react";
import { useBoxOffice } from "@/shared/hooks/kopis/useBoxOffice";
import {
  BOXOFFICE_GENRES,
  type BoxOfficeGenreCatecode,
} from "@/shared/constants/kopis";
import { ShowCard } from "@/components/commons/card";
import { boxOfficeToPerformance } from "@/api/adapters/kopis.adapter";
import { EmptyState, SectionSkeleton } from "@/components/ui/feedback";
import { EMPTY_MESSAGES } from "@/shared/constants/messages";

export default function BoxOfficeSection(): JSX.Element {
  const [catecode, setCatecode] = useState<BoxOfficeGenreCatecode>("");
  const { items, loading, error } = useBoxOffice("week", catecode);

  if (loading) return <SectionSkeleton count={10} />;
  if (error)
    return <p className="text-sm text-muted-foreground py-4">{error}</p>;

  if (items.length === 0)
    return <EmptyState {...EMPTY_MESSAGES.home.boxOffice} />;

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* 헤더 */}
      <h2 className="text-2xl font-bold flex flex-row items-center justify-start gap-1.5">
        <Trophy className="w-5 h-5" />
        <span>이번 주 박스오피스</span>
      </h2>
      {/* TODO: 장르탭 구분. boxOfficeSection 리렌더링시 장르탭도 리렌더링됨 */}
      <div className="flex flex-row gap-2 overflow-x-auto pb-1 no-scrollbar">
        {BOXOFFICE_GENRES.map((genre) => {
          const active = catecode === genre.catecode;
          return (
            <button
              key={genre.catecode}
              onClick={() => setCatecode(genre.catecode)}
              className={`shrink-0 text-xs font-bold px-3 py-1.5 border-[1.5px] transition-colors duration-150 ${
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-foreground hover:bg-foreground/10"
              }`}
            >
              {genre.label}
            </button>
          );
        })}
      </div>

      {/* 카드 리스트 */}

      <div className="w-full max-w-full min-w-0 overflow-x-auto border-t-[1.5px] border-l-[1.5px] border-foreground">
        <div className="flex flex-nowrap">
          {items.slice(0, 10).map((item) => (
            <div key={item.mt20id} className="shrink-0 w-46 md:w-52 @container">
              <ShowCard
                performance={boxOfficeToPerformance(item)}
                rank={item.rank}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

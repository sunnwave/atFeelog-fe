import { JSX, useState } from "react";
import { Trophy } from "lucide-react";
import { useBoxOffice } from "@/shared/hooks/kopis/useBoxOffice";
import {
  BOXOFFICE_GENRES,
  type BoxOfficeGenreCatecode,
} from "@/shared/constants/kopis";
import BoxOfficeCard from "./BoxOfficeCard";

export default function BoxOfficeSection(): JSX.Element {
  const [catecode, setCatecode] = useState<BoxOfficeGenreCatecode>("");
  const { items, loading, error } = useBoxOffice("week", catecode);

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* 헤더 */}
      <h2 className="text-2xl font-bold flex flex-row items-center justify-start gap-1.5">
        <Trophy className="w-5 h-5" />
        <span>이번 주 박스오피스</span>
      </h2>

      {/* 장르 탭 */}
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
      {loading ? (
        <div className="w-full max-w-full min-w-0 overflow-x-auto">
          <div className="flex flex-nowrap border-l-[1.5px] border-foreground">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-40 md:w-52 border-r-[1.5px] border-foreground"
              >
                <div className="aspect-3/4 bg-muted animate-pulse border-b-[1.5px] border-foreground" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-muted animate-pulse rounded" />
                  <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : error || items.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4">
          {error ?? "해당 장르의 박스오피스 정보가 없어요."}
        </p>
      ) : (
        <div className="w-full max-w-full min-w-0 overflow-x-auto pb-3 scrollbar-thin">
          <div className="flex flex-nowrap border-l-[1.5px] border-foreground">
            {items.slice(0, 10).map((item) => (
              <BoxOfficeCard key={item.mt20id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

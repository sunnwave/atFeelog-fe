import { Bookmark } from "lucide-react";
import { Performance } from "@/shared/types/performance";

export default function ShowCardMeta({ p }: { p: Performance }) {
  return (
    <div
      className="
        p-2 @card-xs:p-2.5 @card-sm:p-3 @card-md:p-4 
        gap-0.5 @card-sm:gap-1 @card-lg:gap-1.5
        flex flex-col justify-between bg-card
      "
    >
      {/* Row 1: 공연 기간 | 관심공연 아이콘 */}
      <div className="flex items-center justify-between">
        {p.startDate === p.endDate ? (
          // 하루 공연
          <span className="text-[10px] @card-xs:text-xs @card-sm:text-sm @card-md:text-base font-bold text-muted-foreground">
            {p.startDate.slice(2)}
          </span>
        ) : (
          // 장기 공연
          <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-hidden">
            <span className="text-[10px] @card-xs:text-xs @card-sm:text-sm @card-md:text-base font-bold text-muted-foreground shrink-0">
              {p.startDate.slice(2)}
            </span>
            <div className="flex-1 h-px bg-muted-foreground/20" />
            <span className="text-[10px] @card-xs:text-xs @card-sm:text-sm @card-md:text-base font-bold text-muted-foreground shrink-0">
              {p.isOpenRun ? "오픈런" : p.endDate.slice(2)}
            </span>
          </div>
        )}
        {/* TODO: 관심공연 찜 기능 연결 */}
        <button
          type="button"
          className="flex items-center text-muted-foreground hover:text-point transition-colors ml-4 @card-md:ml-6"
        >
          {/* TODO: 북마크 아이콘 리팩토링 */}
          <Bookmark className="w-3.5 h-3.5 @card-xs:w-4 @card-xs:h-4 @card-sm:w-4.5 @card-sm:h-4.5 @card-md:w-5 @card-md:h-5" />
        </button>
      </div>

      {/* Row 2: 공연 제목 */}
      <p className="text-xs @card-xs:text-sm @card-md:text-base @card-lg:text-lg font-bold text-foreground truncate leading-none">
        {p.title}
      </p>

      {/* Row 3: 장소 · 장르 */}
      <p className="text-[9px] @card-xs:text-[10px] @card-sm:text-xs @card-md:text-sm text-muted-foreground truncate">
        {p.venueName} · {p.genre}
      </p>
    </div>
  );
}

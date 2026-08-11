import { JSX } from "react";
import Image from "next/image";
import type { BoxOffice } from "@/shared/types/performance";

type Props = {
  item: BoxOffice;
};

export default function BoxOfficeCard({ item }: Props): JSX.Element {
  const hasPoster = !!item.posterUrl?.trim();

  return (
    <div className="group flex flex-col shrink-0 w-40 md:w-52 border-l-0 border-[1.5px] border-foreground">
      {/* 포스터 */}
      <div className="relative aspect-3/4 overflow-hidden border-b-[1.5px] border-foreground">
        {/* 순위 뱃지 */}
        <span className="absolute top-2 left-2 z-10 bg-foreground text-background text-xs font-black px-2 py-0.5 leading-tight">
          {item.rank}
        </span>

        {hasPoster ? (
          <Image
            src={item.posterUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized // KOPIS HTTP URL — next/image 최적화 우회
          />
        ) : (
          <div
            className="w-full h-full bg-muted flex items-end p-3"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(33,33,33,0.1) 1.5px, transparent 1.5px)",
              backgroundSize: "14px 14px",
            }}
          />
        )}
      </div>

      {/* 텍스트 정보 */}
      <div className="flex flex-col gap-0.5 p-3">
        <p className="text-sm font-bold leading-snug line-clamp-2">
          {item.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {item.venueName}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] font-semibold text-point uppercase tracking-wide">
            {item.genre}
          </span>
          {item.area && (
            <span className="text-[10px] text-muted-foreground">
              {item.area}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

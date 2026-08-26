import LabelBadge from "@/components/ui/badge/LabelBadge";
import { PerformanceDetail } from "@/shared/types/performance";
import Image from "next/image";
import ShowInfoList from "./ShowInfoList";
import { Heart } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import NoImageCard from "@/components/ui/NoImageCard";

type ShowDetailInfoProps = {
  detail: PerformanceDetail;
  liked?: boolean;
  onLikeToggle?: () => void;
};
export default function ShowDetailInfo({
  detail,
  liked,
  onLikeToggle,
}: ShowDetailInfoProps) {
  return (
    <div className="flex gap-10 items-start">
      {/* 좌측: 포스터 + 정보 */}
      <div className="flex-1 min-w-0 flex gap-7 items-start">
        {/* 포스터 */}
        <div className="relative w-65 shrink-0 aspect-3/4 border-[1.5px] border-foreground overflow-hidden">
          {detail.posterUrl ? (
            <Image
              src={detail.posterUrl}
              alt={detail.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <NoImageCard />
          )}
        </div>

        {/* 정보 컬럼 */}
        <div className="flex-1 min-w-0 flex flex-col pt-0.5 self-stretch">
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex">
              {detail.status && (
                <LabelBadge
                  variant={detail.status === "공연중" ? "point" : "light"}
                >
                  {detail.status}
                </LabelBadge>
              )}
            </div>
            <h1
              className="text-[32px] font-black text-foreground leading-[1.15]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {detail.title}
            </h1>
            <ShowInfoList
              detail={detail}
              className="border-t border-border pt-3 px-0"
            />
          </div>
          <button
            aria-label={liked ? "찜 취소" : "찜하기"}
            onClick={onLikeToggle}
            className={cn(
              `flex items-center bg-card justify-center gap-2 text-[13px] font-semibold transition-colors duration-150 border-[1.5px] border-foreground py-2`,
              liked ? "text-point" : "text-foreground",
            )}
          >
            <Heart
              size={16}
              strokeWidth={2}
              fill={liked ? "currentColor" : "none"}
            />
            <span>{liked ? "찜한 공연" : "찜하기"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

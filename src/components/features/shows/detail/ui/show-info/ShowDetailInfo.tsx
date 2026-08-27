import LabelBadge from "@/components/ui/badge/LabelBadge";
import { PerformanceDetail } from "@/shared/types/performance";
import ShowInfoList from "./ShowInfoList";
import { Heart } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import ShowPosterHero from "./ShowPosterHero";

type ShowDetailInfoProps = {
  detail: PerformanceDetail;
  liked?: boolean;
  onLikeToggle?: () => void;
};

const STATUS_VARIANT: Record<string, "light" | "point" | "muted"> = {
  공연예정: "light",
  공연중: "point",
  공연완료: "muted",
};

export default function ShowDetailInfo({
  detail,
  liked,
  onLikeToggle,
}: ShowDetailInfoProps) {
  const badgeVariant = STATUS_VARIANT[detail.status ?? "공연완료"];

  return (
    <div className="flex gap-10 items-start">
      {/* 좌측: 포스터 + 정보 */}
      <div className="flex w-full flex-col min-w-0 @sm:p-3 @lg:p-0 @sm:grid @sm:grid-cols-[1fr_1fr] @sm:gap-3 items-start">
        {/* 포스터 */}
        <ShowPosterHero detail={detail} badgeVariant={badgeVariant} />

        {/* 정보 컬럼 */}
        <div className="flex-1 p-4 gap-3 min-w-0 flex flex-col self-stretch ">
          <div className="hidden @sm:flex flex-col gap-3">
            <div className="flex ">
              {detail.status && (
                <LabelBadge variant={badgeVariant}>{detail.status}</LabelBadge>
              )}
            </div>
            <h1
              className="sm:text-2xl md:text-[32px] font-black text-foreground leading-[1.15] border-b border-border pb-3"
              style={{ letterSpacing: "-0.03em" }}
            >
              {detail.title}
            </h1>
          </div>
          <ShowInfoList detail={detail} className="" />
          <button
            aria-label={liked ? "찜 취소" : "찜하기"}
            onClick={onLikeToggle}
            className={cn(
              `flex w-full items-center bg-card justify-center gap-2 text-[13px] font-semibold transition-colors duration-150 border-[1.5px] border-foreground py-2`,
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

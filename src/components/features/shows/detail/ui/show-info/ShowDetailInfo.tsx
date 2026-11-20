import { useEffect, useState } from "react";
import LabelBadge from "@/components/ui/badge/LabelBadge";
import { PerformanceDetail } from "@/shared/types/performance";
import ShowInfoList from "./ShowInfoList";
import { Bookmark } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import ShowPosterHero from "./ShowPosterHero";
import { Button } from "@/components/ui/button/Button";

type ShowDetailInfoProps = {
  detail: PerformanceDetail;
  liked?: boolean;
  onLikeToggle?: () => void | Promise<unknown>;
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

  const [optimisticLiked, setOptimisticLiked] = useState(liked ?? false);

  useEffect(() => {
    setOptimisticLiked(liked ?? false);
  }, [liked]);

  const handleLikeClick = () => {
    const previousLiked = optimisticLiked;
    setOptimisticLiked(!previousLiked);
    Promise.resolve(onLikeToggle?.()).catch(() => {
      setOptimisticLiked(previousLiked);
    });
  };

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
          <Button
            aria-label="북마크"
            onClick={handleLikeClick}
            className={cn(
              "w-full active:bg-transparent",
              optimisticLiked ? "text-point" : "",
            )}
            variant="outline"
          >
            <Bookmark fill={optimisticLiked ? "currentColor" : "none"} />
            {optimisticLiked ? "찜한 공연" : "찜하기"}
          </Button>
        </div>
      </div>
    </div>
  );
}

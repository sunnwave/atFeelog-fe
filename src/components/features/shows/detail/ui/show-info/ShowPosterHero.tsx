import Image from "next/image";
import LabelBadge from "@/components/ui/badge/LabelBadge";
import type { PerformanceDetail } from "@/shared/types/performance";
import NoImageCard from "@/components/ui/NoImageCard";
import { cn } from "@/shared/utils";

type ShowPosterHeroProps = {
  detail: PerformanceDetail;
  badgeVariant: "light" | "dark" | "point" | "muted";
  className?: string;
};

export default function ShowPosterHero({
  detail,
  className,
  badgeVariant,
}: ShowPosterHeroProps) {
  return (
    <div
      className={cn(
        "relative w-full @sm:border-[1.5px] @sm:border-foreground @md:overflow-hidden aspect-3/4 shrink-0",
        className,
      )}
    >
      {/* 포스터 이미지 */}
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

      {/* 스크림 */}
      <div
        className="absolute @sm:hidden inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 32%, rgba(0,0,0,.12) 55%, rgba(0,0,0,.9) 100%)",
        }}
      />

      {/* 하단 오버레이: 배지 + 제목 + 장르·공연장 */}
      <div className="@sm:hidden absolute left-5 right-5 bottom-5.5 flex flex-col gap-2.5 z-10">
        <div className="flex">
          {detail.status && (
            <LabelBadge variant={badgeVariant}>{detail.status}</LabelBadge>
          )}
        </div>
        <h1
          className="text-[26px] font-black leading-[1.15] text-white"
          style={{ letterSpacing: "-0.04em" }}
        >
          {detail.title}
        </h1>
      </div>
    </div>
  );
}

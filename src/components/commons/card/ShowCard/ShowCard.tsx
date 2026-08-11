import { JSX } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { Performance, PerformanceStatus } from "@/shared/types/performance";
import LabelBadge from "@/components/ui/badge/LabelBadge";
import RankBadge from "@/components/ui/badge/RankBadge";
import ShowCardMeta from "./ShowCardMeta";
import NoImageCard from "@/components/ui/NoImageCard";

type ShowCardPerformance = Omit<Performance, "status"> & { status?: PerformanceStatus };

const STATUS_VARIANT: Record<string, "light" | "point" | "muted"> = {
  공연예정: "light",
  공연중: "point",
  공연완료: "muted",
};

export default function ShowCard({
  performance: p,
  showMeta = true,
  showBorder = true,
  rank,
}: {
  performance: ShowCardPerformance;
  showMeta?: boolean;
  showBorder?: boolean;
  rank?: number;
}): JSX.Element {
  const router = useRouter();

  const badge =
    rank != null ? (
      <RankBadge rank={rank} />
    ) : p.status ? (
      <LabelBadge variant={STATUS_VARIANT[p.status] ?? "light"} size="card">{p.status}</LabelBadge>
    ) : null;

  return (
    <div
      className={`@container group${showBorder ? " border-r-[1.5px] border-b-[1.5px] border-foreground" : ""}`}
    >
      {/* 포스터 */}
      <div
        className="cursor-pointer relative aspect-3/4 overflow-hidden border-b-[1.5px] border-foreground"
        onClick={() => void router.push(`/shows/${p.mt20id}`)}
      >
        {p.posterUrl ? (
          <Image
            src={p.posterUrl}
            alt={p.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <NoImageCard />
        )}
        <div className="absolute inset-0 p-2 @card-xs:p-2.5 @card-sm:p-3 @card-md:p-4">
          <div className="flex items-start justify-between">
            {badge}
          </div>
        </div>
      </div>

      {/* 텍스트 */}
      {showMeta && <ShowCardMeta p={p} />}
    </div>
  );
}

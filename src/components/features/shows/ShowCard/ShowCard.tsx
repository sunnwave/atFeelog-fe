import { JSX } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { Performance } from "@/shared/types/performance";
import ShowCardMeta from "./ShowCardMeta";

const STATUS_STYLE: Record<string, string> = {
  공연중: "bg-green-500/10 text-green-600",
  공연예정: "bg-blue-500/10 text-blue-600",
  공연완료: "bg-muted text-muted-foreground",
};

export default function ShowCard({
  performance: p,
  showMeta = true,
  showBorder = true,
}: {
  performance: Performance;
  showMeta?: boolean;
  showBorder?: boolean;
}): JSX.Element {
  const router = useRouter();

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
          <div
            className="w-full h-full bg-muted"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(33,33,33,0.1) 1.5px, transparent 1.5px)",
              backgroundSize: "14px 14px",
            }}
          />
        )}
        {/* 상태 뱃지 */}
        <span
          className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[p.status] ?? STATUS_STYLE["공연완료"]}`}
        >
          {p.status}
        </span>
        {p.isOpenRun && (
          <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-point/10 text-point">
            오픈런
          </span>
        )}
      </div>

      {/* 텍스트 */}

      {showMeta && <ShowCardMeta p={p} />}
    </div>
  );
}

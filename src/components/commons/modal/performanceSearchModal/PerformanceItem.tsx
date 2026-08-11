import type { Performance } from "@/shared/types/performance";
import Image from "next/image";

const STATUS_STYLE: Record<string, string> = {
  공연중: "bg-green-500/10 text-green-600",
  공연예정: "bg-blue-500/10 text-blue-600",
  공연완료: "bg-muted text-muted-foreground",
};

export default function PerformanceItem({
  performance: p,
  onConfirm,
  onOpenChange,
}: {
  performance: Performance;
  onConfirm: (performance: Performance) => void;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <li>
      <button
        type="button"
        className="w-full rounded-2xl border border-border bg-card p-3 text-left hover:bg-muted/40 transition-colors flex gap-3 items-start"
        onClick={() => {
          onConfirm(p);
          onOpenChange(false);
        }}
      >
        {/* 포스터 */}
        <div className="relative shrink-0 w-12 h-16 rounded-lg overflow-hidden bg-muted">
          {p.posterUrl ? (
            <Image
              src={p.posterUrl}
              alt={p.title}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
              No img
            </div>
          )}
        </div>

        {/* 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-sm text-foreground truncate">
              {p.title}
            </span>
            <span
              className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${STATUS_STYLE[p.status as string] ?? STATUS_STYLE["공연완료"]}`}
            >
              {p.status}
            </span>
          </div>

          <div className="mt-0.5 text-xs text-muted-foreground truncate">
            {p.genre} · {p.venueName}
          </div>

          <div className="mt-0.5 text-xs text-muted-foreground">
            {p.startDate} ~ {p.endDate}
            {p.isOpenRun && (
              <span className="ml-1.5 text-[10px] font-bold text-point-indigo">
                오픈런
              </span>
            )}
          </div>
        </div>
      </button>
    </li>
  );
}

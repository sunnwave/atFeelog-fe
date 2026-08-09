import { Performance } from "@/shared/types/performance";

export default function ShowCardMeta({ p }: { p: Performance }) {
  return (
    <div className="p-3 flex flex-col gap-0.5">
      <p className="text-sm font-bold leading-snug line-clamp-2">{p.title}</p>
      <p className="text-xs text-muted-foreground truncate">{p.venueName}</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] font-semibold text-point">{p.genre}</span>
        <span className="text-[10px] text-muted-foreground">
          {p.startDate.replace(/\./g, ".")} ~{" "}
          {p.isOpenRun ? "오픈런" : p.endDate.replace(/\./g, ".")}
        </span>
      </div>
    </div>
  );
}

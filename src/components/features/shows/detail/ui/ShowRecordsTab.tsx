import { Sparkles } from "lucide-react";
import { RecordPosterCard } from "@/components/commons/card";
import type { RecordSummary } from "@/api/adapters/types/record-summary";
import ResponsiveGrid from "@/components/commons/layout/ResponsiveGrid";

type ShowRecordsTabProps = {
  records: RecordSummary[];
  loading: boolean;
};

export default function ShowRecordsTab({
  records,
  loading,
}: ShowRecordsTabProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 border-l-[1.5px] border-t-[1.5px] border-foreground lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-3/4 animate-pulse bg-muted border-r-[1.5px] border-b-[1.5px] border-foreground"
          />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="flex items-center gap-2 py-10 text-muted-foreground">
        <Sparkles className="h-5 w-5" />
        <span className="text-sm">아직 이 공연의 필로그가 없어요</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* <div className="flex flex-col gap-1">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-muted-foreground">
          먼저 다녀온 사람들의 기록
        </p>
        <p className="text-[12.5px] text-muted-foreground">
          이 공연을 기록한 유저들의 기록이에요
        </p>
      </div> */}
      <ResponsiveGrid cols={2} colsMd={3} colsLg={4} bordered>
        {records.map((record) => (
          <RecordPosterCard key={record.id} record={record} showBorder />
        ))}
      </ResponsiveGrid>
    </div>
  );
}

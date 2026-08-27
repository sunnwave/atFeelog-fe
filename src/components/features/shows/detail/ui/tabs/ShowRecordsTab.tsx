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
      <div className="flex items-center gap-2 py-5 text-muted-foreground">
        <Sparkles className="h-5 w-5" />
        <span className="text-sm">아직 이 공연의 필로그가 없어요</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <ResponsiveGrid
        cols={2}
        colsMd={3}
        colsLg={4}
        bordered
        className="border-t-0"
      >
        {records.map((record) => (
          <RecordPosterCard key={record.id} record={record} showBorder />
        ))}
      </ResponsiveGrid>
    </div>
  );
}

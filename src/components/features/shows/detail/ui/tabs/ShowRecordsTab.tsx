import { RecordPosterCard } from "@/components/commons/card";
import ResponsiveGrid from "@/components/commons/layout/ResponsiveGrid";
import { useFetchRecordsByShow } from "@/components/features/record/list/hooks/queries/useFetchRecordsByShow";
import { CardGridSkeleton, EmptyState } from "@/components/ui/feedback";
import { EMPTY_MESSAGES, ERROR_MESSAGES } from "@/shared/constants/messages";
import { Button } from "@/components/ui/button/Button";
import { useRouter } from "next/router";

type ShowRecordsTabProps = {
  id: string;
};

export default function ShowRecordsTab({ id }: ShowRecordsTabProps) {
  const router = useRouter();
  const { records, loading, error, refetch } = useFetchRecordsByShow(id);

  if (loading) return <CardGridSkeleton className="border-t-0" />;

  if (error)
    return (
      <EmptyState {...ERROR_MESSAGES.show.record}>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          다시 시도하기
        </Button>
      </EmptyState>
    );

  if (records.length === 0)
    return (
      <EmptyState {...EMPTY_MESSAGES.show.record}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/feelog/new")}
        >
          기록 작성하기
        </Button>
      </EmptyState>
    );

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

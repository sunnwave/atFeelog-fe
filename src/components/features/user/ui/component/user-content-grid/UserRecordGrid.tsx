import { ResponsiveGrid } from "@/components/commons/layout";
import { useFetchBoardsByUser } from "../../../hooks";
import { RecordPosterCard } from "@/components/commons/card";
import { CardGridSkeleton } from "@/components/ui/feedback";

type UserRecordProps = {
  userId: string;
};

export default function UserRecordGrid({ userId }: UserRecordProps) {
  const { records, loading, error } = useFetchBoardsByUser(userId);

  if (loading) {
    return (
      <CardGridSkeleton
        showMeta={false}
        count={4}
        bordered
        className="border-t-0"
      />
    );
  }
  if (error) return <></>;
  if (!loading && records.length === 0) return <></>;
  return (
    <ResponsiveGrid
      cols={2}
      colsMd={3}
      colsLg={4}
      bordered
      className="border-t-0"
    >
      {records.map((r) => (
        <RecordPosterCard key={r.id} record={r} />
      ))}
    </ResponsiveGrid>
  );
}

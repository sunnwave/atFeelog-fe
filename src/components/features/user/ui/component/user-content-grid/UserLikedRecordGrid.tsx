import { ResponsiveGrid } from "@/components/commons/layout";
import { useFetchBoardsLikeByUser } from "../../../hooks";
import RecordPosterCard from "@/components/commons/card/RecordPosterCard/RecordPosterCard";
import { CardGridSkeleton } from "@/components/ui/feedback";

type UserLikedRecordProps = {
  userId: string;
};
export default function UserLikedRecordGrid({ userId }: UserLikedRecordProps) {
  const { records, error, loading } = useFetchBoardsLikeByUser(userId);

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

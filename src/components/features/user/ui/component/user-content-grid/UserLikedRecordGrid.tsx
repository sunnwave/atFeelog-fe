import { ResponsiveGrid } from "@/components/commons/layout";
import { useFetchBoardsLikeByUser } from "../../../hooks";
import RecordPosterCard from "@/components/commons/card/RecordPosterCard/RecordPosterCard";
import { CardGridSkeleton, EmptyState } from "@/components/ui/feedback";
import { EMPTY_MESSAGES, ERROR_MESSAGES } from "@/shared/constants/messages";
import { Button } from "@/components/ui/button/Button";

type UserLikedRecordProps = {
  userId: string;
};
export default function UserLikedRecordGrid({ userId }: UserLikedRecordProps) {
  const { records, error, loading, refetch } = useFetchBoardsLikeByUser(userId);

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
  if (error)
    return (
      <EmptyState {...ERROR_MESSAGES.user.likedGrid}>
        <Button variant="outline" size={"sm"} onClick={() => refetch()}>
          다시 시도하기
        </Button>
      </EmptyState>
    );
  if (!loading && records.length === 0)
    return <EmptyState {...EMPTY_MESSAGES.user.likedGrid} />;

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

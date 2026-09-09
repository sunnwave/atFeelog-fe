import { ResponsiveGrid } from "@/components/commons/layout";
import { CardGridSkeleton, EmptyState } from "@/components/ui/feedback";
import ShowCard from "@/components/commons/card/ShowCard/ShowCard";
import { useFetchSavedShows } from "../../../hooks";
import { Button } from "@/components/ui/button/Button";
import { EMPTY_MESSAGES, ERROR_MESSAGES } from "@/shared/constants/messages";
import { useRouter } from "next/router";

export default function UserSavedShowGrid() {
  const router = useRouter();
  const { shows, loading, error, refetch } = useFetchSavedShows();

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
      <EmptyState {...ERROR_MESSAGES.user.savedGrid}>
        <Button variant={"outline"} size={"sm"} onClick={() => refetch()}>
          다시 시도하기
        </Button>
      </EmptyState>
    );

  if (shows.length === 0)
    return (
      <EmptyState {...EMPTY_MESSAGES.user.savedGrid}>
        <Button
          variant="outline"
          size={"sm"}
          onClick={() => router.push("/shows")}
        >
          공연 둘러보기
        </Button>
      </EmptyState>
    );

  return (
    <ResponsiveGrid
      cols={2}
      colsMd={3}
      colsLg={4}
      bordered
      className="border-t-0"
    >
      {shows.map((show) => (
        <ShowCard key={show.mt20id} performance={show} showBorder />
      ))}
    </ResponsiveGrid>
  );
}

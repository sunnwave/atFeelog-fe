import { ResponsiveGrid } from "@/components/commons/layout";
import { useFetchFollowingFeed } from "../hooks/queries/useFetchFollowingFeed";
import { RecordPosterCard } from "@/components/commons/card";
import { RecordFilterVars, RECORDS_PER_PAGE } from "../types";
import { useRouter } from "next/router";
import { useApolloInfiniteScroll } from "@/shared/hooks/ui/useApolloInfiniteScroll";
import { useRetry } from "@/shared/hooks/ui/useRetry";
import {
  CardGridSkeleton,
  EmptyState,
  LoadingIndicator,
} from "@/components/ui/feedback";
import { EMPTY_MESSAGES, ERROR_MESSAGES } from "@/shared/constants/messages";
import { Button } from "@/components/ui/button/Button";

export default function FollowingFeed({
  filter = {},
}: {
  filter?: RecordFilterVars;
}): JSX.Element {
  const router = useRouter();

  const filterKey = `${filter.search ?? ""}|${filter.startDate ?? ""}|${filter.endDate ?? ""}|${filter.sort ?? ""}`;

  const { records, loading, data, refetch, fetchMore, error } =
    useFetchFollowingFeed(filter);

  const { sentinelRef, isLoading } = useApolloInfiniteScroll({
    data,
    fetchMore,
    getLength: (d) => d.fetchFollowingFeed?.length ?? 0,
    mergeResult: (prev, next) => ({
      fetchFollowingFeed: [
        ...(prev.fetchFollowingFeed ?? []),
        ...(next.fetchFollowingFeed ?? []),
      ],
    }),
    variables: filter,
    filterKey,
    perPage: RECORDS_PER_PAGE,
  });

  const { handleRetry, isRetrying } = useRetry(refetch);

  const empty = records.length === 0;
  if ((loading && empty) || isRetrying) return <CardGridSkeleton showMeta />;
  if (error)
    return (
      <EmptyState {...ERROR_MESSAGES.record.following_feed}>
        <Button variant={"outline"} size={"sm"} onClick={handleRetry}>
          다시 시도하기
        </Button>
      </EmptyState>
    );
  if (!loading && empty)
    return (
      <EmptyState {...EMPTY_MESSAGES.record.following_feed}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/feelog")}
        >
          필로그 둘러보기
        </Button>
      </EmptyState>
    );

  return (
    <>
      <ResponsiveGrid cols={2} colsMd={3} colsLg={4} bordered>
        {records.map((record) => (
          <div
            key={record.id}
            className="border-r-[1.5px] border-b-[1.5px] border-foreground"
          >
            <RecordPosterCard record={record} showMeta showBorder={false} />
          </div>
        ))}
      </ResponsiveGrid>

      <div ref={sentinelRef} />
      {isLoading && (
        <LoadingIndicator label="더 많은 필로그를 불러오고 있어요" />
      )}
    </>
  );
}

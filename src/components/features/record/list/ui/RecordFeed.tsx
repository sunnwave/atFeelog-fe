import ResponsiveGrid from "@/components/commons/layout/ResponsiveGrid";
import { JSX, useCallback, useState } from "react";
import {
  useFetchRecords,
  RecordFilterVars,
} from "../hooks/queries/useFetchRecords";
import { useInfiniteScroll } from "@/shared/hooks/ui/useInfiniteScroll";
import { RecordPosterCard } from "@/components/commons/card";
import { CardGridSkeleton, EmptyState } from "@/components/ui/feedback";
import { EMPTY_MESSAGES } from "@/shared/constants/messages";
import { Button } from "@/components/ui/button/Button";
import { useRouter } from "next/router";

const RECORDS_PER_PAGE = 10;

export default function RecordFeed({
  filter = {},
  // best = false,
  // sortMode = "latest",
  // feedMode = "all",
}: {
  filter?: RecordFilterVars;
  // best?: boolean;
  // sortMode: SortMode;

  // feedMode?: FeedMode;
}): JSX.Element {
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // const isFollowing = feedMode === "following";
  const router = useRouter();

  // filter/feedMode 변경 시 페이지네이션 리셋
  // const filterKey = `${feedMode}|${best ? "best" : ""}|${filter.search ?? ""}|${filter.startDate ?? ""}|${filter.endDate ?? ""}`;
  // const [lastFilterKey, setLastFilterKey] = useState(filterKey);
  // if (lastFilterKey !== filterKey) {
  //   setLastFilterKey(filterKey);
  //   setHasMore(true);
  //   setIsLoading(false);
  // }

  // 세 훅 모두 항상 호출 (조건부 훅 금지) — 사용하지 않는 쪽은 무시됨
  // const regularResult = useFetchRecords(best ? undefined : filter);
  // const bestResult = useFetchBestRecords({ isTop5: false });
  // const followingResult = useFetchFollowingFeed();

  const { records, loading, error } = useFetchRecords(filter);

  // const records = isFollowing
  //   ? followingResult.records
  //   : best
  //     ? bestResult.records
  //     : regularResult.records;

  // const loading = isFollowing
  //   ? followingResult.loading
  //   : best
  //     ? bestResult.loading
  //     : regularResult.loading;

  if (loading) return <CardGridSkeleton showMeta />;
  if (error) return <></>;
  if (records.length === 0)
    return (
      <EmptyState {...EMPTY_MESSAGES.record.feed}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/feelog/new")}
        >
          기록 작성하기
        </Button>
      </EmptyState>
    );

  // const onLoadMore=useCallback(()=>{
  //   const currentLength=records.length
  //   const newxPage=
  // })

  // const onLoadMore = useCallback(() => {
  //   if (isLoading || !hasMore) return;

  //   if (isFollowing) {
  //     const currentLength =
  //       (followingResult.data?.fetchFollowingFeed as unknown as unknown[])
  //         ?.length ?? 0;
  //     const nextPage = Math.floor(currentLength / RECORDS_PER_PAGE) + 1;
  //     setIsLoading(true);

  //     followingResult
  //       .fetchMore({
  //         variables: { page: nextPage },
  //         updateQuery: (prev, { fetchMoreResult }) => {
  //           if (!fetchMoreResult?.fetchFollowingFeed) return prev;
  //           const prevItems =
  //             (prev.fetchFollowingFeed as unknown as unknown[]) ?? [];
  //           const next =
  //             fetchMoreResult.fetchFollowingFeed as unknown as unknown[];
  //           if (next.length < RECORDS_PER_PAGE) setHasMore(false);
  //           return {
  //             fetchFollowingFeed: [...prevItems, ...next],
  //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //           } as any;
  //         },
  //       })
  //       .finally(() => setIsLoading(false));
  //   } else if (best) {
  //     const currentLength = bestResult.data?.fetchBoardsOfBest?.length ?? 0;
  //     const nextPage = Math.floor(currentLength / RECORDS_PER_PAGE) + 1;
  //     setIsLoading(true);

  //     bestResult
  //       .fetchMore({
  //         variables: { isTop5: false, page: nextPage },
  //         updateQuery: (prev, { fetchMoreResult }) => {
  //           if (!fetchMoreResult?.fetchBoardsOfBest) return prev;
  //           const next = fetchMoreResult.fetchBoardsOfBest;
  //           if (next.length < RECORDS_PER_PAGE) setHasMore(false);
  //           return {
  //             fetchBoardsOfBest: [...(prev.fetchBoardsOfBest ?? []), ...next],
  //           };
  //         },
  //       })
  //       .finally(() => setIsLoading(false));
  //   } else {
  //     if (!regularResult.data) return;
  //     const currentLength = regularResult.data.fetchBoards.length;
  //     const nextPage = Math.floor(currentLength / RECORDS_PER_PAGE) + 1;
  //     setIsLoading(true);

  //     regularResult
  //       .fetchMore({
  //         variables: { page: nextPage, ...filter },
  //         updateQuery: (prev, { fetchMoreResult }) => {
  //           if (!fetchMoreResult?.fetchBoards) return prev;
  //           const next = fetchMoreResult.fetchBoards ?? [];
  //           if (next.length < RECORDS_PER_PAGE) setHasMore(false);
  //           return {
  //             fetchBoards: [...(prev.fetchBoards ?? []), ...next],
  //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //           } as any;
  //         },
  //       })
  //       .finally(() => setIsLoading(false));
  //   }
  // }, [
  //   isFollowing,
  //   best,
  //   isLoading,
  //   hasMore,
  //   followingResult,
  //   bestResult,
  //   regularResult,
  //   filter,
  // ]);

  // const sentinelRef = useInfiniteScroll({ hasMore, isLoading, onLoadMore });

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

      {/* <div ref={sentinelRef} />
      {isLoading && (
        <div className="p-3 text-muted-foreground">불러오는 중…</div>
      )} */}
    </>
  );
}

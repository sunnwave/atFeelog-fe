import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import { JSX, useCallback, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  useFetchRecords,
  RecordFilterVars,
} from "./hooks/queries/useFetchRecords";
import { useFetchBestRecords } from "../../home/hooks/queries/useFetchBestRecords";
import { useInfiniteScroll } from "@/shared/hooks/ui/useInfiniteScroll";
import RecordFeedCard from "./RecordFeedCard";

const RECORDS_PER_PAGE = 10;

export default function RecordFeed({
  filter = {},
  best = false,
}: {
  filter?: RecordFilterVars;
  best?: boolean;
}): JSX.Element {
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // filter 변경 시 페이지네이션 리셋
  const filterKey = `${best ? "best" : ""}|${filter.search ?? ""}|${filter.startDate ?? ""}|${filter.endDate ?? ""}`;
  const [lastFilterKey, setLastFilterKey] = useState(filterKey);
  if (lastFilterKey !== filterKey) {
    setLastFilterKey(filterKey);
    setHasMore(true);
    setIsLoading(false);
  }

  // 두 훅 모두 항상 호출 (조건부 훅 금지) — 사용하지 않는 쪽은 skip됨
  const regularResult = useFetchRecords(best ? undefined : filter);
  const bestResult = useFetchBestRecords({ isTop5: false });

  const records = best ? bestResult.records : regularResult.records;

  const isEmpty = records.length === 0;

  const onLoadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    if (best) {
      const currentLength = bestResult.data?.fetchBoardsOfBest?.length ?? 0;
      const nextPage = Math.floor(currentLength / RECORDS_PER_PAGE) + 1;
      setIsLoading(true);

      bestResult
        .fetchMore({
          variables: { isTop5: false, page: nextPage },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult?.fetchBoardsOfBest) return prev;
            const next = fetchMoreResult.fetchBoardsOfBest;
            if (next.length < RECORDS_PER_PAGE) setHasMore(false);
            return {
              fetchBoardsOfBest: [...(prev.fetchBoardsOfBest ?? []), ...next],
            };
          },
        })
        .finally(() => setIsLoading(false));
    } else {
      if (!regularResult.data) return;
      const currentLength = regularResult.data.fetchBoards.length;
      const nextPage = Math.floor(currentLength / RECORDS_PER_PAGE) + 1;
      setIsLoading(true);

      regularResult
        .fetchMore({
          variables: { page: nextPage, ...filter },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult?.fetchBoards) return prev;
            const next = fetchMoreResult.fetchBoards ?? [];
            if (next.length < RECORDS_PER_PAGE) setHasMore(false);
            return {
              fetchBoards: [...(prev.fetchBoards ?? []), ...next],
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any;
          },
        })
        .finally(() => setIsLoading(false));
    }
  }, [best, isLoading, hasMore, bestResult, regularResult, filter]);

  const sentinelRef = useInfiniteScroll({ hasMore, isLoading, onLoadMore });

  if (isEmpty) {
    return (
      <ResponsiveLayout contentType="app" className="pt-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className="w-8 h-8" />
          <span>첫 공연의 여운을 남겨보세요</span>
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout contentType="app">
      {/* mobile: 단일 열 */}
      <div className="flex flex-col gap-3 md:hidden">
        {records.map((record) => (
          <RecordFeedCard key={record.id} record={record} />
        ))}
      </div>

      {/* desktop: 행 우선 2열 (짝수 인덱스 → 왼쪽, 홀수 인덱스 → 오른쪽) */}
      <div className="hidden md:flex gap-3">
        <div className="flex-1 flex flex-col gap-3">
          {records
            .filter((_, i) => i % 2 === 0)
            .map((record) => (
              <RecordFeedCard key={record.id} record={record} />
            ))}
        </div>
        <div className="flex-1 flex flex-col gap-3">
          {records
            .filter((_, i) => i % 2 === 1)
            .map((record) => (
              <RecordFeedCard key={record.id} record={record} />
            ))}
        </div>
      </div>

      <div ref={sentinelRef} className="h-6" />
      {isLoading && (
        <div className="p-3 text-muted-foreground">불러오는 중…</div>
      )}
    </ResponsiveLayout>
  );
}

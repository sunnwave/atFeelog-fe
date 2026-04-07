import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import { JSX, useCallback, useState } from "react";
import RecordFeedCard from "./RecordCard/RecordCard";
import { Sparkles } from "lucide-react";
import ResponsiveGrid from "@/components/commons/layout/ResponsiveGrid";
import { useBreakpoint } from "@/shared/hooks/ui/useBreakpoint";
import { useFetchRecords } from "./hooks/queries/useFetchRecords";
import { useInfiniteScroll } from "@/shared/hooks/ui/useInfiniteScroll";
import { CARD_SIZE_BY_BP } from "@/shared/tokens";

const RECORDS_PER_PAGE = 10;

export default function RecordFeed(): JSX.Element {
  const bp = useBreakpoint();
  const cardSize = CARD_SIZE_BY_BP[bp];

  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: search 적용, URL query 적용
  const { data, fetchMore } = useFetchRecords();

  const records = data?.fetchBoards ?? [];
  const isEmpty = records.length === 0;

  const onLoadMore = useCallback(() => {
    if (!data || isLoading || !hasMore) return;
    setIsLoading(true);

    const currentLength = data.fetchBoards.length;
    const nextPage = Math.floor(currentLength / RECORDS_PER_PAGE) + 1;

    fetchMore({
      variables: { page: nextPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchBoards) return prev;
        const newRecords = fetchMoreResult.fetchBoards ?? [];

        if (newRecords.length < RECORDS_PER_PAGE) setHasMore(false);

        return {
          fetchBoards: [...(prev.fetchBoards ?? []), ...newRecords],
        };
      },
    }).finally(() => {
      setIsLoading(false);
    });
  }, [data, fetchMore, isLoading, hasMore]);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore,
  });

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
    <ResponsiveLayout contentType="app" className="py-4">
      <ResponsiveGrid colsMobile={1} colsTablet={2} colsDesktop={3} gap={3}>
        {records?.map((board) => (
          <RecordFeedCard key={board._id} board={board} size={cardSize} />
        ))}
      </ResponsiveGrid>

      <div ref={sentinelRef} className="h-6" />
      {isLoading && (
        <div className="p-3 text-muted-foreground">불러오는 중…</div>
      )}
    </ResponsiveLayout>
  );
}

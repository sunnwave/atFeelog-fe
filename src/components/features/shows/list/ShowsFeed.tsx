import { useFetchShows } from "./hooks/useFetchShows";
import { ShowFilters } from "./type/type";
import { ShowCard } from "@/components/commons/card";
import ResponsiveGrid from "@/components/commons/layout/ResponsiveGrid";
import {
  CardGridSkeleton,
  EmptyState,
  LoadingIndicator,
} from "@/components/ui/feedback";
import { useInfiniteScroll } from "@/shared/hooks/ui/useInfiniteScroll";
import { useRetry } from "@/shared/hooks/ui/useRetry";
import { Button } from "@/components/ui/button/Button";
import { EMPTY_MESSAGES, ERROR_MESSAGES } from "@/shared/constants/messages";

export default function ShowsFeed({ filter }: { filter: ShowFilters }) {
  const {
    items,
    loading,
    isFetchingNextPage,
    error,
    hasMore,
    loadMore,
    refetch,
  } = useFetchShows(filter);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading: isFetchingNextPage,
    onLoadMore: loadMore,
  });

  const { handleRetry, isRetrying } = useRetry(refetch);

  if ((loading && items.length === 0) || isRetrying)
    return <CardGridSkeleton showMeta />;

  if (error)
    return (
      <EmptyState {...ERROR_MESSAGES.show.feed}>
        <Button variant="outline" size="sm" onClick={handleRetry}>
          다시 시도하기
        </Button>
      </EmptyState>
    );

  if (!loading && items.length === 0)
    return <EmptyState {...EMPTY_MESSAGES.show.feed} />;

  return (
    <>
      <ResponsiveGrid cols={2} colsMd={3} colsLg={4} bordered>
        {items.map((show) => (
          <ShowCard key={show.mt20id} performance={show} showBorder showMeta />
        ))}
      </ResponsiveGrid>

      <div ref={sentinelRef} className="h-1" />
      {isFetchingNextPage && (
        <LoadingIndicator label="더 많은 공연을 불러오고 있어요" />
      )}
    </>
  );
}

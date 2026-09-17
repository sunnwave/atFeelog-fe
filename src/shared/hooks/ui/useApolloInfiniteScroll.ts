import { useState } from "react";
import { useCallback } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";

type FetchMoreFn = (options: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateQuery: (prev: any, options: { fetchMoreResult: any }) => any;
}) => Promise<unknown>;

type UseApolloInfiniteScrollOptions<TData> = {
  data: TData | undefined;
  fetchMore: FetchMoreFn;
  getLength: (data: TData) => number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mergeResult: (prev: any, next: any) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: Record<string, any>;
  filterKey: string;
  perPage?: number;
};

export function useApolloInfiniteScroll<TData>({
  data,
  fetchMore,
  getLength,
  mergeResult,
  variables = {},
  filterKey,
  perPage = 10,
}: UseApolloInfiniteScrollOptions<TData>) {
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFilterKey, setLastFilterKey] = useState(filterKey);

  if (lastFilterKey !== filterKey) {
    setLastFilterKey(filterKey);
    setHasMore(true);
    setIsLoading(false);
  }

  const onLoadMore = useCallback(() => {
    if (isLoading || !hasMore || !data) return;
    const currentLength = getLength(data);
    const nextPage = Math.floor(currentLength / perPage) + 1;
    setIsLoading(true);
    fetchMore({
      variables: { page: nextPage, ...variables },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const merged = mergeResult(prev, fetchMoreResult);
        if (getLength(fetchMoreResult) < perPage) setHasMore(false);
        return merged;
      },
    }).finally(() => setIsLoading(false));
  }, [
    isLoading,
    hasMore,
    data,
    fetchMore,
    getLength,
    mergeResult,
    variables,
    perPage,
  ]);

  const sentinelRef = useInfiniteScroll({ hasMore, isLoading, onLoadMore });

  return { sentinelRef, isLoading };
}

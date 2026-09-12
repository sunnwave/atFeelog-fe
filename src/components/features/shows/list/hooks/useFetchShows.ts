import { useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { PerformanceSearchApiResponse } from "@/shared/types/performance";
import { queryKeys } from "@/api/rest/queryKeys";
import { toShowApiParams } from "@/api/adapters/kopis.adapter";
import { ShowFilters } from "../type/type";

const ROWS = 20;

async function fetchShows(
  filters: ShowFilters,
  page: number,
): Promise<PerformanceSearchApiResponse> {
  const params = new URLSearchParams({
    page: String(page),
    rows: String(ROWS),
  });

  const apiParams = toShowApiParams(filters);
  Object.entries(apiParams).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const res = await fetch(`/api/kopis/shows?${params.toString()}`);
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json() as Promise<PerformanceSearchApiResponse>;
}

export function useFetchShows(filters: ShowFilters) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: queryKeys.kopis.performances({ ...filters, rows: ROWS }),
    queryFn: ({ pageParam }) => fetchShows(filters, pageParam),
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.isEnd ? undefined : lastPageParam + 1,
    initialPageParam: 1,
  });

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  const loadMore = useCallback(() => {
    if (isFetchingNextPage || !hasNextPage) return;
    void fetchNextPage();
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return {
    items,
    loading: isLoading,
    isFetchingNextPage,
    error: error ? "공연 목록을 불러오지 못했어요." : null,
    hasMore: hasNextPage ?? false,
    loadMore,
    refetch,
  };
}

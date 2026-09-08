import { useCallback, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { PerformanceSearchApiResponse } from "@/shared/types/performance";
import { queryKeys } from "@/api/rest/queryKeys";
import { DEFAULT_FILTERS, ShowFilters } from "../type/type";

const ROWS = 20;

async function fetchShows(
  filters: ShowFilters,
  page: number,
): Promise<PerformanceSearchApiResponse> {
  const params = new URLSearchParams({
    page: String(page),
    rows: String(ROWS),
  });
  if (filters.q) params.set("q", filters.q);
  if (filters.genre) params.set("genre", filters.genre);
  if (filters.status) params.set("status", filters.status);
  if (filters.area) params.set("area", filters.area);
  if (filters.stdate) params.set("stdate", filters.stdate);
  if (filters.eddate) params.set("eddate", filters.eddate);

  const res = await fetch(`/api/kopis/shows?${params.toString()}`);
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json() as Promise<PerformanceSearchApiResponse>;
}

export function useFetchShows() {
  const [filters, setFilters] = useState<ShowFilters>(DEFAULT_FILTERS);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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

  const setFilter = useCallback(
    <K extends keyof ShowFilters>(key: K, value: ShowFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const applySearch = useCallback(
    (q: string, stdate: string, eddate: string) => {
      setFilters((prev) => ({
        ...prev,
        q,
        stdate,
        eddate,
        status: q ? "" : prev.status,
      }));
    },
    [],
  );

  const reset = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  return {
    filters,
    items,
    loading: isLoading,
    error: error ? "공연 목록을 불러오지 못했어요." : null,
    hasMore: hasNextPage ?? false,
    setFilter,
    applySearch,
    loadMore,
    reset,
  };
}

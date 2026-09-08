import { useCallback, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { PerformanceSearchApiResponse } from "@/shared/types/performance";
import { queryKeys } from "@/api/rest/queryKeys";

async function searchPerformances(
  q: string,
  page: number,
  rows: number,
): Promise<PerformanceSearchApiResponse> {
  const params = new URLSearchParams({
    q,
    page: String(page),
    rows: String(rows),
  });
  const res = await fetch(`/api/kopis/performances?${params.toString()}`);
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body?.message ?? "검색 실패");
  }
  return res.json() as Promise<PerformanceSearchApiResponse>;
}

export function useSearchPerformances({ rows = 10 }: { rows?: number } = {}) {
  const [query, setQuery] = useState(""); // 입력값
  const [searchQuery, setSearchQuery] = useState(""); // 실제 검색어 (search() 클릭 시 업데이트)
  const [hasSearched, setHasSearched] = useState(false);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: queryKeys.kopis.performances({ q: searchQuery, rows }),
    queryFn: ({ pageParam }) =>
      searchPerformances(searchQuery, pageParam, rows),
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.isEnd ? undefined : lastPageParam + 1,
    initialPageParam: 1,
    enabled: !!searchQuery,
  });

  const items = data?.pages.flatMap((page) => page.items) ?? [];
  const loading = isLoading || isFetchingNextPage;

  const search = useCallback(() => {
    if (!query.trim()) return;
    setSearchQuery(query.trim());
    setHasSearched(true);
  }, [query]);

  const loadMore = useCallback(() => {
    if (isFetchingNextPage || !hasNextPage) return;
    void fetchNextPage();
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const reset = useCallback(() => {
    setQuery("");
    setSearchQuery("");
    setHasSearched(false);
  }, []);

  const isEmpty = hasSearched && !loading && !error && items.length === 0;

  return {
    query,
    setQuery,
    items,
    loading,
    error: error instanceof Error ? error.message : null,
    hasMore: hasNextPage ?? false,
    hasSearched,
    isEmpty,
    search,
    loadMore,
    reset,
  };
}

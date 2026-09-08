import { queryKeys } from "@/api/rest/queryKeys";
import { KakaoSearchResponse } from "@/shared/types/kakao";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

async function searchKakaoPlaces(
  q: string,
  page: number,
  size: number,
): Promise<KakaoSearchResponse> {
  const params = new URLSearchParams({
    q,
    page: String(page),
    size: String(size),
  });

  const res = await fetch(`/api/kakao/places?${params.toString()}`);
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body?.message ?? "검색 실패");
  }
  return res.json() as Promise<KakaoSearchResponse>;
}

export function useSearchKakaoPlace({ size = 10 }: { size?: number } = {}) {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 실제 검색어 (search() 클릭 시 업데이트)
  const [hasSearched, setHasSearched] = useState(false); // ✅ 검색 상태 구분용

  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: queryKeys.kakao.places(searchQuery),
    queryFn: ({ pageParam }) => searchKakaoPlaces(searchQuery, pageParam, size),
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.meta?.is_end ? undefined : lastPageParam + 1,
    initialPageParam: 1,
    enabled: !!searchQuery,
  });

  const items = data?.pages.flatMap((page) => page.documents) ?? [];
  const totalCount = data?.pages[0]?.meta?.total_count ?? null;

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
    totalCount,

    hasSearched,
    isEmpty,
    search,
    loadMore,
    reset,
  };
}

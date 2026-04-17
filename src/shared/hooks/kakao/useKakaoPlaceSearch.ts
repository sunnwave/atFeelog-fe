"use client";

import { KakaoPlace, KakaoSearchResponse } from "@/shared/types/kakao";
import { useCallback, useState } from "react";

export function useKakaoPlaceSearch({ size = 10 }: { size?: number } = {}) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<KakaoPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ 검색 상태 구분용
  const [hasSearched, setHasSearched] = useState(false);

  // ✅ 페이징/결과 유무 판단용
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const runFetch = useCallback(
    async (nextPage: number, mode: "replace" | "append") => {
      const q = query.trim();
      if (!q) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/kakao/places?q=${encodeURIComponent(
            q
          )}&size=${size}&page=${nextPage}`
        );

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message ?? "검색 실패");
        }

        const data = (await res.json()) as KakaoSearchResponse;

        const docs = data?.documents ?? [];
        const meta = data?.meta;

        setTotalCount(
          typeof meta?.total_count === "number" ? meta.total_count : null
        );
        setHasMore(meta ? !meta.is_end : docs.length >= size);

        setItems((prev) => (mode === "append" ? [...prev, ...docs] : docs));
        setPage(nextPage);
      } catch (e) {
        setError(e instanceof Error ? e.message : "검색 실패");
        if (mode === "replace") {
          setItems([]);
          setHasMore(false);
          setTotalCount(0);
        }
      } finally {
        setLoading(false);
      }
    },
    [query, size]
  );

  // ✅ 새 검색(1페이지부터)
  const search = useCallback(async () => {
    const q = query.trim();
    if (!q) return;
    setHasSearched(true);
    await runFetch(1, "replace");
  }, [query, runFetch]);

  // ✅ 더 불러오기
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    await runFetch(page + 1, "append");
  }, [loading, hasMore, page, runFetch]);

  // ✅ 상태 초기화
  const reset = useCallback(() => {
    setQuery("");
    setItems([]);
    setLoading(false);
    setError(null);
    setHasSearched(false);
    setPage(1);
    setHasMore(false);
    setTotalCount(null);
  }, []);

  // ✅ “검색 결과 없음” 판단 (검색을 한 뒤에만)
  const isEmpty = hasSearched && !loading && !error && items.length === 0;

  return {
    query,
    setQuery,

    items,
    loading,
    error,

    hasMore,
    totalCount,

    hasSearched,
    isEmpty,

    search,
    loadMore,
    reset,
  };
}

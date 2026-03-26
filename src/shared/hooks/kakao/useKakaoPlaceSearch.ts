"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type KakaoPlace = {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
};

export type KakaoSearchResponse = {
  documents: KakaoPlace[];
  meta: { is_end: boolean; total_count: number; pageable_count: number };
};

export function useKakaoPlaceSearch(opts?: { size?: number }) {
  const size = opts?.size ?? 10;

  const [query, setQuery] = useState("");
  const [items, setItems] = useState<KakaoPlace[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const request = useCallback(
    async (q: string, nextPage: number, mode: "reset" | "append") => {
      const keyword = q.trim();
      if (!keyword) return;

      // 이전 요청 취소
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/kakao/places?q=${encodeURIComponent(
            keyword
          )}&page=${nextPage}&size=${size}`,
          { signal: ac.signal }
        );

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message ?? "검색 실패");
        }

        const data = (await res.json()) as KakaoSearchResponse;
        const docs = data.documents ?? [];

        setItems((prev) => (mode === "reset" ? docs : [...prev, ...docs]));
        setHasMore(!data?.meta?.is_end);
        setPage(nextPage);
      } catch (e) {
        // abort는 에러로 취급 X
        if (e instanceof DOMException && e.name === "AbortError") return;

        setError(e instanceof Error ? e.message : "검색 실패");
        if (mode === "reset") setItems([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [size]
  );

  const search = useCallback(async () => {
    setItems([]);
    setHasMore(false);
    setPage(1);
    await request(query, 1, "reset");
  }, [query, request]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    await request(query, page + 1, "append");
  }, [hasMore, loading, page, query, request]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;

    setQuery("");
    setItems([]);
    setPage(1);
    setHasMore(false);
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);
  return {
    query,
    setQuery,

    items,
    loading,
    error,
    hasMore,
    page,

    search,
    loadMore,
    reset,
  };
}

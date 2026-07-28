"use client";

import { useCallback, useState } from "react";
import type {
  Performance,
  PerformanceSearchApiResponse,
} from "@/shared/types/performance";

export function useKopisPerformanceSearch({ rows = 10 }: { rows?: number } = {}) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Performance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const runFetch = useCallback(
    async (nextPage: number, mode: "replace" | "append") => {
      const q = query.trim();
      if (!q) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/kopis/performances?q=${encodeURIComponent(q)}&page=${nextPage}&rows=${rows}`
        );

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message ?? "검색 실패");
        }

        const data = (await res.json()) as PerformanceSearchApiResponse;

        setHasMore(!data.isEnd);
        setItems((prev) => (mode === "append" ? [...prev, ...data.items] : data.items));
        setPage(nextPage);
      } catch (e) {
        setError(e instanceof Error ? e.message : "검색 실패");
        if (mode === "replace") {
          setItems([]);
          setHasMore(false);
        }
      } finally {
        setLoading(false);
      }
    },
    [query, rows]
  );

  const search = useCallback(async () => {
    if (!query.trim()) return;
    setHasSearched(true);
    await runFetch(1, "replace");
  }, [query, runFetch]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    await runFetch(page + 1, "append");
  }, [loading, hasMore, page, runFetch]);

  const reset = useCallback(() => {
    setQuery("");
    setItems([]);
    setLoading(false);
    setError(null);
    setHasSearched(false);
    setPage(1);
    setHasMore(false);
  }, []);

  const isEmpty = hasSearched && !loading && !error && items.length === 0;

  return {
    query,
    setQuery,

    items,
    loading,
    error,

    hasMore,

    hasSearched,
    isEmpty,

    search,
    loadMore,
    reset,
  };
}

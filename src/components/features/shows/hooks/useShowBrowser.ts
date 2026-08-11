import { useCallback, useEffect, useRef, useState } from "react";
import type { Performance, PerformanceSearchApiResponse } from "@/shared/types/performance";
import type { ShowGenreShcate, ShowPrfstate, ShowSigngucode } from "@/shared/constants/kopis";

export type ShowFilters = {
  q: string;
  genre: ShowGenreShcate;
  status: ShowPrfstate;
  area: ShowSigngucode;
  stdate: string; // "YYYY-MM-DD"
  eddate: string; // "YYYY-MM-DD"
};

const DEFAULT_FILTERS: ShowFilters = {
  q: "",
  genre: "",
  status: "01", // 기본: 공연예정
  area: "",
  stdate: "",
  eddate: "",
};

const ROWS = 20;

export function useShowBrowser() {
  const [filters, setFilters] = useState<ShowFilters>(DEFAULT_FILTERS);
  const [items, setItems] = useState<Performance[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 필터가 바뀔 때 1페이지부터 재조회하기 위해 ref로 추적
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const fetchPage = useCallback(async (nextPage: number, mode: "replace" | "append") => {
    setLoading(true);
    setError(null);
    try {
      const f = filtersRef.current;
      const params = new URLSearchParams({ page: String(nextPage), rows: String(ROWS) });
      if (f.q) params.set("q", f.q);
      if (f.genre) params.set("genre", f.genre);
      if (f.status) params.set("status", f.status);
      if (f.area) params.set("area", f.area);
      if (f.stdate) params.set("stdate", f.stdate);
      if (f.eddate) params.set("eddate", f.eddate);

      const res = await fetch(`/api/kopis/shows?${params.toString()}`);
      if (!res.ok) throw new Error(`${res.status}`);

      const data = (await res.json()) as PerformanceSearchApiResponse;
      setHasMore(!data.isEnd);
      setItems((prev) => (mode === "append" ? [...prev, ...data.items] : data.items));
      setPage(nextPage);
    } catch {
      setError("공연 목록을 불러오지 못했어요.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 필터 변경 시 1페이지부터 재조회
  useEffect(() => {
    void fetchPage(1, "replace");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    void fetchPage(page + 1, "append");
  }, [loading, hasMore, page, fetchPage]);

  const setFilter = useCallback(<K extends keyof ShowFilters>(key: K, value: ShowFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const applySearch = useCallback((q: string, stdate: string, eddate: string) => {
    setFilters((prev) => ({ ...prev, q, stdate, eddate, status: q ? "" : prev.status }));
  }, []);

  const reset = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  return {
    filters,
    items,
    loading,
    error,
    hasMore,
    setFilter,
    applySearch,
    loadMore,
    reset,
  };
}

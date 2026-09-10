import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { localDateToRfc3339NoonUtc } from "@/shared/utils";
import { FeedMode, SortMode } from "../types";

export function useRecordFeedFilters() {
  const router = useRouter();

  const sortMode = ((router.query.sort as SortMode) ?? "latest") as SortMode;
  const feedMode = ((router.query.feed as FeedMode) ?? "all") as FeedMode;
  // search는 로컬 state로 관리 — 검색 버튼 클릭 시에만 URL 업데이트
  const [searchInput, setSearchInput] = useState(
    (router.query.search as string) ?? "",
  );
  const startDate = (router.query.startDate as string) ?? "";
  const endDate = (router.query.endDate as string) ?? "";

  const updateQuery = useCallback(
    (patch: Record<string, string | undefined>) => {
      const next = { ...router.query };
      Object.entries(patch).forEach(([k, v]) => {
        if (v === undefined || v === "") {
          delete next[k];
        } else {
          next[k] = v;
        }
      });
      router.replace({ pathname: router.pathname, query: next }, undefined, {
        shallow: true,
      });
    },
    [router],
  );

  const setSortMode = useCallback(
    (mode: SortMode) => updateQuery({ sort: mode }),
    [updateQuery],
  );

  const setFeedMode = useCallback(
    (mode: FeedMode) =>
      updateQuery({ feed: mode === "all" ? undefined : mode }),
    [updateQuery],
  );

  const setSearch = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const submitSearch = useCallback(() => {
    updateQuery({ search: searchInput || undefined });
  }, [searchInput, updateQuery]);

  const setStartDate = useCallback(
    (value: string) => updateQuery({ startDate: value || undefined }),
    [updateQuery],
  );

  const setEndDate = useCallback(
    (value: string) => updateQuery({ endDate: value || undefined }),
    [updateQuery],
  );

  const filter = {
    search: (router.query.search as string) || undefined,
    startDate: startDate ? localDateToRfc3339NoonUtc(startDate) : undefined,
    endDate: endDate ? localDateToRfc3339NoonUtc(endDate) : undefined,
    sort: sortMode,
  };

  return {
    sortMode,
    feedMode,
    search: searchInput,
    startDate,
    endDate,
    filter,
    setSortMode,
    setFeedMode,
    setSearch,
    submitSearch,
    setStartDate,
    setEndDate,
  };
}

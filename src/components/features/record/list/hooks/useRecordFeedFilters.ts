import { useRouter } from "next/router";
import { useCallback } from "react";
import { localDateToRfc3339NoonUtc } from "@/shared/utils";
import { FeedMode, SortMode } from "../types";
import { useSearch } from "@/components/commons/search/useSearch";
import { useQueryUpdate } from "@/shared/hooks/ui/useQueryUpdate";

export function useRecordFeedFilters() {
  const router = useRouter();
  const updateQuery = useQueryUpdate();

  const sortMode = ((router.query.sort as SortMode) ?? "latest") as SortMode;
  const feedMode = ((router.query.feed as FeedMode) ?? "all") as FeedMode;

  const { search, setSearch, startDate, setStartDate, endDate, setEndDate, submit: submitSearch, reset: resetSearch } = useSearch({
    initValue: {
      search: (router.query.search as string) ?? "",
      startDate: (router.query.startDate as string) ?? "",
      endDate: (router.query.endDate as string) ?? "",
    },
    onCommit: ({ search, startDate, endDate }) =>
      updateQuery({
        search: search || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      }),
  });

  const setSortMode = useCallback(
    (mode: SortMode) => updateQuery({ sort: mode }),
    [updateQuery],
  );

  const setFeedMode = useCallback(
    (mode: FeedMode) =>
      updateQuery({ feed: mode === "all" ? undefined : mode }),
    [updateQuery],
  );

  const filter = {
    search: (router.query.search as string) || undefined,
    startDate: (router.query.startDate as string)
      ? localDateToRfc3339NoonUtc(router.query.startDate as string)
      : undefined,
    endDate: (router.query.endDate as string)
      ? localDateToRfc3339NoonUtc(router.query.endDate as string)
      : undefined,
    sort: sortMode,
  };

  return {
    sortMode,
    feedMode,
    search,
    startDate,
    endDate,
    filter,
    setSortMode,
    setFeedMode,
    setSearch,
    setStartDate,
    setEndDate,
    submitSearch,
    resetSearch,
  };
}

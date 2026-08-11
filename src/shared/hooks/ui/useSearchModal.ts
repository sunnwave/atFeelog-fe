"use client";

import { useCallback, useEffect, useRef } from "react";
import { useDebounce } from "./useDebounce";

export function useSearchModal({
  query,
  search,
  reset,
  open,
}: {
  query: string;
  search: () => void | Promise<void>;
  reset: () => void;
  open: boolean;
}) {
  const debouncedQuery = useDebounce(query, 400);
  const searchRef = useRef(search);
  useEffect(() => { searchRef.current = search; }, [search]);
  useEffect(() => {
    if (debouncedQuery.trim()) void searchRef.current();
  }, [debouncedQuery]);

  const onSubmitSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      search();
    },
    [search]
  );

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return { onSubmitSearch };
}
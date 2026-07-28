"use client";

import { Clapperboard } from "lucide-react";
import { useKopisPerformanceSearch } from "@/shared/hooks/kopis/useKopisPerformanceSearch";
import { useInfiniteScroll } from "@/shared/hooks/ui/useInfiniteScroll";
import { useSearchModal } from "@/shared/hooks/ui/useSearchModal";
import SearchModalShell from "../searchModal/SearchModalShell";
import type { Performance } from "@/shared/types/performance";
import PerformanceItem from "./PerformanceItem";

export default function PerformanceSearchModal({
  open,
  onOpenChange,
  onConfirm,
  className,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: (performance: Performance) => void;
  className?: string;
}) {
  const {
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
  } = useKopisPerformanceSearch({ rows: 10 });

  const { onSubmitSearch } = useSearchModal({ query, search, reset, open });

  const targetRef = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    onLoadMore: loadMore,
  });

  return (
    <SearchModalShell
      open={open}
      onOpenChange={onOpenChange}
      title="공연 검색"
      icon={<Clapperboard className="w-5 h-5 text-point-indigo" />}
      placeholder="예) 지킬앤하이드, 베르테르"
      query={query}
      onQueryChange={setQuery}
      onSubmit={onSubmitSearch}
      loading={loading}
      error={error}
      hasSearched={hasSearched}
      isEmpty={isEmpty}
      hasMore={hasMore}
      sentinel={<div ref={targetRef} className="h-6" />}
      emptyHint="공연명을 입력해 검색하세요."
      className={className}
    >
      {items.map((p) => (
        <PerformanceItem
          key={p.mt20id}
          performance={p}
          onConfirm={onConfirm}
          onOpenChange={onOpenChange}
        />
      ))}
    </SearchModalShell>
  );
}

"use client";

import { MapPin } from "lucide-react";
import { useKakaoPlaceSearch } from "@/shared/hooks/kakao/useKakaoPlaceSearch";
import { useInfiniteScroll } from "@/shared/hooks/ui/useInfiniteScroll";
import { useSearchModal } from "@/shared/hooks/ui/useSearchModal";
import SearchModalShell from "../searchModal/SearchModalShell";
import PlaceItem from "./PlaceItem";
import type { KakaoPlace } from "@/shared/types/kakao";

export default function PlaceSearchModal({
  open,
  onOpenChange,
  onConfirm,
  className,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: (place: KakaoPlace) => void;
  className?: string;
}) {
  const {
    query, setQuery, items, loading, error,
    hasMore, hasSearched, isEmpty, search, loadMore, reset,
  } = useKakaoPlaceSearch({ size: 10 });

  const { onSubmitSearch } = useSearchModal({ query, search, reset, open });

  const targetRef = useInfiniteScroll({ hasMore, isLoading: loading, onLoadMore: loadMore });

  return (
    <SearchModalShell
      open={open}
      onOpenChange={onOpenChange}
      title="공연 장소 검색"
      icon={<MapPin className="w-5 h-5 text-point-indigo" />}
      placeholder="예) 올림픽공원 체조경기장"
      query={query}
      onQueryChange={setQuery}
      onSubmit={onSubmitSearch}
      loading={loading}
      error={error}
      hasSearched={hasSearched}
      isEmpty={isEmpty}
      hasMore={hasMore}
      sentinel={<div ref={targetRef} className="h-6" />}
      emptyHint="검색어를 입력하고 장소를 찾아보세요."
      className={className}
    >
      {items.map((p) => (
        <PlaceItem key={p.id} place={p} onConfirm={onConfirm} onOpenChange={onOpenChange} />
      ))}
    </SearchModalShell>
  );
}
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/shared/utils";
import { MapPin, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { useKakaoPlaceSearch } from "@/shared/hooks/kakao/useKakaoPlaceSearch";
import { useInfiniteScroll } from "@/shared/hooks/ui/useInfiniteScroll";
import PlaceItem from "./PlaceItem";
import PlaceMessage from "./PlaceMessage";
import { useCallback, useEffect, useRef } from "react";
import { useDebounce } from "@/shared/hooks/ui/useDebounce";
import { KakaoPlace } from "@/shared/types/kakao";

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
  } = useKakaoPlaceSearch({ size: 10 });

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

  const targetRef = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    onLoadMore: loadMore,
  });

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />

        <div className="fixed inset-0 z-[60] flex items-end sm:items-center sm:justify-center p-0 sm:p-4">
          <Dialog.Content
            aria-describedby={undefined}
            className={cn(
              "w-full bg-background shadow-2xl flex flex-col",
              "rounded-t-3xl max-h-[85vh]",
              "sm:max-w-lg sm:rounded-3xl sm:max-h-[80vh]",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-point-indigo" />
                <Dialog.Title className="text-lg font-bold">공연 장소 검색</Dialog.Title>
              </div>
              <Dialog.Close asChild>
                <Button
                  variant="ghost"
                  type="button"
                  size="icon"
                  aria-label="닫기"
                >
                  <X className="w-5 h-5" />
                </Button>
              </Dialog.Close>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-4 border-b border-border">
              <form onSubmit={onSubmitSearch} className="flex gap-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="예) 올림픽공원 체조경기장"
                  className="flex-1 h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Button type="submit" variant="indigo" className="h-11">
                  <Search className="w-4 h-4" />
                  검색
                </Button>
              </form>

              {error ? (
                <p className="mt-2 text-xs text-destructive">{error}</p>
              ) : null}
              {loading ? (
                <p className="mt-2 text-xs text-muted-foreground">검색 중…</p>
              ) : null}
            </div>

            {/* Results */}

            <div className="px-2 py-2 overflow-y-auto">
              {/* ✅ 검색 전 */}
              {!hasSearched && !loading ? (
                <PlaceMessage>
                  검색어를 입력하고 장소를 찾아보세요.
                </PlaceMessage>
              ) : null}

              {/* ✅ 검색했는데 결과 0 */}
              {isEmpty && (
                <PlaceMessage>
                  검색 결과가 없어요. 다른 키워드로 검색해보세요.
                </PlaceMessage>
              )}

              {/* ✅ 결과 있음 */}
              {!isEmpty && items.length > 0 ? (
                <ul className="space-y-2 px-4 pb-4">
                  {items.map((p) => (
                    <PlaceItem
                      key={p.id}
                      place={p}
                      onConfirm={onConfirm}
                      onOpenChange={onOpenChange}
                    />
                  ))}

                  {/* sentinel */}
                  <li>
                    {hasMore && <div ref={targetRef} className="h-6"></div>}
                    {loading && <PlaceMessage>불러오는 중...</PlaceMessage>}
                    {!hasMore && !loading && items.length > 0 && (
                      <PlaceMessage>마지막 결과입니다.</PlaceMessage>
                    )}
                  </li>
                </ul>
              ) : null}
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

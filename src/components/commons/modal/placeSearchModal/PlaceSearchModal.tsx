"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/shared/utils";
import { MapPin, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import {
  KakaoPlace,
  useKakaoPlaceSearch,
} from "@/shared/hooks/kakao/useKakaoPlaceSearch";
import { useInfiniteScroll } from "@/shared/hooks/ui/useInfiniteScroll";

export default function PlaceSearchModal({
  open,
  onOpenChange,
  closeOnOverlayClick = true,
  onConfirm,
  className,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  closeOnOverlayClick?: boolean;
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
    search,
    loadMore,
    reset,
  } = useKakaoPlaceSearch({ size: 10 });

  // ✅ (중요) form submit 핸들러 정의
  const onSubmitSearch = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      search(); // 내부에서 query.trim() 체크하도록 훅에서 처리하는 게 베스트
    },
    [search]
  );

  // ✅ (중요) loadMore는 안정적인 함수여야 함(훅에서 useCallback 처리 권장)
  const targetRef = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    onLoadMore: loadMore,
  });

  React.useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-black/50"
          onPointerDown={(e) => {
            if (!closeOnOverlayClick) e.preventDefault();
          }}
        />

        <div className="fixed inset-0 z-[60] flex items-end sm:items-center sm:justify-center p-0 sm:p-4">
          <Dialog.Content
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
                <h2 className="text-lg font-bold">공연 장소 검색</h2>
              </div>
              <Dialog.Close asChild>
                <Button variant="ghost" size="icon" aria-label="닫기">
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
              {items.length === 0 && !loading ? (
                <div className="py-10 text-center text-sm text-muted-foreground">
                  검색어를 입력하고 장소를 찾아보세요.
                </div>
              ) : (
                <ul className="space-y-2 px-4 pb-4">
                  {items.map((p) => (
                    <li key={p.id}>
                      <button
                        className="w-full rounded-2xl border border-border bg-card p-4 text-left hover:bg-muted/40 transition-colors"
                        onClick={() => {
                          onConfirm(p);
                          onOpenChange(false);
                        }}
                      >
                        <div className="font-semibold text-foreground">
                          {p.place_name}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {p.road_address_name || p.address_name}
                        </div>
                      </button>
                    </li>
                  ))}

                  {/* ✅ sentinel: threshold 0.5라서 높이 넉넉히 줘야 안정적 */}
                  <li>
                    <div ref={targetRef} className="h-24" />
                    {loading && (
                      <div className="py-2 text-center text-xs text-muted-foreground">
                        로딩 중…
                      </div>
                    )}
                    {!hasMore && items.length > 0 && (
                      <div className="py-2 text-center text-xs text-muted-foreground">
                        마지막 결과입니다.
                      </div>
                    )}
                  </li>
                </ul>
              )}
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

import { JSX } from "react";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import ResponsiveGrid from "@/components/commons/layout/ResponsiveGrid";
import { useInfiniteScroll } from "@/shared/hooks/ui/useInfiniteScroll";
import ShowCard from "./ShowCard/ShowCard";
import ShowFilterBar from "./ShowFilterBar";
import { ShowFilters, useShowBrowser } from "./hooks/useShowBrowser";

export default function ShowsScreen(): JSX.Element {
  const {
    filters,
    items,
    loading,
    error,
    hasMore,
    setFilter,
    applySearch,
    loadMore,
  } = useShowBrowser();

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    onLoadMore: loadMore,
  });

  return (
    <div className="min-h-screen bg-background">
      <ResponsiveLayout contentType="wide" className="py-6 space-y-6">
        {/* 헤더 */}
        <h1 className="text-2xl font-black tracking-tight">공연 탐색</h1>

        {/* 검색 + 필터 */}
        <ShowFilterBar
          filters={filters}
          onSearch={applySearch}
          onGenreChange={(genre) => setFilter("genre", genre)}
          onStatusChange={(status) =>
            setFilter("status", status as ShowFilters["status"])
          }
          onAreaChange={(area) =>
            setFilter("area", area as ShowFilters["area"])
          }
        />

        {/* 결과 */}
        {error ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            {error}
          </p>
        ) : items.length === 0 && !loading ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            검색 결과가 없어요.
          </p>
        ) : (
          <>
            <ResponsiveGrid cols={2} colsMd={3} colsLg={4} bordered>
              {items.map((p) => (
                <ShowCard key={p.mt20id} performance={p} showBorder showMeta />
              ))}
            </ResponsiveGrid>

            {/* 스켈레톤 (추가 로딩) */}
            {loading && (
              <ResponsiveGrid cols={2} colsMd={3} colsLg={4} bordered>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-r-[1.5px] border-b-[1.5px] border-foreground"
                  >
                    <div className="aspect-3/4 bg-muted animate-pulse" />
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-muted animate-pulse rounded" />
                      <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </ResponsiveGrid>
            )}

            {/* 무한 스크롤 감지 sentinel */}
            <div ref={sentinelRef} className="h-1" />
          </>
        )}
      </ResponsiveLayout>
    </div>
  );
}

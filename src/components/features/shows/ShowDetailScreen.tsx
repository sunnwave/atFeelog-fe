import { JSX, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Sparkles } from "lucide-react";
import PageHeader from "@/components/commons/layout/PageHeader";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import { useFetchRecordsByShow } from "@/components/features/record/list/hooks/queries/useFetchRecordsByShow";
import { useInfiniteScroll } from "@/shared/hooks/ui/useInfiniteScroll";
import type { PerformanceDetail } from "@/shared/types/performance";
import { RecordPosterCard } from "@/components/commons/card";

const RECORDS_PER_PAGE = 10;

type Tab = "info" | "feelog";

interface ShowDetailScreenProps {
  mt20id: string;
  detail: PerformanceDetail | null;
  detailLoading: boolean;
}

export default function ShowDetailScreen({
  mt20id,
  detail,
  detailLoading,
}: ShowDetailScreenProps): JSX.Element {
  const [tab, setTab] = useState<Tab>("info");
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    records,
    data,
    loading: recordsLoading,
    fetchMore,
  } = useFetchRecordsByShow(mt20id);

  const onLoadMore = useCallback(() => {
    if (isLoadingMore || !hasMore || !data) return;
    const currentLength = data.fetchBoardsByMt20id.length;
    const nextPage = Math.floor(currentLength / RECORDS_PER_PAGE) + 1;
    setIsLoadingMore(true);

    fetchMore({
      variables: { mt20id, page: nextPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchBoardsByMt20id) return prev;
        const next = fetchMoreResult.fetchBoardsByMt20id;
        if (next.length < RECORDS_PER_PAGE) setHasMore(false);
        return { fetchBoardsByMt20id: [...prev.fetchBoardsByMt20id, ...next] };
      },
    }).finally(() => setIsLoadingMore(false));
  }, [isLoadingMore, hasMore, data, fetchMore, mt20id]);

  const sentinelRef = useInfiniteScroll({
    hasMore: tab === "feelog" && hasMore,
    isLoading: isLoadingMore,
    onLoadMore,
  });

  return (
    <div className="min-h-screen bg-background">
      <PageHeader label="About Show" fallbackHref="/shows" />
      <ResponsiveLayout contentType="default" className="py-6 space-y-6">
        {/* 공연 헤더 */}
        {detailLoading ? (
          <div className="flex gap-5">
            <div className="w-32 aspect-3/4 bg-muted animate-pulse shrink-0" />
            <div className="flex-1 space-y-3 pt-2">
              <div className="h-5 bg-muted animate-pulse rounded w-1/2" />
              <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
              <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
            </div>
          </div>
        ) : detail ? (
          <div className="flex gap-5">
            <div className="relative w-32 shrink-0 aspect-3/4 border-[1.5px] border-foreground overflow-hidden">
              {detail.posterUrl ? (
                <Image
                  src={detail.posterUrl}
                  alt={detail.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
            </div>
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-xs font-semibold text-point">
                {detail.genre}
              </span>
              <h1 className="text-xl font-black leading-tight">
                {detail.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {detail.venueName}
              </p>
              <p className="text-xs text-muted-foreground">
                {detail.startDate} ~{" "}
                {detail.isOpenRun ? "오픈런" : detail.endDate}
              </p>
              {detail.status && (
                <span className="text-xs font-bold text-foreground/60">
                  {detail.status}
                </span>
              )}
            </div>
          </div>
        ) : null}

        {/* 탭 */}
        <div className="flex border-b-[1.5px] border-foreground">
          {(["info", "feelog"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                "px-5 py-2.5 text-sm font-bold tracking-wide transition-colors",
                tab === t
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {t === "info"
                ? "공연 정보"
                : `필로그 ${records.length > 0 ? `(${records.length})` : ""}`}
            </button>
          ))}
        </div>

        {/* 공연 정보 탭 */}
        {tab === "info" && (
          <div className="space-y-5">
            {detailLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-muted animate-pulse rounded w-full"
                  />
                ))}
              </div>
            ) : detail ? (
              <>
                {[
                  { label: "출연진", value: detail.cast },
                  { label: "런타임", value: detail.runtime },
                  { label: "관람연령", value: detail.ageLimit },
                  { label: "티켓가격", value: detail.ticketPrice },
                  { label: "공연 시간", value: detail.showTime },
                ]
                  .filter((r) => r.value)
                  .map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex gap-4 border-b border-border pb-4"
                    >
                      <span className="text-xs font-black tracking-widest uppercase text-muted-foreground w-20 shrink-0 pt-0.5">
                        {label}
                      </span>
                      <span className="text-sm leading-relaxed">{value}</span>
                    </div>
                  ))}

                {detail.ticketLinks.length > 0 && (
                  <div className="flex gap-2 flex-wrap pt-1">
                    {detail.ticketLinks.map((link) => (
                      <Link
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 border-[1.5px] border-foreground text-xs font-bold hover:bg-foreground hover:text-background transition-colors"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground py-10 text-center">
                공연 정보를 불러올 수 없어요.
              </p>
            )}
          </div>
        )}

        {/* 필로그 탭 */}
        {tab === "feelog" && (
          <div>
            {recordsLoading && records.length === 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-3/4 bg-muted animate-pulse" />
                ))}
              </div>
            ) : records.length === 0 ? (
              <div className="flex items-center gap-2 text-muted-foreground py-10">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm">아직 이 공연의 필로그가 없어요</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {records.map((record) => (
                    <div
                      key={record.id}
                      className="border-[1.5px] border-foreground"
                    >
                      <RecordPosterCard
                        record={record}
                        showMeta
                        showBorder={false}
                      />
                    </div>
                  ))}
                </div>
                <div ref={sentinelRef} className="h-6" />
                {isLoadingMore && (
                  <p className="text-sm text-muted-foreground text-center py-3">
                    불러오는 중…
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </ResponsiveLayout>
    </div>
  );
}

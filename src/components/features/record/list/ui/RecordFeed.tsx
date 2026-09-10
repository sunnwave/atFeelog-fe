import ResponsiveGrid from "@/components/commons/layout/ResponsiveGrid";
import { JSX } from "react";
import { useFetchRecords } from "../hooks/queries/useFetchRecords";
import { useApolloInfiniteScroll } from "@/shared/hooks/ui/useApolloInfiniteScroll";
import { RecordPosterCard } from "@/components/commons/card";
import {
  CardGridSkeleton,
  EmptyState,
  LoadingIndicator,
} from "@/components/ui/feedback";
import { EMPTY_MESSAGES, ERROR_MESSAGES } from "@/shared/constants/messages";
import { Button } from "@/components/ui/button/Button";
import { useRouter } from "next/router";
import { RecordFilterVars, RECORDS_PER_PAGE } from "../types";

export default function RecordFeed({
  filter = {},
}: {
  filter?: RecordFilterVars;
}): JSX.Element {
  const router = useRouter();

  const filterKey = `${filter.search ?? ""}|${filter.startDate ?? ""}|${filter.endDate ?? ""}|${filter.sort ?? ""}`;

  const { records, loading, error, data, fetchMore, refetch } =
    useFetchRecords(filter);

  const { sentinelRef, isLoading } = useApolloInfiniteScroll({
    data,
    fetchMore,
    getLength: (d) => d.fetchBoards.length,
    mergeResult: (prev, next) => ({
      fetchBoards: [...(prev.fetchBoards ?? []), ...(next.fetchBoards ?? [])],
    }),
    variables: filter,
    filterKey,
    perPage: RECORDS_PER_PAGE,
  });

  if (loading && records.length === 0) return <CardGridSkeleton showMeta />;
  if (error)
    return (
      <EmptyState {...ERROR_MESSAGES.record.feed}>
        <Button variant={"outline"} size={"sm"} onClick={() => refetch()}>
          다시 시도하기
        </Button>
      </EmptyState>
    );
  if (!loading && records.length === 0)
    return (
      <EmptyState {...EMPTY_MESSAGES.record.feed}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/feelog/new")}
        >
          기록 작성하기
        </Button>
      </EmptyState>
    );

  return (
    <>
      <ResponsiveGrid cols={2} colsMd={3} colsLg={4} bordered>
        {records.map((record) => (
          <div
            key={record.id}
            className="border-r-[1.5px] border-b-[1.5px] border-foreground"
          >
            <RecordPosterCard record={record} showMeta showBorder={false} />
          </div>
        ))}
      </ResponsiveGrid>

      <div ref={sentinelRef} />
      {isLoading && (
        <LoadingIndicator label="더 많은 필로그를 불러오고 있어요" />
      )}
    </>
  );
}

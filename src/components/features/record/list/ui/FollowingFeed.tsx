import { ResponsiveGrid } from "@/components/commons/layout";
import { RecordFilterVars } from "../hooks/queries/useFetchRecords";
import { useFetchFollowingFeed } from "../hooks/useFetchFollowingFeed";
import { RecordPosterCard } from "@/components/commons/card";

export default function FollowingFeed({
  filter = {},
}: {
  filter?: RecordFilterVars;
}): JSX.Element {
  const { records, loading, refetch, fetchMore, error } =
    useFetchFollowingFeed();
  if (loading) return <></>;
  if (error) return <></>;
  if (records.length === 0) return <></>;

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

      {/* <div ref={sentinelRef} />
      {isLoading && (
        <div className="p-3 text-muted-foreground">불러오는 중…</div>
      )} */}
    </>
  );
}

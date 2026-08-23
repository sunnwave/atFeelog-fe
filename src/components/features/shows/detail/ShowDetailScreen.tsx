import { JSX, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import PageHeader from "@/components/commons/layout/PageHeader";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import Tabs from "@/components/ui/tabs/Tabs";
import { useFetchRecordsByShow } from "@/components/features/record/list/hooks/queries/useFetchRecordsByShow";
import { useFetchShowDetail } from "./hooks/useFetchShowDetail";
import ShowRecordsTab from "./ui/ShowRecordsTab";
import ShowInfoTab from "./ui/ShowInfoTab";

type Tab = "intro" | "records";

const TABS = [
  { id: "intro" as const, label: "소개" },
  { id: "records" as const, label: "필로그" },
];

export default function ShowDetailScreen(): JSX.Element {
  const { query, isReady } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";

  const {
    detail,
    loading: detailLoading,
    error: detailError,
  } = useFetchShowDetail(id);
  const { records, loading: recordsLoading } = useFetchRecordsByShow(id);
  const [tab, setTab] = useState<Tab>("intro");

  const isLoading = !isReady || detailLoading;

  console.log(detail);
  return (
    <div className="min-h-screen bg-background">
      <PageHeader label="About Show" fallbackHref="/shows" />
      <ResponsiveLayout contentType="default" className="py-6 space-y-6">
        {/* 공연 헤더 */}
        {isLoading ? (
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
        <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

        {/* 탭 콘텐츠 */}
        {tab === "intro" &&
          (detail ? (
            <ShowInfoTab detail={detail} />
          ) : isLoading ? (
            <div className="space-y-3 py-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-muted animate-pulse rounded w-full"
                />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">
              공연 정보를 불러올 수 없어요.
            </p>
          ))}

        {tab === "records" && (
          <ShowRecordsTab records={records} loading={recordsLoading} />
        )}
      </ResponsiveLayout>
    </div>
  );
}

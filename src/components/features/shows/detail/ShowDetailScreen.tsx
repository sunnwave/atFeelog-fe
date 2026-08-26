import { JSX, useState } from "react";
import { useRouter } from "next/router";

import PageHeader from "@/components/commons/layout/PageHeader";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import Tabs from "@/components/ui/tabs/Tabs";

import { useFetchRecordsByShow } from "@/components/features/record/list/hooks/queries/useFetchRecordsByShow";
import { useFetchShowDetail } from "./hooks/useFetchShowDetail";

import {
  ShowDetailInfo,
  ShowIntroTab,
  ShowRecordsTab,
  ShowTicketLinks,
} from "./ui";

type Tab = "intro" | "records";

const TABS = [
  { id: "intro" as const, label: "소개" },
  { id: "records" as const, label: "관람 기록" },
];

export default function ShowDetailScreen(): JSX.Element {
  const { query, isReady } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";

  const { detail, loading: detailLoading } = useFetchShowDetail(id);
  const { records, loading: recordsLoading } = useFetchRecordsByShow(id);

  const [tab, setTab] = useState<Tab>("intro");
  const [liked, setLiked] = useState(false);

  const isLoading = !isReady || detailLoading;

  if (isLoading) return <p>로딩 중</p>;
  if (!detail) return <p>공연 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="@container min-h-screen bg-background">
      <PageHeader label="공연 상세" fallbackHref="/shows" />

      <ResponsiveLayout
        contentType="default"
        className="md:px-20 py-4 flex flex-col"
      >
        {/* 히어로 행 */}
        <div className="w-full border-b-[1.5px] pb-5 border-foreground  lg:grid lg:grid-cols-[5fr_2fr] lg:items-start lg:space-y-0 lg:gap-8">
          <ShowDetailInfo
            detail={detail}
            liked={liked}
            onLikeToggle={() => setLiked((l) => !l)}
          />

          <ShowTicketLinks links={detail.ticketLinks} />
        </div>

        {/* 탭 + 콘텐츠 */}
        <div className="flex flex-col">
          <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

          {tab === "intro" &&
            (detail ? (
              <ShowIntroTab detail={detail} />
            ) : isLoading ? (
              <div className="flex flex-col gap-3">
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
        </div>
      </ResponsiveLayout>
    </div>
  );
}

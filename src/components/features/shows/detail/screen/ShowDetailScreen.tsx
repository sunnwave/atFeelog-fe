import { JSX, useState } from "react";
import { useRouter } from "next/router";

import PageHeader from "@/components/commons/layout/PageHeader";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import Tabs from "@/components/ui/tabs/Tabs";

import { useFetchRecordsByShow } from "@/components/features/record/list/hooks/queries/useFetchRecordsByShow";
import { useFetchShowDetail } from "../hooks/useFetchShowDetail";

import {
  ShowDetailInfo,
  ShowIntroTab,
  ShowRecordsTab,
  ShowTicketLinks,
} from "../ui";
import ShowDetailSkeleton from "./ShowDetailSkeleton";
import { PageFallback } from "@/components/ui/feedback";

type Tab = "intro" | "records";

const TABS = [
  { id: "intro" as const, label: "소개" },
  { id: "records" as const, label: "관람 기록" },
];

export default function ShowDetailScreen(): JSX.Element {
  const { query } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";

  const {
    detail,
    loading: detailLoading,
    error: detailError,
  } = useFetchShowDetail(id);
  const { records, loading: recordsLoading } = useFetchRecordsByShow(id);

  const [tab, setTab] = useState<Tab>("intro");
  const [liked, setLiked] = useState(false);

  if (detailLoading) return <ShowDetailSkeleton />;
  if (detailError)
    return (
      <PageFallback
        label="공연 상세"
        fallbackHref="/shows"
        message={detailError}
      />
    );
  if (!detail)
    return (
      <PageFallback
        label="공연 상세"
        fallbackHref="/shows"
        message="공연 정보를 찾을 수 없습니다."
      />
    );

  return (
    <div className=" min-h-screen bg-background">
      <PageHeader label="공연 상세" fallbackHref="/shows" />

      <ResponsiveLayout
        contentType="default"
        padded={false}
        className="flex flex-col gap-3 lg:pt-5 lg:pb-10 @container"
      >
        {/* 히어로 행 */}
        <div className="w-full flex flex-col gap-3 @lg:p-3 @lg:grid @lg:grid-cols-[5fr_2fr] @lg:items-start @lg:gap-5">
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

          {tab === "intro" && <ShowIntroTab detail={detail} />}

          {tab === "records" && (
            <ShowRecordsTab records={records} loading={recordsLoading} />
          )}
        </div>
      </ResponsiveLayout>
    </div>
  );
}

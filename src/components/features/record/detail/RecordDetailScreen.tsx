import { JSX } from "react";
import { useRouter } from "next/router";
import PageHeader from "@/components/commons/layout/PageHeader";
import { useFetchRecord } from "../hooks/useFetchRecord";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import RecordDetailDateHeader from "./recordDetailContent/RecordDetailDateHeader";
import RecordDetailBody from "./recordDetailContent/RecordDetailBody";
import RecordDetailShowInfo from "./recordDetailContent/RecordDetailShowInfo";
import ImageScrollStrip from "@/components/commons/imageScrollStrip/ImageScrollStrip";
import RecordProfile from "./recordDetailContent/RecordProfile";
import RecordActions from "./recordDetailContent/RecordActions";
import RecordComments from "../../record-comments/RecordComments";
import RecordDetailSkeleton from "./RecordDetailSkeleton";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import { PageFallback } from "@/components/ui/feedback";

export default function RecordDetailScreen(): JSX.Element | null {
  const router = useRouter();

  const recordId =
    router.isReady && typeof router.query.recordId === "string"
      ? router.query.recordId
      : undefined;

  const me = useRecoilValue(loggedInUserState);
  const isLoggedIn = !!me;
  const { record, loading, error } = useFetchRecord(recordId);

  const isWriter = !!(
    isLoggedIn &&
    record &&
    (me.id === record.user.id || me.name === record.user.name)
  );

  if (!router.isReady) return null;
  if (!recordId)
    return (
      <PageFallback
        label="Record"
        fallbackHref="/feelog"
        message="잘못된 접근이에요"
      />
    );
  if (loading)
    return (
      <div className="min-h-screen bg-background">
        <PageHeader label="Record" fallbackHref="/feelog" />
        <ResponsiveLayout
          contentType="default"
          padded={false}
          className="lg:px-6 lg:py-8"
        >
          <RecordDetailSkeleton />
        </ResponsiveLayout>
      </div>
    );
  if (error) {
    console.error(error);
    return (
      <PageFallback
        label="Record"
        fallbackHref="/feelog"
        message="기록을 불러오지 못했어요"
      />
    );
  }
  if (!record)
    return (
      <PageFallback
        label="Record"
        fallbackHref="/feelog"
        message="기록을 찾을 수 없어요"
      />
    );

  const images = (record.images ?? []).filter((v): v is string => !!v);
  const hasImages = images.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader label="Record" fallbackHref="/feelog" />
      <ResponsiveLayout
        contentType="default"
        padded={false}
        className="lg:px-6 lg:py-8"
      >
        <div className="space-y-2 w-full pb-24 lg:pb-0 lg:grid lg:grid-cols-[2fr_1fr] lg:items-start lg:space-y-0 lg:gap-8">
          <article className="lg:space-y-4">
            <RecordDetailDateHeader record={record} isWriter={isWriter} />
            <RecordDetailShowInfo record={record} />
            {hasImages && (
              <ImageScrollStrip images={images} className="p-2 lg:p-0" />
            )}
            <RecordDetailBody record={record} />
          </article>
          <aside className="border-t-[1.5px] lg:border-[1.5px]">
            <RecordProfile
              record={record}
              className="border-b-[1.5px] bg-white"
            />
            <RecordActions record={record} />
            <RecordComments />
          </aside>
        </div>
      </ResponsiveLayout>
    </div>
  );
}

import { JSX } from "react";
import { useRouter } from "next/router";
import RecordDetailContent from "./recordDetailContent/RecordDetailContent";
import PageHeader from "@/components/commons/layout/PageHeader";
import { useFetchRecord } from "../hooks/useFetchRecord";
import ImageCarousel from "@/components/commons/imageCarousel/ImageCarousel";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "@/shared/stores";

export default function RecordDetail(): JSX.Element | null {
  const router = useRouter();

  const recordId =
    router.isReady && typeof router.query.recordId === "string"
      ? router.query.recordId
      : undefined;

  const [me] = useRecoilState(loggedInUserState);
  const isLoggedIn = !!me;
  const { record, loading, error } = useFetchRecord(recordId);

  const isWriter = !!(
    isLoggedIn &&
    record &&
    (me.id === record.user?.id || me.name === record.user?.name)
  );

  if (!router.isReady) return null;
  if (!recordId) return null;

  if (loading) return <div>로딩중...</div>;
  if (error) {
    console.error(error);
    return <div>에러!</div>;
  }
  if (!record) return <div>데이터가 없어요</div>;

  const images = (record.images ?? []).filter((v): v is string => !!v);
  const hasImages = images.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader label="Record" fallbackHref="/feelog" />
      <div className="px-5 py-6 mx-auto max-w-5xl lg:px-6 lg:py-8">
        {hasImages ? (
          <div className="space-y-6 w-full lg:grid lg:grid-cols-2 lg:items-start lg:space-y-0 lg:gap-8">
            <ImageCarousel
              images={images}
              className="lg:sticky lg:top-15 lg:h-fit"
            />
            <RecordDetailContent record={record} isWriter={isWriter} />
          </div>
        ) : (
          <RecordDetailContent
            record={record}
            isWriter={isWriter}
            className="w-full max-w-3xl mx-auto"
          />
        )}
      </div>
    </div>
  );
}

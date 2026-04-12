import { JSX } from "react";
import { useRouter } from "next/router";
import RecordDetailContent from "./recordDetailContent/RecordDetailContent";
import ImageCarousel from "@/components/commons/imageCarousel/ImageCarousel";
import BackButton from "@/components/commons/backButton/BackButton";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import { useFetchRecordsOfMine } from "@/shared/hooks/record/useFetchRecordsOfMine";
import { useFetchRecord } from "../hooks/useFetchRecord";

export default function RecordDetail(): JSX.Element | null {
  const router = useRouter();
  // const me = useRecoilValue(loggedInUserState);

  const recordId =
    router.isReady && typeof router.query.recordId === "string"
      ? router.query.recordId
      : undefined;

  const { data, loading, error } = useFetchRecord(recordId); // ✅ 항상 호출
  // const { recordsOfMine, loading: recordsLoading } = useFetchRecordsOfMine();

  const record = data?.fetchBoard;
  // console.log("recordsOfMine", recordsOfMine);
  // const isWriter=!!me && !recordsLoading&& recordsOfMine?.some((record) => record._id === recordId);

  const isWriter = true; // TODO: 로그인한 유저의 id와 record의 작성자 id 비교해서 isWriter 값 설정하기
  if (!router.isReady) return null;
  if (!recordId) return null;

  //TODO: 에러 화면 구현
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러!</div>;
  if (!record) return <div>데이터가 없어요</div>;

  const images = (record?.images ?? []).filter((v): v is string => !!v);
  const hasImages = images.length > 0;

  if (!router.isReady) return <></>;
  if (!recordId) return <></>;

  return (
    <div className="min-h-screen bg-background flex flex-col px-4">
      {/* 뒤로가기 버튼 */}
      <BackButton fallbackHref="/records" label="목록으로" />

      {hasImages ? (
        <div className="mt-3 space-y-6 w-full md:px-6 lg:grid lg:grid-cols-2 lg:items-start lg:space-y-0 lg:gap-8">
          <ImageCarousel
            images={images ?? []}
            className="lg:sticky lg:top-15 lg:h-fit"
          />
          {record && (
            <RecordDetailContent record={record} isWriter={isWriter} />
          )}
        </div>
      ) : (
        <RecordDetailContent
          record={record}
          isWriter={isWriter}
          className="w-full max-w-3xl mx-auto px-2 py-2 lg:px-4"
        />
      )}
    </div>
  );
}

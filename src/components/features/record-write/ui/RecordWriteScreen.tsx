// RecordWriteScreen.tsx
import RecordWriteForm from "./recordWriteForm/RecordWriteForm";
import RecordWriteTop from "./RecordWriteTop";
import RecordWriteSubmitButtons from "./RecordWriteSubmitButtons";
import { RecordWriteFormValues } from "../model/types";
import BackButton from "@/components/commons/backButton/BackButton";
import { mapRecordWriteToCreateBoardInput } from "../lib/map-record-write-to-create-board-input";
import { loggedInUserState } from "@/shared/stores";
import { useRecoilValue } from "recoil";
import { useUploadImages } from "@/shared/hooks/image/useUploadImages";
import { useCreateRecord } from "../hooks/mutations/useCreateRecord";
import { useToast } from "@/components/commons/toast/ToastProvider";
import { useRouter } from "next/router";

export default function RecordWriteScreen() {
  const formId = "record-write-form";
  const me = useRecoilValue(loggedInUserState);
  const router = useRouter();

  const { uploadImages, isUploading } = useUploadImages();
  const { onCreateRecord, loading } = useCreateRecord();
  const { error, success } = useToast();

  const onSubmitValid = async (values: RecordWriteFormValues) => {
    if (isUploading || loading) return;
    const uploadedUrls = await uploadImages(values.imageFiles);

    const createBoardInput = mapRecordWriteToCreateBoardInput({
      values: { ...values, images: uploadedUrls },
      writer: me?.name || "익명",
      password: me?._id || "1234", // 로그인한 사용자는 빈 문자열, 비로그인 사용자는 임시 비밀번호
    });

    try {
      const res = await onCreateRecord(createBoardInput);
      success("필로그가 기록되었습니다📖");
      router.push(`/records/${res}`);
    } catch (e) {
      const message = e instanceof Error ? e.message : "레코드 생성 실패";
      error(message);
    }
  };

  const onTempSave = () => {
    console.log("temp save");
  };

  return (
    <div className="min-h-screen bg-background ">
      <BackButton fallbackHref="/records" label="뒤로가기" />
      {/* ✅ 버튼 바에 가리지 않게 pb 확보 */}
      <div className="max-w-lg mx-auto space-y-2 px-5 lg:space-y-6 lg:pb-28">
        <RecordWriteTop />
        <RecordWriteForm formId={formId} onSubmitValid={onSubmitValid} />
      </div>

      <RecordWriteSubmitButtons formId={formId} onTempSave={onTempSave} />
    </div>
  );
}

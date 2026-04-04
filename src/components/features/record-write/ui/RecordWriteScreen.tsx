import RecordWriteForm from "./recordWriteForm/RecordWriteForm";
import RecordWriteTop from "./RecordWriteTop";
import RecordWriteSubmitButtons from "./RecordWriteSubmitButtons";
import { RecordWriteFormValues } from "../model/types";
import BackButton from "@/components/commons/backButton/BackButton";
import { loggedInUserState } from "@/shared/stores";
import { useRecoilValue } from "recoil";
import { useUploadImages } from "@/shared/hooks/image/useUploadImages";
import { useCreateRecord } from "../hooks/mutations/useCreateRecord";
import { useToast } from "@/components/commons/toast/ToastProvider";
import { useRouter } from "next/router";
import { submitRecordWrite } from "../lib/submitRecordWrite";

export default function RecordWriteScreen() {
  const formId = "record-write-form";
  const me = useRecoilValue(loggedInUserState);
  const router = useRouter();

  const { uploadImages, isUploading } = useUploadImages();
  const { onCreateRecord, loading } = useCreateRecord();
  const { error, success } = useToast();

  const onSubmitValid = async (values: RecordWriteFormValues) => {
    if (isUploading || loading) return;

    try {
      const id = await submitRecordWrite({
        values,
        me,
        uploadImages,
        createRecord: onCreateRecord,
      });
      success("필로그를 기록했어요📖✨");
      await router.push(`/records/${id}`);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "필로그 기록에 실패했어요😢";
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

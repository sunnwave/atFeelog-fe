import BackButton from "@/components/commons/backButton/BackButton";
import { RecordEditorBottomBar, RecordEditorForm } from "../../editor";
import RecordUpdateActions from "./RecordUpdateActions";
import RecordUpdateTop from "./RecordUpdateTop";
import useRecordUpdateSubmit from "../hooks/useRecordUpdateSubmit";
import { useRecordEditorForm } from "../../editor/hooks/useRecordEditorForm";
import { useRouter } from "next/router";
import { useRecordUpdateInit } from "../hooks/useRecordUpdateInit";

export default function RecordUpdateScreen() {
  const formId = "record-update-form";
  const router = useRouter();
  const recordId =
    router.isReady && typeof router.query.recordId === "string"
      ? router.query.recordId
      : undefined;

  const { onSubmitValid, isBusy } = useRecordUpdateSubmit();

  const { form, ...editorProps } = useRecordEditorForm((values) => {
    if (!recordId) return;
    return onSubmitValid(values, recordId!);
  });

  const { loading, error } = useRecordUpdateInit(recordId, form);

  // TODO: 임시 저장 기능 구현
  const onTempSave = () => {
    console.log("temp save");
  };

  if (!recordId) return <div>잘못된 접근입니다.</div>;
  const disabled = isBusy || form.formState.isSubmitting;
  return (
    <div className="min-h-screen bg-background ">
      <BackButton fallbackHref="/records" label="뒤로가기" />
      {/* ✅ 버튼 바에 가리지 않게 pb 확보 */}
      <div className="max-w-lg mx-auto space-y-2 px-5 lg:space-y-6 lg:pb-28">
        <RecordUpdateTop />
        <RecordEditorForm formId={formId} form={form} {...editorProps} />
      </div>

      <RecordEditorBottomBar>
        <RecordUpdateActions
          formId={formId}
          disabled={disabled}
          onTempSave={onTempSave}
        />
      </RecordEditorBottomBar>
    </div>
  );
}

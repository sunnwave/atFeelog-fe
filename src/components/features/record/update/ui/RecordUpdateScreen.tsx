import BackButton from "@/components/commons/backButton/BackButton";
import { RecordEditorBottomBar, RecordEditorForm } from "../../editor";
import RecordUpdateActions from "./RecordUpdateActions";
import RecordUpdateTop from "./RecordUpdateTop";
import useRecordUpdateSubmit from "../hooks/useRecordUpdateSubmit";
import { useRecordEditorForm } from "../../editor/hooks/useRecordEditorForm";
import { useRouter } from "next/router";
import { useRecordUpdateInit } from "../hooks/useRecordUpdateInit";
import { useDraftStorage } from "@/shared/hooks/record/useDraftStorage";
import { DRAFT_KEY } from "@/shared/constants/draftKeys";
import { RecordEditFormValues } from "../../model";
import { useToast } from "@/components/commons/toast/ToastProvider";
import { useConfirmPreset } from "@/shared/hooks/ui/useConfirmPreset";

export default function RecordUpdateScreen() {
  const formId = "record-update-form";
  const router = useRouter();
  const recordId =
    router.isReady && typeof router.query.recordId === "string"
      ? router.query.recordId
      : undefined;

  const { onSubmitValid, isBusy } = useRecordUpdateSubmit();
  const { saveDraft, loadDraft, clearDraft } =
    useDraftStorage<RecordEditFormValues>(
      DRAFT_KEY.record.update(recordId ?? "")
    );

  const { success, error } = useToast();

  const { openConfirmPreset } = useConfirmPreset();
  const { form, ...editorProps } = useRecordEditorForm((values) => {
    if (!recordId) return;
    return onSubmitValid(values, recordId!);
  });

  const { loading, error: initError } = useRecordUpdateInit(
    recordId,
    form,
    () => {
      const draft = loadDraft();
      if (!draft) return;
      if (initError) {
        error("기록을 불러오는 중 에러가 발생했어요");
        return;
      }

      openConfirmPreset("loadDraft", {
        onConfirm: () => {
          form.reset({ ...draft });
          success("임시 저장된 내용을 불러왔어요.");
        },
        onCancel: () => clearDraft(),
      });
    }
  );

  const onTempSave = () => {
    const values = form.getValues();
    saveDraft(values);
    success("텍스트 내용이 임시저장됐어요.\n(이미지는 저장되지 않아요😢)");
  };

  const disabled = isBusy || form.formState.isSubmitting;
  const isDirty = form.formState.isDirty;

  if (!recordId) return <div>잘못된 접근입니다.</div>;
  if (loading) return <div>로딩 중..</div>;
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
          isDirty={isDirty}
          onTempSave={onTempSave}
        />
      </RecordEditorBottomBar>
    </div>
  );
}

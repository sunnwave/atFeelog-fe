import BackButton from "@/components/commons/backButton/BackButton";

import {
  RECORD_WRITE_DEFAULTS,
  RecordEditFormValues,
  RecordEditorBottomBar,
  RecordEditorForm,
} from "@/components/features/record";
import RecordWriteTop from "./RecordWriteTop";
import RecordWriteActions from "./RecordWriteActions";
import useRecordWriteSubmit from "../hooks/useRecordWriteSubmit";
import { useRecordEditorForm } from "../../editor/hooks/useRecordEditorForm";
import { useDraftStorage } from "@/shared/hooks/record/useDraftStorage";
import { DRAFT_KEY } from "@/shared/constants/draftKeys";
import { useToast } from "@/components/commons/toast/ToastProvider";
import { useConfirmPreset } from "@/shared/hooks/ui/useConfirmPreset";
import { useEffect } from "react";

export default function RecordWriteScreen() {
  const formId = "record-write-form";

  const { onSubmitValid, isBusy } = useRecordWriteSubmit();
  const { saveDraft, loadDraft, clearDraft } =
    useDraftStorage<RecordEditFormValues>(DRAFT_KEY.record.write);
  const { success } = useToast();

  const { openConfirmPreset } = useConfirmPreset();

  const { form, ...editorProps } = useRecordEditorForm(onSubmitValid);

  const onTempSave = () => {
    const values = form.getValues();
    saveDraft(values);
    success("텍스트 내용이 임시저장됐어요.\n(이미지는 저장되지 않아요😢)");
  };

  const disabled = isBusy || form.formState.isSubmitting;
  const isDirty = form.formState.isDirty;

  useEffect(() => {
    const draft = loadDraft();
    if (!draft) return;

    openConfirmPreset("loadDraft", {
      onConfirm: () => {
        form.reset({ ...RECORD_WRITE_DEFAULTS, ...draft });
        success("임시 저장된 내용을 불러왔어요.");
      },
      onCancel: () => {
        clearDraft();
      },
    });
  }, [loadDraft, openConfirmPreset, form, success, clearDraft]);

  return (
    <div className="min-h-screen bg-background ">
      <BackButton fallbackHref="/records" label="뒤로가기" />
      {/* ✅ 버튼 바에 가리지 않게 pb 확보 */}
      <div className="max-w-lg mx-auto space-y-2 px-5 lg:space-y-6 lg:pb-28">
        <RecordWriteTop />
        <RecordEditorForm formId={formId} form={form} {...editorProps} />
      </div>

      <RecordEditorBottomBar>
        <RecordWriteActions
          formId={formId}
          disabled={disabled}
          isDirty={isDirty}
          onTempSave={onTempSave}
        />
      </RecordEditorBottomBar>
    </div>
  );
}

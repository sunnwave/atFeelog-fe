import PageHeader from "@/components/commons/layout/PageHeader";
import {
  RECORD_WRITE_DEFAULTS,
  RecordEditFormValues,
  RecordEditorForm,
} from "@/components/features/record";
import useRecordWriteSubmit from "../hooks/useRecordWriteSubmit";
import { useRecordEditorForm } from "../../editor/hooks/useRecordEditorForm";
import { useDraftStorage } from "@/shared/hooks/record/useDraftStorage";
import { DRAFT_KEY } from "@/shared/constants/draftKeys";
import { useToast } from "@/components/commons/toast/ToastProvider";
import { useConfirmPreset } from "@/shared/hooks/ui/useConfirmPreset";
import { useEffect } from "react";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import RecordEditorActions from "../../editor/ui/RecordEditorActions";

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
    form.reset(values);
    success("텍스트 내용이 임시저장됐어요.");
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
    <div className="min-h-screen bg-background">
      <div>
        <PageHeader label="New Record" fallbackHref="/feelog">
          <RecordEditorActions
            formId={formId}
            disabled={disabled}
            isDirty={isDirty}
            submitLabel="저장하기"
            onTempSave={onTempSave}
          />
        </PageHeader>

        <ResponsiveLayout className="px-4">
          <RecordEditorForm formId={formId} form={form} {...editorProps} />
        </ResponsiveLayout>
      </div>
    </div>
  );
}

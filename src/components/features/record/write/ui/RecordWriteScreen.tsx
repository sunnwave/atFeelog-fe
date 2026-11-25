import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import PageHeader from "@/components/commons/layout/PageHeader";
import useRecordWriteSubmit from "../hooks/useRecordWriteSubmit";
import {
  RecordEditorActions,
  RecordEditorForm,
  useRecordDraft,
  useRecordEditorForm,
} from "../../editor";
import { DRAFT_KEY } from "@/shared/constants/draftKeys";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";

export default function RecordWriteScreen() {
  const me = useRecoilValue(loggedInUserState);
  const userId = me?.id;
  const formId = "record-write-form";

  const { onSubmitValid, isBusy } = useRecordWriteSubmit();
  const draftKey = userId ? DRAFT_KEY.record.write(userId) : null;
  const { form, ...editorProps } = useRecordEditorForm((values) =>
    onSubmitValid(values, clearDraft),
  );

  const { onTempSave, hasUnsavedChanges, isSavingDraft, isCheckingDraft, clearDraft } =
    useRecordDraft({ form, draftKey, ready: !!userId });
  const disabled = !userId || isCheckingDraft || isBusy || form.formState.isSubmitting;

  return (
    <div className="min-h-screen bg-background">
      <div>
        <PageHeader label="New Record" fallbackHref="/feelog">
          <RecordEditorActions
            formId={formId}
            disabled={disabled}
            isDirty={hasUnsavedChanges}
            isSavingDraft={isSavingDraft}
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

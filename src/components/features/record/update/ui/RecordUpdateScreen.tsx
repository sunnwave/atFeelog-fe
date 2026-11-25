import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import PageHeader from "@/components/commons/layout/PageHeader";
import { PageFallback } from "@/components/ui/feedback";
import {
  RecordEditorActions,
  RecordEditorForm,
  RecordEditorFormSkeleton,
  useRecordDraft,
  useRecordEditorForm,
} from "../../editor";
import useRecordUpdateSubmit from "../hooks/useRecordUpdateSubmit";
import { useRouter } from "next/router";
import { useRecordUpdateInit } from "../hooks/useRecordUpdateInit";
import { DRAFT_KEY } from "@/shared/constants/draftKeys";
import { ResponsiveLayout } from "@/components/commons/layout";

export default function RecordUpdateScreen() {
  const me = useRecoilValue(loggedInUserState);
  const formId = "record-update-form";
  const router = useRouter();
  const recordId =
    router.isReady && typeof router.query.recordId === "string"
      ? router.query.recordId
      : undefined;

  const { onSubmitValid, isBusy } = useRecordUpdateSubmit();
  const draftKey = me?.id && recordId ? DRAFT_KEY.record.update(me.id, recordId) : null;
  const { form, ...editorProps } = useRecordEditorForm((values) => {
    if (!recordId) return;
    return onSubmitValid(values, recordId, clearDraft);
  });

  const { record, loading, error, ready } = useRecordUpdateInit(recordId, form, draftKey);
  const { onTempSave, hasUnsavedChanges, isSavingDraft, isCheckingDraft, clearDraft } =
    useRecordDraft({ form, draftKey, ready });
  const disabled = !draftKey || isCheckingDraft || isBusy || form.formState.isSubmitting;
  const isFormLoading = !router.isReady || loading || (!!draftKey && !ready);

  if (router.isReady && !recordId) {
    return (
      <PageFallback
        label="Edit Record"
        fallbackHref="/feelog"
        message="잘못된 접근이에요"
      />
    );
  }
  if (router.isReady && !loading && !ready && (error || record?.id !== recordId)) {
    return (
      <PageFallback
        label="Edit Record"
        fallbackHref="/feelog"
        message={error ? "기록을 불러오지 못했어요" : "기록을 찾을 수 없어요"}
      />
    );
  }
  return (
    <div className="min-h-screen bg-background ">
      <PageHeader label="Edit Record" fallbackHref="/feelog">
        <RecordEditorActions
          formId={formId}
          disabled={disabled}
          isFormLoading={isFormLoading}
          isDirty={hasUnsavedChanges}
          isSavingDraft={isSavingDraft}
          submitLabel="수정하기"
          onTempSave={onTempSave}
        />
      </PageHeader>
      <ResponsiveLayout className="px-4">
        {isFormLoading ? (
          <RecordEditorFormSkeleton />
        ) : (
          <RecordEditorForm formId={formId} form={form} {...editorProps} />
        )}
      </ResponsiveLayout>
    </div>
  );
}

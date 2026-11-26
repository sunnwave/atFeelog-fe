import { Button } from "@/components/ui/button/Button";

interface RecordEditorActionsProps {
  formId: string;
  disabled?: boolean;
  isFormLoading?: boolean;
  isDirty?: boolean;
  isSavingDraft?: boolean;
  submitLabel?: string;
  onTempSave: () => void;
}
export default function RecordEditorActions({
  formId,
  disabled,
  isFormLoading = false,
  isDirty,
  isSavingDraft = false,
  submitLabel,
  onTempSave,
}: RecordEditorActionsProps) {
  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onTempSave}
        disabled={!isDirty || disabled || isFormLoading || isSavingDraft}
        aria-busy={isSavingDraft}
      >
        {isSavingDraft ? "임시저장 중..." : "임시 저장"}
      </Button>

      <Button
        type="submit"
        form={formId}
        size="sm"
        disabled={disabled || isFormLoading || isSavingDraft}
      >
        {disabled && !isFormLoading ? "저장 중..." : (submitLabel ?? "저장하기")}
      </Button>
    </div>
  );
}

import { Button } from "@/components/ui/button/Button";

interface RecordEditorActionsProps {
  formId: string;
  disabled?: boolean;
  isDirty?: boolean;
  submitLabel?: string;
  onTempSave: () => void;
}
export default function RecordEditorActions({
  formId,
  disabled,
  isDirty,
  submitLabel,
  onTempSave,
}: RecordEditorActionsProps) {
  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onTempSave}
        disabled={!isDirty || disabled}
      >
        임시 저장
      </Button>

      <Button type="submit" form={formId} size="sm" disabled={disabled}>
        {disabled ? "저장 중..." : (submitLabel ?? "저장하기")}
      </Button>
    </div>
  );
}

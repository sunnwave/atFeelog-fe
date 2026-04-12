import { Button } from "@/components/ui/button/Button";
import { FilePenLine, Save } from "lucide-react";

interface RecordUpdateActionsProps {
  formId: string;
  disabled?: boolean;
  isDirty?: boolean;
  onTempSave: () => void;
}
export default function RecordUpdateActions({
  formId,
  disabled,
  isDirty,
  onTempSave,
}: RecordUpdateActionsProps) {
  return (
    <div className="flex gap-3">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="flex-1"
        onClick={onTempSave}
        disabled={!isDirty || disabled}
      >
        <Save className="w-5 h-5" />
        임시 저장
      </Button>

      <Button
        type="submit"
        form={formId}
        size="lg"
        className="flex-1"
        disabled={disabled}
      >
        <FilePenLine className="w-5 h-5" />
        {disabled ? "저장 중..." : "수정하기"}
      </Button>
    </div>
  );
}

import { Button } from "@/components/ui/button/Button";
import { Save, ScrollText } from "lucide-react";

interface RecordWriteActionsProps {
  formId: string;
  disabled?: boolean;
  isDirty?: boolean;
  onTempSave: () => void;
}

export default function RecordWriteActions({
  formId,
  disabled,
  isDirty,
  onTempSave,
}: RecordWriteActionsProps) {
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
        <ScrollText className="w-5 h-5" />
        {disabled ? "저장 중..." : "기록 저장"}
      </Button>
    </div>
  );
}

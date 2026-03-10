import { Button } from "@/components/ui/button/Button";
import { Save, ScrollText } from "lucide-react";

export default function RecordWriteSubmitButtons({
  formId = "record-write-form",
  onTempSave,
  disabled = false,
  isSubmitting = false,
}: {
  formId?: string;
  onTempSave?: () => void;
  disabled?: boolean;
  isSubmitting?: boolean;
}) {
  return (
    <div
      className="
        fixed bottom-16 z-40
        left-0 right-0
        lg:left-[300px] lg:right-0 lg:bottom-0
        border-t border-border bg-background/95 backdrop-blur
      "
    >
      <div className="mx-auto w-full max-w-lg px-4 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+16px)]">
        {/* TODO: 변경사항 없을 시 버튼 disabled */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={onTempSave}
            disabled={disabled || isSubmitting}
          >
            <Save className="w-5 h-5" />
            임시 저장
          </Button>

          <Button
            type="submit"
            form={formId}
            size="lg"
            className="flex-1"
            disabled={disabled || isSubmitting}
          >
            <ScrollText className="w-5 h-5" />
            {isSubmitting ? "저장 중..." : "기록 저장"}
          </Button>
        </div>
      </div>
    </div>
  );
}

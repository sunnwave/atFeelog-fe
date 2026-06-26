import { Button } from "@/components/ui/button/Button";

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
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline"
        tone="neutral"
        size="lg"
        className="flex-2 rounded-none border-[1.5px] border-foreground text-sm font-black tracking-[0.12em] uppercase"
        onClick={onTempSave}
        disabled={!isDirty || disabled}
      >
        임시 저장
      </Button>

      <Button
        type="submit"
        form={formId}
        size="lg"
        className="flex-2 rounded-none border-[1.5px] border-foreground bg-foreground text-background text-sm font-black tracking-[0.16em] uppercase hover:bg-foreground/90"
        disabled={disabled}
      >
        {disabled ? "저장 중..." : "저장하기"}
      </Button>
    </div>
  );
}

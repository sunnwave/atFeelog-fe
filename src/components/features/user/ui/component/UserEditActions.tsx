import { Button } from "@/components/ui/button/Button";

interface UserEditActionsProps {
  formId: string;
  submitLabel: string;
  submitDisabled: boolean;
  onCancel: () => void;
}

export default function UserEditActions({
  formId,
  submitLabel,
  submitDisabled,
  onCancel,
}: UserEditActionsProps) {
  return (
    <div className="flex gap-3">
      <Button
        type="button"
        variant="outline"
        tone="neutral"
        size="lg"
        className="flex-1 rounded-none border-[1.5px] border-foreground text-[11px] font-black tracking-[0.12em] uppercase"
        onClick={onCancel}
      >
        취소
      </Button>
      <Button
        type="submit"
        form={formId}
        variant="solid"
        tone="primary"
        size="lg"
        className="flex-2 rounded-none border-[1.5px] border-foreground text-[11px] font-black tracking-[0.16em] uppercase"
        disabled={submitDisabled}
      >
        {submitLabel}
      </Button>
    </div>
  );
}
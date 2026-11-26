import { useCallback } from "react";
import { useConfirmModal } from "@/shared/hooks/ui/useConfirmModal";
import type { OpenArgs } from "@/shared/hooks/ui/useConfirmModal";
import { CONFIRM_PRESETS, ConfirmPresetKey } from "@/shared/constants";

export function useConfirmPreset() {
  const { openConfirm, closeConfirm } = useConfirmModal();

  const openConfirmPreset = useCallback(
    (
      key: ConfirmPresetKey,
      handlers?: {
        onConfirm?: () => void | Promise<void>;
        onCancel?: () => void;
        onClose?: () => void;
      },
      overrides?: Partial<OpenArgs>
    ) => {
      const preset = CONFIRM_PRESETS[key];
      openConfirm({
        ...preset,
        ...handlers,
        ...overrides,
      });
    },
    [openConfirm]
  );

  return { openConfirmPreset, closeConfirm };
}

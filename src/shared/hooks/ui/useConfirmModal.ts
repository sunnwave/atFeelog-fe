import { confirmModalState, ConfirmPayload } from "@/shared/stores";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

export type OpenArgs = Omit<ConfirmPayload, "open" | "loading">;

export function useConfirmModal() {
  const set = useSetRecoilState(confirmModalState);

  const openConfirm = useCallback(
    (args: OpenArgs) => {
      set({
        open: true,
        loading: false,
        variant: "default",
        closeOnOverlayClick: true,
        confirmText: "확인",
        cancelText: "취소",
        ...args,
      });
    },
    [set]
  );

  const closeConfirm = useCallback(() => {
    set((prev) => {
      prev.onClose?.();
      return { ...prev, open: false, loading: false };
    });
  }, [set]);

  const setLoading = useCallback(
    (loading: boolean) => {
      set((prev) => ({ ...prev, loading }));
    },
    [set]
  );

  return { openConfirm, closeConfirm, setLoading };
}

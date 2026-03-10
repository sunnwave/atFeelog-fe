"use client";

import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { ConfirmModal } from "./ConfirmModal";
import { confirmModalState } from "@/shared/stores";

export default function ConfirmModalHost() {
  const [state, setState] = useRecoilState(confirmModalState);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        state.onClose?.();
        setState((prev) => ({ ...prev, open: false, loading: false }));
      }
    },
    [setState, state]
  );

  const onConfirm = useCallback(async () => {
    if (!state.onConfirm) {
      setState((prev) => ({ ...prev, open: false, loading: false }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true }));
      await state.onConfirm();
      setState((prev) => ({ ...prev, open: false, loading: false }));
    } catch (e) {
      // 실패 시 모달은 유지(원하면 닫게 바꿔도 됨)
      setState((prev) => ({ ...prev, loading: false }));
      console.error(e);
    }
  }, [setState, state]);

  return (
    <ConfirmModal
      open={state.open}
      onOpenChange={onOpenChange}
      title={state.title}
      description={state.description}
      icon={state.icon}
      variant={state.variant}
      confirmText={state.confirmText}
      cancelText={state.cancelText}
      closeOnOverlayClick={state.closeOnOverlayClick}
      loading={state.loading}
      onCancel={() => {
        state.onCancel?.();
        setState((prev) => ({ ...prev, open: false, loading: false }));
      }}
      onConfirm={onConfirm}
    />
  );
}

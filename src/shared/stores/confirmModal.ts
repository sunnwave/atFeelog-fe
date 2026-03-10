import { LucideIcon } from "lucide-react";
import { atomWithDevCache } from "./atomWithDevCache";

export type ConfirmVariant = "default" | "primary" | "destructive" | "success";

export type ConfirmPayload = {
  open: boolean;
  title?: string;
  description?: string;
  variant?: ConfirmVariant;
  icon?: LucideIcon;

  /** 버튼 라벨 */
  cancelText?: string;
  confirmText?: string;

  closeOnOverlayClick?: boolean;
  /** confirm 누르면 실행 */
  onConfirm?: () => void | Promise<void>;

  /** cancel/닫기 시 실행(선택) */
  onCancel?: () => void;

  onClose?: () => void;
  /** confirm 중 로딩 UI 쓰고 싶을 때 */
  loading?: boolean;
};

export const confirmModalState = atomWithDevCache<ConfirmPayload>({
  key: "confirmModalState",
  default: { open: false, loading: false, variant: "default" },
});

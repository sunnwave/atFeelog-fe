import { LucideIcon } from "lucide-react";

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  description?: string;

  icon?: LucideIcon;
  variant?: ConfirmVariant;

  confirmText?: string;
  cancelText?: string;

  closeOnOverlayClick?: boolean;

  loading?: boolean;

  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  onClose?: () => void;

  className?: string;
};

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

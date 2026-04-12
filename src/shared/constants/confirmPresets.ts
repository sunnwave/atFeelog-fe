import { ConfirmVariant } from "@/components/commons/modal/confirmModal/ConfirmModalTypes";
import { FileText, LogIn, LogOut, LucideIcon, Trash2 } from "lucide-react";

export type ConfirmPresetKey = keyof typeof CONFIRM_PRESETS;

export type ConfirmPreset = {
  title: string;
  description?: string;
  variant?: ConfirmVariant;
  icon?: LucideIcon;
  confirmText?: string;
  cancelText?: string;
};

export const CONFIRM_PRESETS = {
  loginRequired: {
    title: "작성하려면 로그인해요✋🏻🤚🏻",
    description: "로그인하고 필로그와 거래글을 작성해보세요",
    variant: "primary",
    cancelText: "취소",
    confirmText: "로그인",
    icon: LogIn,
  },

  logout: {
    title: "로그아웃할까요?",
    description: "언제든 다시 로그인할 수 있어요.",
    variant: "default",
    cancelText: "취소",
    confirmText: "로그아웃",
    icon: LogOut,
  },

  deleteComment: {
    title: "댓글을 삭제할까요?",
    description: "삭제하면 되돌릴 수 없어요.",
    variant: "destructive",
    cancelText: "취소",
    confirmText: "삭제",
    icon: Trash2,
  },

  deleteRecord: {
    title: "게시물을 삭제할까요?",
    description: "삭제하면 되돌릴 수 없어요.",
    variant: "destructive",
    cancelText: "취소",
    confirmText: "삭제",
    icon: Trash2,
  },

  loadDraft: {
    title: "임시 저장된 내용이 있어요",
    description: "이어서 작성할까요?\n(이미지는 복구되지 않아요.)",
    variant: "primary",
    confirmText: "이어서 작성",
    cancelText: "새로 작성",
    icon: FileText,
  },
} as const;

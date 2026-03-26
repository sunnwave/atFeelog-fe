"use client";

import * as React from "react";
import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import IconBadge from "@/components/ui/icons/IconBadge";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/components/ui/button/Button";
import { ModalProps } from "./ConfirmModalTypes";

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  icon,
  variant = "default",
  className,
  closeOnOverlayClick = true,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  loading = false,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* ✅ Overlay */}
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/50",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
          )}
          // ✅ overlay 클릭 닫기 제어
          onPointerDown={(e) => {
            if (!closeOnOverlayClick) e.preventDefault();
          }}
        />

        {/* ✅ Content wrapper(중앙 정렬) */}
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 max-w-[380px]",
            "bg-card border border-border shadow-2xl rounded-2xl overflow-hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            className
          )}
        >
          {/* Header */}
          {(title || description || icon) && (
            <div className="flex items-start gap-3 px-6 pt-6 pb-4">
              {icon && variant && <IconBadge icon={icon} variant={variant} />}
              <div className="min-w-0 flex-1">
                {title ? (
                  <Dialog.Title className="text-lg font-semibold text-foreground mb-1">
                    {title}
                  </Dialog.Title>
                ) : null}
                {description ? (
                  <Dialog.Description className=" text-muted-foreground">
                    {description}
                  </Dialog.Description>
                ) : null}
              </div>

              <Dialog.Close asChild>
                <Button variant="ghost" size="icon" aria-label="닫기">
                  <X className="w-5 h-5" />
                </Button>
              </Dialog.Close>
            </div>
          )}

          <div className="px-5 py-4">
            <div className="mt-2 flex gap-2">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  onCancel?.();
                  onOpenChange(false);
                }}
                disabled={loading}
              >
                {cancelText}
              </Button>

              <Button
                variant={variant === "destructive" ? "destructive" : "default"}
                className="flex-1"
                onClick={async () => {
                  await onConfirm?.();
                }}
                disabled={loading}
              >
                {loading ? "처리중..." : confirmText}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

import { useEffect } from "react";
import { X } from "lucide-react";
import { ActionSheetOption } from "./type";
import ActionOption from "./ActionOption";
import { Button } from "@/components/ui/button/Button";

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  options: ReadonlyArray<ActionSheetOption>;
}

export function ActionSheet({
  isOpen,
  onClose,
  title,
  options,
}: ActionSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[60] animate-in fade-in"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-[70] animate-in slide-in-from-bottom">
        <div className="max-w-lg mx-auto bg-background rounded-t-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Options */}
          <div className="px-4 py-2 pb-safe">
            {options.map((option, index) => (
              <ActionOption key={index} option={option} onClose={onClose} />
            ))}
          </div>

          {/* Cancel Button */}
          <div className="px-4 pb-6 pt-2">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={onClose}
            >
              취소
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

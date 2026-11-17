import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert/Alert";
import { ToastItem } from "./types";
import useSwipeToDismiss from "./useToastSwipeToDismiss";
import { X } from "lucide-react";
import { cn } from "@/shared/utils";
import { IconButton } from "@/components/ui/button/IconButton";

export default function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: () => void;
}) {
  const swipe = useSwipeToDismiss(onDismiss);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2">
      <Alert
        variant={toast.variant}
        className={cn(
          "shadow-2xl border bg-card/95 backdrop-blur-md",
          "border-border/90",
        )}
        withBar
        onPointerDown={swipe.onPointerDown}
        onPointerUp={swipe.onPointerUp}
      >
        <AlertIcon variant={toast.variant} className="shrink-0" />

        <div className="col-start-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {toast.title ? <AlertTitle>{toast.title}</AlertTitle> : null}
            {toast.description ? (
              <AlertDescription>
                <p className="line-clamp-2 whitespace-pre-line">
                  {toast.description}
                </p>
              </AlertDescription>
            ) : null}
          </div>

          <IconButton aria-label="닫기" onClick={onDismiss} size="xs">
            <X />
          </IconButton>
        </div>
      </Alert>
    </div>
  );
}

import { IconButton } from "@/components/ui/button/IconButton";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface Props {
  label: string;
  statusText?: string;
  fallbackHref?: string;
}

export default function PageHeader({
  label,
  statusText,
  fallbackHref = "/",
}: Props) {
  const router = useRouter();

  const onBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    void router.push(fallbackHref);
  }, [router, fallbackHref]);

  return (
    <div className="sticky top-0 z-40 flex items-center gap-3 border-b-[1.5px] px-3 py-2 bg-background/95 backdrop-blur-sm">
      <IconButton aria-label="뒤로가기" onClick={onBack}>
        <ArrowLeft strokeWidth={2.2} />
      </IconButton>
      <span className="flex-1 text-[11px] font-black tracking-[0.2em] uppercase text-foreground">
        {label}
      </span>
      {statusText !== undefined && (
        <span className="text-[10px] font-bold text-muted-foreground shrink-0">
          {statusText}
        </span>
      )}
    </div>
  );
}

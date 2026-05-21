import { ArrowLeft } from "lucide-react";
import { ButtonHTMLAttributes, useCallback } from "react";
import { useRouter } from "next/router";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/components/ui/button/Button";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  fallbackHref?: string;
  label?: string;
  forceFallback?: boolean;
};

export default function BackButton({
  fallbackHref = "/",
  label = "뒤로",
  forceFallback = false,
  className,
  ...props
}: Props) {
  const router = useRouter();

  const onBack = useCallback(() => {
    if (
      !forceFallback &&
      typeof window !== "undefined" &&
      window.history.length > 1
    ) {
      router.back();
      return;
    }
    void router.push(fallbackHref);
  }, [router, fallbackHref, forceFallback]);

  return (
    <div className={cn("sticky top-0 z-40 py-2 bg-background/95 backdrop-blur-sm", className)}>
      <Button
        variant="ghost"
        tone="neutral"
        size="sm"
        className="gap-1.5 px-2 -ml-2"
        onClick={onBack}
        {...props}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{label}</span>
      </Button>
    </div>
  );
}

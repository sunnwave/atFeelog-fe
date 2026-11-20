import * as React from "react";
import { Button, type ButtonProps } from "./Button";
import { cn } from "@/shared/utils/cn";

type PosterButtonProps = Omit<ButtonProps, "variant" | "size">;

function PosterButton({ className, ...props }: PosterButtonProps) {
  return (
    <Button
      variant="solid"
      size="lg"
      className={cn(
        "h-12 border-[1.5px] px-7 font-black uppercase tracking-[0.14em]",
        "shadow-[3px_3px_0_0_var(--foreground)]",
        "hover:translate-x-px hover:translate-y-px",
        "hover:shadow-[2px_2px_0_0_var(--foreground)]",
        "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        className,
      )}
      {...props}
    />
  );
}

export { PosterButton, type PosterButtonProps };

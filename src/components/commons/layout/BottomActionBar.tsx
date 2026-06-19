"use client";

import { cn } from "@/shared/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  mobileBottomOffsetClassName?: string;
  desktopLeftOffsetClassName?: string;
};

export default function BottomActionBar({
  children,
  className,
  mobileBottomOffsetClassName = "bottom-16",
  desktopLeftOffsetClassName = "lg:left-[288px]",
}: Props) {
  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-40",
        mobileBottomOffsetClassName,
        "lg:bottom-0 lg:right-0",
        desktopLeftOffsetClassName,
        "border-t-[1.5px] border-foreground bg-background",
        className
      )}
    >
      <div className="mx-auto w-full max-w-lg px-4 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+16px)]">
        {children}
      </div>
    </div>
  );
}
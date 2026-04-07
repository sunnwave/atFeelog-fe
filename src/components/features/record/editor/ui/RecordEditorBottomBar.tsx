"use client";

import { cn } from "@/shared/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;

  mobileBottomOffsetClassName?: string;

  desktopLeftOffsetClassName?: string;
};

export default function RecordEditorBottomBar({
  children,
  className,
  mobileBottomOffsetClassName = "bottom-16",
  desktopLeftOffsetClassName = "lg:left-[300px]",
}: Props) {
  return (
    <div
      className={cn(
        // ✅ mobile: BottomNav(=bottom-16) 위로 올려서 고정
        "fixed left-0 right-0 z-40",
        mobileBottomOffsetClassName,

        // ✅ desktop: sidebar(300px) 만큼 left offset, bottom 0
        "lg:bottom-0 lg:right-0",
        desktopLeftOffsetClassName,

        "border-t border-border bg-background/95 backdrop-blur",
        className
      )}
    >
      {/* ✅ safe-area + content width */}
      <div className="mx-auto w-full max-w-lg px-4 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+16px)]">
        {children}
      </div>
    </div>
  );
}

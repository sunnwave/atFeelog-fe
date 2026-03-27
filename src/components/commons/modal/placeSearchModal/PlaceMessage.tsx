import { cn } from "@/shared/utils";
import React from "react";

export default function PlaceMessage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `py-2 text-center text-sm text-muted-foreground`,
        className
      )}
    >
      {children}
    </div>
  );
}

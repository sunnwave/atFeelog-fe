import { JSX, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

/**
 * contentType
 * - "wide"    : max-w-screen-xl (1280px) — 피드, 그리드 페이지
 * - "default" : max-w-screen-lg (1024px) — 상세 페이지
 * - "narrow"  : max-w-[680px]            — 폼, 프로필 편집
 * - "full"    : 제한 없음
 *
 * padded (default true): px-4 lg:px-6 수평 패딩 자동 적용
 */
type ContentType = "wide" | "default" | "narrow" | "full";

interface IResponsiveLayoutProps {
  children: ReactNode;
  contentType?: ContentType;
  padded?: boolean;
  className?: string;
}

const maxWMap: Record<ContentType, string> = {
  wide: "max-w-screen-2xl",
  default: "max-w-screen-lg",
  narrow: "max-w-[680px]",
  full: "",
};

export function ResponsiveLayout({
  children,
  contentType = "default",
  padded = true,
  className,
}: IResponsiveLayoutProps): JSX.Element {
  return (
    <div
      className={cn(
        "mx-auto",
        maxWMap[contentType],
        padded && "px-2 lg:px-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

import { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 12;
type GapSize = "none" | "px" | "xs" | "sm" | "md" | "lg";

interface ResponsiveGridProps {
  children: ReactNode;
  /** 기본(모바일) 열 수 (default: 2) */
  cols?: Cols;
  /**
   * 콘텐츠 너비 480px+ 열 수 (사이드바 제외 기준)
   * 뷰포트로는 사이드바 없을 때 480px, 있을 때 약 768px
   */
  colsSm?: Cols;
  /**
   * 콘텐츠 너비 640px+ 열 수
   * 뷰포트로는 사이드바 없을 때 640px, 있을 때 약 928px
   */
  colsMd?: Cols;
  /**
   * 콘텐츠 너비 800px+ 열 수
   * 뷰포트로는 사이드바 없을 때 800px, 있을 때 약 1088px
   */
  colsLg?: Cols;
  /**
   * 간격 크기 (default: "sm" = gap-2)
   * none(0) | px(1px) | xs(4px) | sm(8px) | md(16px) | lg(24px)
   */
  gap?: GapSize;
  /**
   * 테두리 그리드 모드
   * true이면 gap-px + border-t-[1.5px] border-l-[1.5px] border-foreground 적용.
   * 각 자식은 border-r-[1.5px] border-b-[1.5px] border-foreground를 가져야 함.
   */
  bordered?: boolean;
  className?: string;
}

const colsMap: Record<Cols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

/* Container Query 맵 — @sm/@md/@lg는 globals.css의 --container-* 기준 */
const colsSmCQMap: Record<Cols, string> = {
  1: "@sm:grid-cols-1",
  2: "@sm:grid-cols-2",
  3: "@sm:grid-cols-3",
  4: "@sm:grid-cols-4",
  5: "@sm:grid-cols-5",
  6: "@sm:grid-cols-6",
  12: "@sm:grid-cols-12",
};
const colsMdCQMap: Record<Cols, string> = {
  1: "@md:grid-cols-1",
  2: "@md:grid-cols-2",
  3: "@md:grid-cols-3",
  4: "@md:grid-cols-4",
  5: "@md:grid-cols-5",
  6: "@md:grid-cols-6",
  12: "@md:grid-cols-12",
};
const colsLgCQMap: Record<Cols, string> = {
  1: "@lg:grid-cols-1",
  2: "@lg:grid-cols-2",
  3: "@lg:grid-cols-3",
  4: "@lg:grid-cols-4",
  5: "@lg:grid-cols-5",
  6: "@lg:grid-cols-6",
  12: "@lg:grid-cols-12",
};

const gapMap: Record<GapSize, string> = {
  none: "gap-0",
  px: "gap-px",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

export default function ResponsiveGrid({
  children,
  cols = 2,
  colsSm,
  colsMd,
  colsLg,
  gap = "sm",
  bordered = false,
  className,
}: ResponsiveGridProps) {
  return (
    /* @container: 이 div의 너비를 기준으로 자식 grid의 열 수가 결정됨 */
    <div className={cn("@container", className)}>
      <div
        className={cn(
          "grid",
          colsMap[cols],
          colsSm && colsSmCQMap[colsSm],
          colsMd && colsMdCQMap[colsMd],
          colsLg && colsLgCQMap[colsLg],
          bordered
            ? "gap-px border-t-[1.5px] border-l-[1.5px] border-foreground"
            : gapMap[gap],
        )}
      >
        {children}
      </div>
    </div>
  );
}

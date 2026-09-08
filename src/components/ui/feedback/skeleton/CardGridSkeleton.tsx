import { JSX } from "react";
import { ResponsiveGrid } from "@/components/commons/layout";
import CardSkeleton from "./CardSkeleton/CardSkeleton";

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 12;

type CardGridSkeletonProps = {
  count?: number;
  showMeta?: boolean;
  cols?: Cols;
  colsMd?: Cols;
  colsLg?: Cols;
  bordered?: boolean;
  className?: string;
};

export default function CardGridSkeleton({
  count = 8,
  showMeta = false,
  cols = 2,
  colsMd = 3,
  colsLg = 4,
  bordered = true,
  className,
}: CardGridSkeletonProps): JSX.Element {
  return (
    <ResponsiveGrid
      cols={cols}
      colsMd={colsMd}
      colsLg={colsLg}
      bordered={bordered}
      className={className}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border-r-[1.5px] border-b-[1.5px] border-foreground @container"
        >
          <CardSkeleton showMeta={showMeta} />
        </div>
      ))}
    </ResponsiveGrid>
  );
}

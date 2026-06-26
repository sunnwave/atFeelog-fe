import { ReactNode } from "react";

/**
 * Grid system component for responsive layouts
 */
interface IResponsiveGridProps {
  children: ReactNode;
  /** Number of columns on mobile (default: 1) */
  colsMobile?: 1 | 2 | 3 | 4;
  /** Number of columns on tablet (default: 2) */
  colsTablet?: 2 | 3 | 4 | 6 | 8;
  /** Number of columns on desktop (default: 3) */
  colsDesktop?: 1 | 2 | 3 | 4 | 6 | 12;
  /** Gap size in 8px units (default: 2 = 16px) */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export default function ResponsiveGrid({
  children,
  colsMobile = 1,
  colsTablet = 2,
  colsDesktop = 3,
  gap = 2,
  className = "",
}: IResponsiveGridProps) {
  const getGapClass = () => {
    const gapMap = {
      0: "gap-0",
      1: "gap-2",
      2: "gap-4",
      3: "gap-6",
      4: "gap-8",
      5: "gap-10",
      6: "gap-12",
    };
    return gapMap[gap];
  };

  const getColsClass = () => {
    const mobileMap = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    };
    const tabletMap = {
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      6: "md:grid-cols-6",
      8: "md:grid-cols-8",
    };
    const desktopMap = {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      6: "lg:grid-cols-6",
      12: "lg:grid-cols-12",
    };

    return `${mobileMap[colsMobile]} ${tabletMap[colsTablet]} ${desktopMap[colsDesktop]}`;
  };

  return (
    <div className={`grid ${getColsClass()} ${getGapClass()} ${className}`}>
      {children}
    </div>
  );
}

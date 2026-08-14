import { JSX } from "react";
import { CardSkeleton } from "@/components/commons/card";
import { ResponsiveGrid } from "@/components/commons/layout";

export default function ProfileRecordGridSkeleton(): JSX.Element {
  return (
    <section>
      {/* 탭 */}
      <div className="inline-flex border-[1.5px] border-foreground mb-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`relative overflow-hidden h-10 w-24 bg-border ${i === 0 ? "border-r-[1.5px] border-foreground" : ""}`}
          >
            <div className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>
        ))}
      </div>

      {/* 그리드 */}
      <ResponsiveGrid cols={2} colsMd={3} colsLg={4} bordered>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-r-[1.5px] border-b-[1.5px] border-foreground @container">
            <CardSkeleton showMeta={false} />
          </div>
        ))}
      </ResponsiveGrid>
    </section>
  );
}

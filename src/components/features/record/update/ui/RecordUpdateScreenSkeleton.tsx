import { ResponsiveLayout } from "@/components/commons/layout";
import { JSX } from "react";

function Shimmer({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden bg-border ${className}`}>
      <div className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}

function FieldSkeleton({ searchable = false }: { searchable?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Shimmer className="h-5 w-16" />
      <div className="flex gap-2">
        <Shimmer className="h-11 min-w-0 flex-1" />
        {searchable && <Shimmer className="h-11 w-20 shrink-0" />}
      </div>
    </div>
  );
}

export default function RecordUpdateScreenSkeleton(): JSX.Element {
  return (
    <div className="min-h-screen bg-background" aria-busy="true">
      <span className="sr-only" role="status">기록을 불러오는 중입니다.</span>
      <div aria-hidden="true">
      {/* PageHeader */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b-[1.5px] px-3 py-2 bg-background/95 backdrop-blur-sm">
        <Shimmer className="size-7 shrink-0" />
        <div className="min-w-0 flex-1">
          <Shimmer className="h-3 w-24 max-w-full" />
        </div>
        <div className="flex shrink-0 gap-3">
          <Shimmer className="h-7 w-17" />
          <Shimmer className="h-7 w-17" />
        </div>
      </div>

        <ResponsiveLayout className="px-4">
          {/* Form */}
          <div>
            {/* 제목 */}
            <div className="py-4 lg:p-5 border-b border-foreground/15 space-y-1.5">
              <Shimmer className="h-5 w-8" />
              <Shimmer className="h-10 w-full" />
            </div>

            {/* 공연 정보 */}
            <div className="py-4 lg:px-5 lg:py-5 border-b border-foreground/15">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 lg:gap-x-5 lg:gap-y-4">
                <FieldSkeleton searchable />
                <FieldSkeleton />
                <FieldSkeleton />
                <FieldSkeleton searchable />
              </div>
            </div>

            {/* 사진 추가 */}
            <div className="py-4 lg:px-5 lg:py-5 border-b border-foreground/15 space-y-1.5">
              <Shimmer className="h-5 w-16" />
              <Shimmer className="h-24 w-full rounded" />
            </div>

            {/* 후기 / 감상 */}
            <div className="py-4 lg:px-5 lg:py-5 border-b border-foreground/15 space-y-1.5">
              <Shimmer className="h-5 w-20" />
              <div className="overflow-hidden rounded-2xl border border-border">
                <div className="flex flex-wrap gap-2 border-b border-border bg-muted/30 px-3 py-2">
                  {Array.from({ length: 7 }, (_, index) => (
                    <Shimmer key={index} className="size-7 rounded-full" />
                  ))}
                </div>
                <Shimmer className="min-h-[300px] w-full" />
                <div className="flex justify-between border-t border-border bg-muted/20 px-4 py-2">
                  <Shimmer className="h-4 w-24" />
                  <Shimmer className="h-4 w-16" />
                </div>
              </div>
            </div>
          </div>
        </ResponsiveLayout>
      </div>

    </div>
  );
}

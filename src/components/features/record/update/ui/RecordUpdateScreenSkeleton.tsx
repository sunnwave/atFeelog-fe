import { ResponsiveLayout } from "@/components/commons/layout";
import { JSX } from "react";

function Shimmer({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden bg-border ${className}`}>
      <div className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}

function FieldSkeleton() {
  return (
    <div className="flex flex-col gap-1.5">
      <Shimmer className="h-2.5 w-16 rounded" />
      <Shimmer className="h-11 w-full rounded" />
    </div>
  );
}

export default function RecordUpdateScreenSkeleton(): JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* PageHeader */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b-[1.5px] border-foreground px-5 py-3.5 bg-background/95 backdrop-blur-sm">
        <Shimmer className="w-4.5 h-4.5 rounded" />
        <Shimmer className="h-3 w-24 rounded" />
      </div>

      <div className="mx-auto space-y-2 px-5 lg:space-y-6 lg:pb-28">
        <ResponsiveLayout className="px-4">
          {/* Form */}
          <div className="pb-40 gap-y-4 ">
            {/* 제목 */}
            <div className="py-4 border-b border-foreground/15 space-y-3">
              <Shimmer className="h-2.5 w-8 rounded" />
              <Shimmer className="h-7 w-full rounded" />
            </div>

            {/* 공연 정보 */}
            <div className="py-4 border-b border-foreground/15">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-x-5">
                <FieldSkeleton />
                <FieldSkeleton />
                <FieldSkeleton />
                <FieldSkeleton />
              </div>
            </div>

            {/* 사진 추가 */}
            <div className="py-4 border-b border-foreground/15 space-y-1.5">
              <Shimmer className="h-2.5 w-16 rounded" />
              <Shimmer className="h-24 w-full rounded" />
            </div>

            {/* 후기 / 감상 */}
            <div className="py-4 border-b border-foreground/15 space-y-1.5">
              <Shimmer className="h-2.5 w-20 rounded" />
              <Shimmer className="h-40 w-full rounded" />
            </div>
          </div>
        </ResponsiveLayout>
      </div>

      {/* BottomActionBar */}
      <div className="fixed left-0 right-0 z-40 bottom-16 lg:bottom-0 lg:right-0 lg:left-[288px] border-t-[1.5px] border-foreground bg-background">
        <div className="mx-auto w-full max-w-lg px-4 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+16px)]">
          <div className="flex gap-3">
            <Shimmer className="flex-1 h-11 rounded" />
            <Shimmer className="flex-1 h-11 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { JSX } from "react";

function Shimmer({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden bg-border ${className}`}>
      <div className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}

export default function ProfileHeaderSkeleton(): JSX.Element {
  return (
    <section className="border-[1.5px] border-foreground bg-card">
      <div className="flex flex-col md:grid md:grid-cols-[148px_1fr]">
        {/* 좌측: 아바타 */}
        <div className="flex items-center justify-center bg-surface-soft p-6 border-b-[1.5px] border-foreground md:border-b-0 md:border-r-[1.5px]">
          <Shimmer className="h-[72px] w-[72px] rounded-full" />
        </div>

        {/* 우측: 정보 */}
        <div className="flex flex-col">
          <div className="px-6 md:px-7 pt-6 md:pt-7 pb-4.5 space-y-3">
            <Shimmer className="h-2.5 w-16 rounded" />
            <Shimmer className="h-9 w-48 rounded" />
          </div>

          {/* 통계 스트립 */}
          <div className="grid grid-cols-3 border-t border-border">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`px-6 py-4 space-y-1.5 ${i !== 2 ? "border-r border-border" : ""}`}
              >
                <Shimmer className="h-7 w-10 rounded" />
                <Shimmer className="h-3 w-8 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

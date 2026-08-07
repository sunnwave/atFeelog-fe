import { JSX, CSSProperties } from "react";

function Bone({ className, style }: { className: string; style?: CSSProperties }) {
  return <div className={`bg-muted-foreground/15 animate-pulse ${className}`} style={style} />;
}

function DateHeaderSkeleton() {
  return (
    <div className="flex items-start gap-6 p-4 border-b-[1.5px]">
      {/* 날짜 큰 숫자 */}
      <Bone className="w-20 h-16 shrink-0" />
      <div className="flex-1 space-y-2 pt-1">
        {/* 공연명 뱃지 */}
        <Bone className="h-4 w-28" />
        {/* 제목 */}
        <Bone className="h-6 w-2/3" />
      </div>
    </div>
  );
}

function ProfileSkeleton({ className }: { className?: string }) {
  return (
    <div className={`flex items-center p-4 gap-3 border-b-[1.5px] ${className ?? ""}`}>
      <Bone className="w-10 h-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Bone className="h-3.5 w-24" />
        <Bone className="h-3 w-16" />
      </div>
      <Bone className="h-8 w-20 rounded-full shrink-0" />
    </div>
  );
}

function ShowInfoSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-3 border border-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-2.5 items-stretch">
          <Bone className="w-0.5 shrink-0" />
          <div className="space-y-1.5">
            <Bone className="h-2 w-10" />
            <Bone className="h-3.5 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ImageStripSkeleton() {
  return (
    <div className="flex gap-1 overflow-hidden">
      {[240, 180, 220].map((w, i) => (
        <Bone key={i} className={`h-[200px] shrink-0`} style={{ width: w }} />
      ))}
    </div>
  );
}

function BodySkeleton() {
  return (
    <div className="px-5 py-5 border-b border-border space-y-3">
      {[100, 100, 100, 85, 100, 60].map((w, i) => (
        <Bone key={i} className={`h-4`} style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

function ActionsSkeleton() {
  return (
    <div className="flex gap-2 p-3 border-b-[1.5px]">
      <Bone className="flex-1 h-10" />
      <Bone className="flex-1 h-10" />
    </div>
  );
}

function CommentsSkeleton() {
  return (
    <div className="p-3 space-y-5">
      <Bone className="h-4 w-14" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <Bone className="w-7 h-7 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Bone className="h-3 w-20" />
            <Bone className="h-3 w-full" />
            <Bone className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RecordDetailSkeleton(): JSX.Element {
  return (
    <div className="space-y-2 w-full lg:grid lg:grid-cols-[2fr_1fr] lg:items-start lg:space-y-0 lg:gap-8">
      <article className="lg:space-y-4">
        <DateHeaderSkeleton />
        <ProfileSkeleton className="lg:hidden" />
        <ShowInfoSkeleton />
        <ImageStripSkeleton />
        <BodySkeleton />
      </article>

      <aside className="border-t-[1.5px] lg:border-[1.5px]">
        <ProfileSkeleton className="hidden lg:flex" />
        <ActionsSkeleton />
        <CommentsSkeleton />
      </aside>
    </div>
  );
}

import { Bone } from "@/components/ui/feedback";

function FieldSkeleton({ searchable = false }: { searchable?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Bone className="h-5 w-16" />
      <div className="flex gap-2">
        <Bone className="h-11 min-w-0 flex-1" />
        {searchable && <Bone className="h-11 w-20 shrink-0" />}
      </div>
    </div>
  );
}

export default function RecordEditorFormSkeleton() {
  return (
    <div aria-busy="true">
      <span className="sr-only" role="status">기록을 불러오는 중입니다.</span>
      <div aria-hidden="true">
        {/* 제목 */}
        <div className="py-4 lg:p-5 border-b border-foreground/15 space-y-1.5">
          <Bone className="h-5 w-8" />
          <Bone className="h-10 w-full" />
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
          <Bone className="h-5 w-16" />
          <Bone className="h-24 w-full rounded" />
        </div>

        {/* 후기 / 감상 */}
        <div className="py-4 lg:px-5 lg:py-5 border-b border-foreground/15 space-y-1.5">
          <Bone className="h-5 w-20" />
          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="flex flex-wrap gap-2 border-b border-border bg-muted/30 px-3 py-2">
              {Array.from({ length: 7 }, (_, index) => (
                <Bone key={index} className="size-7 rounded-full" />
              ))}
            </div>
            <Bone className="min-h-[300px] w-full" />
            <div className="flex justify-between border-t border-border bg-muted/20 px-4 py-2">
              <Bone className="h-4 w-24" />
              <Bone className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

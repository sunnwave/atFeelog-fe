import PageHeader from "@/components/commons/layout/PageHeader";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import { Bone, TextSkeleton } from "@/components/ui/feedback";

export default function ShowDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader label="공연 상세" fallbackHref="/shows" />

      <ResponsiveLayout
        contentType="default"
        padded={false}
        className="flex flex-col gap-3 lg:pt-5 lg:pb-10 @container"
      >
        {/* 히어로 행 */}
        <div className="w-full flex flex-col gap-3 @lg:p-3 @lg:grid @lg:grid-cols-[5fr_2fr] @lg:items-start @lg:gap-5">
          {/* ShowDetailInfo 스켈레톤 */}
          <div className="flex w-full flex-col min-w-0 @sm:p-3 @lg:p-0 @sm:grid @sm:grid-cols-[1fr_1fr] @sm:gap-3 items-start">
            {/* 포스터 */}
            <Bone className="w-full aspect-3/4 border-[1.5px] border-foreground" />

            {/* 정보 컬럼 */}
            <div className="flex-1 p-4 flex flex-col gap-3 self-stretch">
              <Bone className="h-5 w-16" />
              <Bone className="h-8 w-3/4" />
              <TextSkeleton lines={4} className="pt-1" />
              <Bone className="h-9 w-full mt-auto" />
            </div>
          </div>

          {/* ShowTicketLinks 스켈레톤 */}
          <div className="flex flex-col gap-2 p-3 border-t-[1.5px] border-muted-foreground @lg:border-[1.5px]">
            <Bone className="h-3 w-16" />
            <div className="flex flex-col gap-1.5">
              {Array.from({ length: 2 }).map((_, i) => (
                <Bone key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
        </div>

        {/* 탭 스켈레톤 */}
        <div className="flex w-full flex-col">
          <Bone className="h-12 w-full" />
          <TextSkeleton lines={4} className="pt-7 px-3" />
        </div>
      </ResponsiveLayout>
    </div>
  );
}

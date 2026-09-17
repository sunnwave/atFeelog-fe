import Bone from "./Bone";

export default function CommentItemSkeleton() {
  return (
    <div className="w-full flex items-start gap-3">
      {/* Avatar */}
      <Bone className="h-8 w-8 rounded-full shrink-0" />
      <div className="flex flex-1 flex-col gap-2">
        {/* 이름 + 시간 */}
        <div className="flex items-baseline gap-2">
          <Bone className="h-3 w-20" />
          <Bone className="h-2.5 w-14" />
        </div>
        {/* 본문 */}
        <Bone className="h-3 w-full" />
        <Bone className="h-3 w-3/4" />
      </div>
    </div>
  );
}

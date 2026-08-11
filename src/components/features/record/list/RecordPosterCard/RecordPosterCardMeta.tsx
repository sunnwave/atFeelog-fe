import { RecordSummary } from "@/api/adapters/types/record-summary";
import Avatar from "@/components/ui/avatar/Avatar";
import { CommentIcon, HeartIcon } from "@/components/ui/icons";
import { useLikeRecord } from "@/shared/hooks/record/useLikeRecord";

export default function RecordPosterCardMeta({
  record,
}: {
  record: RecordSummary;
}) {
  const { onLikeRecord } = useLikeRecord();
  return (
    <div className="relative pt-4 pb-1.5 px-2 @card-xs:pt-5 @card-xs:pb-2 @card-xs:px-3 @card-md:pt-6 @card-md:pb-2.5 @card-md:px-4 border-t-[1.5px] border-foreground bg-card">
      <div className="absolute -top-3 left-2 @card-xs:-top-4 @card-xs:left-3 @card-md:-top-5 @card-md:left-4">
        <Avatar user={record.user ?? null} size="card" clickable />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] @card-xs:text-xs @card-md:text-base font-bold text-foreground truncate min-w-0">
          {record.user?.name}
        </span>
        <div className="flex items-center gap-3">
          <HeartIcon
            likeCount={record.likeCount}
            isLiked={record.isLiked ?? false}
            iconSize="xs"
            direction="row"
            iconColor="primary"
            onToggle={() => onLikeRecord(record.id)}
          />
          <CommentIcon
            count={record.commentCount ?? 0}
            iconSize="xs"
            direction="row"
            className="text-foreground/70"
          />
        </div>
      </div>
    </div>
  );
}

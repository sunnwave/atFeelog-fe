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
    <div className="relative pt-5 pb-2 px-3 md:pt-6 md:pb-2.5 md:px-4 border-t-[1.5px] border-foreground bg-card">
      <div className="absolute -top-3 left-3">
        <Avatar user={record.user ?? null} size="sm" type="filled" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs md:text-sm font-bold text-foreground truncate max-w-[55%]">
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

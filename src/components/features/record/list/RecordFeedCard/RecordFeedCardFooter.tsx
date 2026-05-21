import { RecordSummary } from "@/api/adapters/types/record-summary";
import Avatar from "@/components/ui/avatar/Avatar";
import CommentIcon from "@/components/ui/icons/commentIcon/CommentIcon";
import HeartIcon from "@/components/ui/icons/heartIcon/HeartIcon";
import { formatDate } from "@/shared/utils";

type Props = {
  user: RecordSummary["user"];
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
};

export default function RecordFeedCardFooter({
  user,
  createdAt,
  isLiked,
  likeCount,
  commentCount,
}: Props) {
  return (
    <div className="mt-4 flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 min-w-0">
        <Avatar user={user ?? undefined} size="xs" type="filled" />
        <span className="text-[11px] text-muted-foreground font-medium truncate">
          {user?.name ?? "익명"}
        </span>
        <span className="text-[11px] text-muted-foreground/40">·</span>
        <span className="text-[11px] text-muted-foreground/70 shrink-0">
          {formatDate(createdAt)}
        </span>
      </div>
      <div className="flex items-center gap-2.5 shrink-0">
        <HeartIcon
          isLiked={isLiked}
          likeCount={likeCount}
          iconSize="xs"
          direction="row"
          iconColor="neutral"
        />
        <CommentIcon count={commentCount} iconSize="xs" direction="row" />
      </div>
    </div>
  );
}

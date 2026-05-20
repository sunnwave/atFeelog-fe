import { JSX } from "react";
import { RecordSummary } from "@/api/adapters/types/record-summary";
import CommentIcon from "@/components/ui/icons/commentIcon/CommentIcon";
import HeartIcon from "@/components/ui/icons/heartIcon/HeartIcon";
import { CARD_UI_SIZE, UI_SIZE } from "@/shared/tokens";
import Profile from "@/components/commons/profile/Profile";

export default function RecordPosterCardBottom({
  record,
  size = "lg",
}: {
  record: RecordSummary;
  size?: CARD_UI_SIZE;
}): JSX.Element {
  const s = UI_SIZE[size];
  return (
    <div className="flex items-center justify-between">
      <Profile record={record} size={size} />
      <div className={`flex items-center ${s.gap}`}>
        <CommentIcon count={record.commentCount ?? 0} iconSize={size} />
        <HeartIcon
          likeCount={record.likeCount}
          isLiked={record.isLiked ?? false}
          iconSize={size}
        />
      </div>
    </div>
  );
}

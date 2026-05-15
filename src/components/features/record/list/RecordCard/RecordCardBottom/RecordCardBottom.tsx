import { JSX } from "react";
import { RecordSummary } from "@/api/adapters/types/record-summary";
import CommentIcon from "@/components/ui/icons/commentIcon/CommentIcon";
import HeartIcon from "@/components/ui/icons/heartIcon/HeartIcon";
import { CARD_UI_SIZE, UI_SIZE } from "@/shared/tokens";
import { useLikeRecord } from "@/shared/hooks/record/useLikeRecord";

export default function RecordCardBottom({
  record,
  size = "lg",
}: {
  record: RecordSummary;
  size?: CARD_UI_SIZE;
}): JSX.Element {
  const s = UI_SIZE[size];
  const { onLikeRecord } = useLikeRecord();

  return (
    <div className={`flex flex-col items-center ${s.gap} shrink-0`}>
      <HeartIcon
        likeCount={record.likeCount}
        isLiked={record.isLiked ?? false}
        iconSize={s.icon}
        direction="col"
        onToggle={() => onLikeRecord(record.id)}
      />
      <CommentIcon
        count={record.commentCount ?? 0}
        iconSize={s.icon}
        direction="col"
        className="text-white"
      />
    </div>
  );
}

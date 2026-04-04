import { JSX } from "react";
import { IBoard } from "@/shared/graphql/generated/types";
import CommentIcon from "@/components/ui/icons/commentIcon/CommentIcon";
import HeartIcon from "@/components/ui/icons/heartIcon/HeartIcon";
import { CARD_UI_SIZE, UI_SIZE } from "@/shared/tokens";
import Profile from "@/components/commons/profile/Profile";

export default function RecordCardBottom({
  board,
  size = "lg",
}: {
  board: IBoard;
  size?: CARD_UI_SIZE;
}): JSX.Element {
  const s = UI_SIZE[size];
  return (
    <div className="flex items-center justify-between">
      <Profile record={board} size={size} />
      <div className={`flex items-center ${s.gap}`}>
        {/* TODO: commentcount로 변경해야 함 */}
        <CommentIcon count={board.likeCount ?? 0} iconSize={size} />
        <HeartIcon
          likeCount={board.likeCount}
          isLiked={false}
          iconSize={size}
        />
      </div>
    </div>
  );
}

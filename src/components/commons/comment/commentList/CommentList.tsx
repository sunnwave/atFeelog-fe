import { IBoardComment } from "@/api/graphql/generated/types";
import { MessageCircle } from "lucide-react";
import CommentItem from "../commentItem/CommentItem";

export default function CommentList({
  isLoading,
  comments,
  subText = "이 기록에 대한 생각을 공유해주세요",
}: {
  isLoading?: boolean;
  comments: Array<IBoardComment>;
  subText?: string;
}) {
  // TODO: skeleton 구현
  if (isLoading) {
    <div>로딩 중...</div>;
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground mb-1">
          첫 댓글을 남겨보세요
        </p>
        <p className="text-xs text-muted-foreground">{subText}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

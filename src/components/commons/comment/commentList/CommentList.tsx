import CommentItem from "../commentItem/CommentItem";
import { RecordComment } from "@/api/adapters/types/record-comment";
import { EmptyState } from "@/components/ui/feedback";
import { EMPTY_MESSAGES, ERROR_MESSAGES } from "@/shared/constants/messages";
import { ApolloError } from "@apollo/client";

export default function CommentList({
  isLoading,
  comments,
  error,
}: {
  isLoading?: boolean;
  comments: Array<RecordComment>;
  error?: ApolloError;
}) {
  // TODO: skeleton 구현
  if (isLoading) {
    <div>로딩 중...</div>;
  }
  if (error) return <EmptyState {...ERROR_MESSAGES.comment} />;

  if (comments.length === 0) return <EmptyState {...EMPTY_MESSAGES.comment} />;

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

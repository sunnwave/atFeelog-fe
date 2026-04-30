import { useRouter } from "next/router";
import {
  CommentActionsProvider,
  CommentInput,
  CommentList,
} from "@/components/commons/comment";
import {
  useCreateRecordComment,
  useDeleteRecordComment,
  useFetchRecordComments,
  useUpdateRecordComment,
} from "./hooks";
import { useConfirmPreset } from "@/shared/hooks/ui/useConfirmPreset";
import { useInfiniteScroll } from "@/shared/hooks/ui/useInfiniteScroll";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "@/shared/stores";

export default function RecordComments() {
  const router = useRouter();
  const recordId =
    router.isReady && typeof router.query.recordId === "string"
      ? router.query.recordId
      : undefined;

  const [me] = useRecoilState(loggedInUserState);
  const IsLoggedIn = !!me;

  const { openConfirmPreset } = useConfirmPreset();

  const { comments, loading, hasMore, loadMore } =
    useFetchRecordComments(recordId);

  const { onCreateRecordComment } = useCreateRecordComment({ recordId });
  const { onUpdateRecordComment } = useUpdateRecordComment();
  const { onDeleteRecordComment } = useDeleteRecordComment();

  const requestDeleteComment = (commentId: string) => {
    openConfirmPreset("deleteComment", {
      onConfirm: async () => {
        await onDeleteRecordComment(commentId);
      },
    });
  };

  const onSubmit = (content: string) => {
    if (!IsLoggedIn) return;
    onCreateRecordComment({ content });
  };

  const targetRef = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    onLoadMore: loadMore,
  });

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-lg font-bold">
          댓글 <span>{comments.length}</span>
        </h2>
        <CommentActionsProvider
          value={{
            canEdit: (c) =>
              IsLoggedIn && (c.user?.id === me.id || c.user?.name === me.name),
            onSave: (commentId, next) => onUpdateRecordComment(commentId, next),
            onRequestDelete: (commentId) => requestDeleteComment(commentId),
          }}
        >
          <CommentList isLoading={loading} comments={comments} />
        </CommentActionsProvider>
        {hasMore && <div ref={targetRef} className="h-6" />}
        {loading && (
          <p className="text-xs text-center text-muted-foreground py-2">
            댓글을 불러오는 중...
          </p>
        )}

        <CommentInput onSubmit={onSubmit} isLoggedIn={IsLoggedIn} />
      </div>
    </>
  );
}

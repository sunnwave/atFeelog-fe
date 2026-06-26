import { gql, useMutation, ApolloCache } from "@apollo/client";
import type { Reference, StoreObject } from "@apollo/client";

import { IS_NEW_API } from "@/api/config";
import { useToast } from "@/components/commons/toast/ToastProvider";
import {
  toDeleteCommentVariables,
  type DeleteCommentInput,
  type DeleteCommentVars,
} from "@/api/adapters/record-comment-input.adapter";

const DELETE_RECORD_COMMENT_LEGACY = gql`
  mutation deleteBoardComment($boardCommentId: ID!) {
    deleteBoardComment(boardCommentId: $boardCommentId)
  }
`;

const DELETE_RECORD_COMMENT_NEW = gql`
  mutation deleteBoardComment($boardId: ID!) {
    deleteBoardComment(boardId: $boardId)
  }
`;

const DELETE_RECORD_COMMENT = IS_NEW_API
  ? DELETE_RECORD_COMMENT_NEW
  : DELETE_RECORD_COMMENT_LEGACY;

type DeleteCommentResponse = { deleteBoardComment: string };

export const useDeleteRecordComment = () => {
  const [deleteBoardComment] = useMutation<DeleteCommentResponse, DeleteCommentVars>(
    DELETE_RECORD_COMMENT,
  );

  const { error } = useToast();

  const onDeleteRecordComment = async (commentId: string) => {
    const input: DeleteCommentInput = { commentId };

    const updateCache = (cache: ApolloCache<unknown>) => {
      cache.modify({
        fields: {
          fetchBoardComments(
            existing: ReadonlyArray<Reference | StoreObject> = [],
            { readField }: { readField: (field: string, ref: Reference | StoreObject) => unknown },
          ) {
            const idField = IS_NEW_API ? "id" : "_id";
            return existing.filter((ref) => readField(idField, ref) !== commentId);
          },
        },
      });
    };

    try {
      await deleteBoardComment({
        variables: toDeleteCommentVariables(input),
        update: updateCache,
      });
    } catch (err) {
      if (err instanceof Error) {
        error(err.message || "댓글 삭제에 실패했습니다😢");
        console.error(err);
      }
    }
  };

  return { onDeleteRecordComment };
};

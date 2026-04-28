import { useToast } from "@/components/commons/toast/ToastProvider";
import {
  IMutation,
  IMutationDeleteBoardCommentArgs,
} from "@/api/graphql/generated/types";
import { gql, useMutation } from "@apollo/client";
import type { Reference, StoreObject } from "@apollo/client";

const DELETE_RECORD_COMMENT = gql`
  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {
    deleteBoardComment(password: $password, boardCommentId: $boardCommentId)
  }
`;

export const useDeleteRecordComment = ({ password }: { password: string }) => {
  const [deleteBoardComment] = useMutation<
    Pick<IMutation, "deleteBoardComment">,
    IMutationDeleteBoardCommentArgs
  >(DELETE_RECORD_COMMENT);

  const { error } = useToast();

  const onDeleteRecordComment = async (commentId: string) => {
    try {
      await deleteBoardComment({
        variables: { password, boardCommentId: commentId },
        update(cache) {
          cache.modify({
            fields: {
              fetchBoardComments(
                existing: ReadonlyArray<Reference | StoreObject> = [],
                { readField }
              ) {
                return existing.filter(
                  (ref) => readField("_id", ref) !== commentId
                );
              },
            },
          });
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        error(err.message || "댓글 삭제에 실패했습니다😢");
        console.error(err);
      }
    }
  };

  return {
    onDeleteRecordComment,
  };
};

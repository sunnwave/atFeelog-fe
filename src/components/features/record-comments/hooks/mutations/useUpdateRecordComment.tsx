import { gql, useMutation } from "@apollo/client";

import { IS_NEW_API } from "@/api/config";
import { useToast } from "@/components/commons/toast/ToastProvider";
import {
  toUpdateCommentVariables,
  type UpdateCommentInput,
  type UpdateCommentVars,
} from "@/api/adapters/record-comment-input.adapter";

const UPDATE_RECORD_COMMENT_LEGACY = gql`
  mutation updateBoardComment(
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $boardCommentId: ID!
  ) {
    updateBoardComment(
      updateBoardCommentInput: $updateBoardCommentInput
      boardCommentId: $boardCommentId
    ) {
      _id
      writer
      contents
      user {
        _id
        name
        picture
      }
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_RECORD_COMMENT_NEW = gql`
  mutation updateBoardComment($commentId: ID!, $content: String!) {
    updateBoardComment(commentId: $commentId, content: $content) {
      id
      content
      user {
        id
        name
        picture
      }
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_RECORD_COMMENT = IS_NEW_API
  ? UPDATE_RECORD_COMMENT_NEW
  : UPDATE_RECORD_COMMENT_LEGACY;

type UpdateCommentResponse = {
  updateBoardComment: {
    id: string;
    content: string;
    writer?: string;
    user?: {
      id: string;
      name: string;
      picture?: string;
    };
    createdAt: string;
    updatedAt: string;
  };
};

export const useUpdateRecordComment = () => {
  const [updateBoardComment] = useMutation<
    UpdateCommentResponse,
    UpdateCommentVars
  >(UPDATE_RECORD_COMMENT);

  const { success, error } = useToast();

  const onUpdateRecordComment = async (commentId: string, content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const input: UpdateCommentInput = { commentId, content: trimmed };

    try {
      await updateBoardComment({ variables: toUpdateCommentVariables(input) });
      success("댓글이 수정되었습니다");
    } catch (err) {
      if (err instanceof Error) {
        error(err.message || "댓글 수정에 실패했습니다😢");
        console.error(err);
      }
    }
  };

  return { onUpdateRecordComment };
};

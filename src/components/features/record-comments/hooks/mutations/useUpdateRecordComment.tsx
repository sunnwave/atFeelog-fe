import { IS_NEW_API } from "@/api/config";
import { useToast } from "@/components/commons/toast/ToastProvider";
import {
  IMutation,
  IMutationUpdateBoardCommentArgs,
} from "@/api/graphql/generated/types";
import { gql, useMutation } from "@apollo/client";

const idField = IS_NEW_API ? "id" : "_id";

const UPDATE_RECORD_COMMENT = gql`
  mutation updateBoardComment(
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $password: String
    $boardCommentId: ID!
  ) {
    updateBoardComment(
      updateBoardCommentInput: $updateBoardCommentInput
      password: $password
      boardCommentId: $boardCommentId
    ) {
      _id: ${idField}
      writer
      contents
      user {
        name
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

interface IUpdateRecordCommentReturn {
  onUpdateRecordComment: (
    commentId: string,
    newContents: string
  ) => Promise<void>;
}

export const useUpdateRecordComment = ({
  password,
}: {
  password: string;
}): IUpdateRecordCommentReturn => {
  const [updateBoardComment] = useMutation<
    Pick<IMutation, "updateBoardComment">,
    IMutationUpdateBoardCommentArgs
  >(UPDATE_RECORD_COMMENT);

  const { success, error } = useToast();

  const onUpdateRecordComment = async (
    commentId: string,
    newContents: string
  ) => {
    const contents = newContents.trim();
    if (!contents) return;

    try {
      await updateBoardComment({
        variables: {
          boardCommentId: commentId,
          // TODO: 유저 비밀번호 입력
          password,
          updateBoardCommentInput: {
            contents,
          },
        },
      });
      await success("댓글이 수정되었습니다");
    } catch (err) {
      if (err instanceof Error) {
        error(err.message || "댓글 수정에 실패했습니다😢");
        console.error(err);
      }
    }
  };

  return {
    onUpdateRecordComment,
  };
};

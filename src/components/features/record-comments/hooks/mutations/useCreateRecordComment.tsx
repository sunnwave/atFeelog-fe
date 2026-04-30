import { gql, useMutation } from "@apollo/client";

import { IS_NEW_API } from "@/api/config";
import { useToast } from "@/components/commons/toast/ToastProvider";
import type { User } from "@/api/adapters/types/user";
import {
  toCreateCommentVariables,
  type CreateCommentInput,
  type CreateCommentVars,
} from "@/api/adapters/record-comment-input.adapter";

const CREATE_RECORD_COMMENT_LEGACY = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
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
      __typename
    }
  }
`;

const CREATE_RECORD_COMMENT_NEW = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
    ) {
      id
      content
      user {
        id
        name
        picture
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

const CREATE_RECORD_COMMENT = IS_NEW_API
  ? CREATE_RECORD_COMMENT_NEW
  : CREATE_RECORD_COMMENT_LEGACY;

type CreateCommentResponse = {
  createBoardComment: {
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

interface UseCreateRecordCommentProps {
  recordId?: string;
  user?: User;
}

export const useCreateRecordComment = ({
  recordId,
  user,
}: UseCreateRecordCommentProps) => {
  const [createBoardComment] = useMutation<
    CreateCommentResponse,
    CreateCommentVars
  >(CREATE_RECORD_COMMENT);

  const { error } = useToast();

  const onCreateRecordComment = async ({
    content,
  }: Pick<CreateCommentInput, "content">) => {
    if (!recordId) {
      error("잘못된 게시글 ID입니다.");
      return;
    }

    const trimmed = content.trim();
    if (!trimmed) return;

    try {
      await createBoardComment({
        variables: toCreateCommentVariables({
          boardId: recordId,
          content: trimmed,
          user,
        }),
        update(cache, { data }) {
          if (!data) return;
          cache.modify({
            fields: {
              fetchBoardComments(existing = []) {
                return [data.createBoardComment, ...existing];
              },
            },
          });
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        error(err.message || "댓글 작성에 실패했습니다😢");
        console.error(err);
      }
    }
  };

  return { onCreateRecordComment };
};

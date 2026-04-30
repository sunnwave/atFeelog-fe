import { IS_NEW_API } from "../config";
import type {
  IMutationCreateBoardCommentArgs,
  IMutationUpdateBoardCommentArgs,
  IMutationDeleteBoardCommentArgs,
} from "../graphql/generated/types";
import type {
  IMutationCreateBoardCommentArgs as INewMutationCreateBoardCommentArgs,
  IMutationUpdateBoardCommentArgs as INewMutationUpdateBoardCommentArgs,
  IMutationDeleteBoardCommentArgs as INewMutationDeleteBoardCommentArgs,
} from "../graphql/generated/types.new";
import { User } from "./types/user";

export interface CreateCommentInput {
  boardId: string;
  content: string;
  user?: User;
}

export interface UpdateCommentInput {
  commentId: string;
  content: string;
}

export interface DeleteCommentInput {
  commentId: string;
}

export function toCreateCommentVariables(
  input: CreateCommentInput,
): IMutationCreateBoardCommentArgs | INewMutationCreateBoardCommentArgs {
  if (IS_NEW_API) {
    return {
      boardId: input.boardId,
      createBoardCommentInput: { content: input.content },
    } satisfies INewMutationCreateBoardCommentArgs;
  }

  return {
    boardId: input.boardId,
    createBoardCommentInput: {
      contents: input.content,
      writer: input.user?.name,
      rating: 0,
    },
  } satisfies IMutationCreateBoardCommentArgs;
}

export function toUpdateCommentVariables(
  input: UpdateCommentInput,
): IMutationUpdateBoardCommentArgs | INewMutationUpdateBoardCommentArgs {
  if (IS_NEW_API) {
    return {
      commentId: input.commentId,
      content: input.content,
    } satisfies INewMutationUpdateBoardCommentArgs;
  }

  return {
    boardCommentId: input.commentId,
    updateBoardCommentInput: { contents: input.content },
  } satisfies IMutationUpdateBoardCommentArgs;
}

export function toDeleteCommentVariables(
  input: DeleteCommentInput,
): IMutationDeleteBoardCommentArgs | INewMutationDeleteBoardCommentArgs {
  if (IS_NEW_API) {
    // 새 API는 boardId 필드명으로 댓글 ID를 받음
    return {
      boardId: input.commentId,
    } satisfies INewMutationDeleteBoardCommentArgs;
  }

  return {
    boardCommentId: input.commentId,
  } satisfies IMutationDeleteBoardCommentArgs;
}

export type CreateCommentVars = ReturnType<typeof toCreateCommentVariables>;
export type UpdateCommentVars = ReturnType<typeof toUpdateCommentVariables>;
export type DeleteCommentVars = ReturnType<typeof toDeleteCommentVariables>;

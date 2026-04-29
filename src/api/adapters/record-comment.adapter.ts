import { IS_NEW_API } from "../config";
import { IBoardComment as INewBoardComment } from "../graphql/generated/types.new";
import { IBoardComment as ILegacyBoardComment } from "../graphql/generated/types";
import { toUser } from "./user.adapter";
import { RecordComment } from "./types/record-comment";

export function toRecordComment(
  dto: INewBoardComment | ILegacyBoardComment,
): RecordComment {
  if (IS_NEW_API) {
    const comment = dto as INewBoardComment;
    return {
      id: comment.id,
      content: comment.content,
      user: comment.user ? toUser(comment.user) : undefined,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt ?? undefined,
    };
  }

  const comment = dto as ILegacyBoardComment;
  return {
    id: comment._id,
    content: comment.contents,
    user: comment.user
      ? toUser(comment.user)
      : comment.writer
        ? {
            id: "",
            name: comment.writer ?? "익명",
            email: "",
            picture: undefined,
          }
        : undefined,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt ?? undefined,
  };
}

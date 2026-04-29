import { IS_NEW_API } from "../config";
import { RecordSummary } from "./types/record-summary";
import type { IBoard as ILegacyBoard } from "../graphql/generated/types";
import type { IBoard as INewBoard } from "../graphql/generated/types.new";
import { toUser } from "./user.adapter";
import { parseRecordMetaBlock } from "@/components/features/record";

// record-summary.adapter.ts
export function toRecordSummary(dto: ILegacyBoard | INewBoard): RecordSummary {
  if (IS_NEW_API) {
    const board = dto as INewBoard;
    return {
      id: board.id,
      title: board.title,
      showName: board.showName,
      artistName: board.artistName,
      likeCount: board.likeCount,
      commentCount: board.commentCount,
      images: board.images ?? [],
      isLiked: board.isLiked,
      user: board.user ? toUser(board.user) : undefined,
      createdAt: board.createdAt,
    } as RecordSummary;
  }

  const board = dto as ILegacyBoard;

  const meta = parseRecordMetaBlock(board.contents) ?? {
    showName: "",
    artistName: undefined,
    showDate: "",
    x: undefined,
    y: undefined,
  };

  return {
    id: board._id,
    title: board.title,
    showName: meta.showName,
    artistName: meta.artistName,
    likeCount: board.likeCount,
    images: board.images ?? [],
    user: board.user
      ? toUser(board.user)
      : board.writer
        ? {
            id: "",
            name: board.writer ?? "익명",
            email: "",
            picture: undefined,
          }
        : undefined,
    createdAt: board.createdAt,
  } as RecordSummary;
}

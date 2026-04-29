// src/api/adapters/record.adapter.ts
import { IS_NEW_API } from "@/api/config";
import type { IBoard as ILegacyBoard } from "@/api/graphql/generated/types";
import type { IBoard as INewBoard } from "@/api/graphql/generated/types.new";
import type { RecordDetail } from "./types/record";
import { toUser } from "./user.adapter";
import { parseRecordMetaBlock } from "@/components/features/record";
import { toAddress } from "./address.adapter";

export function toRecordDetail(dto: ILegacyBoard | INewBoard): RecordDetail {
  if (IS_NEW_API) {
    const board = dto as INewBoard;
    return {
      id: board.id,
      title: board.title,
      showName: board.showName,
      artistName: board.artistName,
      contents: board.contents,
      showDate: board.showDate,
      images: board.images ?? [],
      likeCount: board.likeCount,
      isLiked: board.isLiked,
      user: board.user ? toUser(board.user) : undefined,
      boardAddress: board.boardAddress
        ? toAddress(board.boardAddress)
        : undefined,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    };
  }

  const board = dto as ILegacyBoard;

  const {
    showName = "",
    artistName = "",
    showDate = "",
    x,
    y,
  } = parseRecordMetaBlock(board.contents) ?? {};

  return {
    id: board._id,
    title: board.title,
    showName,
    artistName,
    showDate,
    contents: board.contents,
    images: board.images ?? [],
    likeCount: board.likeCount,
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
    boardAddress: board.boardAddress
      ? toAddress(board.boardAddress, { x, y })
      : undefined,
    createdAt: board.createdAt,
    updatedAt: board.updatedAt,
  };
}

import { IBoard } from "@/api/graphql/generated/types";
import { CARD_UI_SIZE, UI_SIZE } from "@/shared/tokens";
import { JSX } from "react";
import { getRecordPreviewText } from "../../lib/getRecordPreviewText";

export default function RecordCardContent({
  board,
  size = "lg",
}: {
  board: IBoard;
  size?: CARD_UI_SIZE;
}): JSX.Element {
  const s = UI_SIZE[size];

  const preview = getRecordPreviewText(board.contents ?? "");

  return (
    <div className="mb-2">
      <h3 className={`${s.title} font-bold ${s.titleClamp}`}>{board.title}</h3>
      <p className={`${s.body} text-white/80 ${s.bodyClamp}`}>{preview}</p>
    </div>
  );
}

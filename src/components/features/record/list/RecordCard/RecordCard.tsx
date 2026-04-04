import { IBoard } from "@/shared/graphql/generated/types";
import Image from "next/image";
import { useRouter } from "next/router";
import { JSX } from "react";
import RecordCardBottom from "./RecordCardBottom/RecordCardBottom";
import GradientBg from "./GradientBg";
import BookMarkIcon from "@/components/ui/icons/bookmarkIcon/BookMarkIcon";
import { CARD_UI_SIZE, UI_SIZE } from "@/shared/tokens";
import RecordCardContent from "./RecordCardContent";
import { getImageUrl } from "@/shared/utils";

export default function RecordCard({
  board,
  size = "lg",
}: {
  board: IBoard;
  size?: CARD_UI_SIZE;
}): JSX.Element {
  const s = UI_SIZE[size];
  const router = useRouter();

  const hasImages = board.images?.some((image) => !!image?.trim()) ?? false;

  const onClick = () => {
    void router.push(`/records/${board._id}`);
  };

  return (
    <article
      onClick={onClick}
      className={`relative w-full bg-card rounded-2xl hover:border-primary/50 hover:shadow-xl transition-all overflow-hidden cursor-pointer group aspect-[3/4] ${s.pad}`}
    >
      {hasImages ? (
        <Image
          src={getImageUrl(board.images![0])}
          alt={board.title}
          fill
          className="absolute inset-0 z-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <GradientBg boardId={board._id} />
      )}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className={`absolute z-20 ${s.bookmarkPos}`}>
        <BookMarkIcon isSaved={false} iconSize={size} />
      </div>
      <div
        className={`absolute z-10 inset-x-0 bottom-0 text-white flex flex-col ${s.pad}`}
      >
        <RecordCardContent board={board} size={size} />
        <RecordCardBottom board={board} size={size} />
      </div>
    </article>
  );
}

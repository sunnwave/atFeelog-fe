import { RecordSummary } from "@/api/adapters/types/record-summary";
import Image from "next/image";
import { useRouter } from "next/router";
import { JSX } from "react";
import RecordPosterCardBottom from "./RecordPosterCardBottom/RecordPosterCardBottom";
import GradientBg from "@/components/ui/gradient-bg/GradientBg";
import BookMarkIcon from "@/components/ui/icons/bookmarkIcon/BookMarkIcon";
import { CARD_UI_SIZE, UI_SIZE } from "@/shared/tokens";
import RecordPosterCardContent from "./RecordPosterCardContent";
import { getImageUrl } from "@/shared/utils";

export default function RecordPosterCard({
  record,
  size = "lg",
}: {
  record: RecordSummary;
  size?: CARD_UI_SIZE;
}): JSX.Element {
  const s = UI_SIZE[size];
  const router = useRouter();

  const hasImages = record.images?.some((image) => !!image?.trim()) ?? false;

  const onClick = () => {
    void router.push(`/records/${record.id}`);
  };

  return (
    <article
      onClick={onClick}
      className={`relative w-full bg-card rounded-2xl hover:border-primary/50 hover:shadow-xl transition-all overflow-hidden cursor-pointer group aspect-[3/4] ${s.pad}`}
    >
      {hasImages ? (
        <Image
          src={getImageUrl(record.images![0])}
          alt={record.title}
          fill
          className="absolute inset-0 z-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <GradientBg boardId={record.id} />
      )}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className={`absolute z-20 ${s.bookmarkPos}`}>
        <BookMarkIcon isSaved={false} iconSize={size} />
      </div>
      <div
        className={`absolute z-10 inset-x-0 bottom-0 text-white flex flex-col ${s.pad}`}
      >
        <RecordPosterCardContent record={record} size={size} />
        <RecordPosterCardBottom record={record} size={size} />
      </div>
    </article>
  );
}

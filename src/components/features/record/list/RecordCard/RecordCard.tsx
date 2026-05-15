import { RecordSummary } from "@/api/adapters/types/record-summary";
import Image from "next/image";
import { useRouter } from "next/router";
import { JSX } from "react";
import RecordCardBottom from "./RecordCardBottom/RecordCardBottom";
import RecordCardContent from "./RecordCardContent";
import GradientBg from "@/components/ui/gradient-bg/GradientBg";
import Profile from "@/components/commons/profile/Profile";
import FollowButton from "./FollowButton";
import { CARD_UI_SIZE, UI_SIZE } from "@/shared/tokens";
import { getImageUrl } from "@/shared/utils";

export default function RecordCard({
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
      className="relative w-full bg-card rounded-2xl hover:shadow-xl transition-all overflow-hidden cursor-pointer group aspect-3/4"
    >
      {/* Background */}
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

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 z-10 h-2/5 bg-linear-to-b from-black/65 to-transparent" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-3/5 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

      {/* TOP: Profile + Follow button */}
      <div
        className={`absolute z-20 top-0 inset-x-0 flex items-center justify-between ${s.pad}`}
      >
        <Profile record={record} size={size} tone="white" />
        <FollowButton size={size} />
      </div>

      {/* BOTTOM: Content left + Icons right */}
      <div
        className={`absolute z-20 bottom-0 inset-x-0 flex items-end gap-3 ${s.pad}`}
      >
        <div className="flex-1 min-w-0">
          <RecordCardContent record={record} size={size} />
        </div>
        <RecordCardBottom record={record} size={size} />
      </div>
    </article>
  );
}

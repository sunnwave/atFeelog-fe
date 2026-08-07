import { RecordSummary } from "@/api/adapters/types/record-summary";
import { getImageUrl } from "@/shared/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { JSX } from "react";
import LabelBadge from "@/components/ui/badge/LabelBadge";
import RecordPosterCardMeta from "./RecordPosterCardMeta";
import RecordPosterCardDate from "./RecordPosterCardDate";
import NoImagePosterCard from "./NoImagePosterCard";

export default function RecordPosterCard({
  record,
  showMeta = false,
  showBorder = true,
}: {
  record: RecordSummary;
  showMeta?: boolean;
  showBorder?: boolean;
}): JSX.Element {
  const router = useRouter();

  const hasImage = record.images?.some((img) => !!img?.trim()) ?? false;

  const label = record.artistName ?? record.user?.name;

  const onClick = () => void router.push(`/feelog/${record.id}`);

  return (
    <div
      className={`group${showBorder ? " border-r-[1.5px] border-b-[1.5px] border-foreground" : ""}`}
    >
      <div
        onClick={onClick}
        className="cursor-pointer relative aspect-3/4 overflow-hidden"
      >
        {hasImage ? (
          <>
            <Image
              src={getImageUrl(record.images![0])}
              alt={record.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/30" />
            <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-5">
              <div className="flex items-center justify-between">
                <LabelBadge variant="point" size="responsive">
                  {label}
                </LabelBadge>
                <RecordPosterCardDate date={record.createdAt} />
              </div>
              <p className="text-white text-base md:text-2xl font-black leading-tight tracking-tight line-clamp-2">
                {record.title}
              </p>
            </div>
          </>
        ) : (
          <NoImagePosterCard>
            <div className="flex items-center justify-between">
              <LabelBadge variant="point" size="responsive">
                {label}
              </LabelBadge>
              <RecordPosterCardDate date={record.createdAt} variant="light" />
            </div>
            <p className="text-foreground text-base md:text-2xl font-black leading-tight tracking-tight line-clamp-2 group-hover:text-background transition-colors duration-300">
              {record.title}
            </p>
          </NoImagePosterCard>
        )}
      </div>
      {showMeta && <RecordPosterCardMeta record={record} />}
    </div>
  );
}

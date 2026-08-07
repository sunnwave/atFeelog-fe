import { RecordSummary } from "@/api/adapters/types/record-summary";
import HeartIcon from "@/components/ui/icons/heartIcon/HeartIcon";
import CommentIcon from "@/components/ui/icons/commentIcon/CommentIcon";
import Avatar from "@/components/ui/avatar/Avatar";
import { useLikeRecord } from "@/shared/hooks/record/useLikeRecord";
import { getImageUrl, parseDateLabel } from "@/shared/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { JSX } from "react";
import LabelBadge from "@/components/ui/badge/LabelBadge";

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
  const { onLikeRecord } = useLikeRecord();
  const hasImage = record.images?.some((img) => !!img?.trim()) ?? false;
  const { mon, day } = parseDateLabel(record.createdAt);
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
                <div className="flex flex-col items-end leading-none">
                  <span className="text-[10px] font-black tracking-widest text-white/50 uppercase">
                    {mon}
                  </span>
                  <span className="text-lg md:text-2xl font-black text-white/90 tracking-tight">
                    {day}
                  </span>
                </div>
              </div>
              <p className="text-white text-base md:text-2xl font-black leading-tight tracking-tight line-clamp-2">
                {record.title}
              </p>
            </div>
          </>
        ) : (
          <div
            className="w-full h-full flex flex-col justify-between p-3 md:p-5 bg-white group-hover:bg-foreground transition-all duration-300"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(33,33,33,0.13) 1.5px, transparent 1.5px)",
              backgroundSize: "16px 16px",
            }}
          >
            <div className="flex items-center justify-between">
              <LabelBadge variant="point" size="responsive">
                {label}
              </LabelBadge>
              <div className="flex flex-col items-end leading-none">
                <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase group-hover:text-background/50 transition-colors duration-300">
                  {mon}
                </span>
                <span className="text-lg md:text-2xl font-black text-foreground tracking-tight group-hover:text-background transition-colors duration-300">
                  {day}
                </span>
              </div>
            </div>
            <p className="text-foreground text-base md:text-2xl font-black leading-tight tracking-tight line-clamp-2 group-hover:text-background transition-colors duration-300">
              {record.title}
            </p>
          </div>
        )}
      </div>

      {showMeta && (
        <div className="relative pt-5 pb-2 px-3 md:pt-6 md:pb-2.5 md:px-4 border-t-[1.5px] border-foreground bg-card">
          <div className="absolute -top-3 left-3">
            <Avatar user={record.user ?? null} size="sm" type="filled" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm font-bold text-foreground truncate max-w-[55%]">
              {record.user?.name}
            </span>
            <div className="flex items-center gap-3">
              <HeartIcon
                likeCount={record.likeCount}
                isLiked={record.isLiked ?? false}
                iconSize="xs"
                direction="row"
                iconColor="primary"
                onToggle={() => onLikeRecord(record.id)}
              />
              <CommentIcon
                count={record.commentCount ?? 0}
                iconSize="xs"
                direction="row"
                className="text-foreground/70"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

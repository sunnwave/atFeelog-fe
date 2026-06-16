import { RecordSummary } from "@/api/adapters/types/record-summary";
import HeartIcon from "@/components/ui/icons/heartIcon/HeartIcon";
import CommentIcon from "@/components/ui/icons/commentIcon/CommentIcon";
import Avatar from "@/components/ui/avatar/Avatar";
import { useLikeRecord } from "@/shared/hooks/record/useLikeRecord";
import { getImageUrl, parseDateLabel } from "@/shared/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { JSX } from "react";

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
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="bg-point text-white text-xs font-black tracking-widest uppercase px-2.5 py-1">
                  {label}
                </span>
                <div className="flex flex-col items-end leading-none">
                  <span className="text-[11px] font-black tracking-widest text-white/50 uppercase">
                    {mon}
                  </span>
                  <span className="text-2xl font-black text-white/90 tracking-tight">
                    {day}
                  </span>
                </div>
              </div>
              <p className="text-white text-2xl font-black leading-tight tracking-tight">
                {record.showName ?? record.title}
              </p>
            </div>
          </>
        ) : (
          <div
            className="w-full h-full flex flex-col justify-between p-5 bg-white group-hover:bg-foreground transition-all duration-300"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(33,33,33,0.13) 1.5px, transparent 1.5px)",
              backgroundSize: "16px 16px",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="border border-point text-point text-xs font-black tracking-widest uppercase px-2.5 py-1 bg-white/90 group-hover:bg-point group-hover:border-point group-hover:text-white transition-colors duration-300">
                {label}
              </span>
              <div className="flex flex-col items-end leading-none">
                <span className="text-[11px] font-black tracking-widest text-muted-foreground uppercase group-hover:text-background/50 transition-colors duration-300">
                  {mon}
                </span>
                <span className="text-2xl font-black text-foreground tracking-tight group-hover:text-background transition-colors duration-300">
                  {day}
                </span>
              </div>
            </div>
            <p className="text-foreground text-2xl font-black leading-tight tracking-tight group-hover:text-background transition-colors duration-300">
              {record.showName ?? record.title}
            </p>
          </div>
        )}
      </div>

      {showMeta && (
        <div className="relative pt-6 pb-2.5 px-4 border-t-[1.5px] border-foreground bg-card">
          <div className="absolute -top-3 left-3">
            <Avatar user={record.user ?? null} size="sm" type="filled" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-foreground truncate max-w-[55%]">
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

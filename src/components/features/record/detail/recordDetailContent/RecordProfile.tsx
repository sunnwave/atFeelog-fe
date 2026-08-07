import Avatar from "@/components/ui/avatar/Avatar";
import { JSX } from "react";
import { CARD_UI_SIZE, UI_SIZE } from "@/shared/tokens";
import { cn, fromNow } from "@/shared/utils";
import { RecordDetail } from "@/api/adapters/types/record";
import { RecordSummary } from "@/api/adapters/types/record-summary";
import FollowButton from "@/components/ui/button/FollowButton";

export default function RecordProfile({
  record,
  isFollowing,
  onFollow,
  className,
}: {
  record: RecordDetail | RecordSummary;
  isFollowing?: boolean;
  onFollow?: () => void;
  size?: CARD_UI_SIZE;
  className?: string;
}): JSX.Element {
  return (
    <div
      className={cn(
        ` bg-white flex flex-row items-center lg:border-b-[1.5px] p-2 lg:p-4 justify-between`,
        className,
      )}
    >
      <div className="flex flex-row gap-2 items-center">
        <Avatar clickable user={record.user || undefined} size="md" />
        <div className={`flex flex-col`}>
          <p className={` font-bold max-w-35 truncate`}>
            {record.user?.name ?? "익명"}
          </p>
          {/* 작성일 */}
          <p className={`text-xs text-muted-foreground`}>
            {fromNow(record.createdAt)}
          </p>
        </div>
      </div>
      <FollowButton isFollowing={isFollowing} onFollow={onFollow} />
    </div>
  );
}

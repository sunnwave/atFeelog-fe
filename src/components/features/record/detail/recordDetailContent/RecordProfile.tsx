import Avatar from "@/components/ui/avatar/Avatar";
import { JSX } from "react";
import { cn, fromNow } from "@/shared/utils";
import { RecordDetail } from "@/api/adapters/types/record";
import { RecordSummary } from "@/api/adapters/types/record-summary";
import { User } from "@/api/adapters/types/user";
import FollowButton from "@/components/ui/button/FollowButton";
import { useIsConnected } from "@/shared/hooks/user/useIsConnected";
import { useAddFollow } from "@/shared/hooks/user";

type RecordWithUser = (RecordDetail | RecordSummary) & { user: User };

export default function RecordProfile({
  record,
  className,
}: {
  record: RecordWithUser;
  className?: string;
}): JSX.Element {
  const { isConnected } = useIsConnected(record.user.id);
  const { onAddFollow } = useAddFollow();

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
      <FollowButton
        isFollowing={isConnected}
        onFollow={() => onAddFollow(record.user.id)}
      />
    </div>
  );
}

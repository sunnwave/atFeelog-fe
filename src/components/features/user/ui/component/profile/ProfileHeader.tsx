import Avatar from "@/components/ui/avatar/Avatar";
import { ProfileHeaderProps } from "../../../types";
import ProfileActions from "./ProfileActions";
import {
  useFetchBoardsCountByUser,
  useFetchCountOfFollowers,
  useFetchCountOfFollowing,
} from "../../../hooks";
import StatItem from "./StatItem";

export default function ProfileHeader({
  userId,
  user,
  isMe = false,
  onStatClick,
}: ProfileHeaderProps) {
  const { count: recordsCount } = useFetchBoardsCountByUser(userId);
  const { count: followersCount } = useFetchCountOfFollowers(userId);
  const { count: followingCount } = useFetchCountOfFollowing(userId);

  return (
    <section className="border-[1.5px] border-foreground bg-card">
      <div className="flex flex-col md:grid md:grid-cols-[148px_1fr]">
        {/* 좌측: 아바타 셀 */}
        <div className="flex items-center justify-center bg-surface-soft p-6 border-b-[1.5px] border-foreground md:border-b-0 md:border-r-[1.5px]">
          <Avatar user={user} size="lg" />
        </div>

        {/* 우측: 정보 */}
        <div className="flex flex-col">
          <div className="px-6 md:px-7 pt-6 md:pt-7 pb-4.5">
            <div className="flex items-start justify-between gap-5">
              <div className="flex flex-col min-w-0">
                <p className="text-[11px] font-black tracking-[0.18em] text-point uppercase">
                  {isMe ? "My Log" : `${user.name}'s Log`}
                </p>
                <h2 className="mt-2 text-[32px] md:text-[38px] leading-none tracking-[-0.07em] font-black text-foreground">
                  {user.name}
                </h2>
              </div>
              <ProfileActions isMe={isMe} userId={userId} />
            </div>
            {user.description && (
              <p className="mt-4.5 text-sm leading-relaxed text-foreground">
                {user.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 border-t border-border">
            <StatItem value={recordsCount} label="기록" />
            <StatItem
              value={followersCount}
              label="팔로워"
              hasBorderLeft
              onClick={onStatClick ? () => onStatClick("팔로워") : undefined}
            />
            <StatItem
              value={followingCount}
              label="팔로잉"
              hasBorderLeft
              onClick={onStatClick ? () => onStatClick("팔로잉") : undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

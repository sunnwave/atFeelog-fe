import Avatar from "@/components/ui/avatar/Avatar";
import { ProfileHeaderProps } from "../../../types";
import ProfileActions from "./ProfileActions";

const STATS = [
  { key: "recordsCount", label: "기록" },
  { key: "followersCount", label: "팔로워" },
  { key: "followingCount", label: "팔로잉" },
] as const;

export default function ProfileHeader({
  user,
  isMe = false,
  isFollowing,
  onFollow,
  onStatClick,
}: ProfileHeaderProps) {
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
                {user.handle && (
                  <p className="mt-2 text-sm font-extrabold text-muted-foreground">
                    {user.handle}
                  </p>
                )}
              </div>
              <ProfileActions
                isMe={isMe}
                isFollowing={isFollowing}
                onFollow={onFollow}
              />
            </div>
            {user.bio && (
              <p className="mt-4.5 text-sm leading-relaxed text-foreground">
                {user.bio}
              </p>
            )}
          </div>

          {/* 통계 스트립 */}
          {(() => {
            const visibleStats = STATS.filter(
              ({ key }) => user[key] !== undefined,
            );
            const colClass =
              visibleStats.length === 1
                ? "grid-cols-1"
                : visibleStats.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-3";
            return (
              <div className={`grid ${colClass} border-t border-border`}>
                {visibleStats.map(({ key, label }, i) => {
                  const clickTab =
                    key === "followersCount"
                      ? "팔로워"
                      : key === "followingCount"
                        ? "팔로잉"
                        : undefined;
                  const isClickable = !!clickTab && !!onStatClick;
                  return (
                    <div
                      key={key}
                      onClick={
                        isClickable ? () => onStatClick!(clickTab!) : undefined
                      }
                      className={`px-6 py-4 ${i !== visibleStats.length - 1 ? "border-r border-border" : ""} ${isClickable ? "cursor-pointer hover:bg-surface-soft transition-colors" : ""}`}
                    >
                      <div className="text-2xl font-black tracking-[-0.05em] leading-none text-foreground">
                        {user[key]}
                      </div>
                      <div className="mt-1 text-xs font-bold text-muted-foreground">
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

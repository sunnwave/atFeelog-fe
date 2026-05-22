import Avatar from "@/components/ui/avatar/Avatar";
import ProfileActions from "./ProfileActions";
import { ProfileHeaderProps } from "./types";

const STATS = [
  { key: "recordsCount", label: "기록" },
  { key: "followersCount", label: "팔로워" },
  { key: "followingCount", label: "팔로잉" },
] as const;

export default function ProfileHeader({
  user,
  isMe = false,
  isFollowing,
}: ProfileHeaderProps) {
  return (
    <section className="border border-border bg-card">
      <div className="flex flex-col md:grid md:grid-cols-[148px_1fr]">
        {/* 좌측: 아바타 셀 */}
        <div className="flex items-center justify-center bg-surface-soft p-6 border-b border-border md:border-b-0 md:border-r">
          <Avatar user={user} size="lg" type="filled" />
        </div>

        {/* 우측: 정보 */}
        <div className="flex flex-col">
          <div className="px-6 md:px-7 pt-6 md:pt-7 pb-4.5">
            <div className="flex items-start justify-between gap-5">
              <div className="flex flex-col min-w-0">
                <p className="text-[11px] font-black tracking-[0.18em] text-point uppercase">
                  {isMe ? "My Archive" : "User Archive"}
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
              <ProfileActions isMe={isMe} isFollowing={isFollowing} />
            </div>
            {user.bio && (
              <p className="mt-4.5 text-sm leading-relaxed text-foreground">
                {user.bio}
              </p>
            )}
          </div>

          {/* 통계 스트립 */}
          <div className="grid grid-cols-3 border-t border-border">
            {STATS.map(({ key, label }, i) => (
              <div
                key={key}
                className={`px-6 py-4 ${i !== 2 ? "border-r border-border" : ""}`}
              >
                <div className="text-2xl font-black tracking-[-0.05em] leading-none text-foreground">
                  {user[key]}
                </div>
                <div className="mt-1 text-xs font-bold text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

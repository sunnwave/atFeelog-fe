import { cn } from "@/shared/utils/cn";
import UserRow from "./UserRow";
import type { FollowListPanelProps } from "../../../types";
import { useFetchFollowers, useFetchFollowing } from "../../../hooks";

export default function FollowListPanel({
  openPanel,
  onPanelChange,
  onClose,
  loggedInUserId,
  userId,
}: FollowListPanelProps) {
  const { users: followings, loading: loadingFollowings } =
    useFetchFollowing(userId);
  const { users: followers, loading: loadingFollowers } =
    useFetchFollowers(userId);

  const users = openPanel === "팔로워" ? followers : followings;
  const loading = openPanel === "팔로워" ? loadingFollowers : loadingFollowings;

  const tabHeader = (
    <div className="flex border-b-[1.5px] border-foreground shrink-0">
      {(["팔로워", "팔로잉"] as const).map((tab, i) => (
        <button
          key={tab}
          type="button"
          onClick={() => onPanelChange(tab)}
          className={cn(
            "flex-1 py-3 text-[11px] font-black tracking-[0.16em] uppercase transition-colors",
            i === 0 && "border-r-[1.5px] border-foreground",
            openPanel === tab
              ? "bg-foreground text-white"
              : "bg-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {tab} {tab === "팔로워" ? followers.length : followings.length}
        </button>
      ))}
      <button
        type="button"
        onClick={onClose}
        className="px-4 border-l-[1.5px] border-foreground text-foreground hover:bg-surface-soft transition-colors text-lg font-black"
        aria-label="닫기"
      >
        ×
      </button>
    </div>
  );

  const listContent = (
    <div className="overflow-y-auto flex-1">
      {loading ? (
        <p className="px-4 py-6 text-sm text-muted-foreground text-center">
          불러오는 중...
        </p>
      ) : users.length === 0 ? (
        <p className="px-4 py-6 text-sm text-muted-foreground text-center">
          {openPanel === "팔로워"
            ? "팔로워가 없습니다."
            : "팔로잉하는 사람이 없습니다."}
        </p>
      ) : (
        users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            isMe={user.id === loggedInUserId}
          />
        ))
      )}
    </div>
  );

  return (
    <>
      {/* 모바일(lg 미만): 헤더 아래 인라인 확장 (D) */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ maxHeight: openPanel ? 360 : 0 }}
      >
        <div
          className="flex flex-col border-[1.5px] border-t-0 border-foreground bg-card"
          style={{ height: 360 }}
        >
          {tabHeader}
          {listContent}
        </div>
      </div>

      {/* 데스크탑(lg 이상): flex 형제로 ProfileHeader를 밀어내는 사이드 드로어 (B) */}
      <div
        className="hidden lg:block shrink-0 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ width: openPanel ? 280 : 0 }}
      >
        <div
          className="h-full flex flex-col bg-card border-[1.5px] border-l-0 border-foreground"
          style={{ width: 280 }}
        >
          {tabHeader}
          {listContent}
        </div>
      </div>
    </>
  );
}

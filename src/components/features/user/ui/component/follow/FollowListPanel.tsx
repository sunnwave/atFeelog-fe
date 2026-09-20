import UserRow from "./UserRow";
import type { FollowTab } from "../../../types";
import { useFetchFollowers, useFetchFollowing } from "../../../hooks";
import { EmptyState, LoadingIndicator } from "@/components/ui/feedback";
import { EMPTY_MESSAGES } from "@/shared/constants/messages";
import Tabs from "@/components/ui/tabs/Tabs";

interface FollowListPanelProps {
  userId: string;
  openPanel: FollowTab | null;
  onPanelChange: (tab: FollowTab) => void;
  onClose: () => void;
  followersCount?: number;
  followingsCount?: number;
  loggedInUserId?: string;
}

export default function FollowListPanel({
  openPanel,
  onPanelChange,
  onClose,
  loggedInUserId,
  userId,
  followersCount,
  followingsCount,
}: FollowListPanelProps) {
  const { users: followings, loading: loadingFollowings } = useFetchFollowing(
    userId,
    openPanel !== "followings",
  );
  const { users: followers, loading: loadingFollowers } = useFetchFollowers(
    userId,
    openPanel !== "followers",
  );

  const users = openPanel === "followers" ? followers : followings;
  const loading =
    openPanel === "followers" ? loadingFollowers : loadingFollowings;

  const TABS = [
    {
      id: "followers" as const,
      label: `팔로워 ${followersCount}`,
    },
    { id: "followings" as const, label: `팔로잉 ${followingsCount}` },
  ];

  const tabHeader = (
    <div className="flex border-b-[1.5px] border-foreground shrink-0">
      <Tabs
        tabs={TABS}
        activeTab={openPanel ?? "followers"}
        onChange={onPanelChange}
        className="flex-1 border-y-0"
      />
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
    <div className="overflow-y-auto flex-1 min-h-0">
      {loading ? (
        <LoadingIndicator label="불러오는 중.." className="p-5" />
      ) : users.length === 0 ? (
        openPanel === "followers" ? (
          <EmptyState {...EMPTY_MESSAGES.user.follower} />
        ) : (
          <EmptyState {...EMPTY_MESSAGES.user.following} />
        )
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

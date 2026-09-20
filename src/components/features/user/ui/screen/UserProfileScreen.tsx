import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import { IS_NEW_API } from "@/api/config";
import type { ProfileUser, FollowTab } from "../../types";
import {
  useFetchCountOfFollowers,
  useFetchCountOfFollowing,
  useFetchUser,
} from "../../hooks";
import ProfileHeader from "../component/profile/ProfileHeader";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import FollowListPanel from "../component/follow/FollowListPanel";
import Tabs from "@/components/ui/tabs/Tabs";
import { LoadingIndicator } from "@/components/ui/feedback";
import {
  UserRecordGrid,
  UserLikedRecordGrid,
  UserSavedShowGrid,
} from "../component/user-content-grid";

type GridTab = "records" | "liked" | "saved";

const GRID_TABS = [
  { id: "records" as const, label: "필로그" },
  { id: "liked" as const, label: "좋아요" },
  { id: "saved" as const, label: "찜한 공연" },
];

export default function UserProfileScreen() {
  const router = useRouter();

  const userId =
    router.isReady && typeof router.query.userId === "string"
      ? router.query.userId
      : undefined;

  const loggedInUser = useRecoilValue(loggedInUserState);
  const isMe = !!loggedInUser?.id && loggedInUser.id === userId;

  const [activeTab, setActiveTab] = useState<GridTab>("records");
  const [openPanel, setOpenPanel] = useState<FollowTab | null>(null);

  const { user: fetchedUser, loading: userLoading } = useFetchUser(
    isMe ? undefined : userId,
  );
  const user: ProfileUser | undefined = isMe
    ? (loggedInUser ?? undefined)
    : fetchedUser;

  const { count: followersCount } = useFetchCountOfFollowers(userId);
  const { count: followingCount } = useFetchCountOfFollowing(userId);

  if (!userId) return null;
  if (!isMe && userLoading) {
    return <LoadingIndicator label="불러오는 중.." />;
  }
  if (!user) return null;

  const tabs = isMe ? GRID_TABS : GRID_TABS.slice(0, 2);

  return (
    <ResponsiveLayout contentType="wide" className="py-4 space-y-6">
      <div className="lg:flex lg:items-stretch">
        <div className="flex-1 min-w-0">
          <ProfileHeader
            user={user}
            userId={userId}
            isMe={isMe}
            followersCount={followersCount}
            followingsCount={followingCount}
            onStatClick={IS_NEW_API ? setOpenPanel : undefined}
          />
        </div>
        {IS_NEW_API && (
          <FollowListPanel
            userId={userId}
            followersCount={followersCount}
            followingsCount={followingCount}
            openPanel={openPanel}
            onPanelChange={setOpenPanel}
            onClose={() => setOpenPanel(null)}
            loggedInUserId={loggedInUser?.id ?? undefined}
          />
        )}
      </div>
      <section>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="w-full border-x-[1.5px]"
        />
        {activeTab === "records" && <UserRecordGrid userId={userId} />}
        {activeTab === "liked" && <UserLikedRecordGrid userId={userId} />}
        {activeTab === "saved" && <UserSavedShowGrid />}
      </section>
    </ResponsiveLayout>
  );
}

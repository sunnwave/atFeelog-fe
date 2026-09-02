import { JSX, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import { IS_NEW_API } from "@/api/config";
import type { ProfileUser, UserProfilePageProps, FollowTab } from "../../types";
import ProfileHeader from "../component/profile/ProfileHeader";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import FollowListPanel from "../component/follow/FollowListPanel";
import {
  useAddFollow,
  useFetchBoardsCountOfMine,
  useFetchBoardsCountByUser,
  useFetchCountOfFollowers,
  useFetchCountOfFollowing,
  useFetchFollowers,
  useFetchFollowing,
  useIsConnected,
} from "../../hooks";
import Tabs from "@/components/ui/tabs/Tabs";
import {
  UserRecordGrid,
  UserLikedRecordGrid,
  UserSavedShowGrid,
} from "../component/user-content-grid";

type Tab = "records" | "liked" | "saved";

const TABS_ALL = [
  { id: "records" as const, label: "필로그" },
  { id: "liked" as const, label: "좋아요" },
  { id: "saved" as const, label: "찜한 공연" },
];

export default function UserProfileScreen({
  userId,
}: UserProfilePageProps): JSX.Element {
  const router = useRouter();
  const loggedInUser = useRecoilValue(loggedInUserState);
  const isMe = !!loggedInUser?.id && loggedInUser.id === userId;

  const [activeTab, setActivTab] = useState<Tab>("records");
  const tabs = isMe ? TABS_ALL : TABS_ALL.slice(0, 2);

  const { isConnected, refetch: refetchIsConnected } = useIsConnected(userId);

  const [isFollowing, setIsFollowing] = useState(false);
  const [openTab, setOpenTab] = useState<FollowTab | null>(null);
  useEffect(() => {
    setIsFollowing(isConnected);
  }, [isConnected]);

  const nameFromQuery =
    typeof router.query.name === "string"
      ? decodeURIComponent(router.query.name)
      : undefined;
  const pictureFromQuery =
    typeof router.query.picture === "string"
      ? decodeURIComponent(router.query.picture)
      : undefined;

  const { count: myRecordsCount } = useFetchBoardsCountOfMine();
  const { count: userRecordsCount } = useFetchBoardsCountByUser(
    isMe ? undefined : userId,
  );
  const { count: followersCount, refetch: refetchFollowers } =
    useFetchCountOfFollowers(userId);
  const { count: followingCount } = useFetchCountOfFollowing(userId);
  const { users: followers, loading: loadingFollowers } =
    useFetchFollowers(userId);
  const { users: followings, loading: loadingFollowings } =
    useFetchFollowing(userId);
  const { users: myFollowings, refetch: refetchMyFollowings } =
    useFetchFollowing(loggedInUser?.id);
  const { onAddFollow } = useAddFollow();

  const myFollowingIds = useMemo(
    () =>
      new Set(myFollowings.map((u) => u.id).filter((id): id is string => !!id)),
    [myFollowings],
  );

  const recordsCount = isMe ? myRecordsCount : userRecordsCount;

  const handleFollow = async () => {
    try {
      const ok = await onAddFollow(userId);
      if (ok) {
        setIsFollowing((prev) => !prev);
        void refetchFollowers();
        void refetchIsConnected();
        void refetchMyFollowings();
      }
    } catch (e) {
      console.error("[follow] error:", e);
    }
  };

  const handleFollowUser = async (targetUserId: string) => {
    try {
      await onAddFollow(targetUserId);
      void refetchMyFollowings();
    } catch (e) {
      console.error("[follow user] error:", e);
    }
  };

  const user: ProfileUser =
    isMe && loggedInUser
      ? {
          id: loggedInUser.id ?? userId,
          name: loggedInUser.name,
          picture: loggedInUser.picture,
          recordsCount,
          followersCount: IS_NEW_API ? followersCount : undefined,
          followingCount: IS_NEW_API ? followingCount : undefined,
        }
      : {
          id: userId,
          name: nameFromQuery ?? userId,
          picture: pictureFromQuery,
          recordsCount,
          followersCount: IS_NEW_API ? followersCount : undefined,
          followingCount: IS_NEW_API ? followingCount : undefined,
        };

  return (
    <ResponsiveLayout contentType="wide" className="py-4 space-y-6">
      <div className="lg:flex lg:items-stretch">
        <div className="flex-1 min-w-0">
          <ProfileHeader
            user={user}
            isMe={isMe}
            isFollowing={isFollowing}
            onFollow={IS_NEW_API && !isMe ? handleFollow : undefined}
            onStatClick={IS_NEW_API ? setOpenTab : undefined}
          />
        </div>
        {IS_NEW_API && (
          <FollowListPanel
            openTab={openTab}
            onTabChange={setOpenTab}
            onClose={() => setOpenTab(null)}
            followers={followers}
            followings={followings}
            followersCount={followersCount}
            followingCount={followingCount}
            myFollowingIds={myFollowingIds}
            loggedInUserId={loggedInUser?.id ?? undefined}
            onFollow={handleFollowUser}
            loadingFollowers={loadingFollowers}
            loadingFollowings={loadingFollowings}
          />
        )}
      </div>
      <section>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActivTab}
          className="w-full border-x-[1.5px]"
        />
        {activeTab === "records" && <UserRecordGrid userId={userId} />}
        {activeTab === "liked" && <UserLikedRecordGrid userId={userId} />}
        {activeTab === "saved" && <UserSavedShowGrid />}
      </section>
    </ResponsiveLayout>
  );
}

import { JSX, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import type { ProfileUser, UserProfilePageProps, FollowTab } from "../../types";
import ProfileHeader from "../component/ProfileHeader";
import ProfileRecordGrid from "../component/ProfileRecordGrid";
import FollowListPanel from "../component/FollowListPanel";
import {
  useAddFollow,
  useFetchBoardsOfMine,
  useFetchBoardsCountOfMine,
  useFetchBoardsByUser,
  useFetchBoardsCountByUser,
  useFetchBoardsLikeByUser,
  useFetchCountOfFollowers,
  useFetchCountOfFollowing,
  useFetchFollowers,
  useFetchFollowing,
  useIsConnected,
} from "../../hooks";

export default function UserProfileScreen({
  userId,
}: UserProfilePageProps): JSX.Element {
  const router = useRouter();
  const loggedInUser = useRecoilValue(loggedInUserState);
  const isMe = !!loggedInUser?.id && loggedInUser.id === userId;

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

  const { records: myRecords } = useFetchBoardsOfMine();
  const { count: myRecordsCount } = useFetchBoardsCountOfMine();
  const { records: userRecords } = useFetchBoardsByUser(
    isMe ? undefined : userId,
  );
  const { count: userRecordsCount } = useFetchBoardsCountByUser(
    isMe ? undefined : userId,
  );
  const { records: likedRecords } = useFetchBoardsLikeByUser(userId);
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

  const records = isMe ? myRecords : userRecords;
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
          followersCount,
          followingCount,
        }
      : {
          id: userId,
          name: nameFromQuery ?? userId,
          picture: pictureFromQuery,
          recordsCount,
          followersCount,
          followingCount,
        };

  return (
    <div className="w-full space-y-6 px-4 py-6 md:px-0 md:py-8">
      <div className="lg:flex lg:items-stretch">
        <div className="flex-1 min-w-0">
          <ProfileHeader
            user={user}
            isMe={isMe}
            isFollowing={isFollowing}
            onFollow={isMe ? undefined : handleFollow}
            onStatClick={setOpenTab}
          />
        </div>
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
      </div>
      <ProfileRecordGrid records={records} likedRecords={likedRecords} />
    </div>
  );
}

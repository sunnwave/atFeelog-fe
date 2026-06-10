import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import { ProfileUser } from "./types";
import ProfileHeader from "./ProfileHeader";
import ProfileRecordGrid from "./ProfileRecordGrid";
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
} from "./hooks";

type Props = {
  userId: string;
};

export default function UserProfilePage({ userId }: Props): JSX.Element {
  const router = useRouter();
  const loggedInUser = useRecoilValue(loggedInUserState);
  const isMe = !!loggedInUser?.id && loggedInUser.id === userId;

  const { isConnected, refetch: refetchIsConnected } = useIsConnected(userId);

  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => { setIsFollowing(isConnected); }, [isConnected]);

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
  const { users: followers } = useFetchFollowers(userId);
  const { users: followings } = useFetchFollowing(userId);
  const { refetch: refetchMyFollowings } = useFetchFollowing(loggedInUser?.id);
  const { onAddFollow } = useAddFollow();

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

  // console.log("followers, followings, user:", { followers, followings, user });
  return (
    <div className="w-full space-y-6 px-4 py-6 md:px-0 md:py-8">
      <ProfileHeader
        user={user}
        isMe={isMe}
        isFollowing={isFollowing}
        onFollow={isMe ? undefined : handleFollow}
      />
      <ProfileRecordGrid records={records} likedRecords={likedRecords} />
    </div>
  );
}

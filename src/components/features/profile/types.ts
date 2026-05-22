export type ProfileUser = {
  id: string;
  name: string;
  handle?: string;
  bio?: string;
  picture?: string;
  recordsCount: number;
  followersCount: number;
  followingCount: number;
};

export type ProfileHeaderProps = {
  user: ProfileUser;
  isMe?: boolean;
  isFollowing?: boolean;
};

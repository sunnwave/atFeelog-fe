import type { User } from "@/api/adapters/types/user";

export type ProfileUser = {
  id: string;
  name: string;
  handle?: string;
  bio?: string;
  picture?: string;
};

export type ProfileHeaderProps = {
  userId: string;
  user: ProfileUser;
  isMe?: boolean;
  onStatClick?: (tab: FollowTab) => void;
};

export type ProfileActionsProps = {
  isMe: boolean;
  userId: string;
};

export type FollowTab = "팔로워" | "팔로잉";

export interface FollowListPanelProps {
  openTab: FollowTab | null;
  onTabChange: (tab: FollowTab) => void;
  onClose: () => void;
  followers: User[];
  followings: User[];
  followersCount: number;
  followingCount: number;
  myFollowingIds: Set<string>;
  loggedInUserId?: string;
  loadingFollowers?: boolean;
  loadingFollowings?: boolean;
}

export interface UserRowProps {
  user: User;
  isMe: boolean;
}

export type UserProfilePageProps = {
  userId: string;
};

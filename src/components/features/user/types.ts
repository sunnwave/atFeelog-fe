import type { User } from "@/api/adapters/types/user";
import type { RecordSummary } from "@/api/adapters/types/record-summary";

export type ProfileUser = {
  id: string;
  name: string;
  handle?: string;
  bio?: string;
  picture?: string;
  recordsCount: number;
  followersCount?: number;
  followingCount?: number;
};

export type ProfileHeaderProps = {
  user: ProfileUser;
  isMe?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onStatClick?: (tab: FollowTab) => void;
};

export type ProfileActionsProps = {
  isMe: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
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
  onFollow: (userId: string) => Promise<void>;
  loadingFollowers?: boolean;
  loadingFollowings?: boolean;
}

export type TabKey = "log" | "likes";

export interface UserRowProps {
  user: User;
  isFollowing: boolean;
  isMe: boolean;
  onFollow: () => Promise<void>;
}

export type UserProfilePageProps = {
  userId: string;
};
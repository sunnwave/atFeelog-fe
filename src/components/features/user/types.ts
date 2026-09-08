import type { User } from "@/api/adapters/types/user";

export type ProfileUser = {
  id: string;
  name: string;
  description?: string;
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
  userId: string;
  openPanel: FollowTab | null;
  onPanelChange: (tab: FollowTab) => void;
  onClose: () => void;
  loggedInUserId?: string;
}

export interface UserRowProps {
  user: User;
  isMe: boolean;
}

export type UserProfilePageProps = {
  userId: string;
};

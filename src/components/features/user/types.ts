export type ProfileUser = {
  id: string;
  name: string;
  description?: string;
  picture?: string;
};

export type FollowTab = "followers" | "followings";

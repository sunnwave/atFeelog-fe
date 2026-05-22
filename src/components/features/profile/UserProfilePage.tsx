import { JSX } from "react";
import { ProfileUser } from "./types";
import ProfileHeader from "./ProfileHeader";

type Props = {
  userId: string;
  isMe?: boolean;
};

// TODO: API 연동 후 실제 데이터로 교체
const MOCK_USER: ProfileUser = {
  id: "mock-1",
  name: "선",
  handle: "@sun.feelog",
  bio: "공연과 전시의 순간을 기록합니다. 좋아했던 장면과 오래 남은 감정을 모아두는 공간.",
  recordsCount: 42,
  followersCount: 128,
  followingCount: 86,
};

export default function UserProfilePage({ isMe = false }: Props): JSX.Element {
  const user = MOCK_USER;

  return (
    <div className="w-full space-y-16 px-4 py-6 md:px-0 md:py-8">
      <ProfileHeader user={user} isMe={isMe} />
    </div>
  );
}

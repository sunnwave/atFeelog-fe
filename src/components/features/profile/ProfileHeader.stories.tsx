import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProfileHeader from "./ProfileHeader";
import type { ProfileUser } from "./types";

const baseUser: ProfileUser = {
  id: "user-1",
  name: "선",
  handle: "@sun.feelog",
  bio: "공연과 전시의 순간을 기록합니다. 좋아했던 장면과 오래 남은 감정을 모아두는 공간.",
  recordsCount: 42,
  followersCount: 128,
  followingCount: 86,
};

const meta: Meta<typeof ProfileHeader> = {
  title: "features/profile/ProfileHeader",
  component: ProfileHeader,
  parameters: { layout: "fullscreen" },
  args: { user: baseUser, isMe: true },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileHeader>;

// ── 기본 케이스 ──────────────────────────────────────────────────────────────

export const MyProfile: Story = {
  name: "내 프로필 (isMe)",
  args: { isMe: true },
};

export const OtherUserNotFollowing: Story = {
  name: "타 유저 — 미팔로우",
  args: { isMe: false, isFollowing: false },
};

export const OtherUserFollowing: Story = {
  name: "타 유저 — 팔로잉 중",
  args: { isMe: false, isFollowing: true },
};

// ── 신경 쓰이는 부분 검증 ────────────────────────────────────────────────────

// 1. 이름이 길 때 버튼이 오른쪽으로 밀리는지 확인
export const LongName: Story = {
  name: "[엣지] 긴 이름 — 버튼 밀림 확인",
  args: {
    isMe: false,
    isFollowing: false,
    user: {
      ...baseUser,
      name: "김민준이라고해요반갑습니다",
      handle: "@very.long.handle.name.feelog",
    },
  },
};

// 2. 팔로워·팔로잉 수가 세 자리 이상일 때 stats 셀 너비 확인
export const LargeStats: Story = {
  name: "[엣지] 큰 통계 수치 — 셀 너비 확인",
  args: {
    user: {
      ...baseUser,
      recordsCount: 1024,
      followersCount: 31200,
      followingCount: 9999,
    },
  },
};

// 3. bio 없을 때
export const NoBio: Story = {
  name: "[엣지] 소개글 없음",
  args: { user: { ...baseUser, bio: undefined } },
};

// 4. handle 없을 때
export const NoHandle: Story = {
  name: "[엣지] 핸들 없음",
  args: { user: { ...baseUser, handle: undefined } },
};

// ── 반응형 확인 ───────────────────────────────────────────────────────────────

// 모바일(375px): 아바타 셀이 상단 띠로, 이름+버튼이 좁은 너비에서 어떻게 되는지 확인
export const Mobile: Story = {
  name: "[반응형] Mobile 375px",
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background flex justify-center p-6">
        <div className="w-[375px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const MobileLongName: Story = {
  name: "[반응형] Mobile — 긴 이름 + 버튼 충돌",
  args: {
    isMe: false,
    user: {
      ...baseUser,
      name: "김민준이라고해요반갑습니다",
      handle: "@very.long.handle.name",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background flex justify-center p-6">
        <div className="w-[375px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

// 태블릿(768px): 그리드 전환 시점 확인
export const Tablet: Story = {
  name: "[반응형] Tablet 768px",
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background flex justify-center p-6">
        <div className="w-[768px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

// 풀 데스크탑: 아바타 셀이 148px에서 얼마나 허전한지 확인
export const Desktop: Story = {
  name: "[반응형] Desktop full-width",
};
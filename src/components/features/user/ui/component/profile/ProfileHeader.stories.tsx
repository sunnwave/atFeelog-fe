import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProfileHeader from "./ProfileHeader";
import type { ProfileUser } from "../../../types";

const baseUser: ProfileUser = {
  id: "user-1",
  name: "선",
  description: "공연과 전시의 순간을 기록합니다. 좋아했던 장면과 오래 남은 감정을 모아두는 공간.",
};

const meta: Meta<typeof ProfileHeader> = {
  title: "features/user/ProfileHeader",
  component: ProfileHeader,
  parameters: { layout: "fullscreen" },
  args: { user: baseUser, userId: "user-1", isMe: true },
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

export const OtherUser: Story = {
  name: "타 유저",
  args: { isMe: false },
};

// ── 엣지 케이스 ──────────────────────────────────────────────────────────────

export const LongName: Story = {
  name: "[엣지] 긴 이름 — 버튼 밀림 확인",
  args: {
    isMe: false,
    user: { ...baseUser, name: "김민준이라고해요반갑습니다" },
  },
};

export const NoDescription: Story = {
  name: "[엣지] 소개글 없음",
  args: { user: { ...baseUser, description: undefined } },
};

// ── 반응형 확인 ───────────────────────────────────────────────────────────────

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
    user: { ...baseUser, name: "김민준이라고해요반갑습니다" },
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

export const Desktop: Story = {
  name: "[반응형] Desktop full-width",
};

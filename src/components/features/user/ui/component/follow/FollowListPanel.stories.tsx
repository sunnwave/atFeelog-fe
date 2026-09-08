import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FollowListPanel from "./FollowListPanel";

const meta: Meta<typeof FollowListPanel> = {
  title: "features/user/FollowListPanel",
  component: FollowListPanel,
  parameters: { layout: "fullscreen" },
  args: {
    userId: "user-1",
    loggedInUserId: "me",
    onPanelChange: () => {},
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof FollowListPanel>;

// ── 기본 케이스 ──────────────────────────────────────────────────────────────

export const Closed: Story = {
  name: "닫힘 (openPanel null)",
  args: { openPanel: null },
};

export const FollowersTab: Story = {
  name: "팔로워 탭",
  args: { openPanel: "팔로워" },
};

export const FollowingTab: Story = {
  name: "팔로잉 탭",
  args: { openPanel: "팔로잉" },
};

// ── 반응형 확인 ───────────────────────────────────────────────────────────────

export const Mobile: Story = {
  name: "[반응형] Mobile 375px — 팔로워 탭",
  args: { openPanel: "팔로워" },
  decorators: [
    (Story) => (
      <div className="w-[375px] bg-background p-4">
        <Story />
      </div>
    ),
  ],
};

export const Desktop: Story = {
  name: "[반응형] Desktop — ProfileHeader 옆 사이드 드로어",
  args: { openPanel: "팔로워" },
  decorators: [
    (Story) => (
      <div className="flex bg-background p-6 gap-0" style={{ width: 800 }}>
        <div className="flex-1 bg-surface-soft flex items-center justify-center text-muted-foreground text-sm">
          ProfileHeader 영역
        </div>
        <Story />
      </div>
    ),
  ],
};

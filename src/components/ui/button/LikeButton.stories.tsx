import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CARD_CQ_WIDTHS } from "@/storybook/constants";
import LikeButton from "./LikeButton";

const meta: Meta<typeof LikeButton> = {
  title: "ui/button/LikeButton",
  component: LikeButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isLiked: { control: "boolean" },
    likeCount: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof LikeButton>;

export const NotLiked: Story = {
  decorators: [
    (Story) => (
      <div className="@container" style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  args: { isLiked: false, likeCount: 12 },
};

export const Liked: Story = {
  decorators: [
    (Story) => (
      <div className="@container" style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  args: { isLiked: true, likeCount: 12 },
};

export const NoCount: Story = {
  decorators: [
    (Story) => (
      <div className="@container" style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  args: { isLiked: false },
};

// CQ 사이즈 케이스
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {CARD_CQ_WIDTHS.map(({ label, desc, width }) => (
        <div key={label} className="flex items-center gap-4">
          <span className="w-28 shrink-0 text-xs text-muted-foreground">
            {desc} ({label})
          </span>
          <div className="@container flex items-center gap-4" style={{ width }}>
            <LikeButton isLiked={false} likeCount={12} />
            <LikeButton isLiked={true} likeCount={12} />
          </div>
        </div>
      ))}
    </div>
  ),
};

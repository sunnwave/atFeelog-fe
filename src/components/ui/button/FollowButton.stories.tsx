import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FollowButton from "./FollowButton";

const meta: Meta<typeof FollowButton> = {
  title: "ui/FollowButton",
  component: FollowButton,
  parameters: { layout: "centered" },
  argTypes: {
    isFollowing: { control: "boolean" },
  },
} satisfies Meta<typeof FollowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { isFollowing: false },
};

export const Following: Story = {
  args: { isFollowing: true },
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 bg-background rounded-2xl">
      <div className="flex items-center justify-between w-64">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted-foreground/20" />
          <span className="text-sm font-semibold text-foreground">선</span>
        </div>
        <FollowButton isFollowing={false} />
      </div>

      <div className="flex items-center justify-between w-64">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted-foreground/20" />
          <span className="text-sm font-semibold text-foreground">재즈러버</span>
        </div>
        <FollowButton isFollowing={true} />
      </div>
    </div>
  ),
};

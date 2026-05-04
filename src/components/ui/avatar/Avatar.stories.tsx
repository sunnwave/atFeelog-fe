import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Avatar from "./Avatar";
import type { User } from "@/api/adapters/types/user";

const IMG = "https://picsum.photos/id/64/200/200";

const baseUser: User = {
  id: "user_1",
  name: "Alice",
  email: "alice@example.com",
  picture: undefined,
  createdAt: "2026-02-06T00:00:00.000Z",
};

const meta: Meta<typeof Avatar> = {
  title: "commons/ui/Avatar",
  component: Avatar,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-screen bg-gray-800 flex items-center justify-center ">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    user: { ...baseUser, picture: IMG },
  },
};

export const WithoutImage: Story = {
  args: {
    user: { ...baseUser, picture: undefined, name: "민지" },
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { User } from "@/api/adapters/types/user";
import ProfileEntry from "./ProfileEntry";

const baseUser: User = {
  id: "user_1",
  name: "Alice",
  email: "alice@example.com",
  picture: undefined,
  createdAt: "2026-02-06T00:00:00.000Z",
};

const meta: Meta<typeof ProfileEntry> = {
  title: "layout/ProfileEntry",
  component: ProfileEntry,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-screen bg-white p-6 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileEntry>;

export const LoggedOut: Story = {
  args: { user: null },
};

export const LoggedIn: Story = {
  args: { user: baseUser },
};

export const LoggedIn_LongName: Story = {
  args: {
    user: { ...baseUser, name: "아주아주아주긴이름테스트아주아주아주긴이름" },
  },
};

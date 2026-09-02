import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProfileAvatarEditor from "./ProfileAvatarEditor";

const meta: Meta<typeof ProfileAvatarEditor> = {
  title: "features/user/ProfileAvatarEditor",
  component: ProfileAvatarEditor,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto w-full max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileAvatarEditor>;

const mockUser = {
  id: "1",
  name: "홍길동",
  email: "hong@example.com",
  picture: undefined,
};

export const Default: Story = {
  args: {
    user: mockUser,
    isUploading: false,
    onFileChange: () => {},
  },
};

export const WithPicture: Story = {
  args: {
    user: {
      ...mockUser,
      picture: "https://i.pravatar.cc/150?img=3",
    },
    isUploading: false,
    onFileChange: () => {},
  },
};

export const Uploading: Story = {
  args: {
    user: mockUser,
    isUploading: true,
    onFileChange: () => {},
  },
};

export const NoUser: Story = {
  args: {
    user: null,
    isUploading: false,
    onFileChange: () => {},
  },
};
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CommentInput from "./CommentInput";

const meta: Meta<typeof CommentInput> = {
  title: "commons/comment/CommentInput",
  component: CommentInput,
  parameters: { layout: "fullscreen" },
  args: {
    placeholder: "댓글을 입력하세요...",
    isLoggedIn: true,
    onSubmit: (comment: string) => console.log("submit:", comment),
  },
  argTypes: {
    onSubmit: { action: "onSubmit" },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto w-full max-w-180">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              아래 입력창은 UI 확인용입니다. (submit 시 action 로그 확인)
            </p>
            <Story />
          </div>

          {/* fixed 버전 테스트할 때 화면 아래에 공간이 필요 */}
          <div className="h-60" />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CommentInput>;

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
  },
};

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "한 줄 감상을 남겨보세요!",
  },
};

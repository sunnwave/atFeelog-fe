import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CommentItem from "./CommentItem";
import { CommentActionsProvider } from "../context/CommentActionsContext";
import type { RecordComment } from "@/api/adapters/types/record-comment";

const mockActions = {
  canEdit: () => false,
  onStartEdit: (id: string) => console.log("startEdit:", id),
  onSave: async (id: string, next: string) => console.log("save:", id, next),
  onRequestDelete: (id: string) => console.log("requestDelete:", id),
};

const meta: Meta<typeof CommentItem> = {
  title: "commons/comment/CommentItem",
  component: CommentItem,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <CommentActionsProvider value={mockActions}>
        <div className="max-w-2xl p-6 bg-background">
          <Story />
        </div>
      </CommentActionsProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CommentItem>;

const baseComment: RecordComment = {
  id: "comment_1",
  content: "댓글 내용입니다.\n줄바꿈도 테스트해볼게요!\n공백/줄바꿈 유지되는지 확인.",
  isEdited: false,
  createdAt: "2026-02-06T00:00:00.000Z",
  updatedAt: "2026-02-06T00:00:00.000Z",
  user: {
    id: "user_1",
    name: "긴닉네임유저_아주길게길게길게",
    email: "alice@example.com",
    picture: undefined,
    createdAt: "2026-02-06T00:00:00.000Z",
  },
};

export const Default: Story = {
  args: {
    comment: baseComment,
  },
};

export const AnonymousUser: Story = {
  args: { comment: { ...baseComment, user: undefined } },
};

export const LongContent: Story = {
  args: {
    comment: {
      ...baseComment,
      content:
        "아주 긴 댓글 내용입니다. ".repeat(20) +
        "\n\n줄바꿈도 있고, 계속 길어집니다.",
    },
  },
};

export const Edited: Story = {
  args: {
    comment: {
      ...baseComment,
      isEdited: true,
      updatedAt: "2026-03-01T00:00:00.000Z",
    },
  },
};

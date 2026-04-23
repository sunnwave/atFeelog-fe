import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CommentItem from "./CommentItem";
import type { IBoardComment } from "@/shared/graphql/generated/types";
import { CommentActionsProvider } from "../context/CommentActionsContext";

const mockActions = {
  canEdit: () => false,
  onSave: async () => {},
  onRequestDelete: () => {},
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

const baseComment = {
  __typename: "BoardComment",
  _id: "comment_1",
  writer: "긴닉네임유저_아주길게길게길게",
  contents:
    "댓글 내용입니다.\n줄바꿈도 테스트해볼게요!\n공백/줄바꿈 유지되는지 확인.",
  rating: 12,
  createdAt: "2026-02-06T00:00:00.000Z",
  updatedAt: "2026-02-06T00:00:00.000Z",
  deletedAt: null,
  user: {
    __typename: "User",
    _id: "user_1",
    email: "alice@example.com",
    name: "Alice",
    picture: null,
    createdAt: "2026-02-06T00:00:00.000Z",
    updatedAt: "2026-02-06T00:00:00.000Z",
    deletedAt: null,
    userPoint: null,
  },
} as unknown as IBoardComment;

export const Default: Story = {
  args: {
    comment: baseComment,
  },
};

export const AnonymousUser: Story = {
  args: { comment: { ...baseComment, user: null, writer: "익명" } },
};

export const LongContent: Story = {
  args: {
    comment: {
      ...baseComment,
      contents:
        "아주 긴 댓글 내용입니다. ".repeat(20) +
        "\n\n줄바꿈도 있고, 계속 길어집니다.",
    },
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { RecordComment } from "@/api/adapters/types/record-comment";
import {
  CommentActionsProvider,
  type CommentActions,
} from "../context/CommentActionsContext";
import CommentList from "./CommentList";

const baseComment = (over?: Partial<RecordComment>): RecordComment => ({
  id: `c_${Math.random().toString(36).slice(2, 8)}`,
  content: "공연 너무 좋았어요! 앵콜 때 소름…",
  isEdited: false,
  createdAt: "2026-02-06T00:00:00.000Z",
  updatedAt: "2026-02-06T00:00:00.000Z",
  user: {
    id: "u_1",
    name: "Alice",
    email: "alice@example.com",
    picture: undefined,
    createdAt: "2026-02-06T00:00:00.000Z",
  },
  ...over,
});

const actions: CommentActions = {
  canEdit: () => true,
  onStartEdit: (id) => console.log("startEdit:", id),
  onSave: async (id, next) => console.log("save:", id, next),
  onRequestDelete: (id) => console.log("requestDelete:", id),
};

const meta: Meta<typeof CommentList> = {
  title: "commons/comment/CommentList",
  component: CommentList,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto w-full max-w-180 rounded-2xl border border-border bg-card p-6">
          <CommentActionsProvider value={actions}>
            <Story />
          </CommentActionsProvider>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CommentList>;

export const Empty: Story = {
  args: {
    isLoading: false,
    comments: [],
    subText: "이 기록에 대한 생각을 공유해주세요",
  },
};

export const Default: Story = {
  args: {
    isLoading: false,
    comments: [
      baseComment({ id: "c_1", user: { id: "u_1", name: "Alice" } }),
      baseComment({
        id: "c_2",
        user: { id: "u_2", name: "sun" },
        content: "조명 연출이 진짜 미쳤다…",
      }),
      baseComment({ id: "c_3", user: undefined }),
    ],
  },
};

export const LongContent: Story = {
  args: {
    isLoading: false,
    comments: [
      baseComment({
        id: "c_long",
        user: { id: "u_4", name: "긴댓글유저" },
        content:
          "아주 긴 댓글입니다. ".repeat(20) +
          "\n\n줄바꿈도 있고, 계속 길어집니다.",
      }),
    ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    comments: [],
  },
  render: (args) => (
    <div className="space-y-4">
      <CommentList {...args} />
      <div className="text-xs text-muted-foreground">
        TODO: skeleton 구현 예정
      </div>
    </div>
  ),
};

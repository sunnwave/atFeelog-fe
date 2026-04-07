import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecordCardBottom from "./RecordCardBottom";
import type { IBoard } from "@/shared/graphql/generated/types";

const IMG = "https://picsum.photos/id/64/200/200";

const baseBoard = {
  __typename: "Board",
  _id: "board_1",
  title: "테스트",
  contents: "내용",
  createdAt: "2026-02-06T00:00:00.000Z",
  updatedAt: "2026-02-06T00:00:00.000Z",
  deletedAt: null,

  // ✅ RecordCardBottom에서 쓰는 값들
  likeCount: 12,
  commentCount: 3,

  user: {
    __typename: "User",
    _id: "user_1",
    email: "alice@example.com",
    name: "Alice",
    picture: IMG,
    createdAt: "2026-02-06T00:00:00.000Z",
    updatedAt: "2026-02-06T00:00:00.000Z",
    deletedAt: null,
    userPoint: null,
  },
} as unknown as IBoard;

const meta: Meta<typeof RecordCardBottom> = {
  title: "features/records/RecordCardBottom",
  component: RecordCardBottom,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-screen bg-gray-900 p-6 flex items-center justify-center">
        <div
          style={{ width: 352 }}
          className=" border border-white/20 bg-white/10 p-4"
        >
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecordCardBottom>;

export const Default: Story = {
  args: {
    board: baseBoard,
  },
};

export const AnonymousUser: Story = {
  args: {
    board: { ...baseBoard, user: null } as unknown as IBoard,
  },
};

export const LargeCounts: Story = {
  args: {
    board: {
      ...baseBoard,
      likeCount: 999,
      commentCount: 123,
    } as unknown as IBoard,
  },
};

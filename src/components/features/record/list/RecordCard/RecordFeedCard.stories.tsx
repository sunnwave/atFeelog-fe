import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { IBoard } from "@/shared/graphql/generated/types";
import RecordCard from "./RecordCard";

const IMG = "https://picsum.photos/id/64/600/800";

const baseBoard = {
  __typename: "Board",
  _id: "board_1",
  title: "공연 후기 제목",
  contents:
    "공연이 정말 좋았고, 무대 동선과 조명 연출이 인상적이었어요. 앵콜 때 감정이 확 올라오더라구요.",
  createdAt: "2026-02-06T00:00:00.000Z",
  updatedAt: "2026-02-06T00:00:00.000Z",
  deletedAt: null,
  likeCount: 12,
  commentCount: 3,
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
} as unknown as IBoard;

const meta: Meta<typeof RecordCard> = {
  title: "features/records/RecordCard",
  component: RecordCard,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          background: "#111827",
        }}
      >
        <div style={{ width: 360 }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecordCard>;

export const Poster: Story = {
  args: {
    board: { ...baseBoard, images: [IMG] } as unknown as IBoard,
  },
};

export const Quote: Story = {
  args: {
    board: { ...baseBoard, images: [] } as unknown as IBoard,
  },
};

export const QuoteDifferentKey: Story = {
  args: {
    board: { ...baseBoard, _id: "board_999", images: [] } as unknown as IBoard,
  },
};

export const AnonymousUser: Story = {
  args: {
    board: { ...baseBoard, images: [IMG], user: null } as unknown as IBoard,
  },
};

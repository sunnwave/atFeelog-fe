import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { RecordSummary } from "@/api/adapters/types/record-summary";
import RecordPosterCard from "./RecordPosterCard";

const IMG = "https://picsum.photos/id/64/600/800";

const baseRecord: RecordSummary = {
  id: "board_1",
  title: "공연 후기 제목",
  showName: "아이유 콘서트",
  artistName: "아이유",
  likeCount: 12,
  commentCount: 3,
  images: [],
  createdAt: "2026-02-06T00:00:00.000Z",
  user: {
    id: "mock-user-1",
    name: "Alice",
    picture: undefined,
  },
};

const meta: Meta<typeof RecordPosterCard> = {
  title: "features/record-list/RecordPosterCard",
  component: RecordPosterCard,
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
type Story = StoryObj<typeof RecordPosterCard>;

export const Poster: Story = {
  args: {
    record: { ...baseRecord, images: [IMG] },
  },
};

export const Quote: Story = {
  args: {
    record: { ...baseRecord, images: [] },
  },
};

export const QuoteDifferentKey: Story = {
  args: {
    record: { ...baseRecord, id: "board_999", images: [] },
  },
};

export const AnonymousUser: Story = {
  args: {
    record: { ...baseRecord, images: [IMG], user: undefined },
  },
};

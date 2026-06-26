import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { RecordSummary } from "@/api/adapters/types/record-summary";
import RecordFeedCard from "./RecordFeedCard";

const IMG = "https://picsum.photos/id/64/600/800";

const baseRecord: RecordSummary = {
  id: "board_1",
  title: "그날의 초여름 공기",
  showName: "Beautiful Mint Life 2026",
  artistName: "SURL",
  likeCount: 24,
  commentCount: 6,
  images: [],
  isLiked: false,
  createdAt: "2026-05-12T09:00:00.000Z",
  user: {
    id: "mock-user-1",
    name: "선",
    picture: undefined,
  },
};

const meta: Meta<typeof RecordFeedCard> = {
  title: "features/record-list/RecordFeedCard",
  component: RecordFeedCard,
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
          padding: 40,
          background: "#F6F5FA",
        }}
      >
        <div style={{ width: 340 }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecordFeedCard>;

export const WithImage: Story = {
  args: {
    record: { ...baseRecord, images: [IMG] },
  },
};

export const TextOnly: Story = {
  args: {
    record: {
      ...baseRecord,
      title: "전시장을 나와서도 남은 색감",
      showName: "Edward Hopper: 길 위에서",
      artistName: "서울시립미술관",
      likeCount: 18,
      commentCount: 3,
      images: [],
    },
  },
};

export const Liked: Story = {
  args: {
    record: { ...baseRecord, images: [IMG], isLiked: true, likeCount: 25 },
  },
};

export const AnonymousUser: Story = {
  args: {
    record: { ...baseRecord, images: [IMG], user: undefined },
  },
};

export const NoShowName: Story = {
  args: {
    record: {
      ...baseRecord,
      showName: undefined,
      artistName: undefined,
      images: [IMG],
    },
  },
};

export const LongContent: Story = {
  args: {
    record: {
      ...baseRecord,
      title: "세 번째로 보러 갔는데도 새로웠던 공연, 그 여운이 너무 길어서",
      showName: "Agust D TOUR D-DAY THE FINAL",
      artistName: "SUGA, BTS",
      likeCount: 130,
      commentCount: 35,
      isLiked: true,
      images: [IMG],
    },
  },
};

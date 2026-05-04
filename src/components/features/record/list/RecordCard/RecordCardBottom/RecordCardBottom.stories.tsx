import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecordCardBottom from "./RecordCardBottom";
import type { RecordSummary } from "@/api/adapters/types/record-summary";

const IMG = "https://picsum.photos/id/64/200/200";

const baseRecord: RecordSummary = {
  id: "board_1",
  title: "테스트",
  showName: "아이유 콘서트",
  artistName: "아이유",
  likeCount: 12,
  commentCount: 3,
  createdAt: "2026-02-06T00:00:00.000Z",
  user: {
    name: "Alice",
    picture: IMG,
  },
};

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
    record: baseRecord,
  },
};

export const AnonymousUser: Story = {
  args: {
    record: { ...baseRecord, user: undefined },
  },
};

export const LargeCounts: Story = {
  args: {
    record: {
      ...baseRecord,
      likeCount: 999,
      commentCount: 123,
    },
  },
};

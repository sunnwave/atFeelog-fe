import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { IBoard } from "@/shared/graphql/generated/types";
import RecordDetailContent from "./RecordDetailContent";

const baseRecord = {
  __typename: "Board",
  _id: "record_1",
  title: "공연 후기 제목",
  contents:
    "오랜만에 간 콘서트였는데 정말 최고였어요! 특히 밤편지 라이브 무대는 소름 돋았습니다. 관객 모두가 하나되어 부르는 떼창은 정말 잊지 못할 경험이었어요.\n공연장에 들어서는 순간부터 설렘이 가득했어요. 좌석에 앉자마자 주변을 둘러보니 정말 많은 팬분들이 함께하고 계셨고, 모두가 같은 마음으로 이 순간을 기다려온 것 같았습니다.\n오프닝부터 엔딩까지 단 하나도 빠짐없이 완벽한 세트리스트였어요. 특히 중간에 팬들과 소통하는 시간이 있었는데, 그때의 따뜻함과 진심이 정말 감동적이었습니다.\n무대 연출도 정말 환상적이었어요. 조명, 음향, 영상 모든 것이 완벽하게 조화를 이루어서 마치 꿈속에 있는 듯한 기분이었습니다. 특히 마지막 곡에서의 연출은 정말 눈물이 날 정도로 아름다웠어요.\n이번 콘서트를 통해 다시 한번 음악의 힘을 느꼈습니다. 일상의 스트레스와 걱정을 모두 잊고 오직 음악과 무대에만 집중할 수 있었던 시간이었어요. 정말 행복했습니다!",
  createdAt: "2026-02-06T00:00:00.000Z",
  updatedAt: "2026-02-06T00:00:00.000Z",
  deletedAt: null,
  likeCount: 12,
  commentCount: 3,
  images: [],
  user: {
    __typename: "User",
    _id: "user_1",
    email: "alice@example.com",
    name: "Alice Wonderland",
    picture: null,
    createdAt: "2026-02-06T00:00:00.000Z",
    updatedAt: "2026-02-06T00:00:00.000Z",
    deletedAt: null,
    userPoint: null,
  },
  boardAddress: {
    addressDetail: "올림픽공원 체조경기장",
  },
} as unknown as IBoard;

const meta: Meta<typeof RecordDetailContent> = {
  title: "features/records/RecordDetail/RecordDetailContent",
  component: RecordDetailContent,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-full bg-background p-8 flex justify-center">
        <div className="w-full max-w-[720px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecordDetailContent>;

export const Writer: Story = {
  args: {
    record: baseRecord,
    isWriter: true,
  },
};

export const NotWriter: Story = {
  args: {
    record: baseRecord,
    isWriter: false,
  },
};

export const AnonymousUser: Story = {
  args: {
    record: { ...baseRecord, user: null } as unknown as IBoard,
    isWriter: true,
  },
};

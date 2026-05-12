import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { RecordDetail } from "@/api/adapters/types/record";
import { MockedProvider } from "@apollo/client/testing";
import { RecoilRoot } from "recoil";
import { ToastProvider } from "@/components/commons/toast/ToastProvider";
import RecordDetailContent from "./RecordDetailContent";

const baseRecord: RecordDetail = {
  id: "record_1",
  title: "아이유 콘서트 후기",
  showName: "아이유 콘서트",
  artistName: "아이유",
  showDate: "2026-02-06",
  contents:
    "오랜만에 간 콘서트였는데 정말 최고였어요! 특히 밤편지 라이브 무대는 소름 돋았습니다. 관객 모두가 하나되어 부르는 떼창은 정말 잊지 못할 경험이었어요.\n공연장에 들어서는 순간부터 설렘이 가득했어요. 좌석에 앉자마자 주변을 둘러보니 정말 많은 팬분들이 함께하고 계셨고, 모두가 같은 마음으로 이 순간을 기다려온 것 같았습니다.",
  images: [],
  likeCount: 12,
  isLiked: false,
  createdAt: "2026-02-06T00:00:00.000Z",
  updatedAt: "2026-02-06T00:00:00.000Z",
  user: {
    id: "user_1",
    email: "alice@example.com",
    name: "Alice Wonderland",
    picture: undefined,
  },
  boardAddress: {
    id: "addr_1",
    placeName: "올림픽공원 체조경기장",
    roadAddress: undefined,
    jibunAddress: undefined,
    x: undefined,
    y: undefined,
  },
};

const meta: Meta<typeof RecordDetailContent> = {
  title: "features/record-detail/RecordDetailContent",
  component: RecordDetailContent,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <MockedProvider mocks={[]}>
        <RecoilRoot>
          <ToastProvider>
            <div className="min-h-screen w-full bg-background p-8 flex justify-center">
              <div className="w-full max-w-3xl">
                <Story />
              </div>
            </div>
          </ToastProvider>
        </RecoilRoot>
      </MockedProvider>
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
    record: { ...baseRecord, user: undefined },
    isWriter: true,
  },
};

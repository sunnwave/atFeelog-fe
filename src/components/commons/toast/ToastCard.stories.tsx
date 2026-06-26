import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ToastCard from "./ToastCard";
import type { ToastItem } from "./types";

const baseToast: ToastItem = {
  id: "t_1",
  variant: "default",
  title: "안내",
  description: "토스트 메시지입니다.",
  durationMs: 2500,
};

const meta: Meta<typeof ToastCard> = {
  title: "commons/Toast/ToastCard",
  component: ToastCard,
  parameters: { layout: "padded" },
  args: {
    toast: baseToast,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        {/* bottom-right 토스트 느낌으로 위치 잡기 */}
        <div className="fixed bottom-6 right-6 w-85">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToastCard>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    toast: {
      ...baseToast,
      id: "t_success",
      variant: "success",
      title: "완료",
      description: "댓글이 등록되었습니다.",
    },
  },
};

export const Destructive: Story = {
  args: {
    toast: {
      ...baseToast,
      id: "t_error",
      variant: "destructive",
      title: "오류",
      description: "댓글 등록에 실패했어요.",
    },
  },
};

export const NoTitle: Story = {
  args: {
    toast: {
      ...baseToast,
      id: "t_notitle",
      title: undefined,
      description: "제목 없이 description만 있는 토스트입니다.",
    },
  },
};

export const LongDescription: Story = {
  args: {
    toast: {
      ...baseToast,
      id: "t_long",
      variant: "default",
      title: "긴 메시지",
      description:
        "아주 긴 토스트 메시지입니다. line-clamp-2가 적용되어 두 줄을 넘기면 말줄임 처리되는지 확인합니다. 텍스트가 더 길어지면 계속 잘립니다.",
    },
  },
};

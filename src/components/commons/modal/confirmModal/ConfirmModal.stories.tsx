// src/components/commons/modal/ConfirmModal.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { AlertTriangle, Info, LogIn } from "lucide-react";

import { ConfirmModal } from "./ConfirmModal";
import { Button } from "@/components/ui/button/Button";

const meta: Meta<typeof ConfirmModal> = {
  title: "commons/modal/ConfirmModal",
  component: ConfirmModal,
  parameters: { layout: "fullscreen" },
  argTypes: {
    open: { control: false },
    onOpenChange: { control: false },
    onConfirm: { control: false },
    onCancel: { control: false },
    icon: { control: false },
    className: { control: "text" },
    closeOnOverlayClick: { control: "boolean" },
    loading: { control: "boolean" },
    variant: {
      control: "inline-radio",
      options: ["default", "destructive", "success", "primary"],
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        {/* 배경 요소(오버레이/포커스 느낌 확인용) */}
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="h-10 rounded-lg border border-border bg-card" />
          <div className="h-10 rounded-lg border border-border bg-card" />
          <div className="h-10 rounded-lg border border-border bg-card" />
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

/** ✅ 스토리에서 open state를 제어하기 위한 데모 래퍼 */
function Demo(
  args: Omit<
    React.ComponentProps<typeof ConfirmModal>,
    "open" | "onOpenChange" | "onConfirm" | "onCancel"
  > & {
    /** 스토리에서 async confirm 시뮬레이션 */
    simulateAsyncConfirm?: boolean;
  }
) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    if (args.simulateAsyncConfirm) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      setLoading(false);
    }
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6">
        <Button onClick={() => setOpen(true)}>ConfirmModal 열기</Button>
      </div>

      <ConfirmModal
        {...args}
        open={open}
        onOpenChange={setOpen}
        onConfirm={onConfirm}
        onCancel={onCancel}
        loading={loading}
      />
    </>
  );
}

export const Default: Story = {
  args: {
    title: "확인할까요?",
    description: "이 작업을 진행합니다.",
    variant: "default",
    icon: Info,
    confirmText: "확인",
    cancelText: "취소",
    closeOnOverlayClick: true,
  },
  render: (args) => <Demo {...args} />,
};

export const Destructive: Story = {
  args: {
    title: "삭제할까요?",
    description: "삭제하면 되돌릴 수 없어요.",
    variant: "destructive",
    icon: AlertTriangle,
    confirmText: "삭제",
    cancelText: "취소",
    closeOnOverlayClick: true,
  },
  render: (args) => <Demo {...args} />,
};

export const LoginConfirm: Story = {
  args: {
    title: "로그인이 필요해요",
    description: "로그인하고 기능을 사용해보세요.",
    variant: "primary",
    icon: LogIn,
    confirmText: "로그인",
    cancelText: "나중에",
    closeOnOverlayClick: true,
  },
  render: (args) => <Demo {...args} />,
};

export const NoOverlayClose: Story = {
  args: {
    title: "닫기 제한",
    description: "바깥 영역 클릭으로는 닫히지 않게 설정했어요.",
    variant: "default",
    icon: Info,
    confirmText: "확인",
    cancelText: "취소",
    closeOnOverlayClick: false,
  },
  render: (args) => <Demo {...args} />,
};

export const WithoutIcon: Story = {
  args: {
    title: "아이콘 없는 모달",
    description: "아이콘 없이도 동작하는지 확인해요.",
    variant: "default",
    confirmText: "확인",
    cancelText: "취소",
    closeOnOverlayClick: true,
  },
  render: (args) => <Demo {...args} />,
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LoginForm from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "features/auth/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto w-full max-w-130">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const Submitting: Story = {
  args: {
    onSubmit: async (values) => {
      console.log("[LoginForm onSubmit - long]", values);
      // 일부러 오래 걸리게 해서 "로그인 중..." 상태 확인
      await new Promise((r) => setTimeout(r, 800));
      alert("로그인 완료(목업)");
    },
  },
};

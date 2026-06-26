import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SignupForm from "./SignupForm";

const meta: Meta<typeof SignupForm> = {
  title: "features/auth/SignupForm",
  component: SignupForm,
  parameters: { layout: "fullscreen" },
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
type Story = StoryObj<typeof SignupForm>;

export const Default: Story = {};

export const WithSubmitMock: Story = {
  args: {
    onSubmit: async (values) => {
      // Storybook Action에도 찍히고, 콘솔도 확인 가능
      console.log("submit values:", values);
      await new Promise((r) => setTimeout(r, 600));
      alert("회원가입 완료(목업)");
    },
  },
};

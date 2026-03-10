import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecordWriteForm from "./RecordWriteForm";

const meta: Meta<typeof RecordWriteForm> = {
  title: "features/record-write/RecordWriteForm",
  component: RecordWriteForm,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-full bg-background p-8">
        <div className="mx-auto w-full max-w-[720px] rounded-2xl border border-border bg-card p-6">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecordWriteForm>;

export const Default: Story = {};

export const NarrowMobile: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto w-[360px] rounded-2xl border border-border bg-card p-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

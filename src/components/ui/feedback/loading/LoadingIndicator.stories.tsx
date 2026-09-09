import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LoadingIndicator from "./LoadingIndicator";

const meta: Meta<typeof LoadingIndicator> = {
  title: "ui/feedback/LoadingIndicator",
  component: LoadingIndicator,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    label: { control: "text" },
  },
  args: {
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {
  name: "기본 (md)",
};

export const AllSizes: Story = {
  name: "All Sizes 비교",
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <LoadingIndicator size="sm" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingIndicator size="md" />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingIndicator size="lg" />
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  name: "라벨 포함",
  args: {
    size: "md",
    label: "불러오는 중...",
  },
};

export const InContext: Story = {
  name: "페이지 중앙 배치",
  render: () => (
    <div className="flex min-h-[300px] w-[360px] items-center justify-center bg-background">
      <LoadingIndicator size="lg" label="불러오는 중..." />
    </div>
  ),
};

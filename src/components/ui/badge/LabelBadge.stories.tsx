import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LabelBadge from "./LabelBadge";

const meta: Meta<typeof LabelBadge> = {
  title: "ui/Badge/LabelBadge",
  component: LabelBadge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["light", "dark"],
    },
    children: { control: "text" },
  },
  args: {
    variant: "light",
    children: "JOIN US",
  },
};

export default meta;
type Story = StoryObj<typeof LabelBadge>;

export const Light: Story = {
  args: { variant: "light", children: "JOIN US" },
  decorators: [
    (Story) => (
      <div className="bg-background p-8 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export const Dark: Story = {
  args: { variant: "dark", children: "MEMBER ONLY" },
  decorators: [
    (Story) => (
      <div className="bg-foreground p-8 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export const UsageInContext: Story = {
  render: () => (
    <div className="flex gap-6">
      {/* 라이트 컨텍스트 */}
      <div className="bg-background p-10 flex flex-col gap-3 w-72">
        <LabelBadge variant="light">JOIN US</LabelBadge>
        <p className="text-2xl font-black tracking-tight text-foreground leading-tight">
          함께 기록해요
          <span className="text-point">.</span>
        </p>
        <p className="text-sm text-muted-foreground">라이트 배경 컨텍스트</p>
      </div>
      {/* 다크 컨텍스트 */}
      <div className="bg-foreground p-10 flex flex-col gap-3 w-72">
        <LabelBadge variant="dark">MEMBER ONLY</LabelBadge>
        <p className="text-2xl font-black tracking-tight text-white leading-tight">
          공연의 기억은
          <br />
          여기에 있어요
        </p>
        <p className="text-sm text-white/55">다크 배경 컨텍스트</p>
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="min-h-screen flex items-center justify-center bg-muted p-12">
        <Story />
      </div>
    ),
  ],
};

export const AllLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8 bg-background">
      <div className="flex flex-wrap gap-2">
        {["JOIN US", "NEW MEMBER", "SIGN IN", "SIGN UP", "MEMBER ONLY"].map(
          (label) => (
            <LabelBadge key={label} variant="light">
              {label}
            </LabelBadge>
          ),
        )}
      </div>
      <div className="flex flex-wrap gap-2 bg-foreground p-4">
        {["JOIN US", "NEW MEMBER", "SIGN IN", "SIGN UP", "MEMBER ONLY"].map(
          (label) => (
            <LabelBadge key={label} variant="dark">
              {label}
            </LabelBadge>
          ),
        )}
      </div>
    </div>
  ),
};

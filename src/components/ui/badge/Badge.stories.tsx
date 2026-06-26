import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "ui/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: "text" },
  },
  args: {
    children: "태그",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const LongText: Story = {
  args: { children: "아주 긴 텍스트가 들어갔을 때 말줄임 처리 확인" },
  decorators: [
    (Story) => (
      <div style={{ width: 120 }}>
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      {["뮤지컬", "콘서트", "연극", "오페라", "발레", "클래식"].map((label) => (
        <Badge key={label}>{label}</Badge>
      ))}
    </div>
  ),
};
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CARD_CQ_WIDTHS } from "@/storybook/constants";
import CommentIcon from "./CommentIcon";

const meta: Meta<typeof CommentIcon> = {
  title: "ui/icons/CommentIcon",
  component: CommentIcon,
  parameters: { layout: "centered" },
  argTypes: {
    count: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof CommentIcon>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="@container" style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  args: { count: 12 },
};

export const NoCount: Story = {
  decorators: [
    (Story) => (
      <div className="@container" style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {CARD_CQ_WIDTHS.map(({ label, desc, width }) => (
        <div key={label} className="flex items-center gap-4">
          <span className="w-28 shrink-0 text-xs text-muted-foreground">
            {desc} ({label})
          </span>
          <div className="@container" style={{ width }}>
            <CommentIcon count={12} />
          </div>
        </div>
      ))}
    </div>
  ),
};

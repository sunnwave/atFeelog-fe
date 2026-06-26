import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Trash2, Share2 } from "lucide-react";
import ActionOption from "./ActionOption";
import { ActionSheetOption } from "./type";

const meta: Meta<typeof ActionOption> = {
  title: "commons/ActionSheet/ActionOption",
  component: ActionOption,
  parameters: { layout: "centered" },
  argTypes: {
    onClose: { action: "onClose" },
    option: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="w-130 rounded-2xl border border-border bg-background p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ActionOption>;

export const Default: Story = {
  args: {
    option: {
      icon: Share2,
      label: "공유하기",
      description: "링크를 공유합니다",
      onClick: () => console.log("share"),
      variant: "default",
    } satisfies ActionSheetOption,
    onClose: () => {},
  },
};

export const Danger: Story = {
  args: {
    option: {
      icon: Trash2,
      label: "삭제하기",
      description: "삭제하면 되돌릴 수 없어요",
      onClick: () => console.log("delete"),
      variant: "destructive",
    } satisfies ActionSheetOption,
    onClose: () => {},
  },
};

export const NoIcon: Story = {
  args: {
    option: {
      label: "아이콘 없는 옵션",
      description: "아이콘이 없어도 잘 보여야 해요",
      onClick: () => console.log("no-icon"),
      variant: "default",
    } satisfies ActionSheetOption,
    onClose: () => {},
  },
};

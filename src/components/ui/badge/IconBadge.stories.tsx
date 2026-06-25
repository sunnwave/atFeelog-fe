import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Star,
  Trash2,
  Music,
} from "lucide-react";
import IconBadge from "./IconBadge";

const meta: Meta<typeof IconBadge> = {
  title: "ui/badge/IconBadge",
  component: IconBadge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "primary", "destructive", "success"],
    },
    icon: { control: false },
  },
  args: {
    variant: "default",
    icon: Info,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen flex items-center justify-center bg-background p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof IconBadge>;

export const Default: Story = {
  args: { variant: "default", icon: Info },
};

export const Primary: Story = {
  args: { variant: "primary", icon: Star },
};

export const Destructive: Story = {
  args: { variant: "destructive", icon: Trash2 },
};

export const Success: Story = {
  args: { variant: "success", icon: CheckCircle2 },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconBadge icon={Info} variant="default" />
      <IconBadge icon={Star} variant="primary" />
      <IconBadge icon={AlertCircle} variant="destructive" />
      <IconBadge icon={CheckCircle2} variant="success" />
    </div>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      {(
        [
          { icon: Music, variant: "primary", label: "공연 기록" },
          { icon: CheckCircle2, variant: "success", label: "완료" },
          { icon: AlertCircle, variant: "destructive", label: "오류" },
          { icon: Info, variant: "default", label: "안내" },
        ] as const
      ).map(({ icon, variant, label }) => (
        <div key={label} className="flex items-center gap-3">
          <IconBadge icon={icon} variant={variant} />
          <span className="text-sm text-foreground">{label}</span>
        </div>
      ))}
    </div>
  ),
};

export const CustomClassName: Story = {
  args: {
    icon: Star,
    variant: "primary",
    className: "w-14 h-14",
  },
};

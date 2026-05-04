import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "commons/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "버튼",
    variant: "default",
    size: "default",
    disabled: false,
    asChild: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: [
        "default",
        "emerald",
        "indigo",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "inline-radio",
      options: ["default", "sm", "md", "lg", "icon"],
    },
    asChild: { control: "boolean" },
    onClick: { action: "clicked" },
    className: { control: "text" },
    children: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="min-h-60 w-130 rounded-2xl border border-border bg-background p-6 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const SizeShowcase: Story = {
  render: () => (
    <div className="w-130 space-y-3">
      <div className="flex items-center gap-3">
        <Button size="sm">size=sm</Button>
        <Button size="default">size=default</Button>
        <Button size="md">size=md</Button>
        <Button size="lg">size=lg</Button>
      </div>
      <div className="flex items-center gap-3">
        <Button size="icon" variant="outline" aria-label="아이콘 버튼">
          <ChevronRight className="size-4" />
        </Button>
        <span className="text-sm text-muted-foreground">size=icon</span>
      </div>
    </div>
  ),
};

export const VariantShowcase: Story = {
  render: () => (
    <div className="w-130 grid grid-cols-2 gap-3">
      <Button variant="default">default</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="outline">outline</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="emerald">destructive</Button>
      <Button variant="indigo">destructive</Button>
      <Button variant="link">link</Button>
    </div>
  ),
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        다음으로 <ChevronRight className="size-4" />
      </>
    ),
    variant: "default",
    size: "default",
  },
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    variant: "ghost",
    children: <ChevronRight className="size-4" />,
    "aria-label": "다음",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

/**
 * asChild 데모: Next.js Link를 직접 쓰면 Storybook에서 라우팅 의존성이 생길 수 있어서
 * 여기서는 <a>로만 보여줌.
 */
export const AsChildAnchor: Story = {
  args: {
    asChild: true,
    children: <a href="#demo">asChild (anchor)</a>,
    variant: "default",
  },
};

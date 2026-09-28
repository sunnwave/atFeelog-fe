import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ArrowLeft,
  Camera,
  Eye,
  Plus,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import { IconButton } from "./IconButton";

const variants = ["ghost", "outline", "solid"] as const;
const tones = ["primary", "neutral", "accent"] as const;
const sizes = ["sm", "md", "lg"] as const;
const shapes = ["square", "pill"] as const;

const meta = {
  title: "ui/Button/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    tone: { control: "select", options: tones },
    size: { control: "select", options: sizes },
    shape: { control: "select", options: shapes },
  },
  args: {
    children: <Plus />,
    "aria-label": "기록 추가",
    variant: "ghost",
    tone: "neutral",
    size: "sm",
    shape: "square",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FigmaMatrix: Story = {
  render: () => (
    <div className="grid gap-8 bg-background p-8 text-foreground">
      {shapes.map((shape) => (
        <section key={shape} className="grid gap-4">
          <h3 className="label-strong text-muted-foreground uppercase">
            {shape}
          </h3>
          {tones.map((tone) => (
            <div key={tone} className="flex items-center gap-4">
              <span className="w-16 text-xs text-muted-foreground">
                {tone}
              </span>
              {variants.flatMap((variant) => [
                <IconButton
                  key={`${tone}-${variant}-default`}
                  aria-label={`${variant} ${tone} default`}
                  variant={variant}
                  tone={tone}
                  size="md"
                  shape={shape}
                >
                  <Plus />
                </IconButton>,
                <IconButton
                  key={`${tone}-${variant}-disabled`}
                  aria-label={`${variant} ${tone} disabled`}
                  variant={variant}
                  tone={tone}
                  size="md"
                  shape={shape}
                  disabled
                >
                  <Plus />
                </IconButton>,
              ])}
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 bg-background p-8">
      {shapes.flatMap((shape) =>
        sizes.map((size) => (
          <IconButton
            key={`${shape}-${size}`}
            aria-label={`${shape} ${size}`}
            shape={shape}
            size={size}
            variant="ghost"
            tone="neutral"
          >
            <Plus />
          </IconButton>
        )),
      )}
    </div>
  ),
};

export const UsageIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4 bg-background p-8">
      <IconButton aria-label="닫기">
        <X />
      </IconButton>
      <IconButton aria-label="뒤로가기">
        <ArrowLeft />
      </IconButton>
      <IconButton aria-label="초기화">
        <RotateCcw />
      </IconButton>
      <IconButton aria-label="전송" variant="solid" tone="primary">
        <Send />
      </IconButton>
      <IconButton aria-label="비밀번호 보기">
        <Eye />
      </IconButton>
      <IconButton aria-label="프로필 사진 변경" variant="solid">
        <Camera />
      </IconButton>
    </div>
  ),
};

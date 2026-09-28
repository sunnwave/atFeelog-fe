import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { Button } from "./Button";

const variants = ["solid", "outline", "ghost", "link"] as const;
const tones = ["primary", "accent", "neutral", "destructive"] as const;
const sizes = ["sm", "md", "lg"] as const;
const shapes = ["square", "pill"] as const;

const meta = {
  title: "ui/Button/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: variants },
    tone: { control: "select", options: tones },
    size: { control: "select", options: sizes },
    shape: { control: "select", options: shapes },
    asChild: { control: false },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  args: {
    children: "Button",
    variant: "solid",
    tone: "primary",
    size: "md",
    shape: "square",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const VariantToneMatrix: Story = {
  render: () => (
    <div className="grid min-w-[720px] gap-6 bg-card p-8 text-foreground">
      {variants.map((variant) => (
        <section key={variant} className="grid gap-3">
          <h3 className="label-strong text-muted-foreground uppercase">
            {variant}
          </h3>
          <div className="grid grid-cols-4 items-center gap-3">
            {tones.map((tone) => (
              <Button key={tone} variant={variant} tone={tone}>
                {tone}
              </Button>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const SizesAndShapes: Story = {
  render: () => (
    <div className="grid gap-5 bg-background p-8">
      {shapes.map((shape) => (
        <div key={shape} className="flex items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} size={size} shape={shape}>
              {shape}-{size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 bg-background p-8">
      <Button leadingIcon={<Plus />}>기록하기</Button>
      <Button variant="link" tone="neutral" trailingIcon={<ArrowRight />}>
        공연 정보 불러오기
      </Button>
      <Button variant="ghost" tone="destructive" leadingIcon={<Trash2 />}>
        삭제
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 bg-background p-8">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>저장</Button>
      <Button loading loadingLabel="불러오는 중" variant="outline">
        다시 시도
      </Button>
    </div>
  ),
};

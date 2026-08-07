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
      options: ["light", "dark", "point"],
    },
    size: {
      control: "inline-radio",
      options: ["responsive", "fixed"],
    },
    children: { control: "text" },
  },
  args: {
    variant: "light",
    size: "fixed",
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

export const Point: Story = {
  args: { variant: "point", size: "responsive", children: "BTS" },
  decorators: [
    (Story) => (
      <div className="bg-background p-8 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export const PointMobile: Story = {
  name: "Point / responsive (모바일 뷰)",
  args: { variant: "point", size: "responsive", children: "아이유" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
  decorators: [
    (Story) => (
      <div className="bg-background p-8 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export const PointDesktop: Story = {
  name: "Point / responsive (데스크탑 뷰)",
  args: { variant: "point", size: "responsive", children: "아이유" },
  parameters: { viewport: { defaultViewport: "desktop" } },
  decorators: [
    (Story) => (
      <div className="bg-background p-8 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-background">
      {/* light */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase">light</p>
        <div className="flex flex-wrap gap-2">
          {["JOIN US", "NEW MEMBER", "SIGN IN", "SIGN UP", "MEMBER ONLY"].map((label) => (
            <LabelBadge key={label} variant="light">{label}</LabelBadge>
          ))}
        </div>
      </div>

      {/* dark */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase">dark</p>
        <div className="flex flex-wrap gap-2 bg-foreground p-4">
          {["JOIN US", "NEW MEMBER", "SIGN IN", "SIGN UP", "MEMBER ONLY"].map((label) => (
            <LabelBadge key={label} variant="dark">{label}</LabelBadge>
          ))}
        </div>
      </div>

      {/* point — RecordCard 뱃지 용도 (size="responsive", 반응형) */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase">point · size=responsive</p>
        <div className="flex flex-wrap gap-2">
          {["BTS", "아이유", "세븐틴", "NCT 127", "BLACKPINK"].map((label) => (
            <LabelBadge key={label} variant="point" size="responsive">{label}</LabelBadge>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const UsageInContext: Story = {
  render: () => (
    <div className="flex gap-6 flex-wrap">
      {/* 라이트 컨텍스트 */}
      <div className="bg-background p-10 flex flex-col gap-3 w-72">
        <LabelBadge variant="light">JOIN US</LabelBadge>
        <p className="text-2xl font-black tracking-tight text-foreground leading-tight">
          함께 기록해요<span className="text-point">.</span>
        </p>
        <p className="text-sm text-muted-foreground">라이트 배경 컨텍스트</p>
      </div>

      {/* 다크 컨텍스트 */}
      <div className="bg-foreground p-10 flex flex-col gap-3 w-72">
        <LabelBadge variant="dark">MEMBER ONLY</LabelBadge>
        <p className="text-2xl font-black tracking-tight text-white leading-tight">
          공연의 기억은<br />여기에 있어요
        </p>
        <p className="text-sm text-white/55">다크 배경 컨텍스트</p>
      </div>

      {/* RecordCard 컨텍스트 */}
      <div className="relative w-48 aspect-3/4 bg-foreground overflow-hidden flex flex-col justify-between p-3">
        <div className="flex items-center justify-between">
          <LabelBadge variant="point" size="responsive">아이유</LabelBadge>
          <div className="flex flex-col items-end leading-none">
            <span className="text-[10px] font-black tracking-widest text-white/50 uppercase">JAN</span>
            <span className="text-lg font-black text-white/90 tracking-tight">24</span>
          </div>
        </div>
        <p className="text-white text-base font-black leading-tight tracking-tight line-clamp-2">
          콘서트 H.E.R. WORLD TOUR
        </p>
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

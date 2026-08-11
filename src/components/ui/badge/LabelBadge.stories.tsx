import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LabelBadge from "./LabelBadge";
import { CARD_CQ_WIDTHS } from "@/stories/constants";

const meta: Meta<typeof LabelBadge> = {
  title: "ui/Badge/LabelBadge",
  component: LabelBadge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["light", "dark", "point", "muted"],
    },
    size: {
      control: "inline-radio",
      options: ["card", "fixed"],
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

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="bg-background p-8 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

const CARD_WIDTHS = CARD_CQ_WIDTHS;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-background">
      {/* light */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase">
          light · size=fixed
        </p>
        <div className="flex flex-wrap gap-2">
          {["JOIN US", "NEW MEMBER", "SIGN IN", "SIGN UP", "MEMBER ONLY"].map(
            (label) => (
              <LabelBadge key={label} variant="light">
                {label}
              </LabelBadge>
            ),
          )}
        </div>
      </div>

      {/* dark */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase">
          dark · size=fixed
        </p>
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

      {/* muted */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase">
          muted · size=fixed
        </p>
        <div className="flex flex-wrap gap-2">
          {["공연완료", "종료", "CLOSED", "ENDED", "SOLD OUT"].map((label) => (
            <LabelBadge key={label} variant="muted">
              {label}
            </LabelBadge>
          ))}
        </div>
      </div>

      {/* point fixed */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase">
          point · size=fixed
        </p>
        <div className="flex flex-wrap gap-2">
          {["BTS", "아이유", "세븐틴", "NCT 127", "BLACKPINK"].map((label) => (
            <LabelBadge key={label} variant="point">
              {label}
            </LabelBadge>
          ))}
        </div>
      </div>

      {/* point card — CQ 반응형, @container 필요 */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase">
          point · size=card (CQ 반응형 — @container 안에서만 동작)
        </p>
        <div className="flex flex-wrap gap-4">
          {CARD_WIDTHS.map(({ label, width }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-[11px] text-muted-foreground">{label}</span>
              <div
                className="@container bg-foreground/10 p-2"
                style={{ width }}
              >
                <LabelBadge variant="point" size="card">
                  아이유
                </LabelBadge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
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
          공연의 기억은
          <br />
          여기에 있어요
        </p>
        <p className="text-sm text-white/55">다크 배경 컨텍스트</p>
      </div>

      {/* RecordPosterCard 컨텍스트 — @container + size="card" */}
      <div className="@container relative w-48 aspect-3/4 bg-foreground overflow-hidden flex flex-col justify-between p-3">
        <div className="flex items-center justify-between">
          <LabelBadge variant="point" size="card">
            아이유
          </LabelBadge>
          <div className="flex flex-col items-end leading-none">
            <span className="text-[10px] font-black tracking-widest text-white/50 uppercase">
              JAN
            </span>
            <span className="text-lg font-black text-white/90 tracking-tight">
              24
            </span>
          </div>
        </div>
        <p className="text-white text-base font-black leading-tight tracking-tight line-clamp-2">
          콘서트 H.E.R. WORLD TOUR
        </p>
      </div>

      {/* ShowCard 공연 상태 컨텍스트 */}
      {(
        [
          { status: "공연예정", variant: "light" },
          { status: "공연중", variant: "point" },
          { status: "공연완료", variant: "muted" },
        ] as const
      ).map(({ status, variant }) => (
        <div
          key={status}
          className="@container relative w-40 aspect-3/4 bg-muted overflow-hidden"
        >
          <div className="absolute inset-0 p-2">
            <LabelBadge variant={variant} size="card">
              {status}
            </LabelBadge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-card">
            <p className="text-[10px] font-bold text-muted-foreground">
              26.07.01 — 26.07.31
            </p>
            <p className="text-xs font-bold text-foreground truncate">
              아이유 콘서트 H.E.R.
            </p>
            <p className="text-[9px] text-muted-foreground">올림픽공원 KSPO DOME</p>
          </div>
        </div>
      ))}
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

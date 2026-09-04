import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import CardSkeleton from "./CardSkeleton";
import { CARD_CQ_WIDTHS } from "@/storybook/constants";

const meta: Meta<typeof CardSkeleton> = {
  title: "ui/skeleton/CardSkeleton",
  component: CardSkeleton,
  parameters: { layout: "fullscreen" },
  argTypes: {
    showMeta: { control: "boolean" },
  },
  args: {
    showMeta: true,
  },
};

export default meta;
type Story = StoryObj<typeof CardSkeleton>;

// ─── 래퍼 ─────────────────────────────────────────────────────────────────────

function CardWrapper({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "#f6f5fa",
      }}
    >
      <div
        style={{ width: 200 }}
        className="@container border-[1.5px] border-foreground"
      >
        {children}
      </div>
    </div>
  );
}

// ─── 단일 카드 ────────────────────────────────────────────────────────────────

/** 포스터 + 메타 (기본) */
export const Default: Story = {
  render: (args) => (
    <CardWrapper>
      <CardSkeleton {...args} />
    </CardWrapper>
  ),
};

/** showMeta=false — 포스터만 */
export const PosterOnly: Story = {
  render: (args) => (
    <CardWrapper>
      <CardSkeleton {...args} />
    </CardWrapper>
  ),
  args: { showMeta: false },
};

// ─── 너비별 CQ 반응 ──────────────────────────────────────────────────────────

export const WidthShowcase: Story = {
  name: "Width Showcase (CQ)",
  render: () => (
    <div className="p-8 bg-background flex flex-col gap-6">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        너비별 컨테이너 쿼리 반응 — 패딩 크기 변화 확인
      </p>
      <div className="flex gap-6 flex-wrap items-start">
        {CARD_CQ_WIDTHS.map(({ width, label, desc }) => (
          <div key={width} className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-foreground">
                {label}
              </span>
              <span className="text-[10px] text-point font-semibold">
                {desc}
              </span>
            </div>
            <div
              style={{ width }}
              className="@container border-[1.5px] border-foreground"
            >
              <CardSkeleton showMeta />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

// ─── 그리드 시뮬레이션 ────────────────────────────────────────────────────────

export const GridShowcase: Story = {
  name: "Grid Showcase",
  render: () => (
    <div className="p-8 bg-background flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          2열 그리드 (모바일)
        </p>
        <div className="grid grid-cols-2 max-w-sm border-t-[1.5px] border-l-[1.5px] border-foreground">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border-r-[1.5px] border-b-[1.5px] border-foreground @container"
            >
              <CardSkeleton showMeta />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          3열 그리드 (태블릿)
        </p>
        <div className="grid grid-cols-3 max-w-2xl border-t-[1.5px] border-l-[1.5px] border-foreground">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border-r-[1.5px] border-b-[1.5px] border-foreground @container"
            >
              <CardSkeleton showMeta />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          4열 그리드 (데스크톱)
        </p>
        <div className="grid grid-cols-4 max-w-4xl border-t-[1.5px] border-l-[1.5px] border-foreground">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="border-r-[1.5px] border-b-[1.5px] border-foreground @container"
            >
              <CardSkeleton showMeta />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

// ─── 수평 스크롤 시뮬레이션 (홈 섹션) ────────────────────────────────────────

export const HorizontalScroll: Story = {
  name: "Horizontal Scroll (홈 섹션)",
  render: () => (
    <div className="p-8 bg-background flex flex-col gap-6">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        수평 스크롤 — BestRecords / LatestRecords / BoxOffice 섹션
      </p>
      <div className="w-full max-w-full overflow-x-auto">
        <div className="flex flex-nowrap border-l-[1.5px] border-foreground">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="shrink-0 w-46 md:w-52 @container border-t-[1.5px] border-r-[1.5px] border-b-[1.5px] border-foreground"
            >
              <CardSkeleton showMeta />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

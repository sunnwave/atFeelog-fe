import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import {
  recordEmptyHandler,
  recordInfiniteHandler,
  recordErrorHandler,
} from "@/mocks/handlers/record";
import { BREAKPOINT_CONFIGS } from "@/storybook/constants";
import RegularFeed from "./RegularFeed";

function SectionHeader({
  label,
  range,
}: {
  label: string;
  range: string;
}): JSX.Element {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-xs font-semibold">
        {label}
      </span>
      <span className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground font-mono">
        {range}
      </span>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "features/record-list/RegularFeed",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "app" },
  },
};

export default meta;
type Story = StoryObj;

// ─── Breakpoint showcase ──────────────────────────────────────────────────────

export const BreakpointShowcase: Story = {
  name: "Breakpoint Showcase (Container Query)",
  render: () => (
    <div className="p-8 space-y-12 bg-background overflow-x-auto">
      {BREAKPOINT_CONFIGS.map(({ label, range, width }) => (
        <section key={label}>
          <SectionHeader label={label} range={range} />
          <div style={{ width }} className="border border-border/50">
            <RegularFeed />
          </div>
        </section>
      ))}
    </div>
  ),
};

export const Default: Story = {
  // name: "Live — 전체 피드 (MSW)",
  render: () => (
    <div className="p-4 bg-background min-h-screen">
      <RegularFeed />
    </div>
  ),
};

export const Empty: Story = {
  // name: "Live — 전체 피드 (빈 결과)",
  parameters: {
    msw: { handlers: [recordEmptyHandler] },
  },
  render: () => (
    <div className="p-4 bg-background min-h-screen">
      <RegularFeed />
    </div>
  ),
};
export const InfiniteScroll: Story = {
  name: "무한스크롤",
  parameters: {
    msw: { handlers: [recordInfiniteHandler] },
  },
  render: () => (
    <div className="p-4 bg-background min-h-screen">
      <RegularFeed />
    </div>
  ),
};

export const Error: Story = {
  parameters: {
    msw: { handlers: [recordErrorHandler] },
  },
  render: () => (
    <div className="p-4 bg-background min-h-screen">
      <RegularFeed />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { RecordSummary } from "@/api/adapters/types/record-summary";
import { JSX } from "react";
import RecordPosterCard from "./RecordPosterCard";

const IMG = "https://picsum.photos/id/64/600/800";

const baseRecord: RecordSummary = {
  id: "board_1",
  title: "봄날의 콘서트, 그 여운",
  showName: "IU Concert HEREH",
  artistName: "아이유",
  likeCount: 42,
  commentCount: 12,
  isLiked: false,
  images: [],
  createdAt: "2026-03-10T00:00:00.000Z",
  user: {
    id: "mock-user-1",
    name: "Alice",
    picture: "https://picsum.photos/id/91/200/200",
  },
};

const meta: Meta<typeof RecordPosterCard> = {
  title: "features/record-list/RecordPosterCard",
  component: RecordPosterCard,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof RecordPosterCard>;

// ─── 단일 카드 ────────────────────────────────────────────────────────────────

function CardWrapper({ children, bg = "#111827" }: { children: React.ReactNode; bg?: string }): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: bg }}>
      <div style={{ width: 240 }}>
        {children}
      </div>
    </div>
  );
}

/** 이미지 있는 포스터 카드 */
export const Poster: Story = {
  render: (args) => <CardWrapper><RecordPosterCard {...args} /></CardWrapper>,
  args: { record: { ...baseRecord, images: [IMG] } },
};

/** 이미지 없는 텍스트 카드 */
export const Quote: Story = {
  render: (args) => <CardWrapper bg="#f6f5fa"><RecordPosterCard {...args} /></CardWrapper>,
  args: { record: { ...baseRecord, images: [] } },
};

/** 유저 정보 없음 */
export const AnonymousUser: Story = {
  render: (args) => <CardWrapper><RecordPosterCard {...args} /></CardWrapper>,
  args: { record: { ...baseRecord, images: [IMG], user: undefined } },
};

/** showMeta — Avatar + 좋아요/댓글 푸터 포함 */
export const WithMeta: Story = {
  render: (args) => <CardWrapper bg="#f6f5fa"><RecordPosterCard {...args} /></CardWrapper>,
  args: {
    record: { ...baseRecord, images: [IMG] },
    showMeta: true,
    showBorder: false,
  },
};

// ─── 카드 너비별 Showcase ─────────────────────────────────────────────────────
// CQ 적용 전 현황 확인용 — 현재는 모든 너비에서 동일하게 보임

const WIDTH_CONFIGS = [
  { label: "140px", desc: "5열 기준", width: 140 },
  { label: "200px", desc: "3열 기준", width: 200 },
  { label: "280px", desc: "2열 기준", width: 280 },
] as const;

export const WidthShowcase: Story = {
  name: "Width Showcase (CQ 적용 전)",
  render: () => (
    <div className="p-8 bg-background space-y-8">
      <div className="flex items-start gap-8 flex-wrap">
        {WIDTH_CONFIGS.map(({ label, desc, width }) => (
          <div key={label}>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded">{label}</span>
              <span className="text-xs text-muted-foreground">{desc}</span>
            </div>
            <div style={{ width }} className="border border-border/40">
              <div className="border-[1.5px] border-foreground">
                <RecordPosterCard record={{ ...baseRecord, images: [IMG] }} showBorder={false} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-8 flex-wrap">
        {WIDTH_CONFIGS.map(({ label, width }) => (
          <div key={label}>
            <div className="mb-2">
              <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded">{label} (텍스트)</span>
            </div>
            <div style={{ width }} className="border border-border/40">
              <div className="border-[1.5px] border-foreground">
                <RecordPosterCard record={{ ...baseRecord, images: [] }} showBorder={false} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

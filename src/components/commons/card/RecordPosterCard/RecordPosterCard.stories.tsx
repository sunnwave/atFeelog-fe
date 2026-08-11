import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { RecordSummary } from "@/api/adapters/types/record-summary";
import { JSX } from "react";
import RecordPosterCard from "./RecordPosterCard";
import { CARD_CQ_WIDTHS } from "@/storybook/constants";

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
  title: "commons/card/RecordPosterCard",
  component: RecordPosterCard,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof RecordPosterCard>;

// ─── 단일 카드 ────────────────────────────────────────────────────────────────

function CardWrapper({
  children,
  bg = "#111827",
}: {
  children: React.ReactNode;
  bg?: string;
}): JSX.Element {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: bg,
      }}
    >
      <div style={{ width: 240 }}>{children}</div>
    </div>
  );
}

/** 이미지 있는 포스터 카드 */
export const Poster: Story = {
  render: (args) => (
    <CardWrapper>
      <RecordPosterCard {...args} />
    </CardWrapper>
  ),
  args: { record: { ...baseRecord, images: [IMG] } },
};

/** 이미지 없는 텍스트 카드 */
export const Quote: Story = {
  render: (args) => (
    <CardWrapper bg="#f6f5fa">
      <RecordPosterCard {...args} />
    </CardWrapper>
  ),
  args: { record: { ...baseRecord, images: [] } },
};

/** 유저 정보 없음 */
export const AnonymousUser: Story = {
  render: (args) => (
    <CardWrapper>
      <RecordPosterCard {...args} />
    </CardWrapper>
  ),
  args: { record: { ...baseRecord, images: [IMG], user: undefined } },
};

/** showMeta — Avatar + 좋아요/댓글 푸터 포함 */
export const WithMeta: Story = {
  render: (args) => (
    <CardWrapper bg="#f6f5fa">
      <RecordPosterCard {...args} />
    </CardWrapper>
  ),
  args: {
    record: { ...baseRecord, images: [IMG] },
    showMeta: true,
    showBorder: false,
  },
};

// ─── 카드 너비별 Showcase ─────────────────────────────────────────────────────
// card CQ 브레이크포인트 기준
//   @card-xs : 180px — ShowsScreen 3~5열
//   @card-sm : 220px — 3열 전환 구간
//   @card-md : 280px — RecordFeed 4열
//   @card-lg : 320px — RecordFeed/Profile 2열

const WIDTH_CONFIGS = CARD_CQ_WIDTHS;

export const WidthShowcase: Story = {
  name: "Width Showcase ",
  render: () => (
    <div className="p-8 bg-background space-y-10">
      {/* 이미지 있는 카드 */}
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
          Poster (이미지)
        </p>
        <div className="flex items-start gap-6 flex-wrap">
          {WIDTH_CONFIGS.map(({ label, desc, width }) => (
            <div key={label}>
              <div className="mb-2 flex flex-col gap-0.5">
                <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded w-fit">
                  {label}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {desc}
                </span>
              </div>
              <div
                style={{ width }}
                className="border-[1.5px] border-foreground"
              >
                <RecordPosterCard
                  record={{ ...baseRecord, images: [IMG] }}
                  showBorder={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 이미지 없는 카드 */}
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
          Quote (텍스트)
        </p>
        <div className="flex items-start gap-6 flex-wrap">
          {WIDTH_CONFIGS.map(({ label, desc, width }) => (
            <div key={label}>
              <div className="mb-2 flex flex-col gap-0.5">
                <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded w-fit">
                  {label}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {desc}
                </span>
              </div>
              <div
                style={{ width }}
                className="border-[1.5px] border-foreground"
              >
                <RecordPosterCard
                  record={{ ...baseRecord, images: [] }}
                  showBorder={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const WithMetaWidthShowcase: Story = {
  name: "With Meta Width Showcase ",
  render: () => (
    <div className="p-8 bg-background space-y-10">
      {/* 이미지 있는 카드 */}
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
          Poster (이미지)
        </p>
        <div className="flex items-start gap-6 flex-wrap">
          {WIDTH_CONFIGS.map(({ label, desc, width }) => (
            <div key={label}>
              <div className="mb-2 flex flex-col gap-0.5">
                <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded w-fit">
                  {label}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {desc}
                </span>
              </div>
              <div
                style={{ width }}
                className="border-[1.5px] border-foreground"
              >
                <RecordPosterCard
                  record={{ ...baseRecord, images: [IMG] }}
                  showBorder={false}
                  showMeta
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 이미지 없는 카드 */}
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
          Quote (텍스트)
        </p>
        <div className="flex items-start gap-6 flex-wrap">
          {WIDTH_CONFIGS.map(({ label, desc, width }) => (
            <div key={label}>
              <div className="mb-2 flex flex-col gap-0.5">
                <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded w-fit">
                  {label}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {desc}
                </span>
              </div>
              <div
                style={{ width }}
                className="border-[1.5px] border-foreground"
              >
                <RecordPosterCard
                  record={{ ...baseRecord, images: [] }}
                  showBorder={false}
                  showMeta
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

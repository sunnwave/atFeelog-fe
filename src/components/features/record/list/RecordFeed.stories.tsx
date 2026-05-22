import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { RecordSummary } from "@/api/adapters/types/record-summary";
import RecordPosterCard from "./RecordPosterCard/RecordPosterCard";
import ResponsiveGrid from "@/components/commons/layout/ResponsiveGrid";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import { Sparkles } from "lucide-react";
import { JSX } from "react";
import { useBreakpoint } from "@/shared/hooks/ui/useBreakpoint";
import { CARD_SIZE_BY_BP, UI_SIZE, type CARD_UI_SIZE } from "@/shared/tokens";

// ─── Mock data ────────────────────────────────────────────────────────────────

const makeRecord = (
  id: string,
  overrides: Partial<RecordSummary> = {},
): RecordSummary => ({
  id,
  title: "공연 감상 기록",
  showName: "공연명",
  artistName: "아티스트",
  likeCount: 0,
  commentCount: 0,
  isLiked: false,
  createdAt: "2026-03-10T00:00:00.000Z",
  user: { id: "mock-user-1", name: "홍길동", picture: "https://picsum.photos/id/64/200/200" },
  ...overrides,
});

const MOCK_RECORDS: RecordSummary[] = [
  makeRecord("1", {
    title: "봄날의 콘서트",
    showName: "IU Concert HEREH",
    artistName: "아이유",
    likeCount: 42,
    commentCount: 12,
    images: ["https://picsum.photos/id/21/400/600"],
  }),
  makeRecord("2", {
    title: "BTS 라스트 콘서트 후기",
    showName: "BTS Permission to Dance",
    artistName: "RM, Jin, SUGA, j-hope, Jimin, V, Jung Kook",
    likeCount: 130,
    commentCount: 35,
    images: ["https://picsum.photos/id/29/400/600"],
    isLiked: true,
    user: { id: "mock-user-1", name: "아미", picture: "https://picsum.photos/id/91/200/200" },
  }),
  makeRecord("3", {
    title: "잔잔한 재즈의 밤",
    showName: "Seoul Jazz Festival",
    artistName: "윤석철, 권지혜",
    likeCount: 8,
    commentCount: 2,
    user: { id: "mock-user-1", name: "재즈러버" },
  }),
  makeRecord("4", {
    title: "처음 본 뮤지컬, 레베카",
    showName: "레베카",
    artistName: "신영숙, 홍지민",
    likeCount: 17,
    commentCount: 6,
    images: ["https://picsum.photos/id/49/400/600"],
    user: { id: "mock-user-1", name: "뮤지컬팬", picture: "https://picsum.photos/id/22/200/200" },
  }),
  makeRecord("5", {
    title: "슈가 솔로 투어",
    showName: "Agust D TOUR D-DAY",
    artistName: "SUGA",
    likeCount: 78,
    commentCount: 20,
    images: ["https://picsum.photos/id/93/400/600"],
    isLiked: true,
  }),
  makeRecord("6", {
    title: "록 페스티벌의 열기",
    showName: "Jisan Rock Festival",
    artistName: "검정치마, YB, 이승환",
    likeCount: 55,
    commentCount: 14,
    user: { id: "mock-user-1", name: "록커" },
  }),
];

// ─── Shared components ────────────────────────────────────────────────────────

function FeedGrid({ records }: { records: RecordSummary[] }): JSX.Element {
  const bp = useBreakpoint();
  const size = CARD_SIZE_BY_BP[bp];

  return (
    <ResponsiveLayout contentType="app" className="py-4">
      <ResponsiveGrid colsMobile={1} colsTablet={2} colsDesktop={3} gap={0}>
        {records.map((record) => (
          <RecordPosterCard key={record.id} record={record} size={size} />
        ))}
      </ResponsiveGrid>
    </ResponsiveLayout>
  );
}

// ─── Breakpoint showcase ──────────────────────────────────────────────────────

const BREAKPOINT_CONFIGS = [
  {
    label: "Mobile",
    range: "< 768px",
    width: 390,
    cols: 1,
    size: "lg" as CARD_UI_SIZE,
    records: MOCK_RECORDS.slice(0, 2),
  },
  {
    label: "Tablet",
    range: "768 – 1023px",
    width: 768,
    cols: 2,
    size: "lg" as CARD_UI_SIZE,
    records: MOCK_RECORDS.slice(0, 4),
  },
  {
    label: "Desktop",
    range: "≥ 1024px",
    width: 1024,
    cols: 3,
    size: "sm" as CARD_UI_SIZE,
    records: MOCK_RECORDS,
  },
] as const;

type Chip = { label: string; value: string };

function TokenChips({ size }: { size: CARD_UI_SIZE }): JSX.Element {
  const t = UI_SIZE[size];
  const chips: Chip[] = [
    { label: "pad", value: t.pad },
    { label: "title", value: t.title.split(" ")[0] },
    { label: "meta", value: t.meta },
    { label: "icon", value: t.icon },
    { label: "avatar", value: t.avatar },
    { label: "gap", value: t.gap },
  ];

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map(({ label, value }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-border bg-muted text-[11px] text-muted-foreground font-mono"
        >
          <span className="text-foreground/50">{label}=</span>
          <span className="text-foreground font-medium">{value}</span>
        </span>
      ))}
    </div>
  );
}

function SectionHeader({
  label,
  range,
  cols,
  size,
}: {
  label: string;
  range: string;
  cols: number;
  size: CARD_UI_SIZE;
}): JSX.Element {
  return (
    <div className="mb-3 space-y-2">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-bold text-foreground">{label}</h2>
        <span className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground font-mono">
          {range}
        </span>
        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
          size={size}
        </span>
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-xs font-semibold">
          {cols}열
        </span>
      </div>
      <TokenChips size={size} />
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "features/record-list/RecordFeed",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "app" },
  },
};

export default meta;
type Story = StoryObj;

// ─── Breakpoint showcase ──────────────────────────────────────────────────────

export const BreakpointShowcase: Story = {
  name: "Breakpoint Showcase",
  render: () => (
    <div className="p-8 space-y-12 bg-background overflow-x-auto">
      {BREAKPOINT_CONFIGS.map(({ label, range, width, cols, size, records }) => (
        <section key={label}>
          <SectionHeader label={label} range={range} cols={cols} size={size} />
          <div style={{ width }} className="border border-border/50">
            <div
              className="grid gap-0"
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
              {records.map((record) => (
                <RecordPosterCard key={record.id} record={record} size={size} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  ),
};

// ─── Individual viewport stories ─────────────────────────────────────────────

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile2" } },
  render: () => <FeedGrid records={MOCK_RECORDS} />,
};

export const Tablet: Story = {
  parameters: { viewport: { defaultViewport: "tablet" } },
  render: () => <FeedGrid records={MOCK_RECORDS} />,
};

export const Desktop: Story = {
  parameters: { viewport: { defaultViewport: "desktop" } },
  render: () => <FeedGrid records={MOCK_RECORDS} />,
};

export const SingleCard: Story = {
  render: () => <FeedGrid records={[MOCK_RECORDS[0]]} />,
};

export const Empty: Story = {
  render: () => (
    <ResponsiveLayout contentType="app" className="pt-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Sparkles className="w-8 h-8" />
        <span>첫 공연의 여운을 남겨보세요</span>
      </div>
    </ResponsiveLayout>
  ),
};

export const Loading: Story = {
  render: () => (
    <ResponsiveLayout contentType="app" className="py-4">
      <ResponsiveGrid colsMobile={1} colsTablet={2} colsDesktop={3} gap={0}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-3/4 bg-muted animate-pulse" />
        ))}
      </ResponsiveGrid>
    </ResponsiveLayout>
  ),
};

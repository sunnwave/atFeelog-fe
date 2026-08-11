import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { RecordSummary } from "@/api/adapters/types/record-summary";
import RecordPosterCard from "../../../commons/card/RecordPosterCard/RecordPosterCard";
import ResponsiveGrid from "@/components/commons/layout/ResponsiveGrid";
import { ResponsiveLayout } from "@/components/commons/layout/ResponsiveLayout";
import { Sparkles } from "lucide-react";
import { JSX } from "react";

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
  user: {
    id: "mock-user-1",
    name: "홍길동",
    picture: "https://picsum.photos/id/64/200/200",
  },
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
    user: {
      id: "mock-user-1",
      name: "아미",
      picture: "https://picsum.photos/id/91/200/200",
    },
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
    user: {
      id: "mock-user-1",
      name: "뮤지컬팬",
      picture: "https://picsum.photos/id/22/200/200",
    },
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

// ─── Breakpoint showcase ──────────────────────────────────────────────────────
// 콘텐츠 너비 기준 (CSS Container Query) — 사이드바 제외
// @md(640px)에서 3열, @lg(800px)에서 4열 전환

const BREAKPOINT_CONFIGS = [
  {
    label: "2열",
    range: "콘텐츠 < 640px",
    width: 500,
    records: MOCK_RECORDS.slice(0, 4),
  },
  {
    label: "3열",
    range: "콘텐츠 640px+",
    width: 700,
    records: MOCK_RECORDS.slice(0, 6),
  },
  {
    label: "4열",
    range: "콘텐츠 800px+",
    width: 900,
    records: MOCK_RECORDS,
  },
] as const;

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
  name: "Breakpoint Showcase (Container Query)",
  render: () => (
    <div className="p-8 space-y-12 bg-background overflow-x-auto">
      {BREAKPOINT_CONFIGS.map(({ label, range, width, records }) => (
        <section key={label}>
          <SectionHeader label={label} range={range} />
          <div style={{ width }} className="border border-border/50">
            <ResponsiveGrid cols={2} colsMd={3} colsLg={4} gap="none">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="border-[1.5px] border-foreground"
                >
                  <RecordPosterCard
                    record={record}
                    showMeta
                    showBorder={false}
                  />
                </div>
              ))}
            </ResponsiveGrid>
          </div>
        </section>
      ))}
    </div>
  ),
};

// ─── Container width stories (CQ 기반) ───────────────────────────────────────
// 뷰포트가 아닌 컨테이너 너비로 열 수가 결정됨
// @md(640px)에서 3열, @lg(800px)에서 4열 전환

function GridWithWidth({
  width,
  records,
}: {
  width: number;
  records: RecordSummary[];
}): JSX.Element {
  return (
    <div className="p-6 bg-background">
      <div style={{ width }} className="border border-border/40">
        <ResponsiveGrid cols={2} colsMd={3} colsLg={4} gap="none">
          {records.map((record) => (
            <div key={record.id} className="border-[1.5px] border-foreground">
              <RecordPosterCard record={record} showMeta showBorder={false} />
            </div>
          ))}
        </ResponsiveGrid>
      </div>
    </div>
  );
}

/** 콘텐츠 너비 500px — 2열 */
export const Cols2: Story = {
  name: "2열 (콘텐츠 < 640px)",
  render: () => (
    <GridWithWidth width={500} records={MOCK_RECORDS.slice(0, 4)} />
  ),
};

/** 콘텐츠 너비 700px — @md 640px+ → 3열 */
export const Cols3: Story = {
  name: "3열 (콘텐츠 640px+)",
  render: () => <GridWithWidth width={700} records={MOCK_RECORDS} />,
};

/** 콘텐츠 너비 900px — @lg 800px+ → 4열 */
export const Cols4: Story = {
  name: "4열 (콘텐츠 800px+)",
  render: () => <GridWithWidth width={900} records={MOCK_RECORDS} />,
};

export const Empty: Story = {
  render: () => (
    <ResponsiveLayout contentType="wide" className="pt-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Sparkles className="w-8 h-8" />
        <span>첫 공연의 여운을 남겨보세요</span>
      </div>
    </ResponsiveLayout>
  ),
};

export const Loading: Story = {
  render: () => (
    <ResponsiveLayout contentType="wide" padded={false} className="py-4">
      <ResponsiveGrid cols={2} colsMd={3} colsLg={4} gap="none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-3/4 bg-muted animate-pulse border-[1.5px] border-foreground"
          />
        ))}
      </ResponsiveGrid>
    </ResponsiveLayout>
  ),
};

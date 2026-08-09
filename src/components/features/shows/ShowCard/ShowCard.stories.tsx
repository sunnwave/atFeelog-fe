import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Performance } from "@/shared/types/performance";
import { JSX } from "react";
import ShowCard from "./ShowCard";

const POSTER_IMG = "https://picsum.photos/id/64/600/800";

const basePerformance: Performance = {
  mt20id: "PF230701",
  title: "아이유 콘서트 H.E.R. WORLD TOUR",
  venueName: "올림픽공원 KSPO DOME",
  posterUrl: POSTER_IMG,
  genre: "콘서트",
  status: "공연중",
  startDate: "2026.07.01",
  endDate: "2026.07.31",
  isOpenRun: false,
};

const meta: Meta<typeof ShowCard> = {
  title: "features/shows/ShowCard",
  component: ShowCard,
  parameters: { layout: "fullscreen" },
  argTypes: {
    performance: { control: false },
    showMeta: { control: "boolean" },
    showBorder: { control: "boolean" },
  },
  args: {
    performance: basePerformance,
    showMeta: true,
    showBorder: true,
  },
};

export default meta;
type Story = StoryObj<typeof ShowCard>;

// ─── 래퍼 ─────────────────────────────────────────────────────────────────────

function CardWrapper({
  children,
  bg = "#f6f5fa",
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
      <div style={{ width: 200 }}>{children}</div>
    </div>
  );
}

// ─── 단일 카드 ────────────────────────────────────────────────────────────────

/** 포스터 + ShowCardMeta (기본) */
export const Default: Story = {
  render: (args) => (
    <CardWrapper>
      <ShowCard {...args} />
    </CardWrapper>
  ),
};

/** showMeta=false — 포스터 + 뱃지만, 텍스트 영역 없음 */
export const PosterOnly: Story = {
  render: (args) => (
    <CardWrapper>
      <ShowCard {...args} />
    </CardWrapper>
  ),
  args: { showMeta: false },
};

/** 포스터 이미지 없는 카드 */
export const NoImageCard: Story = {
  render: (args) => (
    <CardWrapper>
      <ShowCard {...args} performance={{ ...basePerformance, posterUrl: "" }} />
    </CardWrapper>
  ),
};

/** 오픈런 뱃지 표시 */
export const OpenRun: Story = {
  render: (args) => (
    <CardWrapper>
      <ShowCard
        {...args}
        performance={{ ...basePerformance, isOpenRun: true, endDate: "2099.12.31" }}
      />
    </CardWrapper>
  ),
};

// ─── 상태별 모아보기 ─────────────────────────────────────────────────────────

const STATUS_MOCKS: Performance[] = [
  {
    ...basePerformance,
    mt20id: "PF001",
    title: "레베카",
    genre: "뮤지컬",
    status: "공연예정",
    startDate: "2026.09.01",
    endDate: "2026.11.30",
  },
  {
    ...basePerformance,
    mt20id: "PF002",
    title: "아이유 콘서트 H.E.R. WORLD TOUR",
    genre: "콘서트",
    status: "공연중",
  },
  {
    ...basePerformance,
    mt20id: "PF003",
    title: "세종대왕",
    genre: "연극",
    status: "공연완료",
    startDate: "2025.10.01",
    endDate: "2026.01.31",
  },
];

export const AllStatuses: Story = {
  name: "All Statuses",
  render: () => (
    <div className="p-8 bg-background flex flex-col gap-8">
      {/* showMeta=true */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          showMeta=true
        </p>
        <div className="flex gap-6 flex-wrap items-start">
          {STATUS_MOCKS.map((p) => (
            <div key={p.mt20id} className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-muted-foreground">{p.status}</span>
              <div style={{ width: 200 }}>
                <ShowCard performance={p} showMeta showBorder />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* showMeta=false */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          showMeta=false (포스터만)
        </p>
        <div className="flex gap-6 flex-wrap items-start">
          {STATUS_MOCKS.map((p) => (
            <div key={p.mt20id} className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-muted-foreground">{p.status}</span>
              <div style={{ width: 200 }}>
                <ShowCard performance={p} showMeta={false} showBorder />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 이미지 없음 + showMeta */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          이미지 없음 · showMeta=true
        </p>
        <div className="flex gap-6 flex-wrap items-start">
          {STATUS_MOCKS.map((p) => (
            <div key={p.mt20id} className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-muted-foreground">{p.status}</span>
              <div style={{ width: 200 }}>
                <ShowCard performance={{ ...p, posterUrl: "" }} showMeta showBorder />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

// ─── 그리드 시뮬레이션 ────────────────────────────────────────────────────────

const GRID_MOCKS: Performance[] = [
  { ...basePerformance, mt20id: "G001", title: "아이유 콘서트 H.E.R.", genre: "콘서트", status: "공연중" },
  { ...basePerformance, mt20id: "G002", title: "레베카", genre: "뮤지컬", status: "공연예정", posterUrl: "" },
  { ...basePerformance, mt20id: "G003", title: "BTS PERMISSION TO DANCE ON STAGE", genre: "콘서트", status: "공연중", isOpenRun: true },
  { ...basePerformance, mt20id: "G004", title: "세종대왕", genre: "연극", status: "공연완료", posterUrl: "" },
  { ...basePerformance, mt20id: "G005", title: "노트르담 드 파리", genre: "뮤지컬", status: "공연예정" },
  { ...basePerformance, mt20id: "G006", title: "피아노 소나타 전곡 연주회", genre: "클래식", status: "공연완료" },
];

export const GridShowcase: Story = {
  name: "Grid Showcase",
  render: () => (
    <div className="p-8 bg-background flex flex-col gap-10">
      {/* 2열 — border-t/l은 그리드 컨테이너, border-r/b는 카드 */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          2열 그리드 (모바일)
        </p>
        <div className="grid grid-cols-2 max-w-sm border-t-[1.5px] border-l-[1.5px] border-foreground">
          {GRID_MOCKS.slice(0, 4).map((p) => (
            <ShowCard key={p.mt20id} performance={p} showMeta showBorder />
          ))}
        </div>
      </div>

      {/* 3열 */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          3열 그리드 (태블릿)
        </p>
        <div className="grid grid-cols-3 max-w-2xl border-t-[1.5px] border-l-[1.5px] border-foreground">
          {GRID_MOCKS.map((p) => (
            <ShowCard key={p.mt20id} performance={p} showMeta showBorder />
          ))}
        </div>
      </div>

      {/* 4열 */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          4열 그리드 (데스크톱)
        </p>
        <div className="grid grid-cols-4 max-w-4xl border-t-[1.5px] border-l-[1.5px] border-foreground">
          {[...GRID_MOCKS, ...GRID_MOCKS.slice(0, 2)].map((p, i) => (
            <ShowCard key={`${p.mt20id}-${i}`} performance={p} showMeta showBorder />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

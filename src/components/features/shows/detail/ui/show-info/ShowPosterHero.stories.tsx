import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ShowPosterHero from "./ShowPosterHero";
import type { PerformanceDetail } from "@/shared/types/performance";

// ─── Mock ──────────────────────────────────────────────────────────────────────

const base: PerformanceDetail = {
  mt20id: "PF123456",
  title: "햄릿",
  venueName: "LG아트센터 서울",
  posterUrl: "https://placehold.co/390x520/1a1a1a/ffffff?text=POSTER",
  genre: "연극",
  status: "공연중",
  startDate: "2026.06.01",
  endDate: "2026.09.30",
  isOpenRun: false,
  ticketLinks: [],
};

// ─── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ShowPosterHero> = {
  title: "features/shows/detail/ShowPosterHero",
  component: ShowPosterHero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="w-[390px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ShowPosterHero>;

// ─── Stories ───────────────────────────────────────────────────────────────────

/** 공연중 — point 배지 + 포스터 이미지 */
export const Playing: Story = {
  name: "공연중",
  args: { detail: base },
};

/** 공연예정 — light 배지 */
export const Upcoming: Story = {
  name: "공연예정",
  args: {
    detail: {
      ...base,
      status: "공연예정",
      posterUrl: "https://placehold.co/390x520/2d1b69/ffffff?text=POSTER",
    },
  },
};

/** 공연완료 */
export const Ended: Story = {
  name: "공연완료",
  args: {
    detail: { ...base, status: "공연완료" },
  },
};

/** 포스터 없음 — NoImageCard halftone 폴백 */
export const NoPoster: Story = {
  name: "포스터 없음",
  args: {
    detail: { ...base, posterUrl: "" },
  },
};

/** status 없음 — 배지 미렌더 */
export const NoStatus: Story = {
  name: "배지 없음",
  args: {
    detail: { ...base, status: undefined },
  },
};

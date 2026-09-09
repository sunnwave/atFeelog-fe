/**
 * 스토리북 공용 CQ 너비 상수
 */

export const CARD_CQ_WIDTHS = [
  { label: "180px", desc: "@card-xs", width: 180 },
  { label: "220px", desc: "@card-sm", width: 220 },
  { label: "280px", desc: "@card-md", width: 280 },
  { label: "320px", desc: "@card-lg", width: 320 },
  { label: "380px", desc: "> @card-lg", width: 380 },
] as const;

// ─── Breakpoint showcase ──────────────────────────────────────────────────────
// 콘텐츠 너비 기준 (CSS Container Query) — 사이드바 제외
// @md(640px)에서 3열, @lg(800px)에서 4열 전환

export const BREAKPOINT_CONFIGS = [
  {
    label: "2열",
    range: "콘텐츠 < 640px",
    width: 500,
  },
  {
    label: "3열",
    range: "콘텐츠 640px+",
    width: 700,
  },
  {
    label: "4열",
    range: "콘텐츠 800px+",
    width: 900,
  },
] as const;

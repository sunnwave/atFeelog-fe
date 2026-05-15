import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GRADIENTS } from "@/shared/constants";
import { JSX } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

// 기존 GRADIENTS: Tailwind 클래스 기반 (gradients.ts 에서 import)
type ClassGradient = (typeof GRADIENTS)[number];

// 제안 팔레트: 인라인 CSS 값 기반 — Tailwind 스캔 없이 항상 렌더됨
type InlineGradient = {
  name: string;
  bg: string;         // CSS gradient value
  blobTopColor: string;    // rgba
  blobBottomColor: string; // rgba
};

// ─── Proposed palette ─────────────────────────────────────────────────────────
//
// 컨셉: 파스텔 — Tailwind 200번대(밝고 부드러운 시작) → 400번대(살짝 깊어지는 끝)
//
// 이전 시도들의 문제:
//   - 600~800 → #0f172a: 너무 어둡고 칙칙함
//
// 새 접근:
//   - 전 범위를 파스텔 스펙트럼(200~400)에 유지 → 어둡게 끝내지 않음
//   - 카드 오버레이(black/60 ~ black/90)가 위·아래 텍스트 대비를 보장하므로
//     배경 자체는 밝고 화사해도 됨
//   - 블롭을 흰색 반투명으로 → 파스텔 위에 자연스러운 하이라이트

const PROPOSED: InlineGradient[] = [
  {
    name: "Lavender",
    bg: "linear-gradient(145deg, #c7d2fe, #818cf8)",
    blobTopColor: "rgba(255,255,255,0.45)",
    blobBottomColor: "rgba(165,180,252,0.35)",
  },
  {
    name: "Mint",
    bg: "linear-gradient(145deg, #a7f3d0, #34d399)",
    blobTopColor: "rgba(255,255,255,0.45)",
    blobBottomColor: "rgba(110,231,183,0.35)",
  },
  {
    name: "Blush",
    bg: "linear-gradient(145deg, #fecdd3, #fb7185)",
    blobTopColor: "rgba(255,255,255,0.45)",
    blobBottomColor: "rgba(253,164,175,0.35)",
  },
  {
    name: "Sky",
    bg: "linear-gradient(145deg, #bae6fd, #38bdf8)",
    blobTopColor: "rgba(255,255,255,0.45)",
    blobBottomColor: "rgba(125,211,252,0.35)",
  },
  {
    name: "Lilac",
    bg: "linear-gradient(145deg, #ddd6fe, #a78bfa)",
    blobTopColor: "rgba(255,255,255,0.45)",
    blobBottomColor: "rgba(196,181,253,0.35)",
  },
  {
    name: "Peach",
    bg: "linear-gradient(145deg, #fed7aa, #fb923c)",
    blobTopColor: "rgba(255,255,255,0.45)",
    blobBottomColor: "rgba(253,186,116,0.35)",
  },
  {
    name: "Aqua",
    bg: "linear-gradient(145deg, #99f6e4, #2dd4bf)",
    blobTopColor: "rgba(255,255,255,0.45)",
    blobBottomColor: "rgba(94,234,212,0.35)",
  },
  {
    name: "Orchid",
    bg: "linear-gradient(145deg, #f5d0fe, #e879f9)",
    blobTopColor: "rgba(255,255,255,0.45)",
    blobBottomColor: "rgba(240,171,252,0.35)",
  },
  {
    name: "Baby Blue",
    bg: "linear-gradient(145deg, #bfdbfe, #60a5fa)",
    blobTopColor: "rgba(255,255,255,0.45)",
    blobBottomColor: "rgba(147,197,253,0.35)",
  },
  {
    name: "Coral",
    bg: "linear-gradient(145deg, #fecaca, #f87171)",
    blobTopColor: "rgba(255,255,255,0.45)",
    blobBottomColor: "rgba(252,165,165,0.35)",
  },
  {
    name: "Butter",
    bg: "linear-gradient(145deg, #fef08a, #facc15)",
    blobTopColor: "rgba(255,255,255,0.45)",
    blobBottomColor: "rgba(253,224,71,0.35)",
  },
  {
    name: "Pearl",
    bg: "linear-gradient(145deg, #e2e8f0, #94a3b8)",
    blobTopColor: "rgba(255,255,255,0.50)",
    blobBottomColor: "rgba(203,213,225,0.35)",
  },
];

// ─── Swatch components ────────────────────────────────────────────────────────

function ClassSwatch({ g, i }: { g: ClassGradient; i: number }): JSX.Element {
  return (
    <div className="space-y-1.5">
      <div className={`relative aspect-square rounded-lg overflow-hidden ${g.bg}`}>
        <div className={`absolute -top-4 -right-4 w-12 h-12 ${g.blobTop} rounded-full blur-2xl`} />
        <div className={`absolute -bottom-4 -left-4 w-12 h-12 ${g.blobBottom} rounded-full blur-2xl`} />
      </div>
      <p className="text-[10px] text-muted-foreground text-center">{i + 1}</p>
    </div>
  );
}

function InlineSwatch({ g }: { g: InlineGradient }): JSX.Element {
  return (
    <div className="space-y-1.5">
      <div
        className="relative aspect-square rounded-lg overflow-hidden"
        style={{ background: g.bg }}
      >
        <div
          className="absolute -top-4 -right-4 w-12 h-12 rounded-full blur-2xl"
          style={{ backgroundColor: g.blobTopColor }}
        />
        <div
          className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full blur-2xl"
          style={{ backgroundColor: g.blobBottomColor }}
        />
      </div>
      <p className="text-[10px] text-muted-foreground text-center leading-tight">{g.name}</p>
    </div>
  );
}

// ─── Card preview components ──────────────────────────────────────────────────

function MockCard({ g }: { g: InlineGradient }): JSX.Element {
  return (
    <div className="relative aspect-3/4 overflow-hidden">
      <div className="absolute inset-0" style={{ background: g.bg }}>
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: g.blobTopColor }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: g.blobBottomColor }}
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/70 to-transparent" />
      <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30" />
          <span className="text-white/90 text-sm font-bold">홍길동</span>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
          팔로우
        </span>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-base truncate">봄날의 콘서트</p>
          <p className="text-white/80 text-sm truncate">IU Concert HEREH</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-xs">
            아이유
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 text-white/80 text-xs">
          <span>♥ 42</span>
          <span>💬 12</span>
        </div>
      </div>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "features/record-list/GradientBg",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "app" },
  },
};

export default meta;
type Story = StoryObj;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const PaletteComparison: Story = {
  name: "Palette Comparison",
  render: () => (
    <div className="p-8 space-y-10 bg-background">
      <div>
        <h1 className="text-xl font-bold text-foreground mb-1">GradientBg 팔레트 비교</h1>
        <p className="text-sm text-muted-foreground">
          이미지 없는 카드에 자동 배정되는 배경 그라디언트입니다.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-foreground">
          Current — 20종, 다양한 색상 계열 혼합
        </h2>
        <div className="grid grid-cols-5 gap-3 md:grid-cols-10">
          {GRADIENTS.map((g, i) => (
            <ClassSwatch key={i} g={g} i={i} />
          ))}
        </div>
      </section>

      <hr className="border-border" />

      <section className="space-y-3">
        <h2 className="text-base font-bold text-foreground">
          Proposed — 12종, 파스텔 (200 → 400번대)
        </h2>
        <div className="grid grid-cols-4 gap-3 md:grid-cols-6 lg:grid-cols-12">
          {PROPOSED.map((g, i) => (
            <InlineSwatch key={i} g={g} />
          ))}
        </div>
      </section>

      <div className="rounded-xl bg-muted/50 border border-border p-5 space-y-2 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">변경 설계 원칙</p>
        <ul className="list-disc list-inside space-y-1">
          <li>전 범위를 파스텔 스펙트럼(200 → 400)에 유지 — 어둡게 끝내지 않아 칙칙함 없음</li>
          <li>
            카드 오버레이(black/60 ~ black/90)가 위·아래 텍스트 대비를 보장하므로
            배경 자체는 밝고 화사해도 됨
          </li>
          <li>블롭을 흰색 반투명으로 — 파스텔 위에 자연스러운 하이라이트</li>
          <li>radial → <strong className="text-foreground">linear 145deg</strong> — 파스텔에 더 부드럽고 균일한 색 전환</li>
        </ul>
      </div>
    </div>
  ),
};

export const CardPreviewCurrent: Story = {
  name: "Card Preview — Current",
  render: () => (
    <div className="p-8 bg-background space-y-3">
      <h2 className="text-base font-bold text-foreground">Current 팔레트 — 카드 적용 시</h2>
      <div className="grid grid-cols-4 gap-0 md:grid-cols-5 lg:grid-cols-10">
        {GRADIENTS.map((g, i) => (
          <div key={i} className={`relative aspect-3/4 overflow-hidden ${g.bg}`}>
            <div className={`absolute -top-24 -right-24 w-72 h-72 ${g.blobTop} rounded-full blur-3xl`} />
            <div className={`absolute -bottom-24 -left-24 w-72 h-72 ${g.blobBottom} rounded-full blur-3xl`} />
            <div className="absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/70 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const CardPreviewProposed: Story = {
  name: "Card Preview — Proposed",
  render: () => (
    <div className="p-8 bg-background space-y-3">
      <h2 className="text-base font-bold text-foreground">
        Proposed "Stage Light" — 카드 적용 시
      </h2>
      <div className="grid grid-cols-3 gap-0 md:grid-cols-4 lg:grid-cols-6">
        {PROPOSED.map((g, i) => (
          <MockCard key={i} g={g} />
        ))}
      </div>
    </div>
  ),
};

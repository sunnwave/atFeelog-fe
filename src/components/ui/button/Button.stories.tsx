import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { ChevronRight, Trash2 } from "lucide-react";
import { Button } from "./Button";

const VARIANTS = ["solid", "outline", "ghost", "link"] as const;
const TONES    = ["primary", "accent", "point", "destructive", "soft"] as const;
const SIZES    = ["sm", "default", "md", "lg"] as const;

const TONE_LABEL: Record<typeof TONES[number], string> = {
  primary:     "기록하기",
  accent:      "팔로잉 ✓",
  point:       "♥ 좋아요",
  destructive: "삭제",
  soft:        "작성하기",
};

const meta: Meta<typeof Button> = {
  title: "ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "버튼",
    variant: "solid",
    tone: "primary",
    size: "default",
    disabled: false,
    asChild: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["solid", "outline", "ghost", "link"],
    },
    tone: {
      control: "inline-radio",
      options: ["primary", "accent", "point", "destructive", "soft"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "default", "md", "lg", "icon"],
    },
    asChild: { control: "boolean" },
    onClick: { action: "clicked" },
    className: { control: "text" },
    children: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="min-h-60 w-130 rounded-2xl border border-border bg-background p-6 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const SizeShowcase: Story = {
  render: () => (
    <div className="w-130 space-y-3">
      <div className="flex items-center gap-3">
        <Button size="sm">size=sm</Button>
        <Button size="default">size=default</Button>
        <Button size="md">size=md</Button>
        <Button size="lg">size=lg</Button>
      </div>
      <div className="flex items-center gap-3">
        <Button size="icon" variant="outline" aria-label="아이콘 버튼">
          <ChevronRight className="size-4" />
        </Button>
        <span className="text-sm text-muted-foreground">size=icon</span>
      </div>
    </div>
  ),
};

export const VariantShowcase: Story = {
  name: "Variant × Tone Matrix",
  render: () => {
    const variants = ["solid", "outline", "ghost", "link"] as const;
    const tones = ["primary", "accent", "point", "destructive"] as const;
    const labels: Record<typeof tones[number], string> = {
      primary: "기록하기",
      accent: "팔로잉 ✓",
      point: "♥ 좋아요",
      destructive: "삭제",
    };
    return (
      <div className="w-150 space-y-2">
        {/* Header */}
        <div className="grid grid-cols-5 gap-2 mb-1">
          <span />
          {tones.map((t) => (
            <span key={t} className="text-xs text-muted-foreground text-center font-medium">{t}</span>
          ))}
        </div>
        {/* Matrix */}
        {variants.map((v) => (
          <div key={v} className="grid grid-cols-5 gap-2 items-center">
            <span className="text-xs text-muted-foreground font-medium">{v}</span>
            {tones.map((t) => (
              <Button key={t} variant={v} tone={t} size="sm">
                {labels[t]}
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        다음으로 <ChevronRight className="size-4" />
      </>
    ),
    variant: "solid",
    size: "default",
  },
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    variant: "ghost",
    children: <ChevronRight className="size-4" />,
    "aria-label": "다음",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

/**
 * asChild 데모: Next.js Link를 직접 쓰면 Storybook에서 라우팅 의존성이 생길 수 있어서
 * 여기서는 <a>로만 보여줌.
 */
export const AsChildAnchor: Story = {
  args: {
    asChild: true,
    children: <a href="#demo">asChild (anchor)</a>,
    variant: "solid",
  },
};

// ── 전체 케이스 한눈에 ───────────────────────────────────────────────────────

const S = {
  bg:      "var(--background)",
  surface: "var(--card)",
  border:  "var(--border)",
  text:    "var(--foreground)",
  muted:   "var(--muted-foreground)",
  soft:    "var(--surface-soft)",
  primary: "var(--primary)",
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, color: S.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
      {children}
    </p>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 10, color: S.muted, marginTop: 4, display: "block", textAlign: "center" }}>
      {children}
    </span>
  );
}

export const AllCases: Story = {
  name: "All Cases",
  parameters: { layout: "fullscreen" },
  decorators: [],
  render: () => (
    <div style={{ backgroundColor: S.bg, minHeight: "100vh", padding: 32, display: "flex", flexDirection: "column", gap: 40 }}>

      {/* ── Variant × Tone 매트릭스 ── */}
      <section>
        <Label>Variant × Tone Matrix</Label>
        <div style={{ backgroundColor: S.surface, border: `1px solid ${S.border}`, borderRadius: 12, overflow: "hidden" }}>
          {/* 헤더 */}
          <div style={{ display: "grid", gridTemplateColumns: `80px repeat(${TONES.length}, 1fr)`, gap: "0 8px", padding: "8px 16px", backgroundColor: S.soft, borderBottom: `1px solid ${S.border}` }}>
            <span />
            {TONES.map((t) => (
              <span key={t} style={{ fontSize: 10, fontWeight: 600, color: S.muted, textAlign: "center" }}>{t}</span>
            ))}
          </div>
          {/* 행 */}
          {VARIANTS.map((v, vi) => (
            <div key={v} style={{ display: "grid", gridTemplateColumns: `80px repeat(${TONES.length}, 1fr)`, gap: "0 8px", padding: "10px 16px", borderBottom: vi < VARIANTS.length - 1 ? `1px solid ${S.border}` : "none", alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: S.muted }}>{v}</span>
              {TONES.map((t) => (
                <Button key={t} variant={v} tone={t} size="sm" style={{ width: "100%" }}>
                  {TONE_LABEL[t]}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Size 비교 ── */}
      <section>
        <Label>Size</Label>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
          {SIZES.map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Button size={s}>기록하기</Button>
              <Sub>{s}</Sub>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Button size="icon" variant="outline" aria-label="아이콘">
              <ChevronRight />
            </Button>
            <Sub>icon</Sub>
          </div>
        </div>
      </section>

      {/* ── 아이콘 조합 ── */}
      <section>
        <Label>With Icon</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Button variant="solid" tone="primary">다음으로 <ChevronRight /></Button>
          <Button variant="solid" tone="point">♥ 좋아요</Button>
          <Button variant="outline" tone="destructive"><Trash2 /> 삭제</Button>
          <Button variant="ghost" tone="primary" size="icon" aria-label="다음"><ChevronRight /></Button>
        </div>
      </section>

      {/* ── 상태 ── */}
      <section>
        <Label>States</Label>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          {[
            { label: "normal",          node: <Button variant="solid" tone="primary">Normal</Button> },
            { label: "solid disabled",  node: <Button variant="solid" tone="primary" disabled>Disabled</Button> },
            { label: "outline disabled",node: <Button variant="outline" tone="primary" disabled>Disabled</Button> },
            { label: "asChild",         node: <Button asChild variant="solid" tone="primary"><a href="#demo">asChild</a></Button> },
          ].map(({ label, node }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {node}
              <Sub>{label}</Sub>
            </div>
          ))}
        </div>
      </section>

      {/* ── Soft — 사이드바 맥락 ── */}
      <section>
        <Label>Soft — Sidebar Context</Label>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          {/* 사이드바 시뮬레이션 */}
          <div style={{ width: 200, backgroundColor: S.bg, border: `1px solid ${S.border}`, borderRadius: 12, padding: 12, display: "flex", flexDirection: "column", gap: 4 }}>
            <Button variant="solid" tone="soft" size="lg" style={{ justifyContent: "flex-start", width: "100%", borderRadius: 12 }}>작성하기</Button>
            {["홈", "탐색", "내 기록"].map((label, i) => (
              <Button key={label} variant={i === 0 ? "solid" : "ghost"} tone={i === 0 ? "soft" : "primary"} size="lg" style={{ justifyContent: "flex-start", width: "100%", borderRadius: 12 }}>
                {label}
              </Button>
            ))}
          </div>
          {/* 각 variant 나열 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {VARIANTS.map((v) => (
              <div key={v} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: S.muted, width: 52 }}>{v}</span>
                <Button variant={v} tone="soft">작성하기</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 다크 배경 위 ── */}
      <section>
        <Label>On Dark Surface</Label>
        <div style={{ backgroundColor: S.primary, borderRadius: 12, padding: "20px 24px", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <Button variant="solid" tone="accent">팔로잉 ✓</Button>
          <Button variant="solid" tone="soft">작성하기</Button>
          <Button variant="outline" tone="primary" className="text-white border-white/40 hover:bg-white/10">팔로우</Button>
          <Button variant="ghost" tone="primary" className="text-white hover:bg-white/10">더보기</Button>
        </div>
      </section>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX, type CSSProperties } from "react";

// ─── Brand palette ────────────────────────────────────────────────────────────
// 레퍼런스 이미지 추출: Vanilla #EFF0A3 · Alice Blue #D8DFE9 · Honeydew #CFDECA
// Eerie Black #212121 · Ghost White #F6F5FA · Coral (기존 유지)

const PALETTE = [
  {
    name: "Vanilla",
    shades: [
      { label: "tint", hex: "#fafbe6" },
      { label: "light", hex: "#f5f7c4" },
      { label: "soft", hex: "#eff0a3" },
      { label: "base", hex: "#e4e57d" },
      { label: "point", hex: "#7c7d00" },
    ],
  },
  {
    name: "Alice",
    shades: [
      { label: "tint", hex: "#f4f6f9" },
      { label: "light", hex: "#e4eaf2" },
      { label: "soft", hex: "#d8dfe9" },
      { label: "base", hex: "#b8c4d5" },
      { label: "point", hex: "#4a5e78" },
      { label: "deep", hex: "#2c3d54" },
    ],
  },
  {
    name: "Honeydew",
    shades: [
      { label: "tint", hex: "#f5faf3" },
      { label: "light", hex: "#e3f0de" },
      { label: "soft", hex: "#cfdeca" },
      { label: "base", hex: "#afc7a7" },
      { label: "point", hex: "#73996b" },
    ],
  },
  {
    name: "Coral",
    shades: [
      { label: "tint", hex: "#fff6f1" },
      { label: "light", hex: "#ffe0d2" },
      { label: "soft", hex: "#ffb199" },
      { label: "base", hex: "#ff7954" },
      { label: "point", hex: "#ff5c34" },
    ],
  },
  {
    name: "Neutral",
    shades: [
      { label: "bg", hex: "#f6f5fa" },
      { label: "surface", hex: "#ffffff" },
      { label: "soft", hex: "#f4f4ef" },
      { label: "border", hex: "#e8e8df" },
      { label: "text", hex: "#212121" },
      { label: "muted", hex: "#70736b" },
    ],
  },
] as const;

// ─── Semantic tokens ──────────────────────────────────────────────────────────

const S = {
  // Neutral surface
  bg: "#f6f5fa",
  surface: "#ffffff",
  surfaceSoft: "#f4f4ef",
  border: "#e8e8df",
  text: "#212121",
  muted: "#70736b",

  // Primary CTA
  primary: "#212121",

  // Vanilla — active state, accent fill (ref: #EFF0A3)
  vanillaSoft: "#eff0a3",
  vanillaBase: "#e4e57d",
  vanillaPoint: "#7c7d00",

  // Alice — info / point text (ref: #D8DFE9)
  aliceBase: "#b8c4d5",
  alicePoint: "#4a5e78",

  // Coral — likes, engagement (unchanged)
  coralPoint: "#ff5c34",
  coralTint: "#fff6f1",

  // Info surface (alice-soft)
  infoSurface: "#d8dfe9",
  infoBorder: "#b8c4d5",

  // Aux surface (honeydew-light)
  auxSurface: "#e3f0de",
  auxBorder: "#cfdeca",
  auxText: "#73996b",
} as const;

// ─── Common styles ────────────────────────────────────────────────────────────

const st: Record<string, CSSProperties> = {
  pageTitle:     { fontSize: 20, fontWeight: 700, color: S.text, margin: "0 0 4px" },
  pageSubtitle:  { fontSize: 14, color: S.muted, margin: "0 0 32px" },
  sectionLabel:  { fontSize: 12, fontWeight: 600, color: S.muted, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 12px" },
  sectionLabelSm:{ fontSize: 11, fontWeight: 600, color: S.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" },
  surfaceBox:    { backgroundColor: S.surface, borderRadius: 12, border: `1px solid ${S.border}`, overflow: "hidden" },
  colCenter:     { display: "flex", flexDirection: "column", gap: 5, alignItems: "center" },
};

// ─── Semantic role map ────────────────────────────────────────────────────────

const SEMANTIC_ROLES = [
  {
    token: "--background",
    hex: S.bg,
    role: "페이지 배경",
    usage: "앱 전체 배경 (ghost white)",
  },
  {
    token: "--foreground",
    hex: S.text,
    role: "텍스트 · UI 보더",
    usage: "본문 텍스트, 카드·아바타·구분선 테두리",
  },
  {
    token: "--card",
    hex: S.surface,
    role: "카드·모달 배경",
    usage: "카드, 모달, 드로어, 팝오버",
  },
  {
    token: "--muted-foreground",
    hex: S.muted,
    role: "보조 텍스트",
    usage: "날짜, 장소, 메타, 부제목",
  },
  {
    token: "--muted",
    hex: S.surfaceSoft,
    role: "공연완료 뱃지·비활성",
    usage: "muted badge bg, inactive chip, sub bg",
  },
  {
    token: "--border",
    hex: S.border,
    role: "서브틀 구분선",
    usage: "리스트 구분선, 인풋 테두리",
  },
  {
    token: "--primary",
    hex: S.primary,
    role: "CTA 버튼",
    usage: "기록하기, 팔로우, 주요 액션",
  },
  {
    token: "--accent",
    hex: S.vanillaSoft,
    role: "공연예정 뱃지·선택됨",
    usage: "light badge bg, active filter chip",
  },
  {
    token: "--point",
    hex: S.coralPoint,
    role: "공연중 뱃지·좋아요",
    usage: "point badge, 하트·북마크 아이콘",
  },
  {
    token: "--info-surface",
    hex: S.infoSurface,
    role: "정보 배너",
    usage: "추천 공연 배너, 알림 카드 (alice-soft)",
  },
  {
    token: "--aux-surface",
    hex: S.auxSurface,
    role: "보조 섹션",
    usage: "추천 후기 영역, 서브 섹션 배경 (honeydew)",
  },
] as const;

// ─── Components ───────────────────────────────────────────────────────────────

function ColorSwatch({
  hex,
  label,
}: {
  hex: string;
  label: string;
}): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div
        style={{
          backgroundColor: hex,
          height: 56,
          borderRadius: 8,
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      />
      <p
        style={{ fontSize: 10, color: S.muted, textAlign: "center", margin: 0 }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 9,
          color: "#aaa",
          textAlign: "center",
          fontFamily: "monospace",
          margin: 0,
        }}
      >
        {hex}
      </p>
    </div>
  );
}


// ─── SemanticRoles: 오른쪽 패널 서브컴포넌트 ────────────────────────────────────

function MockHeader(): JSX.Element {
  return (
    <div
      style={{
        ...st.surfaceBox,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontWeight: 700, fontSize: 16, color: S.text }}>feelog</span>
      <button
        style={{
          padding: "6px 14px",
          borderRadius: 10,
          backgroundColor: S.primary,
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
        }}
      >
        기록하기
      </button>
    </div>
  );
}

function FilterChips(): JSX.Element {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {["전체", "아이유", "BTS", "NewJeans", "BLACKPINK"].map((chip, i) => (
        <span
          key={chip}
          style={{
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 500,
            backgroundColor: i === 0 ? S.vanillaBase : S.surfaceSoft,
            color: i === 0 ? S.vanillaPoint : S.muted,
            cursor: "pointer",
          }}
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

function InfoBanner(): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: S.infoSurface,
        border: `1px solid ${S.infoBorder}`,
        borderRadius: 12,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span style={{ fontSize: 20 }}>🎵</span>
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: S.alicePoint, margin: "0 0 2px" }}>
          이번 주 추천 공연
        </p>
        <p style={{ fontSize: 12, color: S.aliceBase, margin: 0 }}>
          IU HEREH 투어 후기 모음
        </p>
      </div>
    </div>
  );
}

const SHOW_STATUS = [
  { label: "공연예정", badgeBg: S.vanillaSoft, badgeText: S.text,  badgeBorder: `1px solid ${S.text}`, liked: false },
  { label: "공연중",   badgeBg: S.coralPoint,  badgeText: "#fff",  badgeBorder: "none",                liked: true  },
  { label: "공연완료", badgeBg: S.surfaceSoft, badgeText: S.muted, badgeBorder: "none",                liked: false },
] as const;

function ShowCardMiniGrid(): JSX.Element {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        border: `1.5px solid ${S.text}`,
      }}
    >
      {SHOW_STATUS.map(({ label, badgeBg, badgeText, badgeBorder, liked }, i) => (
        <div
          key={label}
          style={{ borderRight: i < 2 ? `1.5px solid ${S.text}` : "none" }}
        >
          {/* 포스터 */}
          <div
            style={{
              aspectRatio: "3/4",
              backgroundColor: S.surfaceSoft,
              borderBottom: `1.5px solid ${S.text}`,
              padding: 6,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "2px 5px",
                fontSize: 7,
                fontWeight: 900,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                backgroundColor: badgeBg,
                color: badgeText,
                border: badgeBorder,
              }}
            >
              {label}
            </span>
          </div>
          {/* 메타 */}
          <div style={{ padding: "6px 7px 8px", backgroundColor: S.surface }}>
            <p
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: S.text,
                margin: "0 0 3px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              봄날의 콘서트
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 7, color: S.muted }}>올림픽공원</span>
              <span style={{ fontSize: 9, color: liked ? S.coralPoint : S.muted }}>♥</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AuxSection(): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: S.auxSurface,
        border: `1px solid ${S.auxBorder}`,
        borderRadius: 12,
        padding: "12px 16px",
      }}
    >
      <p style={{ fontSize: 13, fontWeight: 600, color: S.auxText, margin: "0 0 10px" }}>
        함께 보면 좋을 후기
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        {["봄 콘서트 투어", "여름 페스티벌", "가을 어쿠스틱"].map((title) => (
          <div
            key={title}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              backgroundColor: S.surface,
              border: `1px solid ${S.border}`,
              fontSize: 12,
              color: S.text,
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
}

const ROLE_BADGES = [
  { label: "CTA",    bg: S.primary,     color: "#fff",      border: "none" },
  { label: "공연예정", bg: S.vanillaSoft, color: S.text,      border: `1px solid ${S.text}` },
  { label: "공연중",  bg: S.coralPoint,  color: "#fff",      border: "none" },
  { label: "공연완료", bg: S.surfaceSoft, color: S.muted,     border: `1px solid ${S.muted}` },
  { label: "info",   bg: S.infoSurface, color: S.alicePoint, border: "none" },
] as const;

function RoleLegend(): JSX.Element {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", paddingTop: 4 }}>
      <span style={{ fontSize: 11, color: S.muted, marginRight: 2 }}>역할 범례</span>
      {ROLE_BADGES.map(({ label, bg, color, border }) => (
        <span
          key={label}
          style={{
            padding: "3px 10px",
            borderRadius: 20,
            backgroundColor: bg,
            color,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.04em",
            border,
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "ui/brand/Palette Showcase",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const ColorPalette: Story = {
  name: "Color Palette",
  render: () => (
    <div style={{ padding: 32, backgroundColor: S.bg }}>
      <h1 style={st.pageTitle}>Feelog Brand Colors</h1>
      <p style={st.pageSubtitle}>5개 브랜드 컬러 + Neutral 시스템</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {PALETTE.map((family) => (
          <div key={family.name}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: S.text,
                margin: "0 0 8px",
              }}
            >
              {family.name}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${family.shades.length}, 1fr)`,
                gap: 8,
              }}
            >
              {family.shades.map((s) => (
                <ColorSwatch key={s.label} hex={s.hex} label={s.label} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};


export const SemanticRoles: Story = {
  name: "Semantic Roles",
  render: () => (
    <div style={{ backgroundColor: S.bg, minHeight: "100vh", padding: 32 }}>
      <h1 style={st.pageTitle}>Semantic Color Roles</h1>
      <p style={st.pageSubtitle}>각 컬러의 역할과 실제 컴포넌트 적용 예시</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          alignItems: "start",
        }}
      >
        {/* Left: role reference table */}
        <div>
          <p style={st.sectionLabelSm}>Token Map</p>
          <div style={st.surfaceBox}>
            {SEMANTIC_ROLES.map(({ token, hex, role, usage }, i) => (
              <div
                key={token}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 16px",
                  borderBottom:
                    i < SEMANTIC_ROLES.length - 1
                      ? `1px solid ${S.border}`
                      : "none",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 7,
                    backgroundColor: hex,
                    border: "1px solid rgba(0,0,0,0.07)",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: S.muted,
                      margin: "0 0 1px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {token}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: S.text,
                      margin: 0,
                    }}
                  >
                    {role}
                  </p>
                </div>
                <span
                  style={{ fontSize: 10, color: S.muted, whiteSpace: "nowrap" }}
                >
                  {usage}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: mock page */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <MockHeader />
          <FilterChips />
          <ShowCardMiniGrid />
          <InfoBanner />
          <AuxSection />
          <RoleLegend />
        </div>
      </div>
    </div>
  ),
};

// ─── Theme Token Reference ────────────────────────────────────────────────────

type TokenRef = {
  cssVar: string;
  hex: string;
  tailwind: string[];
  role: string;
};
type TokenRefGroup = { group: string; entries: TokenRef[] };

const TOKEN_GROUPS: TokenRefGroup[] = [
  {
    group: "Surface & Text",
    entries: [
      {
        cssVar: "--background",
        hex: "#f6f5fa",
        tailwind: ["bg-background"],
        role: "페이지 배경",
      },
      {
        cssVar: "--foreground",
        hex: "#212121",
        tailwind: ["text-foreground"],
        role: "본문 텍스트",
      },
      {
        cssVar: "--card",
        hex: "#ffffff",
        tailwind: ["bg-card"],
        role: "카드·모달 배경",
      },
      {
        cssVar: "--card-foreground",
        hex: "#212121",
        tailwind: ["text-card-foreground"],
        role: "카드 텍스트",
      },
      {
        cssVar: "--popover",
        hex: "#ffffff",
        tailwind: ["bg-popover"],
        role: "팝오버 배경",
      },
      {
        cssVar: "--popover-foreground",
        hex: "#212121",
        tailwind: ["text-popover-foreground"],
        role: "팝오버 텍스트",
      },
      {
        cssVar: "--surface-soft",
        hex: "#f4f4ef",
        tailwind: ["bg-surface-soft"],
        role: "비활성 칩·서브 배경",
      },
    ],
  },
  {
    group: "Primary CTA",
    entries: [
      {
        cssVar: "--primary",
        hex: "#212121",
        tailwind: ["bg-primary", "text-primary"],
        role: "CTA 버튼 배경",
      },
      {
        cssVar: "--primary-foreground",
        hex: "#ffffff",
        tailwind: ["text-primary-foreground"],
        role: "CTA 버튼 텍스트",
      },
      {
        cssVar: "--primary-hover",
        hex: "#424242",
        tailwind: ["hover:bg-primary-hover"],
        role: "CTA hover 상태",
      },
      {
        cssVar: "--primary-pressed",
        hex: "#0a0a0a",
        tailwind: ["active:bg-primary-pressed"],
        role: "CTA pressed 상태",
      },
    ],
  },
  {
    group: "Secondary / Muted / Accent",
    entries: [
      {
        cssVar: "--secondary",
        hex: "#f4f4ef",
        tailwind: ["bg-secondary"],
        role: "서브 배경",
      },
      {
        cssVar: "--secondary-foreground",
        hex: "#212121",
        tailwind: ["text-secondary-foreground"],
        role: "서브 텍스트",
      },
      {
        cssVar: "--muted",
        hex: "#f4f4ef",
        tailwind: ["bg-muted"],
        role: "로우 엠파시스 배경",
      },
      {
        cssVar: "--muted-foreground",
        hex: "#70736b",
        tailwind: ["text-muted-foreground"],
        role: "보조 텍스트",
      },
      {
        cssVar: "--accent",
        hex: "#eff0a3",
        tailwind: ["bg-accent"],
        role: "하이라이트 배경 (vanilla-soft)",
      },
      {
        cssVar: "--accent-foreground",
        hex: "#7c7d00",
        tailwind: ["text-accent-foreground"],
        role: "하이라이트 텍스트 (vanilla-point)",
      },
    ],
  },
  {
    group: "Feature — Info / Aux / Point",
    entries: [
      {
        cssVar: "--info-surface",
        hex: "#d8dfe9",
        tailwind: ["bg-info-surface"],
        role: "정보 카드 배경 (alice-soft)",
      },
      {
        cssVar: "--info-foreground",
        hex: "#4a5e78",
        tailwind: ["text-info-foreground"],
        role: "정보 카드 텍스트 (alice-point)",
      },
      {
        cssVar: "--info-border",
        hex: "#b8c4d5",
        tailwind: ["border-info-border"],
        role: "정보 카드 테두리 (alice-base)",
      },
      {
        cssVar: "--aux-surface",
        hex: "#e3f0de",
        tailwind: ["bg-aux-surface"],
        role: "보조 카드 배경",
      },
      {
        cssVar: "--aux-foreground",
        hex: "#73996b",
        tailwind: ["text-aux-foreground"],
        role: "보조 카드 텍스트",
      },
      {
        cssVar: "--aux-border",
        hex: "#cfdeca",
        tailwind: ["border-aux-border"],
        role: "보조 카드 테두리",
      },
      {
        cssVar: "--point",
        hex: "#ff5c34",
        tailwind: ["bg-point", "text-point"],
        role: "좋아요·인게이지먼트",
      },
      {
        cssVar: "--point-light",
        hex: "#ffb199",
        tailwind: ["bg-point-light", "text-point-light"],
        role: "point 연한 색상",
      },
      {
        cssVar: "--point-bg",
        hex: "#fff6f1",
        tailwind: ["bg-point-bg"],
        role: "point 배경 (coral-tint)",
      },
    ],
  },
  {
    group: "Status",
    entries: [
      {
        cssVar: "--destructive",
        hex: "#dc2626",
        tailwind: ["bg-destructive", "text-destructive"],
        role: "삭제·에러",
      },
      {
        cssVar: "--destructive-foreground",
        hex: "#ffffff",
        tailwind: ["text-destructive-foreground"],
        role: "에러 텍스트",
      },
      {
        cssVar: "--success",
        hex: "#10b981",
        tailwind: ["bg-success", "text-success"],
        role: "성공",
      },
      {
        cssVar: "--success-foreground",
        hex: "#ffffff",
        tailwind: ["text-success-foreground"],
        role: "성공 텍스트",
      },
    ],
  },
  {
    group: "Border & Form",
    entries: [
      {
        cssVar: "--border",
        hex: "#e8e8df",
        tailwind: ["border-border"],
        role: "기본 테두리",
      },
      {
        cssVar: "--input",
        hex: "#e8e8df",
        tailwind: ["border-input"],
        role: "입력 테두리",
      },
      {
        cssVar: "--input-background",
        hex: "#ffffff",
        tailwind: ["bg-input-background"],
        role: "입력 배경",
      },
      {
        cssVar: "--switch-background",
        hex: "#cfdeca",
        tailwind: ["bg-switch-background"],
        role: "비활성 토글 배경",
      },
      {
        cssVar: "--ring",
        hex: "#212121",
        tailwind: ["outline-ring", "ring-ring"],
        role: "포커스 링",
      },
    ],
  },
  {
    group: "Chart",
    entries: [
      {
        cssVar: "--chart-1",
        hex: "#7c7d00",
        tailwind: ["bg-chart-1", "text-chart-1"],
        role: "vanilla-point",
      },
      {
        cssVar: "--chart-2",
        hex: "#4a5e78",
        tailwind: ["bg-chart-2", "text-chart-2"],
        role: "alice-point",
      },
      {
        cssVar: "--chart-3",
        hex: "#b8c4d5",
        tailwind: ["bg-chart-3", "text-chart-3"],
        role: "alice-base",
      },
      {
        cssVar: "--chart-4",
        hex: "#73996b",
        tailwind: ["bg-chart-4", "text-chart-4"],
        role: "honeydew-point",
      },
      {
        cssVar: "--chart-5",
        hex: "#ff5c34",
        tailwind: ["bg-chart-5", "text-chart-5"],
        role: "coral-point",
      },
    ],
  },
  {
    group: "Sidebar",
    entries: [
      {
        cssVar: "--sidebar",
        hex: "#ffffff",
        tailwind: ["bg-sidebar"],
        role: "사이드바 배경",
      },
      {
        cssVar: "--sidebar-foreground",
        hex: "#212121",
        tailwind: ["text-sidebar-foreground"],
        role: "사이드바 텍스트",
      },
      {
        cssVar: "--sidebar-primary",
        hex: "#212121",
        tailwind: ["bg-sidebar-primary"],
        role: "사이드바 CTA",
      },
      {
        cssVar: "--sidebar-primary-foreground",
        hex: "#ffffff",
        tailwind: ["text-sidebar-primary-foreground"],
        role: "사이드바 CTA 텍스트",
      },
      {
        cssVar: "--sidebar-accent",
        hex: "#eff0a3",
        tailwind: ["bg-sidebar-accent"],
        role: "사이드바 active (vanilla)",
      },
      {
        cssVar: "--sidebar-accent-foreground",
        hex: "#7c7d00",
        tailwind: ["text-sidebar-accent-foreground"],
        role: "사이드바 active 텍스트",
      },
      {
        cssVar: "--sidebar-border",
        hex: "#e8e8df",
        tailwind: ["border-sidebar-border"],
        role: "사이드바 테두리",
      },
      {
        cssVar: "--sidebar-ring",
        hex: "#212121",
        tailwind: ["ring-sidebar-ring"],
        role: "사이드바 포커스 링",
      },
    ],
  },
];

const BRAND_PALETTE_REF = [
  {
    name: "Vanilla",
    shades: [
      { label: "tint", hex: "#fafbe6", tw: "feelog-vanilla-tint" },
      { label: "light", hex: "#f5f7c4", tw: "feelog-vanilla-light" },
      { label: "soft", hex: "#eff0a3", tw: "feelog-vanilla-soft" },
      { label: "base", hex: "#e4e57d", tw: "feelog-vanilla-base" },
      { label: "point", hex: "#7c7d00", tw: "feelog-vanilla-point" },
    ],
  },
  {
    name: "Alice",
    shades: [
      { label: "tint", hex: "#f4f6f9", tw: "feelog-alice-tint" },
      { label: "light", hex: "#e4eaf2", tw: "feelog-alice-light" },
      { label: "soft", hex: "#d8dfe9", tw: "feelog-alice-soft" },
      { label: "base", hex: "#b8c4d5", tw: "feelog-alice-base" },
      { label: "point", hex: "#4a5e78", tw: "feelog-alice-point" },
      { label: "deep", hex: "#2c3d54", tw: "feelog-alice-deep" },
    ],
  },
  {
    name: "Honeydew",
    shades: [
      { label: "tint", hex: "#f5faf3", tw: "feelog-honeydew-tint" },
      { label: "light", hex: "#e3f0de", tw: "feelog-honeydew-light" },
      { label: "soft", hex: "#cfdeca", tw: "feelog-honeydew-soft" },
      { label: "base", hex: "#afc7a7", tw: "feelog-honeydew-base" },
      { label: "point", hex: "#73996b", tw: "feelog-honeydew-point" },
    ],
  },
  {
    name: "Coral",
    shades: [
      { label: "tint", hex: "#fff6f1", tw: "feelog-coral-tint" },
      { label: "light", hex: "#ffe0d2", tw: "feelog-coral-light" },
      { label: "soft", hex: "#ffb199", tw: "feelog-coral-soft" },
      { label: "base", hex: "#ff7954", tw: "feelog-coral-base" },
      { label: "point", hex: "#ff5c34", tw: "feelog-coral-point" },
    ],
  },
  {
    name: "Neutral",
    shades: [
      { label: "bg", hex: "#f6f5fa", tw: "feelog-neutral-bg" },
      { label: "surface", hex: "#ffffff", tw: "feelog-neutral-surface" },
      { label: "soft", hex: "#f4f4ef", tw: "feelog-neutral-soft" },
      { label: "border", hex: "#e8e8df", tw: "feelog-neutral-border" },
      { label: "text", hex: "#212121", tw: "feelog-neutral-text" },
      { label: "muted", hex: "#70736b", tw: "feelog-neutral-muted" },
    ],
  },
];

const ROW_FLEX = ["0 0 28px", "0 0 210px", "0 0 320px", "0 0 72px", "1"];
const ROW_HEADERS = ["", "CSS 변수", "Tailwind 클래스", "HEX", "역할"];

function TokenRefRow({ entry }: { entry: TokenRef }): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 16px",
        borderBottom: `1px solid ${S.border}`,
      }}
    >
      <div
        style={{
          flex: ROW_FLEX[0],
          width: 28,
          height: 28,
          borderRadius: 6,
          backgroundColor: entry.hex,
          border: "1px solid rgba(0,0,0,0.08)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          flex: ROW_FLEX[1],
          fontSize: 11,
          fontFamily: "monospace",
          color: S.text,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {entry.cssVar}
      </span>
      <div
        style={{ flex: ROW_FLEX[2], display: "flex", gap: 4, flexWrap: "wrap" }}
      >
        {entry.tailwind.map((cls) => (
          <code
            key={cls}
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              backgroundColor: S.surfaceSoft,
              color: "#374151",
              padding: "2px 6px",
              borderRadius: 4,
              border: `1px solid ${S.border}`,
              whiteSpace: "nowrap",
            }}
          >
            {cls}
          </code>
        ))}
      </div>
      <span
        style={{
          flex: ROW_FLEX[3],
          fontSize: 10,
          fontFamily: "monospace",
          color: S.muted,
        }}
      >
        {entry.hex}
      </span>
      <span style={{ flex: ROW_FLEX[4], fontSize: 12, color: S.muted }}>
        {entry.role}
      </span>
    </div>
  );
}

export const ThemeTokens: Story = {
  name: "Theme Tokens",
  render: () => (
    <div style={{ padding: 32, backgroundColor: S.bg, minHeight: "100vh" }}>
      <h1 style={st.pageTitle}>Theme Tokens</h1>
      <p style={{ ...st.pageSubtitle, margin: "0 0 40px" }}>
        theme.css 기준 — CSS 변수 · Tailwind 클래스 레퍼런스
      </p>

      {/* ── Semantic tokens ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          marginBottom: 56,
        }}
      >
        {TOKEN_GROUPS.map((group) => (
          <div key={group.group}>
            <p style={st.sectionLabelSm}>{group.group}</p>
            <div style={st.surfaceBox}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "5px 16px",
                  backgroundColor: S.surfaceSoft,
                  borderBottom: `1px solid ${S.border}`,
                }}
              >
                {ROW_HEADERS.map((h, i) => (
                  <span
                    key={i}
                    style={{
                      flex: ROW_FLEX[i],
                      fontSize: 10,
                      color: S.muted,
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
              {group.entries.map((e) => (
                <TokenRefRow key={e.cssVar} entry={e} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Brand palette ── */}
      <div>
        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: S.text,
            margin: "0 0 4px",
          }}
        >
          Brand Palette — feelog-*
        </p>
        <p style={{ fontSize: 13, color: S.muted, margin: "0 0 24px" }}>
          <code
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              backgroundColor: S.surfaceSoft,
              padding: "2px 6px",
              borderRadius: 4,
              border: `1px solid ${S.border}`,
            }}
          >
            bg-feelog-vanilla-base
          </code>
          {" · "}
          <code
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              backgroundColor: S.surfaceSoft,
              padding: "2px 6px",
              borderRadius: 4,
              border: `1px solid ${S.border}`,
            }}
          >
            text-feelog-coral-point
          </code>
          {" 형태로 사용"}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {BRAND_PALETTE_REF.map((family) => (
            <div
              key={family.name}
              style={{ display: "flex", alignItems: "flex-start", gap: 16 }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: S.muted,
                  width: 52,
                  flexShrink: 0,
                  paddingTop: 8,
                }}
              >
                {family.name}
              </span>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${family.shades.length}, 1fr)`,
                  gap: 8,
                  flex: 1,
                }}
              >
                {family.shades.map((shade) => (
                  <div key={shade.label}>
                    <div
                      style={{
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: shade.hex,
                        border: "1px solid rgba(0,0,0,0.06)",
                        marginBottom: 6,
                      }}
                    />
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: S.muted,
                        margin: "0 0 2px",
                        textAlign: "center",
                      }}
                    >
                      {shade.label}
                    </p>
                    <p
                      style={{
                        fontSize: 9,
                        fontFamily: "monospace",
                        color: "#aaa",
                        textAlign: "center",
                        margin: "0 0 3px",
                      }}
                    >
                      {shade.hex}
                    </p>
                    <p
                      style={{
                        fontSize: 9,
                        fontFamily: "monospace",
                        color: S.muted,
                        textAlign: "center",
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {shade.tw}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const UIElements: Story = {
  name: "UI Elements",
  render: () => (
    <div style={{ padding: 32, backgroundColor: S.bg }}>
      <h1 style={st.pageTitle}>UI Elements</h1>
      <p style={st.pageSubtitle}>확정된 컬러 역할이 적용된 주요 UI 요소</p>

      {/* ── Buttons ── */}
      <section style={{ marginBottom: 36 }}>
        <p style={st.sectionLabel}>
          버튼
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              label: "Primary",
              sub: "CTA",
              bg: S.primary,
              color: "#fff",
              border: "none",
            },
            {
              label: "Vanilla",
              sub: "active / 하이라이트",
              bg: S.vanillaBase,
              color: S.vanillaPoint,
              border: "none",
            },
            {
              label: "Coral",
              sub: "좋아요",
              bg: S.coralPoint,
              color: "#fff",
              border: "none",
            },
            {
              label: "Outline",
              sub: "secondary",
              bg: S.surface,
              color: S.text,
              border: `1px solid ${S.border}`,
            },
          ].map(({ label, sub, bg, color, border }) => (
            <div
              key={label}
              style={st.colCenter}
            >
              <button
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  backgroundColor: bg,
                  color,
                  border,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
              <span style={{ fontSize: 10, color: S.muted }}>{sub}</span>
            </div>
          ))}
          {/* Alice — info text role */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                backgroundColor: S.infoSurface,
                color: S.alicePoint,
                border: `1px solid ${S.infoBorder}`,
              }}
            >
              Alice
            </div>
            <span style={{ fontSize: 10, color: S.muted }}>
              정보 텍스트 전용
            </span>
          </div>
        </div>
      </section>

      {/* ── Artist badges ── */}
      <section style={{ marginBottom: 36 }}>
        <p style={st.sectionLabel}>
          아티스트 뱃지
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span
              style={{ fontSize: 11, color: S.muted, width: 70, flexShrink: 0 }}
            >
              기본
            </span>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["아이유", "BTS", "NewJeans", "BLACKPINK", "aespa"].map(
                (name) => (
                  <span
                    key={name}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 500,
                      backgroundColor: S.surfaceSoft,
                      color: S.text,
                      border: `1px solid ${S.border}`,
                    }}
                  >
                    {name}
                  </span>
                ),
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span
              style={{ fontSize: 11, color: S.muted, width: 70, flexShrink: 0 }}
            >
              선택됨
            </span>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["아이유", "BTS"].map((name) => (
                <span
                  key={name + "a"}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 500,
                    backgroundColor: S.vanillaBase,
                    color: S.vanillaPoint,
                  }}
                >
                  {name}
                </span>
              ))}
              {["NewJeans", "BLACKPINK"].map((name) => (
                <span
                  key={name + "n"}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 500,
                    backgroundColor: S.surfaceSoft,
                    color: S.muted,
                    border: `1px solid ${S.border}`,
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Follow button states ── */}
      <section style={{ marginBottom: 36 }}>
        <p style={st.sectionLabel}>
          팔로우 버튼
        </p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            style={{
              padding: "7px 18px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: S.surface,
              color: S.text,
              border: `1px solid ${S.border}`,
              cursor: "pointer",
            }}
          >
            팔로우
          </button>
          <button
            style={{
              padding: "7px 18px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: S.vanillaBase,
              color: S.vanillaPoint,
              border: "none",
              cursor: "pointer",
            }}
          >
            팔로잉 ✓
          </button>
          {/* on card overlay */}
          <div
            style={{
              backgroundColor: "#555",
              borderRadius: 10,
              padding: "8px 14px",
            }}
          >
            <button
              style={{
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                backgroundColor: S.primary,
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              팔로우
            </button>
          </div>
          <span style={{ fontSize: 11, color: S.muted }}>← 카드 위</span>
        </div>
      </section>

      {/* ── Like button states ── */}
      <section style={{ marginBottom: 36 }}>
        <p style={st.sectionLabel}>
          좋아요 버튼
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 20,
                color: S.muted,
              }}
            >
              ♡ <span style={{ fontSize: 13, color: S.muted }}>42</span>
            </div>
            <span style={{ fontSize: 10, color: S.muted }}>비활성</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 20,
                color: S.coralPoint,
              }}
            >
              ♥ <span style={{ fontSize: 13, color: S.coralPoint }}>43</span>
            </div>
            <span style={{ fontSize: 10, color: S.muted }}>
              활성 (coral-point)
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                backgroundColor: S.coralTint,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span style={{ fontSize: 16, color: S.coralPoint }}>♥</span>
              <span
                style={{ fontSize: 13, color: S.coralPoint, fontWeight: 600 }}
              >
                43
              </span>
            </div>
            <span style={{ fontSize: 10, color: S.muted }}>pill 스타일</span>
          </div>
        </div>
      </section>

      {/* ── Surface cards ── */}
      <section>
        <p style={st.sectionLabel}>
          Surface / 카드 배경
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}
        >
          {[
            { label: "bg", sub: "--background", hex: S.bg },
            { label: "surface", sub: "--card", hex: S.surface },
            {
              label: "surface-soft",
              sub: "--surface-soft",
              hex: S.surfaceSoft,
            },
            {
              label: "info-surface",
              sub: "--info-surface",
              hex: S.infoSurface,
            },
            { label: "aux-surface", sub: "--aux-surface", hex: S.auxSurface },
            { label: "point-bg", sub: "--point-bg", hex: S.coralTint },
            { label: "accent", sub: "--accent", hex: S.vanillaSoft },
          ].map(({ label, sub, hex }) => (
            <div
              key={label}
              style={{
                backgroundColor: hex,
                border: `1px solid ${S.border}`,
                borderRadius: 12,
                padding: 14,
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: S.text,
                  margin: "0 0 2px",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: S.muted,
                  margin: "0 0 4px",
                }}
              >
                {sub}
              </p>
              <p
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: S.muted,
                  margin: 0,
                }}
              >
                {hex}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};

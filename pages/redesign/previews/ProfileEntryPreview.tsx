"use client";

import React, { useState } from "react";

type ProfileVariant = "flat" | "minimal" | "flatText" | "minimalLogin";

type User = {
  id: string;
  name: string;
};

type Candidate = {
  id: ProfileVariant;
  label: string;
  title: string;
  desc: string;
};

const palette = {
  background: "#F6F5FA",
  foreground: "#212121",
  card: "#FFFFFF",
  border: "#E8E8DF",
  surfaceSoft: "#F4F4EF",
  vanilla: "#EFF0A3",
  alice: "#D8DFE9",
  honeydew: "#CFDECA",
  point: "#FF5C34",
  muted: "#70736B",
};

const mockUser: User = {
  id: "1",
  name: "선",
};

const candidates: Candidate[] = [
  {
    id: "flat",
    label: "A",
    title: "Flat Row",
    desc: "가장 추천. 프로필·계정 관리 역할이 명확하고 현재 SideNav에 자연스럽게 들어갑니다.",
  },
  {
    id: "minimal",
    label: "B",
    title: "Minimal Row",
    desc: "A보다 더 작고 차분합니다. 사이드바를 더 미니멀하게 유지할 수 있습니다.",
  },
  {
    id: "flatText",
    label: "C",
    title: "Flat Text",
    desc: "아바타 없이 텍스트 중심으로 정리한 버전입니다. 가장 조용하지만 개인화 느낌은 약합니다.",
  },
  {
    id: "minimalLogin",
    label: "D",
    title: "Minimal + Login",
    desc: "로그인 상태는 미니멀하게, 비로그인 상태에서는 로그인 유도를 조금 더 명확하게 보여줍니다.",
  },
];

function Avatar({
  size = 42,
  loggedIn = true,
}: {
  size?: number;
  loggedIn?: boolean;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size >= 40 ? 16 : 12,
        border: `1px solid ${palette.border}`,
        background: loggedIn
          ? `linear-gradient(135deg, ${palette.alice}, ${palette.honeydew})`
          : palette.surfaceSoft,
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {!loggedIn && (
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: size >= 40 ? 16 : 13,
            fontWeight: 900,
            color: palette.muted,
          }}
        >
          ?
        </span>
      )}
    </div>
  );
}

function Chevron() {
  return (
    <span
      style={{
        color: palette.muted,
        fontSize: 20,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      ›
    </span>
  );
}

function ProfileFlat({ user }: { user: User | null }) {
  const isLoggedIn = !!user;

  return (
    <div style={{ padding: "18px 24px" }}>
      <button
        type="button"
        style={{
          width: "100%",
          border: 0,
          background: "transparent",
          padding: 0,
          display: "flex",
          alignItems: "center",
          gap: 12,
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <Avatar loggedIn={isLoggedIn} />

        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 850,
              color: palette.foreground,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isLoggedIn ? `${user.name} 님` : "로그인해주세요"}
          </div>

          <div
            style={{
              marginTop: 4,
              fontSize: 13,
              fontWeight: 650,
              color: palette.muted,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isLoggedIn ? "프로필·계정 관리" : "프로필과 기록 관리를 시작해요"}
          </div>
        </div>

        <Chevron />
      </button>
    </div>
  );
}

function ProfileMinimal({ user }: { user: User | null }) {
  const isLoggedIn = !!user;

  return (
    <div style={{ padding: "14px 24px" }}>
      <button
        type="button"
        style={{
          width: "100%",
          border: 0,
          background: "transparent",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "34px 1fr auto",
          alignItems: "center",
          gap: 10,
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <Avatar size={34} loggedIn={isLoggedIn} />

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 850,
              color: palette.foreground,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isLoggedIn ? user.name : "로그인"}
          </div>

          <div
            style={{
              marginTop: 2,
              fontSize: 11,
              color: palette.muted,
              fontWeight: 650,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isLoggedIn ? "프로필·계정 관리" : "계정 관리 시작하기"}
          </div>
        </div>

        <Chevron />
      </button>
    </div>
  );
}

function ProfileFlatText({ user }: { user: User | null }) {
  const isLoggedIn = !!user;

  return (
    <div style={{ padding: "18px 24px" }}>
      <button
        type="button"
        style={{
          width: "100%",
          border: 0,
          background: "transparent",
          padding: 0,
          display: "flex",
          alignItems: "center",
          gap: 12,
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 3,
            height: 36,
            background: palette.border,
            flexShrink: 0,
          }}
        />

        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 950,
              letterSpacing: "0.16em",
              color: palette.muted,
              textTransform: "uppercase",
              marginBottom: 5,
            }}
          >
            {isLoggedIn ? "Account" : "Sign In"}
          </div>

          <div
            style={{
              fontSize: 15,
              fontWeight: 850,
              color: palette.foreground,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isLoggedIn ? `${user.name} 님 · 프로필 관리` : "로그인해주세요"}
          </div>
        </div>

        <Chevron />
      </button>
    </div>
  );
}

function ProfileMinimalLogin({ user }: { user: User | null }) {
  const isLoggedIn = !!user;

  if (isLoggedIn) {
    return <ProfileMinimal user={user} />;
  }

  return (
    <div style={{ padding: "16px 24px" }}>
      <button
        type="button"
        style={{
          width: "100%",
          border: `1px solid ${palette.border}`,
          background: palette.surfaceSoft,
          padding: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <Avatar size={34} loggedIn={false} />

        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 850,
              color: palette.foreground,
            }}
          >
            로그인해주세요
          </div>

          <div
            style={{
              marginTop: 3,
              fontSize: 12,
              color: palette.muted,
              fontWeight: 650,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            프로필과 기록 관리를 시작해요
          </div>
        </div>

        <Chevron />
      </button>
    </div>
  );
}

function ProfileEntryByVariant({
  variant,
  user,
}: {
  variant: ProfileVariant;
  user: User | null;
}) {
  if (variant === "minimal") return <ProfileMinimal user={user} />;
  if (variant === "flatText") return <ProfileFlatText user={user} />;
  if (variant === "minimalLogin") return <ProfileMinimalLogin user={user} />;

  return <ProfileFlat user={user} />;
}

function LogoMock() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 48,
        border: `1.5px solid ${palette.foreground}`,
        background: palette.card,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 48,
          height: "100%",
          borderRight: `1px dashed ${palette.foreground}`,
          background: palette.vanilla,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 950,
        }}
      >
        @
      </div>

      <div
        style={{
          padding: "0 12px",
          fontSize: 23,
          fontWeight: 950,
          letterSpacing: "-0.08em",
        }}
      >
        atFeelog
      </div>
    </div>
  );
}

function SideNavPreview({
  variant,
  user,
}: {
  variant: ProfileVariant;
  user: User | null;
}) {
  const navItems = ["Home", "Feed", "내 기록", "My Page"];

  return (
    <aside
      style={{
        width: 282,
        height: 640,
        background: palette.card,
        borderRight: `1.5px solid ${palette.foreground}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          borderBottom: `1.5px solid ${palette.foreground}`,
          padding: "24px",
        }}
      >
        <LogoMock />
      </div>

      <div style={{ borderBottom: `1px solid ${palette.border}` }}>
        <ProfileEntryByVariant variant={variant} user={user} />
      </div>

      <div style={{ padding: "20px 24px" }}>
        <button
          type="button"
          style={{
            width: "100%",
            height: 48,
            border: `1.5px solid ${palette.foreground}`,
            background: palette.foreground,
            color: "white",
            fontSize: 14,
            fontWeight: 950,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Write
        </button>
      </div>

      <nav
        style={{
          borderTop: `1px solid ${palette.border}`,
          borderBottom: `1px solid ${palette.border}`,
          flex: 1,
        }}
      >
        {navItems.map((item) => {
          const active = item === "Feed";

          return (
            <button
              key={item}
              type="button"
              style={{
                position: "relative",
                width: "100%",
                height: 56,
                border: 0,
                borderBottom: `1px solid ${palette.border}`,
                background: "transparent",
                color: active ? palette.foreground : palette.muted,
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "0 24px",
                fontSize: 14,
                fontWeight: active ? 850 : 700,
                cursor: "pointer",
              }}
            >
              {active && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    width: 4,
                    height: 28,
                    borderRadius: "0 999px 999px 0",
                    background: palette.point,
                  }}
                />
              )}

              <span style={{ width: 20 }}>
                {item === "Home"
                  ? "⌂"
                  : item === "Feed"
                    ? "✦"
                    : item === "내 기록"
                      ? "▦"
                      : "◐"}
              </span>

              {item}
            </button>
          );
        })}
      </nav>

      {user && (
        <div
          style={{
            borderTop: `1px solid ${palette.border}`,
            padding: "20px 24px",
            color: palette.muted,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          ↪ 로그아웃
        </div>
      )}
    </aside>
  );
}

export default function ProfileEntryPreviewPage() {
  const [selected, setSelected] = useState<ProfileVariant>("flat");

  const current =
    candidates.find((candidate) => candidate.id === selected) ?? candidates[0];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: palette.background,
        color: palette.foreground,
        padding: 40,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      <section
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: 32,
          alignItems: "start",
        }}
      >
        <aside
          style={{
            position: "sticky",
            top: 40,
            display: "grid",
            gap: 10,
          }}
        >
          {candidates.map((candidate) => {
            const isSelected = selected === candidate.id;

            return (
              <button
                key={candidate.id}
                type="button"
                onClick={() => setSelected(candidate.id)}
                title={`${candidate.label}. ${candidate.title}`}
                style={{
                  width: 64,
                  height: 64,
                  border: `1.5px solid ${palette.foreground}`,
                  background: isSelected ? palette.foreground : palette.card,
                  color: isSelected ? "#FFFFFF" : palette.foreground,
                  fontSize: 22,
                  fontWeight: 950,
                  cursor: "pointer",
                }}
              >
                {candidate.label}
              </button>
            );
          })}
        </aside>

        <div>
          <header style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 950,
                letterSpacing: "0.18em",
                color: palette.point,
                textTransform: "uppercase",
              }}
            >
              ProfileEntry Candidate {current.label}
            </div>

            <h1
              style={{
                margin: "8px 0 0",
                fontSize: 44,
                lineHeight: 1,
                letterSpacing: "-0.06em",
              }}
            >
              {current.title}
            </h1>

            <p
              style={{
                marginTop: 12,
                maxWidth: 620,
                color: palette.muted,
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              {current.desc}
            </p>
          </header>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 282px)",
              gap: 28,
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  marginBottom: 10,
                  fontSize: 11,
                  fontWeight: 950,
                  letterSpacing: "0.16em",
                  color: palette.muted,
                  textTransform: "uppercase",
                }}
              >
                Logged In
              </div>

              <SideNavPreview variant={selected} user={mockUser} />
            </div>

            <div>
              <div
                style={{
                  marginBottom: 10,
                  fontSize: 11,
                  fontWeight: 950,
                  letterSpacing: "0.16em",
                  color: palette.muted,
                  textTransform: "uppercase",
                }}
              >
                Logged Out
              </div>

              <SideNavPreview variant={selected} user={null} />
            </div>
          </div>

          <div
            style={{
              marginTop: 24,
              width: 592,
              background: palette.card,
              border: `1px solid ${palette.border}`,
              padding: 18,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 950,
                letterSpacing: "0.16em",
                color: palette.muted,
                textTransform: "uppercase",
              }}
            >
              Text Guide
            </div>

            <div
              style={{
                marginTop: 12,
                display: "grid",
                gap: 12,
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              <div>
                <strong>로그인 상태</strong>
                <br />
                {current.label === "C"
                  ? "선 님 · 프로필 관리"
                  : current.label === "B"
                    ? "선 / 프로필·계정 관리"
                    : "선 님 / 프로필·계정 관리"}
              </div>

              <div>
                <strong>비로그인 상태</strong>
                <br />
                {current.label === "B"
                  ? "로그인 / 계정 관리 시작하기"
                  : "로그인해주세요 / 프로필과 기록 관리를 시작해요"}
              </div>

              <div style={{ color: palette.muted }}>
                SideNav의 <strong>내 기록</strong>은 내가 쓴 기록 목록으로,
                ProfileEntry는 <strong>프로필·계정 관리</strong>로 역할을
                분리하는 방향입니다.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

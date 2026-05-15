"use client";

import React, { useState } from "react";

type LogoType =
  | "editorial"
  | "wordmark"
  | "ticket"
  | "stamp"
  | "frame"
  | "minimal"
  | "underline"
  | "badge";

type LogoCandidate = {
  id: LogoType;
  title: string;
  desc: string;
};

type LogoProps = {
  compact?: boolean;
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

const candidates: LogoCandidate[] = [
  {
    id: "editorial",
    title: "A. Editorial Bar",
    desc: "현재 사이드바의 active bar와 가장 잘 이어지는 워드마크형 로고",
  },
  {
    id: "wordmark",
    title: "B. Clean Wordmark",
    desc: "가장 심플하고 실제 서비스 로고로 오래 쓰기 좋은 형태",
  },
  {
    id: "ticket",
    title: "C. Ticket Logo",
    desc: "공연/전시 기록 서비스라는 정체성이 가장 직접적으로 보이는 형태",
  },
  {
    id: "stamp",
    title: "D. Archive Stamp",
    desc: "기록을 남긴다는 느낌이 강한 스탬프형 로고",
  },
  {
    id: "frame",
    title: "E. Scene Frame",
    desc: "이미지 피드와 기록 카드 느낌을 살린 프레임형 로고",
  },
  {
    id: "minimal",
    title: "F. Minimal Symbol",
    desc: "모바일 헤더나 favicon, 아이콘으로 쓰기 좋은 심볼 중심 로고",
  },
  {
    id: "underline",
    title: "G. Underline Poster",
    desc: "에디토리얼 포스터처럼 타이포와 밑줄을 강조한 로고",
  },
  {
    id: "badge",
    title: "H. Small Badge",
    desc: "사이드바 상단에 작게 들어갔을 때 안정적인 배지형 로고",
  },
];

function LogoEditorialBar({ compact = false }: LogoProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? 8 : 12,
      }}
    >
      <span
        style={{
          width: compact ? 4 : 6,
          height: compact ? 28 : 40,
          borderRadius: "0 999px 999px 0",
          background: palette.point,
          display: "inline-block",
        }}
      />
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            lineHeight: 1,
            letterSpacing: "-0.08em",
            color: palette.foreground,
          }}
        >
          <span
            style={{
              fontSize: compact ? 28 : 44,
              fontWeight: 950,
            }}
          >
            at
          </span>
          <span
            style={{
              marginLeft: 4,
              fontSize: compact ? 28 : 44,
              fontWeight: 950,
            }}
          >
            Feelog
          </span>
          <span
            style={{
              width: compact ? 7 : 10,
              height: compact ? 7 : 10,
              marginLeft: compact ? 6 : 8,
              borderRadius: 999,
              background: palette.point,
              display: "inline-block",
            }}
          />
        </div>
        {!compact && (
          <div
            style={{
              marginTop: 8,
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: palette.muted,
            }}
          >
            Record the Scene
          </div>
        )}
      </div>
    </div>
  );
}

function LogoCleanWordmark({ compact = false }: LogoProps) {
  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          fontSize: compact ? 30 : 48,
          lineHeight: 0.95,
          fontWeight: 950,
          letterSpacing: "-0.09em",
          color: palette.foreground,
        }}
      >
        atFeelog
        <span style={{ color: palette.point }}>.</span>
      </div>
      {!compact && (
        <div
          style={{
            marginTop: 8,
            width: "100%",
            height: 2,
            background: palette.foreground,
          }}
        />
      )}
    </div>
  );
}

function LogoTicket({ compact = false }: LogoProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: compact ? 44 : 64,
        minWidth: compact ? 128 : 240,
        border: `2px solid ${palette.foreground}`,
        background: palette.card,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: compact ? 40 : 58,
          height: "100%",
          background: palette.vanilla,
          borderRight: `1px dashed ${palette.foreground}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 950,
          fontSize: compact ? 17 : 22,
        }}
      >
        @
      </div>

      <div style={{ flex: 1, padding: compact ? "0 10px" : "0 16px" }}>
        <div
          style={{
            fontSize: compact ? 21 : 34,
            fontWeight: 950,
            lineHeight: 1,
            letterSpacing: "-0.08em",
          }}
        >
          Feelog
        </div>
        {!compact && (
          <div
            style={{
              marginTop: 5,
              fontSize: 9,
              fontWeight: 900,
              letterSpacing: "0.24em",
              color: palette.muted,
              textTransform: "uppercase",
            }}
          >
            Record Ticket
          </div>
        )}
      </div>

      <div
        style={{
          width: compact ? 9 : 12,
          height: "100%",
          background: palette.point,
        }}
      />
    </div>
  );
}

function LogoArchiveStamp({ compact = false }: LogoProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? 10 : 16,
      }}
    >
      <div
        style={{
          width: compact ? 46 : 66,
          height: compact ? 46 : 66,
          borderRadius: 999,
          border: `2px solid ${palette.foreground}`,
          background: palette.vanilla,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          transform: "rotate(-7deg)",
        }}
      >
        <span
          style={{
            fontSize: compact ? 16 : 23,
            fontWeight: 950,
            letterSpacing: "-0.08em",
          }}
        >
          AF
        </span>
        <span
          style={{
            position: "absolute",
            right: -3,
            bottom: 9,
            width: compact ? 10 : 14,
            height: compact ? 10 : 14,
            borderRadius: 999,
            background: palette.point,
          }}
        />
      </div>

      {!compact && (
        <div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: "-0.08em",
            }}
          >
            atFeelog
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "0.22em",
              color: palette.muted,
              textTransform: "uppercase",
            }}
          >
            Archive Stamp
          </div>
        </div>
      )}
    </div>
  );
}

function LogoSceneFrame({ compact = false }: LogoProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? 10 : 16,
      }}
    >
      <div
        style={{
          width: compact ? 48 : 68,
          height: compact ? 48 : 68,
          border: `2px solid ${palette.foreground}`,
          background: palette.honeydew,
          padding: compact ? 5 : 7,
          boxShadow: compact ? "none" : `4px 4px 0 ${palette.foreground}`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: palette.card,
            border: `1.5px solid ${palette.foreground}`,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 6,
              top: 5,
              fontWeight: 950,
              fontSize: compact ? 15 : 20,
            }}
          >
            @
          </span>
          <span
            style={{
              position: "absolute",
              right: 5,
              bottom: 5,
              width: compact ? 10 : 13,
              height: compact ? 10 : 13,
              background: palette.point,
            }}
          />
        </div>
      </div>

      {!compact && (
        <div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: "-0.08em",
            }}
          >
            atFeelog
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "0.22em",
              color: palette.muted,
              textTransform: "uppercase",
            }}
          >
            Scene Frame
          </div>
        </div>
      )}
    </div>
  );
}

function LogoMinimalSymbol({ compact = false }: LogoProps) {
  const size = compact ? 48 : 76;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? 10 : 16,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: compact ? 16 : 24,
          border: `2px solid ${palette.foreground}`,
          background: palette.card,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "58%",
            height: "100%",
            background: palette.alice,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "60%",
            height: "60%",
            background: palette.vanilla,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: compact ? 24 : 36,
            height: compact ? 24 : 36,
            borderRadius: 999,
            background: palette.foreground,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 950,
            fontSize: compact ? 13 : 18,
          }}
        >
          f
        </div>
        <div
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            width: compact ? 8 : 12,
            height: compact ? 8 : 12,
            borderRadius: 999,
            background: palette.point,
          }}
        />
      </div>

      {!compact && (
        <div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: "-0.08em",
            }}
          >
            atFeelog
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "0.2em",
              color: palette.muted,
              textTransform: "uppercase",
            }}
          >
            Feed Archive
          </div>
        </div>
      )}
    </div>
  );
}

function LogoUnderlinePoster({ compact = false }: LogoProps) {
  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: compact ? 6 : 10,
        }}
      >
        <span
          style={{
            fontSize: compact ? 32 : 54,
            fontWeight: 950,
            lineHeight: 0.9,
            letterSpacing: "-0.1em",
          }}
        >
          at
        </span>
        <span
          style={{
            fontSize: compact ? 32 : 54,
            fontWeight: 950,
            lineHeight: 0.9,
            letterSpacing: "-0.1em",
          }}
        >
          Feelog
        </span>
      </div>

      <div
        style={{
          marginTop: compact ? 5 : 8,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            height: compact ? 5 : 8,
            width: compact ? 34 : 52,
            background: palette.point,
            display: "inline-block",
          }}
        />
        {!compact && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "0.24em",
              color: palette.muted,
              textTransform: "uppercase",
            }}
          >
            Record the Scene
          </span>
        )}
      </div>
    </div>
  );
}

function LogoSmallBadge({ compact = false }: LogoProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: compact ? 42 : 58,
        border: `2px solid ${palette.foreground}`,
        background: palette.vanilla,
        boxShadow: compact ? "none" : `3px 3px 0 ${palette.foreground}`,
      }}
    >
      <div
        style={{
          height: "100%",
          width: compact ? 40 : 54,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: `2px solid ${palette.foreground}`,
          background: palette.card,
          fontWeight: 950,
        }}
      >
        @
      </div>
      <div style={{ padding: compact ? "0 10px" : "0 15px" }}>
        <div
          style={{
            fontSize: compact ? 18 : 28,
            lineHeight: 1,
            fontWeight: 950,
            letterSpacing: "-0.08em",
          }}
        >
          atFeelog
        </div>
        {!compact && (
          <div
            style={{
              marginTop: 4,
              fontSize: 9,
              fontWeight: 900,
              letterSpacing: "0.18em",
              color: palette.muted,
              textTransform: "uppercase",
            }}
          >
            Log 2026
          </div>
        )}
      </div>
    </div>
  );
}

function LogoByType({
  type,
  compact = false,
}: {
  type: LogoType;
  compact?: boolean;
}) {
  if (type === "wordmark") return <LogoCleanWordmark compact={compact} />;
  if (type === "ticket") return <LogoTicket compact={compact} />;
  if (type === "stamp") return <LogoArchiveStamp compact={compact} />;
  if (type === "frame") return <LogoSceneFrame compact={compact} />;
  if (type === "minimal") return <LogoMinimalSymbol compact={compact} />;
  if (type === "underline") return <LogoUnderlinePoster compact={compact} />;
  if (type === "badge") return <LogoSmallBadge compact={compact} />;
  return <LogoEditorialBar compact={compact} />;
}

function EditorialSideNavPreview({ logoType }: { logoType: LogoType }) {
  const navItems = ["Home", "Feed", "Records", "My Page"];

  return (
    <aside
      style={{
        width: 282,
        height: 720,
        background: palette.card,
        borderRight: `1.5px solid ${palette.foreground}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          borderBottom: `1.5px solid ${palette.foreground}`,
          padding: 24,
          minHeight: 118,
          display: "flex",
          alignItems: "center",
        }}
      >
        <LogoByType type={logoType} />
      </div>

      <div
        style={{
          borderBottom: `1px solid ${palette.border}`,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${palette.alice}, ${palette.honeydew})`,
            border: `1px solid ${palette.border}`,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              right: 5,
              bottom: 5,
              width: 10,
              height: 10,
              borderRadius: 999,
              background: palette.point,
            }}
          />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 850 }}>선 님</div>
          <div style={{ fontSize: 12, color: palette.muted }}>
            이번 달 8개의 기록
          </div>
        </div>
      </div>

      <div style={{ padding: 24 }}>
        <button
          type="button"
          style={{
            width: "100%",
            border: `1.5px solid ${palette.foreground}`,
            background: palette.vanilla,
            padding: "14px 18px",
            fontSize: 14,
            fontWeight: 950,
            letterSpacing: "0.14em",
            boxShadow: `2px 2px 0 ${palette.foreground}`,
            cursor: "pointer",
          }}
        >
          WRITE
        </button>
      </div>

      <nav style={{ borderTop: `1px solid ${palette.border}` }}>
        {navItems.map((item) => {
          const active = item === "Feed";

          return (
            <button
              key={item}
              type="button"
              style={{
                position: "relative",
                width: "100%",
                height: 54,
                border: 0,
                borderBottom: `1px solid ${palette.border}`,
                background: "transparent",
                color: active ? palette.foreground : palette.muted,
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "0 24px",
                fontSize: 14,
                fontWeight: active ? 850 : 750,
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
                    : item === "Records"
                      ? "▦"
                      : "◐"}
              </span>
              {item}
            </button>
          );
        })}
      </nav>

      <div
        style={{
          marginTop: "auto",
          borderTop: `1px solid ${palette.border}`,
          padding: 24,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 950,
            letterSpacing: "0.18em",
            color: palette.muted,
          }}
        >
          ARCHIVE NO. 0514
        </div>
        <button
          type="button"
          style={{
            marginTop: 18,
            border: 0,
            background: "transparent",
            color: palette.muted,
            fontWeight: 750,
            cursor: "pointer",
          }}
        >
          ↪ 로그아웃
        </button>
      </div>
    </aside>
  );
}

function LogoCard({
  candidate,
  selected,
  onSelect,
}: {
  candidate: LogoCandidate;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      style={{
        border: `1.5px solid ${selected ? palette.foreground : palette.border}`,
        background: palette.card,
        borderRadius: 28,
        padding: 22,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          height: 132,
          borderRadius: 22,
          background: palette.background,
          border: `1px solid ${palette.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: 18,
        }}
      >
        <LogoByType type={candidate.id} />
      </div>

      <div
        style={{
          marginTop: 18,
          fontSize: 18,
          fontWeight: 950,
          letterSpacing: "-0.04em",
        }}
      >
        {candidate.title}
      </div>

      <p
        style={{
          margin: "8px 0 0",
          fontSize: 13,
          lineHeight: 1.6,
          color: palette.muted,
        }}
      >
        {candidate.desc}
      </p>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.16em",
            color: selected ? palette.point : palette.muted,
          }}
        >
          {selected ? "SELECTED" : "PREVIEW"}
        </span>

        <div
          style={{
            transform: "scale(0.72)",
            transformOrigin: "right center",
          }}
        >
          <LogoByType type={candidate.id} compact />
        </div>
      </div>
    </div>
  );
}

export default function LogoPreviewPage() {
  const [selected, setSelected] = useState<LogoType>("editorial");

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
      <section style={{ maxWidth: 1280, margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            marginBottom: 34,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 950,
                letterSpacing: "0.18em",
                color: palette.point,
              }}
            >
              LOGO DESIGN CANDIDATES
            </div>

            <h1
              style={{
                margin: "8px 0 0",
                fontSize: 64,
                lineHeight: 1,
                letterSpacing: "-0.07em",
              }}
            >
              atFeelog Logo
            </h1>

            <p
              style={{
                maxWidth: 660,
                marginTop: 14,
                color: palette.muted,
                lineHeight: 1.7,
              }}
            >
              Editorial 사이드바와 현재 팔레트를 기준으로 만든 로고 후보입니다.
              카드를 클릭하면 오른쪽 사이드바 적용 미리보기가 바뀝니다.
            </p>
          </div>

          <div
            style={{
              border: `1px solid ${palette.border}`,
              background: palette.card,
              borderRadius: 24,
              padding: 18,
              minWidth: 280,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 950,
                letterSpacing: "0.16em",
                color: palette.muted,
              }}
            >
              CURRENT
            </div>
            <div style={{ marginTop: 12 }}>
              <LogoByType type={selected} />
            </div>
          </div>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 28,
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 18,
            }}
          >
            {candidates.map((candidate) => (
              <LogoCard
                key={candidate.id}
                candidate={candidate}
                selected={candidate.id === selected}
                onSelect={() => setSelected(candidate.id)}
              />
            ))}
          </div>

          <div
            style={{
              position: "sticky",
              top: 24,
              display: "grid",
              gap: 18,
            }}
          >
            <div
              style={{
                border: `1px solid ${palette.border}`,
                background: palette.card,
                borderRadius: 28,
                padding: 22,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 24,
                  letterSpacing: "-0.04em",
                }}
              >
                {current.title}
              </h2>

              <p
                style={{
                  margin: "10px 0 0",
                  color: palette.muted,
                  lineHeight: 1.7,
                  fontSize: 14,
                }}
              >
                {current.desc}
              </p>

              <div
                style={{
                  marginTop: 18,
                  background: palette.surfaceSoft,
                  borderRadius: 20,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 950,
                    letterSpacing: "0.16em",
                    color: palette.muted,
                  }}
                >
                  COMMENT
                </div>

                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  {selected === "editorial" &&
                    "지금 선택한 Editorial 사이드바와 가장 잘 맞습니다. active bar와 로고 포인트가 연결되어 보여요."}
                  {selected === "wordmark" &&
                    "가장 무난하고 오래 쓰기 좋은 형태입니다. 다만 개성은 조금 약할 수 있어요."}
                  {selected === "ticket" &&
                    "공연/전시 기록이라는 서비스 정체성이 가장 직접적으로 드러납니다."}
                  {selected === "stamp" &&
                    "기록을 남긴다는 컨셉이 강합니다. 조금 캐주얼한 인상을 줄 수 있어요."}
                  {selected === "frame" &&
                    "이미지 피드나 장면 기록 서비스라는 느낌이 있습니다. 로고보다는 섹션 아이콘처럼 보일 수도 있어요."}
                  {selected === "minimal" &&
                    "모바일 헤더나 favicon에 적합합니다. 메인 로고보다는 보조 심볼로 쓰기 좋습니다."}
                  {selected === "underline" &&
                    "에디토리얼 포스터 느낌이 가장 강합니다. 포트폴리오 첫인상에는 꽤 좋습니다."}
                  {selected === "badge" &&
                    "사이드바 상단에 안정적으로 들어갑니다. 작은 크기에서도 형태가 잘 유지됩니다."}
                </p>
              </div>
            </div>

            <div
              style={{
                border: `1px solid ${palette.border}`,
                background: palette.card,
                borderRadius: 28,
                padding: 18,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 950,
                  letterSpacing: "0.16em",
                  color: palette.muted,
                  marginBottom: 14,
                }}
              >
                SIDEBAR PREVIEW
              </div>

              <div
                style={{
                  transform: "scale(0.74)",
                  transformOrigin: "top left",
                  height: 535,
                }}
              >
                <EditorialSideNavPreview logoType={selected} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

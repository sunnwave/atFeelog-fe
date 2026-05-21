"use client";

import React, { useState } from "react";

type SearchVariant = "bar" | "panel" | "editorial" | "chips";

type Candidate = {
  id: SearchVariant;
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

const candidates: Candidate[] = [
  {
    id: "bar",
    label: "A",
    title: "Search + Date + Filter Bar",
    desc: "검색, 날짜 범위, 정렬을 한 줄에 배치한 실용적인 데스크탑형",
  },
  {
    id: "panel",
    label: "B",
    title: "Stacked Search Panel",
    desc: "검색창과 필터 영역을 분리해 확장성이 좋은 패널형",
  },
  {
    id: "editorial",
    label: "C",
    title: "Editorial Date Field",
    desc: "각진 선 중심의 검색/날짜 선택 UI",
  },
  {
    id: "chips",
    label: "D",
    title: "Soft Date Chips",
    desc: "날짜와 필터를 부드러운 칩 형태로 보여주는 UI",
  },
];

function SearchIcon() {
  return <span style={{ color: palette.muted, fontSize: 16 }}>⌕</span>;
}

function DateInput({ label }: { label: string }) {
  return (
    <label
      style={{
        height: 48,
        display: "flex",
        alignItems: "center",
        gap: 8,
        border: `1px solid ${palette.border}`,
        borderRadius: 14,
        background: palette.card,
        padding: "0 12px",
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 750,
          color: palette.muted,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <input
        type="date"
        defaultValue={label === "From" ? "2026-05-01" : "2026-05-31"}
        style={{
          width: 124,
          border: 0,
          outline: 0,
          background: "transparent",
          color: palette.foreground,
          fontSize: 13,
          fontWeight: 650,
        }}
      />
    </label>
  );
}

function SearchBar({ variant }: { variant: SearchVariant }) {
  if (variant === "panel") {
    return (
      <div
        style={{
          border: `1px solid ${palette.border}`,
          borderRadius: 18,
          background: palette.card,
          padding: 16,
          boxShadow: "0 8px 24px rgba(33,33,33,0.035)",
        }}
      >
        <div
          style={{
            height: 50,
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderBottom: `1px solid ${palette.border}`,
            paddingBottom: 14,
          }}
        >
          <SearchIcon />
          <input
            placeholder="공연, 전시, 아티스트 검색"
            style={{
              flex: 1,
              border: 0,
              outline: 0,
              background: "transparent",
              fontSize: 16,
              fontWeight: 600,
              color: palette.foreground,
            }}
          />
          <button
            type="button"
            style={{
              height: 34,
              padding: "0 14px",
              border: `1px solid ${palette.foreground}`,
              borderRadius: 999,
              background: palette.foreground,
              color: "#fff",
              fontSize: 12,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        <div
          style={{
            marginTop: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <DateInput label="From" />
          <DateInput label="To" />
          <button
            type="button"
            style={{
              height: 48,
              padding: "0 16px",
              border: `1px solid ${palette.border}`,
              borderRadius: 14,
              background: palette.surfaceSoft,
              fontSize: 13,
              fontWeight: 750,
              color: palette.foreground,
              cursor: "pointer",
            }}
          >
            최신순
          </button>
          <button
            type="button"
            style={{
              height: 48,
              padding: "0 16px",
              border: `1px solid ${palette.border}`,
              borderRadius: 14,
              background: palette.card,
              fontSize: 13,
              fontWeight: 750,
              color: palette.foreground,
              cursor: "pointer",
            }}
          >
            초기화
          </button>
        </div>
      </div>
    );
  }

  if (variant === "editorial") {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 150px 150px 92px",
          border: `1.5px solid ${palette.foreground}`,
          background: palette.card,
          height: 56,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 16px",
            borderRight: `1px solid ${palette.border}`,
          }}
        >
          <SearchIcon />
          <input
            placeholder="공연, 전시, 아티스트 검색"
            style={{
              flex: 1,
              border: 0,
              outline: 0,
              background: "transparent",
              fontSize: 15,
              fontWeight: 650,
            }}
          />
        </div>

        <input
          type="date"
          defaultValue="2026-05-01"
          style={{
            border: 0,
            borderRight: `1px solid ${palette.border}`,
            outline: 0,
            padding: "0 12px",
            background: "transparent",
            fontSize: 13,
            fontWeight: 650,
          }}
        />

        <input
          type="date"
          defaultValue="2026-05-31"
          style={{
            border: 0,
            borderRight: `1px solid ${palette.border}`,
            outline: 0,
            padding: "0 12px",
            background: "transparent",
            fontSize: 13,
            fontWeight: 650,
          }}
        />

        <button
          type="button"
          style={{
            border: 0,
            background: palette.foreground,
            color: "#fff",
            fontSize: 12,
            fontWeight: 850,
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
    );
  }

  if (variant === "chips") {
    return (
      <div style={{ display: "grid", gap: 12 }}>
        <div
          style={{
            height: 52,
            border: `1px solid ${palette.border}`,
            borderRadius: 18,
            background: palette.card,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 16px",
            boxShadow: "0 8px 24px rgba(33,33,33,0.035)",
          }}
        >
          <SearchIcon />
          <input
            placeholder="공연, 전시, 아티스트 검색"
            style={{
              flex: 1,
              border: 0,
              outline: 0,
              background: "transparent",
              fontSize: 15,
              fontWeight: 600,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {["이번 달", "지난 달", "올해", "전체"].map((item) => (
            <button
              key={item}
              type="button"
              style={{
                height: 36,
                padding: "0 14px",
                border: `1px solid ${palette.border}`,
                borderRadius: 999,
                background:
                  item === "이번 달" ? palette.honeydew : palette.card,
                color: palette.foreground,
                fontSize: 13,
                fontWeight: 750,
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          ))}

          <div
            style={{
              height: 36,
              display: "flex",
              alignItems: "center",
              gap: 6,
              border: `1px solid ${palette.border}`,
              borderRadius: 999,
              background: palette.surfaceSoft,
              padding: "0 12px",
              fontSize: 13,
              fontWeight: 700,
              color: palette.muted,
            }}
          >
            2026.05.01 - 2026.05.31
          </div>

          <button
            type="button"
            style={{
              height: 36,
              padding: "0 14px",
              border: 0,
              borderRadius: 999,
              background: palette.foreground,
              color: "#fff",
              fontSize: 13,
              fontWeight: 750,
              cursor: "pointer",
            }}
          >
            날짜 선택
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto auto auto",
        gap: 10,
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: 50,
          border: `1px solid ${palette.border}`,
          borderRadius: 16,
          background: palette.card,
          display: "flex",
          alignItems: "center",
          gap: 11,
          padding: "0 16px",
          boxShadow: "0 8px 24px rgba(33,33,33,0.035)",
        }}
      >
        <SearchIcon />
        <input
          placeholder="공연, 전시, 아티스트 검색"
          style={{
            width: "100%",
            border: 0,
            outline: 0,
            background: "transparent",
            color: palette.foreground,
            fontSize: 15,
            fontWeight: 550,
          }}
        />
      </div>

      <DateInput label="From" />
      <DateInput label="To" />

      <button
        type="button"
        style={{
          height: 50,
          padding: "0 16px",
          border: `1px solid ${palette.border}`,
          borderRadius: 16,
          background: palette.surfaceSoft,
          color: palette.foreground,
          fontSize: 14,
          fontWeight: 750,
          cursor: "pointer",
        }}
      >
        최신순
      </button>
    </div>
  );
}

function PageMock({ variant }: { variant: SearchVariant }) {
  return (
    <div
      style={{
        width: 900,
        minHeight: 560,
        background: palette.background,
        border: `1px solid ${palette.border}`,
        borderRadius: 24,
        padding: 32,
      }}
    >
      <header
        style={{
          marginBottom: 28,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 950,
              letterSpacing: "0.18em",
              color: palette.point,
              textTransform: "uppercase",
            }}
          >
            Records
          </div>

          <h2
            style={{
              margin: "8px 0 0",
              fontSize: 44,
              lineHeight: 1,
              letterSpacing: "-0.06em",
              color: palette.foreground,
            }}
          >
            Explore Records
          </h2>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: palette.muted }}>
          128 records
        </div>
      </header>

      <div style={{ marginBottom: 30 }}>
        <SearchBar variant={variant} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 24,
        }}
      >
        {[0, 1, 2, 3].map((item) => (
          <article
            key={item}
            style={{
              minHeight: item % 2 === 0 ? 270 : 230,
              border: `1px solid ${palette.border}`,
              borderRadius: 16,
              background: palette.card,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(33,33,33,0.035)",
            }}
          >
            {item % 2 === 0 && (
              <div
                style={{
                  height: 130,
                  background: item === 0 ? palette.alice : palette.honeydew,
                }}
              />
            )}

            <div style={{ padding: 18 }}>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  color: palette.muted,
                  fontSize: 12,
                  fontWeight: 650,
                }}
              >
                <span>2026.05.{12 - item}</span>
                <span>Record</span>
              </div>

              <h3
                style={{
                  margin: 0,
                  fontSize: 22,
                  lineHeight: 1.14,
                  letterSpacing: "-0.045em",
                  color: palette.foreground,
                }}
              >
                Beautiful Mint Life
              </h3>

              <p
                style={{
                  margin: "8px 0 0",
                  color: palette.muted,
                  fontSize: 14,
                  fontWeight: 650,
                }}
              >
                SURL
              </p>

              <p
                style={{
                  margin: "14px 0 0",
                  color: "rgba(33,33,33,0.78)",
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                기록의 짧은 감상 미리보기가 들어가는 영역입니다.
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function SearchDesignPreviewPage() {
  const [selected, setSelected] = useState<SearchVariant>("bar");

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
          "Inter, Pretendard, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "96px 1fr",
          gap: 34,
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
                  width: 58,
                  height: 58,
                  border: `1.5px solid ${palette.foreground}`,
                  background: isSelected ? palette.foreground : palette.card,
                  color: isSelected ? "#FFFFFF" : palette.foreground,
                  fontSize: 20,
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
          <header style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 950,
                letterSpacing: "0.18em",
                color: palette.point,
                textTransform: "uppercase",
              }}
            >
              Search Candidate {current.label}
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
                maxWidth: 760,
                color: palette.muted,
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              {current.desc}
            </p>
          </header>

          <PageMock variant={selected} />

          <div
            style={{
              marginTop: 28,
              width: 900,
              background: palette.card,
              border: `1px solid ${palette.border}`,
              borderRadius: 14,
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
              Comment
            </div>

            <p
              style={{
                margin: "8px 0 0",
                fontSize: 14,
                lineHeight: 1.7,
                color: palette.foreground,
              }}
            >
              {selected === "bar" &&
                "A안이 데스크탑 기록 목록에는 가장 추천입니다. 검색, 날짜 범위, 정렬이 한 줄에 있어 기능이 명확합니다."}
              {selected === "panel" &&
                "B안은 필터가 늘어날 가능성이 있으면 좋습니다. 검색어, 날짜, 카테고리, 정렬을 모두 넣기 쉽습니다."}
              {selected === "editorial" &&
                "C안은 사이드바와 가장 잘 연결되지만, 본문 영역까지 각진 느낌이 강해질 수 있습니다."}
              {selected === "chips" &&
                "D안은 가장 친근하고 부드럽습니다. 빠른 날짜 필터와 직접 날짜 선택을 같이 쓰기 좋습니다."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

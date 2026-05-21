"use client";

import React, { useState } from "react";

export interface RecordSummary {
  id: string;
  title: string;
  showName?: string;
  artistName?: string;
  likeCount?: number;
  commentCount?: number;
  images?: string[];
  isLiked?: boolean;
  user?: {
    name: string;
    picture?: string;
  };
  createdAt: string;
}

type LayoutVariant =
  | "threeColumns"
  | "twoColumns"
  | "masonry"
  | "featured"
  | "magazine";

type Candidate = {
  id: LayoutVariant;
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
  point: "#FF5C34",
  muted: "#70736B",
};

const candidates: Candidate[] = [
  {
    id: "threeColumns",
    label: "A",
    title: "3 Columns Grid",
    desc: "가장 기본적인 데스크탑 카드 그리드. 많은 게시물을 한눈에 보기 좋음",
  },
  {
    id: "twoColumns",
    label: "B",
    title: "2 Columns Relaxed Grid",
    desc: "카드 간 여백이 넉넉해서 기록 서비스 감성이 잘 살아나는 추천 레이아웃",
  },
  {
    id: "masonry",
    label: "C",
    title: "Masonry-like Grid",
    desc: "사진 있는 카드와 텍스트 카드가 섞일 때 자연스럽게 보이는 레이아웃",
  },
  {
    id: "featured",
    label: "D",
    title: "Featured + Grid",
    desc: "첫 번째 기록을 크게 강조하고 나머지를 그리드로 보여주는 홈 화면형 레이아웃",
  },
  {
    id: "magazine",
    label: "E",
    title: "Magazine Feed",
    desc: "왼쪽은 큰 대표 카드, 오른쪽은 세로 리스트로 구성한 매거진형 레이아웃",
  },
];

const records: RecordSummary[] = [
  {
    id: "1",
    title: "그날의 초여름 공기",
    showName: "Beautiful Mint Life 2026",
    artistName: "SURL",
    createdAt: "2026-05-12T09:00:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    ],
    likeCount: 24,
    commentCount: 6,
    isLiked: true,
    user: { name: "선", picture: "" },
  },
  {
    id: "2",
    title: "전시장을 나와서도 남은 색감",
    showName: "Edward Hopper: 길 위에서",
    artistName: "서울시립미술관",
    createdAt: "2026-05-02T09:00:00.000Z",
    images: [],
    likeCount: 18,
    commentCount: 3,
    isLiked: false,
    user: { name: "민", picture: "" },
  },
  {
    id: "3",
    title: "조명이 꺼지기 직전의 순간",
    showName: "The Volunteers Live",
    artistName: "The Volunteers",
    createdAt: "2026-04-28T09:00:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
    ],
    likeCount: 42,
    commentCount: 11,
    isLiked: true,
    user: { name: "지", picture: "" },
  },
  {
    id: "4",
    title: "조용한 그림 앞에서 오래 멈춘 날",
    showName: "MMCA Collection",
    artistName: "국립현대미술관",
    createdAt: "2026-04-16T09:00:00.000Z",
    images: [],
    likeCount: 9,
    commentCount: 1,
    isLiked: false,
    user: { name: "윤", picture: "" },
  },
  {
    id: "5",
    title: "페스티벌에서 가장 좋았던 무대",
    showName: "Grand Mint Festival",
    artistName: "LUCY",
    createdAt: "2026-04-03T09:00:00.000Z",
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
    ],
    likeCount: 31,
    commentCount: 5,
    isLiked: false,
    user: { name: "하", picture: "" },
  },
  {
    id: "6",
    title: "작은 공간에서 들은 큰 소리",
    showName: "Club FF Live",
    artistName: "cotoba",
    createdAt: "2026-03-29T09:00:00.000Z",
    images: [],
    likeCount: 15,
    commentCount: 2,
    isLiked: true,
    user: { name: "도", picture: "" },
  },
];

function getRecordImage(record: RecordSummary) {
  return record.images?.filter(Boolean)[0];
}

function getWriterName(record: RecordSummary) {
  return record.user?.name || "익명";
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return dateString;

  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll(". ", ".")
    .replace(/\.$/, "");
}

function Avatar({
  user,
  size = 30,
}: {
  user?: RecordSummary["user"];
  size?: number;
}) {
  const name = user?.name || "익";
  const initial = name[0];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "999px",
        background: "#DDEAD3",
        color: "#375631",
        border: "1px solid #BFD4B3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size <= 30 ? 13 : 15,
        fontWeight: 800,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {user?.picture ? (
        <img
          src={user.picture}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        initial
      )}
    </div>
  );
}

function FollowButton({ following = false }: { following?: boolean }) {
  return (
    <button
      type="button"
      style={{
        height: 30,
        padding: "0 12px",
        borderRadius: 999,
        border: following
          ? `1px solid ${palette.border}`
          : `1px solid ${palette.foreground}`,
        background: following ? palette.surfaceSoft : palette.foreground,
        color: following ? palette.muted : "#FFFFFF",
        fontSize: 12,
        fontWeight: 750,
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}

function ImageBlock({
  src,
  alt,
  compact = false,
}: {
  src?: string;
  alt: string;
  compact?: boolean;
}) {
  if (!src) return null;

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: compact ? "16 / 10" : "4 / 3",
        overflow: "hidden",
        background: palette.surfaceSoft,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

function WriterHeader({
  record,
  compact = false,
}: {
  record: RecordSummary;
  compact?: boolean;
}) {
  return (
    <div
      style={{
        padding: compact ? "13px 15px" : "16px 18px",
        borderBottom: getRecordImage(record)
          ? `1px solid ${palette.border}`
          : 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          minWidth: 0,
          alignItems: "center",
          gap: 9,
        }}
      >
        <Avatar user={record.user} size={compact ? 28 : 30} />

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: compact ? 12 : 13,
              fontWeight: 750,
              color: palette.foreground,
            }}
          >
            {getWriterName(record)}
          </div>

          <div
            style={{
              marginTop: 1,
              fontSize: 11,
              fontWeight: 550,
              color: palette.muted,
            }}
          >
            {formatDate(record.createdAt)}
          </div>
        </div>
      </div>

      <FollowButton />
    </div>
  );
}

function StatsText({ record }: { record: RecordSummary }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 650,
        color: palette.muted,
        whiteSpace: "nowrap",
      }}
    >
      {record.isLiked ? "♥" : "♡"} {record.likeCount ?? 0} · 댓글{" "}
      {record.commentCount ?? 0}
    </div>
  );
}

function RecordCard({
  record,
  width = 340,
  compact = false,
  featured = false,
}: {
  record: RecordSummary;
  width?: number | string;
  compact?: boolean;
  featured?: boolean;
}) {
  const imageUrl = getRecordImage(record);
  const hasImage = !!imageUrl;

  return (
    <article
      style={{
        width,
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: featured ? 18 : 16,
        overflow: "hidden",
        boxShadow: featured
          ? "0 14px 38px rgba(33, 33, 33, 0.055)"
          : "0 8px 24px rgba(33, 33, 33, 0.04)",
      }}
    >
      <WriterHeader record={record} compact={compact} />

      {hasImage && (
        <ImageBlock
          src={imageUrl}
          alt={record.showName || record.title}
          compact={compact}
        />
      )}

      <div style={{ padding: compact ? 16 : featured ? 24 : 20 }}>
        {record.showName && (
          <h3
            style={{
              margin: 0,
              color: palette.foreground,
              fontSize: featured ? 30 : compact ? 20 : hasImage ? 22 : 25,
              lineHeight: 1.16,
              letterSpacing: "-0.045em",
              fontWeight: 850,
            }}
          >
            {record.showName}
          </h3>
        )}

        {record.artistName && (
          <p
            style={{
              margin: "7px 0 0",
              color: palette.muted,
              fontSize: compact ? 13 : 14,
              fontWeight: 650,
            }}
          >
            {record.artistName}
          </p>
        )}

        <div
          style={{
            marginTop: record.showName || record.artistName ? 15 : 0,
            paddingTop: record.showName || record.artistName ? 14 : 0,
            borderTop:
              record.showName || record.artistName
                ? `1px solid ${palette.border}`
                : 0,
          }}
        >
          <p
            style={{
              margin: 0,
              color: palette.foreground,
              fontSize: featured ? 17 : compact ? 14 : 15,
              lineHeight: 1.45,
              letterSpacing: "-0.02em",
              fontWeight: 760,
            }}
          >
            {record.title}
          </p>

          <p
            style={{
              margin: "10px 0 0",
              color: "rgba(33, 33, 33, 0.82)",
              fontSize: compact ? 13 : 14,
              lineHeight: 1.76,
            }}
          >
            기록의 짧은 감상이나 본문 미리보기가 들어가는 영역입니다. 실제
            데이터에서는 contents를 요약해서 보여주면 좋아요.
          </p>
        </div>

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
              fontSize: 12,
              fontWeight: 650,
              color: palette.muted,
            }}
          >
            Record
          </span>

          <StatsText record={record} />
        </div>
      </div>
    </article>
  );
}

function ThreeColumnsLayout() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 22,
      }}
    >
      {records.map((record) => (
        <RecordCard key={record.id} record={record} width="100%" compact />
      ))}
    </div>
  );
}

function TwoColumnsLayout() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 28,
        maxWidth: 860,
      }}
    >
      {records.map((record) => (
        <RecordCard key={record.id} record={record} width="100%" />
      ))}
    </div>
  );
}

function MasonryLayout() {
  const left = records.filter((_, index) => index % 2 === 0);
  const right = records.filter((_, index) => index % 2 === 1);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 28,
        maxWidth: 860,
        alignItems: "start",
      }}
    >
      <div style={{ display: "grid", gap: 28 }}>
        {left.map((record, index) => (
          <RecordCard
            key={record.id}
            record={record}
            width="100%"
            compact={index % 2 === 1}
          />
        ))}
      </div>

      <div style={{ display: "grid", gap: 28, paddingTop: 44 }}>
        {right.map((record, index) => (
          <RecordCard
            key={record.id}
            record={record}
            width="100%"
            compact={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}

function FeaturedLayout() {
  const [first, ...rest] = records;

  return (
    <div style={{ display: "grid", gap: 28 }}>
      <RecordCard record={first} width="100%" featured />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 24,
        }}
      >
        {rest.map((record) => (
          <RecordCard key={record.id} record={record} width="100%" compact />
        ))}
      </div>
    </div>
  );
}

function MagazineLayout() {
  const [first, ...rest] = records;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.1fr) minmax(320px, 0.9fr)",
        gap: 30,
        alignItems: "start",
      }}
    >
      <RecordCard record={first} width="100%" featured />

      <div style={{ display: "grid", gap: 16 }}>
        {rest.map((record) => (
          <RecordCard key={record.id} record={record} width="100%" compact />
        ))}
      </div>
    </div>
  );
}

function LayoutByVariant({ variant }: { variant: LayoutVariant }) {
  if (variant === "twoColumns") return <TwoColumnsLayout />;
  if (variant === "masonry") return <MasonryLayout />;
  if (variant === "featured") return <FeaturedLayout />;
  if (variant === "magazine") return <MagazineLayout />;

  return <ThreeColumnsLayout />;
}

export default function RecordListLayoutPreviewPage() {
  const [selected, setSelected] = useState<LayoutVariant>("twoColumns");

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
          maxWidth: 1180,
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
          <header style={{ marginBottom: 30 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 950,
                letterSpacing: "0.18em",
                color: palette.point,
                textTransform: "uppercase",
              }}
            >
              Desktop Record List Layout {current.label}
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

          <LayoutByVariant variant={selected} />

          <div
            style={{
              marginTop: 32,
              background: palette.card,
              border: `1px solid ${palette.border}`,
              borderRadius: 14,
              padding: 18,
              maxWidth:
                selected === "twoColumns" || selected === "masonry"
                  ? 860
                  : "100%",
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
              {selected === "threeColumns" &&
                "A안은 게시물을 많이 보여주기 좋지만, 카드 안 정보가 많은 편이라 살짝 빽빽하게 느껴질 수 있습니다."}
              {selected === "twoColumns" &&
                "B안이 가장 추천입니다. 카드의 여백과 정보량이 안정적이고, 현재 SideNav가 강한 만큼 본문 영역이 덜 답답해 보입니다."}
              {selected === "masonry" &&
                "C안은 이미지가 있는 기록과 없는 기록이 섞일 때 자연스럽습니다. 다만 구현 시 높이 균형을 조금 신경 써야 합니다."}
              {selected === "featured" &&
                "D안은 홈 화면이나 베스트 기록 섹션에 좋습니다. 첫 번째 기록을 크게 보여줘 포트폴리오 첫인상이 좋아집니다."}
              {selected === "magazine" &&
                "E안은 데스크탑 전용으로 감도가 높습니다. 메인 피드보다는 홈 상단 섹션이나 추천 기록 영역에 잘 어울립니다."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

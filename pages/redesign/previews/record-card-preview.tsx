"use client";

import React from "react";

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

const palette = {
  background: "#F6F5FA",
  foreground: "#212121",
  card: "#FFFFFF",
  border: "#E8E8DF",
  surfaceSoft: "#F4F4EF",
  point: "#FF5C34",
  muted: "#70736B",
};

const imageRecord: RecordSummary = {
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
  user: {
    name: "선",
    picture: "",
  },
};

const textRecord: RecordSummary = {
  id: "2",
  title: "전시장을 나와서도 남은 색감",
  showName: "Edward Hopper: 길 위에서",
  artistName: "서울시립미술관",
  createdAt: "2026-05-02T09:00:00.000Z",
  images: [],
  likeCount: 18,
  commentCount: 3,
  isLiked: false,
  user: {
    name: "선",
    picture: "",
  },
};

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
        fontSize: 13,
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

function ImageBlock({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "4 / 3",
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

function WriterHeader({ record }: { record: RecordSummary }) {
  return (
    <div
      style={{
        padding: "16px 18px",
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
        <Avatar user={record.user} />

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: 13,
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
      }}
    >
      {record.isLiked ? "♥" : "♡"} {record.likeCount ?? 0} · 댓글{" "}
      {record.commentCount ?? 0}
    </div>
  );
}

function RecordCard({ record }: { record: RecordSummary }) {
  const imageUrl = getRecordImage(record);
  const hasImage = !!imageUrl;

  return (
    <article
      style={{
        width: 340,
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(33, 33, 33, 0.04)",
      }}
    >
      <WriterHeader record={record} />

      {hasImage && (
        <ImageBlock src={imageUrl} alt={record.showName || record.title} />
      )}

      <div style={{ padding: 20 }}>
        {record.showName && (
          <h3
            style={{
              margin: 0,
              color: palette.foreground,
              fontSize: hasImage ? 22 : 25,
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
              fontSize: 14,
              fontWeight: 650,
            }}
          >
            {record.artistName}
          </p>
        )}

        <div
          style={{
            marginTop: record.showName || record.artistName ? 16 : 0,
            paddingTop: record.showName || record.artistName ? 15 : 0,
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
              fontSize: 15,
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
              fontSize: 14,
              lineHeight: 1.76,
            }}
          >
            기록의 짧은 감상이나 본문 미리보기가 들어가는 영역입니다. 실제
            데이터에서는 contents를 요약하거나 plain text로 변환해서 보여주면
            좋아요.
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

export default function RecordCardPreviewPage() {
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
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
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
            RecordCard Candidate B
          </div>

          <h1
            style={{
              margin: "8px 0 0",
              fontSize: 44,
              lineHeight: 1,
              letterSpacing: "-0.06em",
            }}
          >
            Top Profile + Follow
          </h1>

          <p
            style={{
              marginTop: 12,
              maxWidth: 680,
              color: palette.muted,
              lineHeight: 1.7,
              fontSize: 15,
            }}
          >
            작성자와 팔로우 버튼을 상단에 두고, 본문 영역에서 showName,
            artistName, title을 모두 구분해서 보여주는 카드입니다.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 340px)",
            gap: 32,
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
              With Image
            </div>

            <RecordCard record={imageRecord} />
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
              Text Only
            </div>

            <RecordCard record={textRecord} />
          </div>
        </div>
      </section>
    </main>
  );
}

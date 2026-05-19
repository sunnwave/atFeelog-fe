"use client";

import React, { useState } from "react";

type RecordCardVariant =
  | "soft"
  | "diary"
  | "photoNote"
  | "calm"
  | "roundedArchive"
  | "warmPaper";

type Candidate = {
  id: RecordCardVariant;
  label: string;
  title: string;
  desc: string;
};

type RecordItem = {
  id: string;
  showName: string;
  artistName?: string;
  date: string;
  place: string;
  writer: string;
  content: string;
  imageUrl?: string;
  likeCount: number;
  commentCount: number;
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
    id: "soft",
    label: "A",
    title: "Soft Editorial",
    desc: "가장 추천. 사이드바의 강한 느낌을 부드럽게 중화하는 기본 카드",
  },
  {
    id: "diary",
    label: "B",
    title: "Diary Card",
    desc: "기록 서비스 감성이 가장 잘 살아나는 차분한 일기형 카드",
  },
  {
    id: "photoNote",
    label: "C",
    title: "Photo Note",
    desc: "사진 있는 기록을 부드러운 포토 노트처럼 보여주는 카드",
  },
  {
    id: "calm",
    label: "D",
    title: "Calm Feed",
    desc: "실서비스 피드에 가장 가까운 담백한 카드",
  },
  {
    id: "roundedArchive",
    label: "E",
    title: "Rounded Archive",
    desc: "아카이브 느낌은 유지하되 각진 느낌을 줄인 카드",
  },
  {
    id: "warmPaper",
    label: "F",
    title: "Warm Paper",
    desc: "따뜻한 종이 질감 느낌. 텍스트-only 기록에 특히 잘 어울림",
  },
];

const imageRecord: RecordItem = {
  id: "1",
  showName: "Beautiful Mint Life 2026",
  artistName: "SURL",
  date: "2026.05.12",
  place: "Olympic Park",
  writer: "선",
  content:
    "초여름 공기랑 밴드 사운드가 너무 잘 어울렸던 날. 마지막 곡에서 조명이 바뀌는 순간이 아직도 기억난다.",
  imageUrl:
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
  likeCount: 24,
  commentCount: 6,
};

const textRecord: RecordItem = {
  id: "2",
  showName: "Edward Hopper: 길 위에서",
  artistName: "서울시립미술관",
  date: "2026.05.02",
  place: "SeMA",
  writer: "선",
  content:
    "그림 속 인물들이 모두 혼자 있는 것처럼 보였는데, 이상하게 외롭기보다 조용히 쉬는 느낌이 들었다. 전시장을 나와서도 색감이 오래 남았다.",
  likeCount: 18,
  commentCount: 3,
};

function MetaText({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 700,
        color: palette.muted,
      }}
    >
      {children}
    </span>
  );
}

function ImageBlock({
  src,
  rounded = false,
}: {
  src?: string;
  rounded?: boolean;
}) {
  if (!src) return null;

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "4 / 3",
        overflow: "hidden",
        borderRadius: rounded ? 18 : 0,
        background: palette.surfaceSoft,
      }}
    >
      <img
        src={src}
        alt=""
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

function FooterMeta({ record }: { record: RecordItem }) {
  return (
    <div
      style={{
        marginTop: 18,
        paddingTop: 14,
        borderTop: `1px solid ${palette.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: palette.muted,
        fontSize: 13,
        fontWeight: 650,
      }}
    >
      <span>by {record.writer}</span>
      <span>
        ♥ {record.likeCount} · 댓글 {record.commentCount}
      </span>
    </div>
  );
}

function RecordSoft({
  record,
  hasImage,
}: {
  record: RecordItem;
  hasImage: boolean;
}) {
  return (
    <article
      style={{
        width: 340,
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 14px 40px rgba(33, 33, 33, 0.05)",
      }}
    >
      {hasImage && <ImageBlock src={record.imageUrl} />}

      <div style={{ padding: 22 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <MetaText>{record.date}</MetaText>
          <MetaText>{record.place}</MetaText>
        </div>

        <h3
          style={{
            margin: 0,
            fontSize: hasImage ? 23 : 26,
            lineHeight: 1.14,
            letterSpacing: "-0.05em",
            fontWeight: 850,
            color: palette.foreground,
          }}
        >
          {record.showName}
        </h3>

        <p
          style={{
            margin: "8px 0 0",
            color: palette.muted,
            fontSize: 14,
            fontWeight: 650,
          }}
        >
          {record.artistName}
        </p>

        <p
          style={{
            margin: "16px 0 0",
            color: palette.foreground,
            fontSize: 14,
            lineHeight: 1.78,
          }}
        >
          {record.content}
        </p>

        <FooterMeta record={record} />
      </div>
    </article>
  );
}

function RecordDiary({
  record,
  hasImage,
}: {
  record: RecordItem;
  hasImage: boolean;
}) {
  return (
    <article
      style={{
        width: 340,
        background: "#FFFEFA",
        border: `1px solid ${palette.border}`,
        borderRadius: 24,
        padding: 18,
        boxShadow: "0 10px 28px rgba(33, 33, 33, 0.04)",
      }}
    >
      {hasImage && (
        <div
          style={{
            marginBottom: 18,
            padding: 8,
            borderRadius: 20,
            background: palette.surfaceSoft,
          }}
        >
          <ImageBlock src={record.imageUrl} rounded />
        </div>
      )}

      <div
        style={{
          marginBottom: 15,
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <MetaText>{record.date}</MetaText>
        <MetaText>{record.place}</MetaText>
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: 25,
          lineHeight: 1.16,
          letterSpacing: "-0.05em",
          fontWeight: 850,
          color: palette.foreground,
        }}
      >
        {record.showName}
      </h3>

      <p
        style={{
          margin: "8px 0 0",
          color: palette.muted,
          fontSize: 14,
          fontWeight: 650,
        }}
      >
        {record.artistName}
      </p>

      <p
        style={{
          margin: "18px 0 0",
          color: palette.foreground,
          fontSize: 14,
          lineHeight: 1.88,
        }}
      >
        {record.content}
      </p>

      <FooterMeta record={record} />
    </article>
  );
}

function RecordPhotoNote({
  record,
  hasImage,
}: {
  record: RecordItem;
  hasImage: boolean;
}) {
  return (
    <article
      style={{
        width: 340,
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: 30,
        padding: 14,
        boxShadow: "0 12px 36px rgba(33, 33, 33, 0.05)",
      }}
    >
      {hasImage ? (
        <ImageBlock src={record.imageUrl} rounded />
      ) : (
        <div
          style={{
            minHeight: 150,
            borderRadius: 22,
            background: palette.surfaceSoft,
            padding: 24,
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              color: palette.muted,
              fontSize: 15,
              lineHeight: 1.8,
              fontWeight: 600,
            }}
          >
            {record.content}
          </p>
        </div>
      )}

      <div style={{ padding: "18px 8px 4px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <MetaText>{record.date}</MetaText>
          <MetaText>{record.place}</MetaText>
        </div>

        <h3
          style={{
            margin: 0,
            fontSize: 23,
            lineHeight: 1.14,
            letterSpacing: "-0.05em",
            fontWeight: 850,
          }}
        >
          {record.showName}
        </h3>

        <p
          style={{
            margin: "8px 0 0",
            color: palette.muted,
            fontSize: 14,
            fontWeight: 650,
          }}
        >
          {record.artistName}
        </p>

        {hasImage && (
          <p
            style={{
              margin: "15px 0 0",
              color: palette.foreground,
              fontSize: 14,
              lineHeight: 1.75,
            }}
          >
            {record.content}
          </p>
        )}

        <FooterMeta record={record} />
      </div>
    </article>
  );
}

function RecordCalm({
  record,
  hasImage,
}: {
  record: RecordItem;
  hasImage: boolean;
}) {
  return (
    <article
      style={{
        width: 340,
        background: "transparent",
      }}
    >
      {hasImage && (
        <div
          style={{
            marginBottom: 16,
            borderRadius: 24,
            overflow: "hidden",
            background: palette.surfaceSoft,
          }}
        >
          <ImageBlock src={record.imageUrl} />
        </div>
      )}

      <div
        style={{
          padding: hasImage ? "0 4px 18px" : 22,
          background: hasImage ? "transparent" : palette.card,
          border: hasImage ? 0 : `1px solid ${palette.border}`,
          borderRadius: hasImage ? 0 : 24,
        }}
      >
        <div
          style={{
            marginBottom: 10,
            display: "flex",
            gap: 10,
            color: palette.muted,
            fontSize: 12,
            fontWeight: 650,
          }}
        >
          <span>{record.date}</span>
          <span>·</span>
          <span>{record.place}</span>
        </div>

        <h3
          style={{
            margin: 0,
            fontSize: 22,
            lineHeight: 1.18,
            letterSpacing: "-0.04em",
            fontWeight: 800,
            color: palette.foreground,
          }}
        >
          {record.showName}
        </h3>

        <p
          style={{
            margin: "7px 0 0",
            color: palette.muted,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {record.artistName}
        </p>

        <p
          style={{
            margin: "14px 0 0",
            color: palette.foreground,
            fontSize: 14,
            lineHeight: 1.78,
          }}
        >
          {record.content}
        </p>

        <div
          style={{
            marginTop: 14,
            color: palette.muted,
            fontSize: 13,
            fontWeight: 650,
          }}
        >
          ♥ {record.likeCount} · 댓글 {record.commentCount}
        </div>
      </div>
    </article>
  );
}

function RecordRoundedArchive({
  record,
  hasImage,
}: {
  record: RecordItem;
  hasImage: boolean;
}) {
  return (
    <article
      style={{
        width: 340,
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: 26,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 18px",
          background: palette.surfaceSoft,
          borderBottom: `1px solid ${palette.border}`,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MetaText>Record</MetaText>
        <MetaText>{record.date}</MetaText>
      </div>

      {hasImage && (
        <div style={{ padding: 16, paddingBottom: 0 }}>
          <ImageBlock src={record.imageUrl} rounded />
        </div>
      )}

      <div style={{ padding: 20 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 24,
            lineHeight: 1.15,
            letterSpacing: "-0.05em",
            fontWeight: 850,
            color: palette.foreground,
          }}
        >
          {record.showName}
        </h3>

        <p
          style={{
            margin: "8px 0 0",
            color: palette.muted,
            fontSize: 14,
            fontWeight: 650,
          }}
        >
          {record.artistName} · {record.place}
        </p>

        <p
          style={{
            margin: "16px 0 0",
            color: palette.foreground,
            fontSize: 14,
            lineHeight: 1.78,
          }}
        >
          {record.content}
        </p>

        <FooterMeta record={record} />
      </div>
    </article>
  );
}

function RecordWarmPaper({
  record,
  hasImage,
}: {
  record: RecordItem;
  hasImage: boolean;
}) {
  return (
    <article
      style={{
        width: 340,
        background: "#FFF9EC",
        border: "1px solid #EFE0BF",
        borderRadius: 28,
        padding: 20,
      }}
    >
      {hasImage && (
        <div
          style={{
            marginBottom: 18,
            borderRadius: 22,
            overflow: "hidden",
            border: "1px solid #EFE0BF",
          }}
        >
          <ImageBlock src={record.imageUrl} />
        </div>
      )}

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
          padding: "6px 10px",
          borderRadius: 999,
          background: "rgba(255, 92, 52, 0.08)",
          color: "#8A321C",
          fontSize: 12,
          fontWeight: 750,
        }}
      >
        {record.date} · {record.place}
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: 25,
          lineHeight: 1.16,
          letterSpacing: "-0.05em",
          fontWeight: 850,
          color: palette.foreground,
        }}
      >
        {record.showName}
      </h3>

      <p
        style={{
          margin: "8px 0 0",
          color: palette.muted,
          fontSize: 14,
          fontWeight: 650,
        }}
      >
        {record.artistName}
      </p>

      <p
        style={{
          margin: "18px 0 0",
          color: palette.foreground,
          fontSize: 14,
          lineHeight: 1.86,
        }}
      >
        {record.content}
      </p>

      <FooterMeta record={record} />
    </article>
  );
}

function RecordCardByVariant({
  variant,
  record,
  hasImage,
}: {
  variant: RecordCardVariant;
  record: RecordItem;
  hasImage: boolean;
}) {
  if (variant === "diary")
    return <RecordDiary record={record} hasImage={hasImage} />;
  if (variant === "photoNote")
    return <RecordPhotoNote record={record} hasImage={hasImage} />;
  if (variant === "calm")
    return <RecordCalm record={record} hasImage={hasImage} />;
  if (variant === "roundedArchive")
    return <RecordRoundedArchive record={record} hasImage={hasImage} />;
  if (variant === "warmPaper")
    return <RecordWarmPaper record={record} hasImage={hasImage} />;

  return <RecordSoft record={record} hasImage={hasImage} />;
}

export default function RecordCardPreviewPage() {
  const [selected, setSelected] = useState<RecordCardVariant>("soft");

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
              RecordCard Candidate {current.label}
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
                maxWidth: 680,
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

              <RecordCardByVariant
                variant={selected}
                record={imageRecord}
                hasImage
              />
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

              <RecordCardByVariant
                variant={selected}
                record={textRecord}
                hasImage={false}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 28,
              width: 712,
              background: palette.card,
              border: `1px solid ${palette.border}`,
              borderRadius: 20,
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
              }}
            >
              {selected === "soft" &&
                "A안이 가장 추천입니다. 사이드바의 각진 느낌을 카드의 둥근 모서리와 은은한 그림자로 중화해줍니다."}
              {selected === "diary" &&
                "B안은 기록 서비스 감성이 가장 좋습니다. 특히 텍스트-only 카드가 자연스럽고 따뜻하게 보입니다."}
              {selected === "photoNote" &&
                "C안은 사진 중심 기록에 좋습니다. 이미지가 있을 때 가장 예쁘고, 사진 없는 경우도 노트처럼 처리됩니다."}
              {selected === "calm" &&
                "D안은 가장 실서비스 피드답습니다. 디자인 감도는 조용하지만 전체 화면을 가장 안정적으로 만들어줍니다."}
              {selected === "roundedArchive" &&
                "E안은 아카이브 느낌을 살리면서도 강한 검정 라인을 줄인 버전입니다."}
              {selected === "warmPaper" &&
                "F안은 가장 따뜻합니다. 코랄 포인트를 은은하게 쓰기 때문에 사이드바와도 연결감이 있습니다."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

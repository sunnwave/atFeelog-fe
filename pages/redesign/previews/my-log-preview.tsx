"use client";

import React, { useState } from "react";

type GridVariant =
  | "instagram"
  | "softSquare"
  | "archiveCard"
  | "masonry"
  | "mixedFeature"
  | "textAware";

type Candidate = {
  id: GridVariant;
  label: string;
  title: string;
  desc: string;
};

type ProfileUser = {
  name: string;
  handle: string;
  bio: string;
  recordsCount: number;
  followersCount: number;
  followingCount: number;
  isMe?: boolean;
  isFollowing?: boolean;
};

type RecordItem = {
  id: string;
  title: string;
  showName?: string;
  artistName?: string;
  imageUrl?: string;
  likeCount?: number;
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
    id: "instagram",
    label: "A",
    title: "Instagram Square Grid",
    desc: "가장 인스타그램 프로필에 가까운 정사각형 3열 그리드",
  },
  {
    id: "softSquare",
    label: "B",
    title: "Soft Square Grid",
    desc: "정사각형 구조는 유지하되 카드감과 여백을 더한 부드러운 그리드",
  },
  {
    id: "archiveCard",
    label: "C",
    title: "Archive Card Grid",
    desc: "각 게시물을 작은 기록 카드처럼 보여주는 아카이브형 그리드",
  },
  {
    id: "masonry",
    label: "D",
    title: "Profile Masonry",
    desc: "이미지 있는 글과 없는 글이 섞일 때 자연스러운 프로필용 masonry",
  },
  {
    id: "mixedFeature",
    label: "E",
    title: "Featured + Grid",
    desc: "최근/대표 기록 하나를 크게 보여주고 나머지를 그리드로 배치",
  },
  {
    id: "textAware",
    label: "F",
    title: "Text-aware Grid",
    desc: "사진 없는 기록을 단순 빈칸이 아니라 텍스트 카드로 적극 활용하는 그리드",
  },
];

const me: ProfileUser = {
  name: "선",
  handle: "@sun.feelog",
  bio: "공연과 전시의 순간을 기록합니다. 좋아했던 장면과 오래 남은 감정을 모아두는 공간.",
  recordsCount: 42,
  followersCount: 128,
  followingCount: 86,
  isMe: true,
};

const otherUser: ProfileUser = {
  name: "민",
  handle: "@min.archive",
  bio: "전시와 라이브 공연을 천천히 기록합니다. 마음에 남은 장면을 모아두는 로그.",
  recordsCount: 27,
  followersCount: 310,
  followingCount: 94,
  isMe: false,
  isFollowing: false,
};

const records: RecordItem[] = [
  {
    id: "1",
    title: "그날의 초여름 공기",
    showName: "Beautiful Mint Life",
    artistName: "SURL",
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    likeCount: 24,
  },
  {
    id: "2",
    title: "전시장을 나와서도 남은 색감",
    showName: "Edward Hopper",
    artistName: "SeMA",
    likeCount: 18,
  },
  {
    id: "3",
    title: "조명이 꺼지기 직전",
    showName: "The Volunteers Live",
    artistName: "The Volunteers",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
    likeCount: 42,
  },
  {
    id: "4",
    title: "조용한 그림 앞에서",
    showName: "MMCA Collection",
    artistName: "국립현대미술관",
    likeCount: 9,
  },
  {
    id: "5",
    title: "페스티벌에서 가장 좋았던 무대",
    showName: "Grand Mint Festival",
    artistName: "LUCY",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
    likeCount: 31,
  },
  {
    id: "6",
    title: "작은 공간에서 들은 큰 소리",
    showName: "Club FF Live",
    artistName: "cotoba",
    likeCount: 15,
  },
  {
    id: "7",
    title: "낯선 색으로 남은 하루",
    showName: "Color Field",
    artistName: "Gallery Now",
    imageUrl:
      "https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=900&q=80",
    likeCount: 20,
  },
  {
    id: "8",
    title: "가사보다 먼저 온 분위기",
    showName: "Wave To Earth",
    artistName: "Wave To Earth",
    likeCount: 37,
  },
  {
    id: "9",
    title: "마지막 곡이 끝나고",
    showName: "Encore Night",
    artistName: "NELL",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
    likeCount: 51,
  },
];

function Avatar({ size = 96 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 24,
        background: "#DDEAD3",
        border: "1px solid #BFD4B3",
        color: "#375631",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size > 80 ? 34 : 24,
        fontWeight: 900,
        flexShrink: 0,
      }}
    >
      선
    </div>
  );
}

function ProfileActionButtons({ user }: { user: ProfileUser }) {
  if (user.isMe) {
    return (
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          style={{
            height: 38,
            padding: "0 16px",
            border: `1.5px solid ${palette.foreground}`,
            background: palette.foreground,
            color: "#FFFFFF",
            fontSize: 13,
            fontWeight: 850,
            cursor: "pointer",
          }}
        >
          프로필 수정
        </button>

        <button
          type="button"
          style={{
            height: 38,
            padding: "0 16px",
            border: `1px solid ${palette.border}`,
            background: palette.card,
            color: palette.foreground,
            fontSize: 13,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          계정 설정
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        type="button"
        style={{
          height: 38,
          padding: "0 18px",
          border: user.isFollowing
            ? `1px solid ${palette.border}`
            : `1.5px solid ${palette.foreground}`,
          background: user.isFollowing
            ? palette.surfaceSoft
            : palette.foreground,
          color: user.isFollowing ? palette.muted : "#FFFFFF",
          fontSize: 13,
          fontWeight: 850,
          cursor: "pointer",
        }}
      >
        {user.isFollowing ? "Following" : "Follow"}
      </button>

      <button
        type="button"
        style={{
          height: 38,
          padding: "0 16px",
          border: `1px solid ${palette.border}`,
          background: palette.card,
          color: palette.foreground,
          fontSize: 13,
          fontWeight: 800,
          cursor: "pointer",
        }}
      >
        공유하기
      </button>
    </div>
  );
}

function EditorialProfileHeader({ user }: { user: ProfileUser }) {
  return (
    <section
      style={{
        border: `1.5px solid ${palette.foreground}`,
        background: palette.card,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "148px 1fr",
        }}
      >
        <div
          style={{
            borderRight: `1.5px solid ${palette.foreground}`,
            padding: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: palette.surfaceSoft,
          }}
        >
          <Avatar size={96} />
        </div>

        <div style={{ padding: 26 }}>
          <div
            style={{
              marginBottom: 18,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 950,
                  letterSpacing: "0.18em",
                  color: palette.point,
                  textTransform: "uppercase",
                }}
              >
                {user.isMe ? "My Log" : "User Log"}
              </div>

              <h2
                style={{
                  margin: "7px 0 0",
                  fontSize: 38,
                  lineHeight: 1,
                  letterSpacing: "-0.07em",
                  color: palette.foreground,
                }}
              >
                {user.name}
              </h2>

              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 14,
                  fontWeight: 800,
                  color: palette.muted,
                }}
              >
                {user.handle}
              </p>
            </div>

            <ProfileActionButtons user={user} />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              borderTop: `1px solid ${palette.border}`,
              borderBottom: `1px solid ${palette.border}`,
            }}
          >
            {[
              ["게시물", user.recordsCount],
              ["팔로워", user.followersCount],
              ["팔로잉", user.followingCount],
            ].map(([label, value], index) => (
              <div
                key={label}
                style={{
                  padding: "16px 18px",
                  borderRight:
                    index !== 2 ? `1px solid ${palette.border}` : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 950,
                    letterSpacing: "-0.05em",
                    color: palette.foreground,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    marginTop: 2,
                    fontSize: 12,
                    fontWeight: 750,
                    color: palette.muted,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              margin: "18px 0 0",
              maxWidth: 620,
              fontSize: 14,
              lineHeight: 1.7,
              color: palette.foreground,
            }}
          >
            {user.bio}
          </p>
        </div>
      </div>
    </section>
  );
}

function ProfileTabs() {
  return (
    <div
      style={{
        marginTop: 28,
        borderTop: `1px solid ${palette.foreground}`,
        borderBottom: `1px solid ${palette.border}`,
        display: "flex",
      }}
    >
      {["게시물", "공연", "전시"].map((tab, index) => {
        const active = index === 0;

        return (
          <button
            key={tab}
            type="button"
            style={{
              height: 52,
              flex: 1,
              border: 0,
              borderRight: index !== 2 ? `1px solid ${palette.border}` : "none",
              background: active ? palette.foreground : "transparent",
              color: active ? "#FFFFFF" : palette.muted,
              fontSize: 13,
              fontWeight: 850,
              cursor: "pointer",
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

function TextOnlySquare({ record }: { record: RecordItem }) {
  return (
    <div
      style={{
        height: "100%",
        background: palette.surfaceSoft,
        padding: 18,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: "0.12em",
          color: palette.muted,
          textTransform: "uppercase",
        }}
      >
        Text Log
      </div>

      <div>
        <div
          style={{
            fontSize: 18,
            lineHeight: 1.14,
            letterSpacing: "-0.055em",
            fontWeight: 900,
            color: palette.foreground,
          }}
        >
          {record.showName}
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 13,
            fontWeight: 650,
            color: palette.muted,
          }}
        >
          {record.title}
        </div>
      </div>
    </div>
  );
}

function SquareTile({
  record,
  soft = false,
  showOverlay = true,
}: {
  record: RecordItem;
  soft?: boolean;
  showOverlay?: boolean;
}) {
  const hasImage = !!record.imageUrl;

  return (
    <article
      style={{
        aspectRatio: "1 / 1",
        borderRadius: soft ? 16 : 0,
        overflow: "hidden",
        background: palette.card,
        border: `1px solid ${palette.border}`,
        position: "relative",
        boxShadow: soft ? "0 8px 24px rgba(33,33,33,0.035)" : "none",
      }}
    >
      {hasImage ? (
        <img
          src={record.imageUrl}
          alt={record.showName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <TextOnlySquare record={record} />
      )}

      {showOverlay && (
        <div
          style={{
            position: "absolute",
            left: 10,
            right: 10,
            bottom: 10,
            borderRadius: soft ? 12 : 0,
            background: "rgba(255,255,255,0.9)",
            border: `1px solid ${palette.border}`,
            padding: "9px 10px",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 850,
              color: palette.foreground,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {record.showName}
          </div>
          <div
            style={{
              marginTop: 2,
              fontSize: 11,
              fontWeight: 650,
              color: palette.muted,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            ♥ {record.likeCount} · {record.artistName}
          </div>
        </div>
      )}
    </article>
  );
}

function ArchiveTile({ record }: { record: RecordItem }) {
  const hasImage = !!record.imageUrl;

  return (
    <article
      style={{
        minHeight: 210,
        border: `1px solid ${palette.border}`,
        background: palette.card,
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 34,
          borderBottom: `1px solid ${palette.border}`,
          background: palette.surfaceSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px",
          fontSize: 10,
          fontWeight: 900,
          color: palette.muted,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <span>LOG</span>
        <span>♥ {record.likeCount}</span>
      </div>

      {hasImage ? (
        <div style={{ height: 116, overflow: "hidden" }}>
          <img
            src={record.imageUrl}
            alt={record.showName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            height: 116,
            background: palette.vanilla,
            padding: 14,
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 17,
              lineHeight: 1.15,
              letterSpacing: "-0.05em",
              fontWeight: 900,
              color: palette.foreground,
            }}
          >
            {record.showName}
          </p>
        </div>
      )}

      <div style={{ padding: 12 }}>
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
          {record.title}
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 12,
            fontWeight: 650,
            color: palette.muted,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {record.artistName}
        </div>
      </div>
    </article>
  );
}

function MasonryTile({
  record,
  large = false,
}: {
  record: RecordItem;
  large?: boolean;
}) {
  const hasImage = !!record.imageUrl;

  return (
    <article
      style={{
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${palette.border}`,
        background: palette.card,
        boxShadow: "0 8px 24px rgba(33,33,33,0.035)",
      }}
    >
      {hasImage ? (
        <div
          style={{
            height: large ? 250 : 168,
            overflow: "hidden",
          }}
        >
          <img
            src={record.imageUrl}
            alt={record.showName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            minHeight: large ? 230 : 168,
            background: palette.surfaceSoft,
            padding: 18,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 22,
                lineHeight: 1.12,
                letterSpacing: "-0.05em",
                fontWeight: 900,
                color: palette.foreground,
              }}
            >
              {record.showName}
            </div>
            <p
              style={{
                margin: "10px 0 0",
                fontSize: 14,
                lineHeight: 1.6,
                color: palette.muted,
              }}
            >
              {record.title}
            </p>
          </div>
        </div>
      )}

      <div style={{ padding: 14 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 850,
            color: palette.foreground,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {record.title}
        </div>
        <div
          style={{
            marginTop: 5,
            fontSize: 12,
            fontWeight: 650,
            color: palette.muted,
          }}
        >
          {record.showName} · ♥ {record.likeCount}
        </div>
      </div>
    </article>
  );
}

function FeaturedTile({ record }: { record: RecordItem }) {
  return (
    <article
      style={{
        gridColumn: "span 2",
        minHeight: 300,
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${palette.border}`,
        background: palette.card,
        display: "grid",
        gridTemplateColumns: "1.25fr 1fr",
        boxShadow: "0 12px 34px rgba(33,33,33,0.045)",
      }}
    >
      <div
        style={{
          background: palette.surfaceSoft,
          overflow: "hidden",
        }}
      >
        {record.imageUrl ? (
          <img
            src={record.imageUrl}
            alt={record.showName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <TextOnlySquare record={record} />
        )}
      </div>

      <div style={{ padding: 24 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 950,
            letterSpacing: "0.16em",
            color: palette.point,
            textTransform: "uppercase",
          }}
        >
          Latest Record
        </div>
        <h3
          style={{
            margin: "12px 0 0",
            fontSize: 30,
            lineHeight: 1.08,
            letterSpacing: "-0.06em",
            color: palette.foreground,
          }}
        >
          {record.showName}
        </h3>
        <p
          style={{
            margin: "9px 0 0",
            fontSize: 14,
            fontWeight: 700,
            color: palette.muted,
          }}
        >
          {record.artistName}
        </p>
        <p
          style={{
            margin: "18px 0 0",
            fontSize: 15,
            lineHeight: 1.7,
            color: palette.foreground,
          }}
        >
          {record.title}
        </p>
      </div>
    </article>
  );
}

function GridInstagram() {
  return (
    <div
      style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 2,
      }}
    >
      {records.map((record) => (
        <SquareTile key={record.id} record={record} showOverlay={false} />
      ))}
    </div>
  );
}

function GridSoftSquare() {
  return (
    <div
      style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 16,
      }}
    >
      {records.map((record) => (
        <SquareTile key={record.id} record={record} soft />
      ))}
    </div>
  );
}

function GridArchiveCard() {
  return (
    <div
      style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 14,
      }}
    >
      {records.map((record) => (
        <ArchiveTile key={record.id} record={record} />
      ))}
    </div>
  );
}

function GridMasonry() {
  const left = records.filter((_, index) => index % 2 === 0);
  const right = records.filter((_, index) => index % 2 === 1);

  return (
    <div
      style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 18,
      }}
    >
      <div style={{ display: "grid", gap: 18 }}>
        {left.map((record, index) => (
          <MasonryTile key={record.id} record={record} large={index === 0} />
        ))}
      </div>
      <div style={{ display: "grid", gap: 18, paddingTop: 34 }}>
        {right.map((record, index) => (
          <MasonryTile key={record.id} record={record} large={index === 1} />
        ))}
      </div>
    </div>
  );
}

function GridMixedFeature() {
  const [first, ...rest] = records;

  return (
    <div
      style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 18,
      }}
    >
      <FeaturedTile record={first} />
      {rest.map((record) => (
        <SquareTile key={record.id} record={record} soft />
      ))}
    </div>
  );
}

function GridTextAware() {
  return (
    <div
      style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 14,
      }}
    >
      {records.map((record, index) => {
        const hasImage = !!record.imageUrl;

        if (!hasImage) {
          return (
            <article
              key={record.id}
              style={{
                aspectRatio: index % 2 === 0 ? "1 / 1.15" : "1 / 1",
                borderRadius: 14,
                border: `1px solid ${palette.border}`,
                background:
                  index % 3 === 0
                    ? palette.vanilla
                    : index % 3 === 1
                      ? palette.alice
                      : palette.surfaceSoft,
                padding: 18,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 950,
                  letterSpacing: "0.14em",
                  color: palette.muted,
                  textTransform: "uppercase",
                }}
              >
                Text Record
              </div>

              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 22,
                    lineHeight: 1.08,
                    letterSpacing: "-0.06em",
                    color: palette.foreground,
                  }}
                >
                  {record.showName}
                </h3>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: palette.muted,
                    fontWeight: 700,
                  }}
                >
                  {record.title}
                </p>
              </div>
            </article>
          );
        }

        return <SquareTile key={record.id} record={record} soft={false} />;
      })}
    </div>
  );
}

function GridByVariant({ variant }: { variant: GridVariant }) {
  if (variant === "softSquare") return <GridSoftSquare />;
  if (variant === "archiveCard") return <GridArchiveCard />;
  if (variant === "masonry") return <GridMasonry />;
  if (variant === "mixedFeature") return <GridMixedFeature />;
  if (variant === "textAware") return <GridTextAware />;

  return <GridInstagram />;
}

function ProfilePageMock({
  variant,
  user,
}: {
  variant: GridVariant;
  user: ProfileUser;
}) {
  return (
    <div
      style={{
        width: 940,
        minHeight: 760,
        border: `1px solid ${palette.border}`,
        background: palette.background,
        padding: 34,
      }}
    >
      <EditorialProfileHeader user={user} />
      <ProfileTabs />
      <GridByVariant variant={variant} />
    </div>
  );
}

export default function MyLogPreviewPage() {
  const [selected, setSelected] = useState<GridVariant>("softSquare");
  const [showMe, setShowMe] = useState(true);

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

          <button
            type="button"
            onClick={() => setShowMe((prev) => !prev)}
            style={{
              marginTop: 8,
              width: 58,
              height: 38,
              border: `1px solid ${palette.border}`,
              background: palette.card,
              color: palette.muted,
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            {showMe ? "ME" : "USER"}
          </button>
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
              Profile Grid Candidate {current.label}
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

          <ProfilePageMock variant={selected} user={showMe ? me : otherUser} />

          <div
            style={{
              marginTop: 28,
              width: 940,
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
              {selected === "instagram" &&
                "A안은 인스타그램 레퍼런스에 가장 가깝습니다. 단, 이미지 없는 기록이 많으면 텍스트 타일 처리가 중요합니다."}
              {selected === "softSquare" &&
                "B안이 가장 추천입니다. 인스타그램 구조는 유지하면서 현재 atFeelog의 부드러운 카드 무드와 잘 맞습니다."}
              {selected === "archiveCard" &&
                "C안은 기록 아카이브 느낌이 강합니다. MyLog라는 이름과 잘 맞지만 인스타그램식 프로필 느낌은 조금 약해집니다."}
              {selected === "masonry" &&
                "D안은 기록 탐색에는 좋지만 프로필 페이지에서는 그리드의 정돈감이 약해질 수 있습니다."}
              {selected === "mixedFeature" &&
                "E안은 대표 기록을 강조하기 좋습니다. 내 프로필 첫 화면이나 포트폴리오 데모에는 인상적입니다."}
              {selected === "textAware" &&
                "F안은 이미지 없는 기록이 많은 서비스에 좋습니다. 다만 색 타일이 많아지면 조금 산만해질 수 있습니다."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

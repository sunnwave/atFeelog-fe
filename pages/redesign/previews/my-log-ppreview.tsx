"use client";

import React, { useState } from "react";

type ProfileVariant =
  | "dashboard"
  | "logbook"
  | "wall"
  | "timeline"
  | "ticketBinder";

type Candidate = {
  id: ProfileVariant;
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
  showName: string;
  artistName: string;
  date: string;
  imageUrl?: string;
  likeCount: number;
  type: "concert" | "exhibit";
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
    id: "dashboard",
    label: "A",
    title: "Archive Dashboard",
    desc: "프로필, 통계, 최근 기록을 대시보드처럼 정리한 구조",
  },
  {
    id: "logbook",
    label: "B",
    title: "Logbook Desk",
    desc: "개인 기록장처럼 차분하게 기록을 모아 보여주는 구조",
  },
  {
    id: "wall",
    label: "C",
    title: "Exhibition Wall",
    desc: "게시물을 전시 벽처럼 배치해 시각적인 기록을 강조하는 구조",
  },
  {
    id: "timeline",
    label: "D",
    title: "Timeline Archive",
    desc: "사용자의 공연/전시 기록을 시간순으로 보여주는 구조",
  },
  {
    id: "ticketBinder",
    label: "E",
    title: "Ticket Binder",
    desc: "티켓과 로그를 바인더처럼 모아둔 구조",
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
    date: "2026.05.12",
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    likeCount: 24,
    type: "concert",
  },
  {
    id: "2",
    title: "전시장을 나와서도 남은 색감",
    showName: "Edward Hopper",
    artistName: "SeMA",
    date: "2026.05.02",
    likeCount: 18,
    type: "exhibit",
  },
  {
    id: "3",
    title: "조명이 꺼지기 직전",
    showName: "The Volunteers Live",
    artistName: "The Volunteers",
    date: "2026.04.28",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
    likeCount: 42,
    type: "concert",
  },
  {
    id: "4",
    title: "조용한 그림 앞에서",
    showName: "MMCA Collection",
    artistName: "국립현대미술관",
    date: "2026.04.16",
    likeCount: 9,
    type: "exhibit",
  },
  {
    id: "5",
    title: "페스티벌에서 가장 좋았던 무대",
    showName: "Grand Mint Festival",
    artistName: "LUCY",
    date: "2026.04.03",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
    likeCount: 31,
    type: "concert",
  },
];

function Avatar({ user, size = 92 }: { user: ProfileUser; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 22,
        background: "#DDEAD3",
        color: "#375631",
        border: "1px solid #BFD4B3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size >= 80 ? 34 : 24,
        fontWeight: 900,
        flexShrink: 0,
      }}
    >
      {user.name[0]}
    </div>
  );
}

function ActionButtons({ user }: { user: ProfileUser }) {
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

function StatsStrip({ user }: { user: ProfileUser }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        borderTop: `1px solid ${palette.border}`,
        borderBottom: `1px solid ${palette.border}`,
      }}
    >
      {[
        ["기록", user.recordsCount],
        ["팔로워", user.followersCount],
        ["팔로잉", user.followingCount],
      ].map(([label, value], index) => (
        <div
          key={label}
          style={{
            padding: "15px 18px",
            borderRight: index !== 2 ? `1px solid ${palette.border}` : "none",
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
  );
}

function EditorialProfileHeader({
  user,
  label = "User Archive",
}: {
  user: ProfileUser;
  label?: string;
}) {
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
          <Avatar user={user} size={96} />
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
                {label}
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

            <ActionButtons user={user} />
          </div>

          <StatsStrip user={user} />

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

function SoftProfileCard({
  user,
  label = "Archive owner",
}: {
  user: ProfileUser;
  label?: string;
}) {
  return (
    <section
      style={{
        border: `1px solid ${palette.border}`,
        borderRadius: 22,
        background: palette.card,
        padding: 28,
        boxShadow: "0 12px 36px rgba(33,33,33,0.045)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "104px 1fr auto",
          gap: 24,
          alignItems: "center",
        }}
      >
        <Avatar user={user} />

        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 950,
              letterSpacing: "0.16em",
              color: palette.point,
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>

          <h2
            style={{
              margin: "8px 0 0",
              fontSize: 36,
              lineHeight: 1,
              letterSpacing: "-0.06em",
              color: palette.foreground,
            }}
          >
            {user.name}
          </h2>

          <p
            style={{
              margin: "8px 0 0",
              color: palette.muted,
              fontSize: 14,
              fontWeight: 750,
            }}
          >
            {user.handle}
          </p>

          <p
            style={{
              margin: "14px 0 0",
              maxWidth: 560,
              color: palette.foreground,
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            {user.bio}
          </p>
        </div>

        <ActionButtons user={user} />
      </div>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}
      >
        {[
          ["기록", user.recordsCount, palette.vanilla],
          ["팔로워", user.followersCount, palette.alice],
          ["팔로잉", user.followingCount, palette.honeydew],
        ].map(([label, value, bg]) => (
          <div
            key={label}
            style={{
              border: `1px solid ${palette.border}`,
              borderRadius: 14,
              background: bg,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 950,
                color: palette.foreground,
                letterSpacing: "-0.05em",
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
    </section>
  );
}

function RecordMiniCard({ record }: { record: RecordItem }) {
  return (
    <article
      style={{
        border: `1px solid ${palette.border}`,
        borderRadius: 16,
        overflow: "hidden",
        background: palette.card,
        boxShadow: "0 8px 24px rgba(33,33,33,0.035)",
      }}
    >
      {record.imageUrl ? (
        <div style={{ height: 132, overflow: "hidden" }}>
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
            height: 132,
            background:
              record.type === "concert" ? palette.vanilla : palette.alice,
            padding: 16,
            display: "flex",
            alignItems: "center",
          }}
        >
          <h4
            style={{
              margin: 0,
              fontSize: 20,
              lineHeight: 1.08,
              letterSpacing: "-0.06em",
              color: palette.foreground,
            }}
          >
            {record.showName}
          </h4>
        </div>
      )}

      <div style={{ padding: 14 }}>
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
            marginTop: 5,
            fontSize: 12,
            fontWeight: 650,
            color: palette.muted,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {record.showName} · ♥ {record.likeCount}
        </div>
      </div>
    </article>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: 24,
          lineHeight: 1,
          letterSpacing: "-0.055em",
          color: palette.foreground,
        }}
      >
        {children}
      </h3>

      <button
        type="button"
        style={{
          border: 0,
          background: "transparent",
          color: palette.muted,
          fontSize: 13,
          fontWeight: 800,
          cursor: "pointer",
        }}
      >
        전체 보기
      </button>
    </div>
  );
}

function DashboardProfile({ user }: { user: ProfileUser }) {
  return (
    <div style={{ display: "grid", gap: 28 }}>
      <SoftProfileCard user={user} label="Archive owner" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 24,
        }}
      >
        <section>
          <SectionTitle>최근 기록</SectionTitle>
          <div style={{ display: "grid", gap: 16 }}>
            {records.slice(0, 3).map((record) => (
              <article
                key={record.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 16,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 16,
                  background: palette.card,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: palette.surfaceSoft,
                    minHeight: 112,
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
                    <div
                      style={{
                        height: "100%",
                        padding: 12,
                        display: "flex",
                        alignItems: "center",
                        fontSize: 17,
                        lineHeight: 1.1,
                        fontWeight: 900,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {record.showName}
                    </div>
                  )}
                </div>

                <div style={{ padding: "16px 16px 16px 0" }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: palette.muted,
                      fontWeight: 700,
                    }}
                  >
                    {record.date} · {record.type}
                  </div>
                  <h4
                    style={{
                      margin: "8px 0 0",
                      fontSize: 21,
                      lineHeight: 1.12,
                      letterSpacing: "-0.05em",
                      color: palette.foreground,
                    }}
                  >
                    {record.showName}
                  </h4>
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: palette.muted,
                      fontWeight: 650,
                    }}
                  >
                    {record.title}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>요약</SectionTitle>

          <div style={{ display: "grid", gap: 14 }}>
            {[
              ["이번 달 기록", "8", palette.vanilla],
              ["공연 기록", "25", palette.alice],
              ["전시 기록", "17", palette.honeydew],
              ["가장 많이 본 기록", "Beautiful Mint Life", palette.card],
            ].map(([label, value, bg], index) => (
              <div
                key={label}
                style={{
                  minHeight: index === 3 ? 110 : 72,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 16,
                  background: bg,
                  padding: 18,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 850,
                    color: palette.muted,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: index === 3 ? 24 : 30,
                    lineHeight: 1,
                    letterSpacing: "-0.06em",
                    fontWeight: 950,
                    color: palette.foreground,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function LogbookProfile({ user }: { user: ProfileUser }) {
  return (
    <div style={{ display: "grid", gap: 28 }}>
      <EditorialProfileHeader user={user} label="Logbook owner" />

      <section
        style={{
          border: `1px solid ${palette.border}`,
          borderRadius: 20,
          background: "#FFFEFA",
          padding: 26,
        }}
      >
        <SectionTitle>Logbook</SectionTitle>

        <div style={{ display: "grid", gap: 20 }}>
          {records.map((record) => (
            <article
              key={record.id}
              style={{
                display: "grid",
                gridTemplateColumns: "90px 1fr",
                gap: 20,
                paddingBottom: 20,
                borderBottom: `1px dashed ${palette.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 850,
                  color: palette.muted,
                }}
              >
                {record.date}
              </div>

              <div>
                <h4
                  style={{
                    margin: 0,
                    fontSize: 26,
                    lineHeight: 1.12,
                    letterSpacing: "-0.06em",
                    color: palette.foreground,
                  }}
                >
                  {record.showName}
                </h4>
                <p
                  style={{
                    margin: "7px 0 0",
                    fontSize: 14,
                    fontWeight: 700,
                    color: palette.muted,
                  }}
                >
                  {record.artistName}
                </p>
                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: 14,
                    lineHeight: 1.75,
                    color: palette.foreground,
                  }}
                >
                  {record.title}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ExhibitionWallProfile({ user }: { user: ProfileUser }) {
  return (
    <div style={{ display: "grid", gap: 30 }}>
      <SoftProfileCard user={user} label="Exhibition archive" />

      <section>
        <SectionTitle>Exhibition Wall</SectionTitle>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr 1fr",
            gap: 18,
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: 18 }}>
            <WallTile record={records[0]} large />
            <WallTile record={records[1]} />
          </div>

          <div style={{ display: "grid", gap: 18, paddingTop: 42 }}>
            <WallTile record={records[2]} />
            <WallTile record={records[3]} large />
          </div>

          <div style={{ display: "grid", gap: 18, paddingTop: 12 }}>
            <WallTile record={records[4]} large />
            <WallTile record={records[0]} />
          </div>
        </div>
      </section>
    </div>
  );
}

function WallTile({
  record,
  large = false,
}: {
  record: RecordItem;
  large?: boolean;
}) {
  return (
    <article
      style={{
        minHeight: large ? 292 : 210,
        border: `1px solid ${palette.border}`,
        borderRadius: 16,
        overflow: "hidden",
        background: palette.card,
        boxShadow: "0 10px 28px rgba(33,33,33,0.04)",
      }}
    >
      {record.imageUrl ? (
        <div style={{ height: large ? 210 : 135, overflow: "hidden" }}>
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
            minHeight: large ? 210 : 135,
            padding: 18,
            background:
              record.type === "concert" ? palette.vanilla : palette.alice,
            display: "flex",
            alignItems: "center",
          }}
        >
          <h4
            style={{
              margin: 0,
              fontSize: large ? 28 : 22,
              lineHeight: 1.08,
              letterSpacing: "-0.06em",
              color: palette.foreground,
            }}
          >
            {record.showName}
          </h4>
        </div>
      )}

      <div style={{ padding: 14 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 850,
            color: palette.foreground,
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
          {record.date} · ♥ {record.likeCount}
        </div>
      </div>
    </article>
  );
}

function TimelineProfile({ user }: { user: ProfileUser }) {
  return (
    <div style={{ display: "grid", gap: 28 }}>
      <EditorialProfileHeader user={user} label="Timeline archive" />

      <section>
        <SectionTitle>Timeline</SectionTitle>

        <div
          style={{
            borderLeft: `1.5px solid ${palette.foreground}`,
            marginLeft: 18,
            paddingLeft: 28,
            display: "grid",
            gap: 22,
          }}
        >
          {records.map((record) => (
            <article
              key={record.id}
              style={{
                position: "relative",
                border: `1px solid ${palette.border}`,
                borderRadius: 16,
                background: palette.card,
                padding: 18,
                display: "grid",
                gridTemplateColumns: record.imageUrl ? "120px 1fr" : "1fr",
                gap: 18,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: -36,
                  top: 24,
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: palette.point,
                  border: `3px solid ${palette.background}`,
                }}
              />

              {record.imageUrl && (
                <div
                  style={{
                    height: 110,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: palette.surfaceSoft,
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
              )}

              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 850,
                    color: palette.muted,
                  }}
                >
                  {record.date}
                </div>
                <h4
                  style={{
                    margin: "8px 0 0",
                    fontSize: 24,
                    lineHeight: 1.12,
                    letterSpacing: "-0.06em",
                    color: palette.foreground,
                  }}
                >
                  {record.showName}
                </h4>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 14,
                    color: palette.muted,
                    fontWeight: 700,
                  }}
                >
                  {record.artistName}
                </p>
                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: palette.foreground,
                  }}
                >
                  {record.title}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function TicketBinderProfile({ user }: { user: ProfileUser }) {
  return (
    <div style={{ display: "grid", gap: 28 }}>
      <EditorialProfileHeader user={user} label="Ticket binder" />

      <section
        style={{
          border: `1px solid ${palette.border}`,
          borderRadius: 20,
          background: palette.card,
          padding: 22,
        }}
      >
        <SectionTitle>Ticket Binder</SectionTitle>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          {records.map((record) => (
            <article
              key={record.id}
              style={{
                minHeight: 148,
                border: `1.5px solid ${palette.foreground}`,
                background: palette.card,
                display: "grid",
                gridTemplateColumns: "54px 1fr",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  borderRight: `1px dashed ${palette.foreground}`,
                  background:
                    record.type === "concert" ? palette.vanilla : palette.alice,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: 10,
                  fontWeight: 950,
                  letterSpacing: "0.16em",
                  color: palette.foreground,
                  textTransform: "uppercase",
                }}
              >
                {record.type}
              </div>

              <div style={{ padding: 16 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 850,
                    color: palette.muted,
                  }}
                >
                  {record.date}
                </div>
                <h4
                  style={{
                    margin: "8px 0 0",
                    fontSize: 21,
                    lineHeight: 1.1,
                    letterSpacing: "-0.06em",
                    color: palette.foreground,
                  }}
                >
                  {record.showName}
                </h4>
                <p
                  style={{
                    margin: "7px 0 0",
                    fontSize: 13,
                    fontWeight: 700,
                    color: palette.muted,
                  }}
                >
                  {record.artistName}
                </p>
                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: palette.foreground,
                  }}
                >
                  {record.title}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProfileByVariant({
  variant,
  user,
}: {
  variant: ProfileVariant;
  user: ProfileUser;
}) {
  if (variant === "logbook") return <LogbookProfile user={user} />;
  if (variant === "wall") return <ExhibitionWallProfile user={user} />;
  if (variant === "timeline") return <TimelineProfile user={user} />;
  if (variant === "ticketBinder") return <TicketBinderProfile user={user} />;

  return <DashboardProfile user={user} />;
}

export default function ProfileConceptPreviewPage() {
  const [selected, setSelected] = useState<ProfileVariant>("dashboard");
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
              Profile Concept {current.label}
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

          <div
            style={{
              width: 940,
              minHeight: 760,
              border: `1px solid ${palette.border}`,
              background: palette.background,
              padding: 34,
            }}
          >
            <ProfileByVariant
              variant={selected}
              user={showMe ? me : otherUser}
            />
          </div>

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
              {selected === "dashboard" &&
                "A안이 가장 서비스형 프로필 페이지에 가깝습니다. 내 프로필과 타 유저 프로필 모두에 무난하고, 통계/최근 기록을 함께 보여주기 좋습니다."}
              {selected === "logbook" &&
                "B안은 atFeelog의 기록장 감성이 가장 잘 살아납니다. 이미지보다 텍스트 기록을 중요하게 보여주고 싶다면 좋습니다."}
              {selected === "wall" &&
                "C안은 가장 시각적으로 인상적입니다. 이미지가 있는 게시물이 많을수록 좋아 보이지만, 텍스트-only 기록은 보완이 필요합니다."}
              {selected === "timeline" &&
                "D안은 사용자의 기록 흐름을 보여주기에 좋습니다. 공연/전시를 시간순으로 아카이빙하는 서비스 컨셉과 잘 맞습니다."}
              {selected === "ticketBinder" &&
                "E안은 컨셉이 가장 강합니다. 티켓/아카이브 정체성은 좋지만 전체 페이지에 적용하면 조금 과할 수 있습니다."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

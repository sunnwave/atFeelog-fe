"use client";

import React, { useState } from "react";

type HeaderVariant =
  | "editorial"
  | "soft"
  | "compact"
  | "ticket"
  | "poster"
  | "minimal";

type Candidate = {
  id: HeaderVariant;
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
    id: "editorial",
    label: "A",
    title: "Editorial Split",
    desc: "현재 SideNav와 가장 잘 이어지는 선 중심 프로필 헤더",
  },
  {
    id: "soft",
    label: "B",
    title: "Soft Archive Card",
    desc: "각진 사이드바를 부드럽게 중화하는 카드형 프로필 헤더",
  },
  {
    id: "compact",
    label: "C",
    title: "Compact Profile Bar",
    desc: "정보를 가로로 정리한 간결한 헤더",
  },
  {
    id: "ticket",
    label: "D",
    title: "Ticket Header",
    desc: "공연/전시 아카이브 컨셉을 강하게 보여주는 헤더",
  },
  {
    id: "poster",
    label: "E",
    title: "Poster Profile",
    desc: "포스터/에디토리얼 무드가 강한 시각적 헤더",
  },
  {
    id: "minimal",
    label: "F",
    title: "Minimal Line",
    desc: "가장 조용하고 콘텐츠를 방해하지 않는 헤더",
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

function Avatar({
  user,
  size = 92,
  radius = 22,
}: {
  user: ProfileUser;
  size?: number;
  radius?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: "#DDEAD3",
        color: "#375631",
        border: "1px solid #BFD4B3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size >= 80 ? 34 : 22,
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
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
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
    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
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

function StatItem({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: number;
  align?: "left" | "center";
}) {
  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          fontSize: 24,
          fontWeight: 950,
          lineHeight: 1,
          letterSpacing: "-0.05em",
          color: palette.foreground,
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 5,
          fontSize: 12,
          fontWeight: 750,
          color: palette.muted,
        }}
      >
        {label}
      </div>
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
          <StatItem label={String(label)} value={Number(value)} />
        </div>
      ))}
    </div>
  );
}

function HeaderEditorial({ user }: { user: ProfileUser }) {
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
          <Avatar user={user} size={96} radius={22} />
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
                {user.isMe ? "My Archive" : "User Archive"}
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

function HeaderSoft({ user }: { user: ProfileUser }) {
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
        <Avatar user={user} size={92} radius={22} />

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
            {user.isMe ? "My Log" : "User Log"}
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
            <StatItem label={String(label)} value={Number(value)} />
          </div>
        ))}
      </div>
    </section>
  );
}

function HeaderCompact({ user }: { user: ProfileUser }) {
  return (
    <section
      style={{
        border: `1px solid ${palette.border}`,
        background: palette.card,
        borderRadius: 16,
        padding: 20,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "72px 1fr auto",
          gap: 18,
          alignItems: "center",
        }}
      >
        <Avatar user={user} size={72} radius={18} />

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 30,
                lineHeight: 1,
                letterSpacing: "-0.06em",
                color: palette.foreground,
              }}
            >
              {user.name}
            </h2>

            <span
              style={{
                fontSize: 13,
                fontWeight: 750,
                color: palette.muted,
              }}
            >
              {user.handle}
            </span>
          </div>

          <p
            style={{
              margin: "10px 0 0",
              maxWidth: 560,
              fontSize: 14,
              lineHeight: 1.65,
              color: palette.foreground,
            }}
          >
            {user.bio}
          </p>

          <div
            style={{
              marginTop: 14,
              display: "flex",
              gap: 22,
            }}
          >
            <StatItem label="기록" value={user.recordsCount} />
            <StatItem label="팔로워" value={user.followersCount} />
            <StatItem label="팔로잉" value={user.followingCount} />
          </div>
        </div>

        <ActionButtons user={user} />
      </div>
    </section>
  );
}

function HeaderTicket({ user }: { user: ProfileUser }) {
  return (
    <section
      style={{
        border: `1.5px solid ${palette.foreground}`,
        background: palette.card,
        display: "grid",
        gridTemplateColumns: "64px 1fr",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          borderRight: `1px dashed ${palette.foreground}`,
          background: palette.vanilla,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: 11,
          fontWeight: 950,
          letterSpacing: "0.18em",
          color: palette.foreground,
          textTransform: "uppercase",
        }}
      >
        {user.isMe ? "MY LOG" : "USER LOG"}
      </div>

      <div style={{ padding: 24 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "92px 1fr auto",
            gap: 22,
            alignItems: "center",
          }}
        >
          <Avatar user={user} size={88} radius={20} />

          <div>
            <h2
              style={{
                margin: 0,
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

            <p
              style={{
                margin: "14px 0 0",
                maxWidth: 560,
                fontSize: 14,
                lineHeight: 1.65,
                color: palette.foreground,
              }}
            >
              {user.bio}
            </p>
          </div>

          <ActionButtons user={user} />
        </div>

        <div
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: `1px dashed ${palette.foreground}`,
            paddingTop: 18,
          }}
        >
          <StatItem label="기록" value={user.recordsCount} />
          <StatItem label="팔로워" value={user.followersCount} />
          <StatItem label="팔로잉" value={user.followingCount} />
        </div>
      </div>
    </section>
  );
}

function HeaderPoster({ user }: { user: ProfileUser }) {
  return (
    <section
      style={{
        border: `1.5px solid ${palette.foreground}`,
        background: palette.foreground,
        color: "#FFFFFF",
        padding: 26,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "100px 1fr auto",
          gap: 24,
          alignItems: "center",
        }}
      >
        <Avatar user={user} size={92} radius={8} />

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
            Archive Profile
          </div>

          <h2
            style={{
              margin: "8px 0 0",
              fontSize: 46,
              lineHeight: 0.95,
              letterSpacing: "-0.08em",
              color: "#FFFFFF",
            }}
          >
            {user.name}
          </h2>

          <p
            style={{
              margin: "9px 0 0",
              fontSize: 14,
              fontWeight: 800,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {user.handle}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 8,
            justifyItems: "end",
          }}
        >
          <ActionButtons user={user} />
        </div>
      </div>

      <p
        style={{
          margin: "22px 0 0",
          maxWidth: 660,
          fontSize: 15,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.82)",
        }}
      >
        {user.bio}
      </p>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: "1px solid rgba(255,255,255,0.18)",
          borderBottom: "1px solid rgba(255,255,255,0.18)",
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
              padding: "16px 18px",
              borderRight:
                index !== 2 ? "1px solid rgba(255,255,255,0.18)" : "none",
            }}
          >
            <div
              style={{
                fontSize: 26,
                fontWeight: 950,
                color: "#FFFFFF",
                letterSpacing: "-0.05em",
              }}
            >
              {value}
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 12,
                fontWeight: 750,
                color: "rgba(255,255,255,0.58)",
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

function HeaderMinimal({ user }: { user: ProfileUser }) {
  return (
    <section
      style={{
        paddingBottom: 28,
        borderBottom: `1px solid ${palette.border}`,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "84px 1fr auto",
          gap: 24,
          alignItems: "center",
        }}
      >
        <Avatar user={user} size={84} radius={20} />

        <div>
          <h2
            style={{
              margin: 0,
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
              maxWidth: 620,
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
          display: "flex",
          gap: 30,
        }}
      >
        <StatItem label="기록" value={user.recordsCount} />
        <StatItem label="팔로워" value={user.followersCount} />
        <StatItem label="팔로잉" value={user.followingCount} />
      </div>
    </section>
  );
}

function HeaderByVariant({
  variant,
  user,
}: {
  variant: HeaderVariant;
  user: ProfileUser;
}) {
  if (variant === "soft") return <HeaderSoft user={user} />;
  if (variant === "compact") return <HeaderCompact user={user} />;
  if (variant === "ticket") return <HeaderTicket user={user} />;
  if (variant === "poster") return <HeaderPoster user={user} />;
  if (variant === "minimal") return <HeaderMinimal user={user} />;

  return <HeaderEditorial user={user} />;
}

export default function ProfileHeaderPreviewPage() {
  const [selected, setSelected] = useState<HeaderVariant>("editorial");
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
              Profile Header {current.label}
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
              width: 920,
              border: `1px solid ${palette.border}`,
              background: palette.background,
              padding: 34,
            }}
          >
            <HeaderByVariant
              variant={selected}
              user={showMe ? me : otherUser}
            />
          </div>

          <div
            style={{
              marginTop: 28,
              width: 920,
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
              {selected === "editorial" &&
                "A안은 현재 SideNav와 가장 잘 이어집니다. 프로필 페이지가 구조적으로 단단해 보이고, 내 프로필/타 유저 프로필 모두 자연스럽습니다."}
              {selected === "soft" &&
                "B안은 가장 무난하고 부드럽습니다. 아래 게시물 영역을 조금 각지게 가도 전체 밸런스가 좋습니다."}
              {selected === "compact" &&
                "C안은 정보가 많은 페이지에서 좋습니다. 헤더가 작아서 게시물 영역이 더 많이 보입니다."}
              {selected === "ticket" &&
                "D안은 컨셉이 가장 직접적입니다. 다만 아래 게시물까지 티켓형으로 가면 과해질 수 있습니다."}
              {selected === "poster" &&
                "E안은 시각적 임팩트가 강합니다. 포트폴리오 데모용으론 좋지만 실사용 화면으로는 조금 무거울 수 있습니다."}
              {selected === "minimal" &&
                "F안은 가장 조용합니다. 기록 카드나 그리드가 강할 때 헤더를 덜어내는 용도로 좋습니다."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

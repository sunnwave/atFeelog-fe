import React from "react";

const palette = {
  aliceBlue: "#D8E9F0",
  honeydew: "#CFDECA",
  vanilla: "#EFF0A3",
  eireBlack: "#212121",
  ghostWhite: "#F6F5FA",
  coralPoint: "#FF5C34",
  white: "#FFFFFF",
  softBorder: "#D8D8CF",
  muted: "#6F706A",
};

const records = [
  {
    category: "LIVE",
    title: "SE SO NEON Live",
    artist: "새소년",
    place: "Blue Square",
    date: "2026.05.12",
    no: "0512",
    preview:
      "공연장의 조명과 기타 사운드가 오래 남았던 밤. 마지막 곡에서 분위기가 완전히 바뀌었다.",
    likes: 24,
    comments: 6,
    color: "#EFF0A3",
    hasImage: true,
    imageTone: "blue",
  },
  {
    category: "EXHIBIT",
    title: "작은 전시의 기록",
    artist: "Gallery Visit",
    place: "SeMA",
    date: "2026.04.28",
    no: "0428",
    preview: "조용한 공간에서 작품을 따라 걷다 보니 생각보다 오래 머물게 됐다.",
    likes: 12,
    comments: 3,
    color: "#D8E9F0",
    hasImage: false,
    imageTone: "sage",
  },
  {
    category: "LIVE",
    title: "Festival Night",
    artist: "Various Artists",
    place: "Olympic Park",
    date: "2026.04.02",
    no: "0402",
    preview:
      "오랜만에 야외에서 본 공연. 해가 지고 조명이 켜지는 순간부터 분위기가 완전히 달라졌다.",
    likes: 31,
    comments: 8,
    color: "#CFDECA",
    hasImage: true,
    imageTone: "vanilla",
  },
  {
    category: "EXHIBIT",
    title: "Poster Room",
    artist: "Design Archive",
    place: "Archive Hall",
    date: "2026.03.18",
    no: "0318",
    preview:
      "포스터와 타이포그래피가 인상 깊었던 전시. 여백을 쓰는 방식이 기억에 남았다.",
    likes: 18,
    comments: 2,
    color: "#D8E9F0",
    hasImage: true,
    imageTone: "sage",
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#D8D8CF] bg-[#F6F5FA]/88 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-5 py-4 lg:px-8">
        <div className="flex items-end gap-3">
          <p className="text-2xl font-black tracking-[-0.08em] text-[#212121]">
            atFeelog
          </p>
          <p className="hidden text-[10px] font-bold uppercase leading-none tracking-[0.16em] text-[#6F706A] md:block">
            Web Feed
            <br />
            Ticket Archive
          </p>
        </div>

        <nav className="hidden justify-self-center overflow-hidden rounded-xl border border-[#212121] bg-white text-xs font-black uppercase tracking-[0.14em] text-[#212121] md:flex">
          <button className="bg-[#212121] px-5 py-2.5 text-white">Feed</button>
          <button className="border-l border-[#212121] px-5 py-2.5">
            Records
          </button>
          <button className="border-l border-[#212121] px-5 py-2.5">
            Archive
          </button>
          <button className="border-l border-[#212121] px-5 py-2.5">
            My Page
          </button>
        </nav>

        <button className="rounded-xl border border-[#212121] bg-[#EFF0A3] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#212121]">
          Write
        </button>
      </div>
    </header>
  );
}

function MockImage({ tone }: { tone: string }) {
  const bg =
    tone === "blue"
      ? "from-[#D8E9F0] via-[#F6F5FA] to-[#CFDECA]"
      : tone === "vanilla"
        ? "from-[#EFF0A3] via-[#F6F5FA] to-[#D8E9F0]"
        : "from-[#CFDECA] via-[#F6F5FA] to-[#D8E9F0]";

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-[16px] border border-[#D8D8CF] bg-gradient-to-br ${bg}`}
    >
      <div className="absolute left-6 top-6 h-12 w-12 rounded-full bg-white/40" />
      <div className="absolute bottom-8 left-8 h-24 w-16 rotate-6 rounded-t-full bg-[#212121]/10" />
      <div className="absolute bottom-10 left-1/2 h-32 w-20 -translate-x-1/2 -rotate-3 rounded-t-full bg-[#212121]/12" />
      <div className="absolute bottom-7 right-10 h-20 w-14 rotate-3 rounded-t-full bg-[#212121]/10" />
      <div className="absolute bottom-0 left-0 h-16 w-full bg-white/25" />
    </div>
  );
}

function TextOnlyVisual({ record }: { record: (typeof records)[number] }) {
  return (
    <div className="flex aspect-[4/3] flex-col justify-between rounded-[16px] border border-[#D8D8CF] bg-[#F6F5FA] p-5">
      <div className="flex items-center justify-between border-b border-[#212121] pb-3">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#212121]/55">
          Text Note
        </span>
        <span className="text-xs font-black text-[#212121]/55">
          No. {record.no}
        </span>
      </div>
      <div>
        <p className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-[#212121]">
          No
          <br />
          Image
        </p>
        <p className="mt-4 max-w-[220px] text-sm leading-6 text-[#6F706A]">
          이미지가 없는 기록은 포스터형 텍스트 카드로 대체합니다.
        </p>
      </div>
      <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-[#D8D8CF]">
        <div className="h-8 border-r border-[#D8D8CF] bg-[#D8E9F0]" />
        <div className="h-8 border-r border-[#D8D8CF] bg-[#CFDECA]" />
        <div className="h-8 bg-[#EFF0A3]" />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="grid gap-5 xl:grid-cols-[1.45fr_0.55fr]">
      <div className="relative overflow-hidden rounded-[22px] border border-[#D8D8CF] bg-white p-6 shadow-[0_18px_48px_rgba(33,33,33,0.045)] lg:p-10">
        <div className="absolute -right-14 -top-14 h-44 w-44 rounded-[28px] bg-[#EFF0A3] opacity-90" />
        <div className="absolute right-32 bottom-14 h-16 w-16 rounded-[18px] bg-[#FF5C34] opacity-90" />
        <div className="absolute bottom-0 left-1/2 h-28 w-64 rounded-t-[32px] bg-[#D8E9F0] opacity-75" />

        <div className="relative z-10 max-w-4xl">
          <div className="mb-8 flex items-center justify-between border-b border-[#212121] pb-3 text-xs font-black uppercase tracking-[0.16em] text-[#212121]">
            <span>Desktop Feed / Personal Archive</span>
            <span>2026</span>
          </div>
          <h1 className="text-[56px] font-black uppercase leading-[0.9] tracking-[-0.085em] text-[#212121] md:text-[88px] xl:text-[112px]">
            Record
            <br />
            the Scene
          </h1>
          <p className="mt-7 max-w-2xl border-l-2 border-[#212121] pl-4 text-sm leading-7 text-[#6F706A]">
            웹에서는 이미지 피드를 넓은 그리드로 보여주고, 오른쪽에는 필터와
            월간 요약을 배치합니다. 티켓 디자인은 마이페이지 아카이브에서 더
            강하게 사용합니다.
          </p>
          <div className="mt-8 inline-flex flex-wrap overflow-hidden rounded-xl border border-[#212121] text-sm font-black uppercase tracking-[0.12em]">
            <button className="bg-[#212121] px-5 py-3 text-white">
              Start Record
            </button>
            <button className="border-l border-[#212121] bg-[#EFF0A3] px-5 py-3 text-[#212121]">
              Explore Feed
            </button>
          </div>
        </div>
      </div>

      <aside className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
        <div className="rounded-[22px] border border-[#D8D8CF] bg-[#EFF0A3] p-6 shadow-[0_14px_36px_rgba(33,33,33,0.035)]">
          <p className="border-b border-[#212121] pb-2 text-xs font-black uppercase tracking-[0.18em] text-[#212121]/65">
            This Month
          </p>
          <p className="mt-8 text-7xl font-black tracking-[-0.08em] text-[#212121]">
            08
          </p>
          <p className="mt-2 text-sm font-bold text-[#212121]/65">
            개의 기록을 남겼어요
          </p>
        </div>
        <div className="rounded-[18px] border border-[#D8D8CF] bg-[#D8E9F0] p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#212121]/55">
            Images
          </p>
          <p className="mt-7 text-5xl font-black tracking-[-0.07em]">6</p>
          <p className="mt-2 text-xs font-bold text-[#6F706A]">
            이미지 포함 기록
          </p>
        </div>
        <div className="rounded-[18px] border border-[#D8D8CF] bg-[#CFDECA] p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#212121]/55">
            Tickets
          </p>
          <p className="mt-7 text-5xl font-black tracking-[-0.07em]">12</p>
          <p className="mt-2 text-xs font-bold text-[#6F706A]">아카이브 티켓</p>
        </div>
      </aside>
    </section>
  );
}

function FeedPostCard({
  record,
  featured = false,
}: {
  record: (typeof records)[number];
  featured?: boolean;
}) {
  return (
    <article
      className={`overflow-hidden rounded-[22px] border border-[#D8D8CF] bg-white shadow-[0_14px_36px_rgba(33,33,33,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(33,33,33,0.075)] ${featured ? "lg:col-span-2" : ""}`}
    >
      <div className="p-4">
        {record.hasImage ? (
          <MockImage tone={record.imageTone} />
        ) : (
          <TextOnlyVisual record={record} />
        )}
      </div>

      <div className="border-t border-[#D8D8CF] p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.12em]">
          <span
            className="rounded-md border border-[#212121] px-3 py-1"
            style={{ backgroundColor: record.color }}
          >
            {record.category}
          </span>
          <span className="rounded-md border border-[#D8D8CF] bg-[#F6F5FA] px-3 py-1 text-[#6F706A]">
            {record.date}
          </span>
        </div>
        <h3
          className={`${featured ? "text-4xl" : "text-2xl"} font-black uppercase leading-[0.95] tracking-[-0.055em] text-[#212121]`}
        >
          {record.title}
        </h3>
        <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[#212121]/60">
          {record.artist} / {record.place}
        </p>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#6F706A]">
          {record.preview}
        </p>
      </div>

      <div className="grid grid-cols-3 border-t border-[#D8D8CF] text-center text-xs font-black uppercase tracking-[0.12em]">
        <div className="border-r border-[#D8D8CF] p-3">
          <p className="text-[#6F706A]">Like</p>
          <p className="mt-1 text-xl tracking-[-0.05em] text-[#FF5C34]">
            {record.likes}
          </p>
        </div>
        <div className="border-r border-[#D8D8CF] p-3">
          <p className="text-[#6F706A]">Reply</p>
          <p className="mt-1 text-xl tracking-[-0.05em]">{record.comments}</p>
        </div>
        <button className="bg-[#212121] p-3 text-white transition hover:bg-[#FF5C34]">
          Open
        </button>
      </div>
    </article>
  );
}

function SidebarFilter() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 space-y-4">
        <section className="rounded-[22px] border border-[#D8D8CF] bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6F706A]">
            Filter
          </p>
          <div className="mt-5 grid gap-2 text-xs font-black uppercase tracking-[0.12em]">
            <button className="rounded-lg border border-[#212121] bg-[#212121] px-3 py-2 text-left text-white">
              All Records
            </button>
            <button className="rounded-lg border border-[#D8D8CF] bg-[#EFF0A3] px-3 py-2 text-left">
              Live
            </button>
            <button className="rounded-lg border border-[#D8D8CF] bg-[#D8E9F0] px-3 py-2 text-left">
              Exhibit
            </button>
            <button className="rounded-lg border border-[#D8D8CF] bg-[#CFDECA] px-3 py-2 text-left">
              Image Only
            </button>
            <button className="rounded-lg border border-[#D8D8CF] bg-[#F6F5FA] px-3 py-2 text-left">
              Text Note
            </button>
          </div>
        </section>

        <section className="rounded-[22px] border border-[#D8D8CF] bg-[#212121] p-5 text-white shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
            Quick Write
          </p>
          <h3 className="mt-4 text-3xl font-black uppercase leading-[0.92] tracking-[-0.07em]">
            Add New
            <br />
            Scene
          </h3>
          <button className="mt-6 rounded-lg bg-[#EFF0A3] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#212121]">
            Write Record
          </button>
        </section>
      </div>
    </aside>
  );
}

function WebFeedSection() {
  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_260px]">
      <div className="rounded-[24px] border border-[#D8D8CF] bg-white/78 p-5 shadow-sm backdrop-blur sm:p-7">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#212121] pb-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#6F706A]">
              Public Feed
            </p>
            <h2 className="mt-2 text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-[#212121]">
              Image
              <br />
              First Feed
            </h2>
          </div>
          <div className="flex overflow-hidden rounded-xl border border-[#212121] text-xs font-black uppercase tracking-[0.16em] xl:hidden">
            <button className="bg-[#212121] px-5 py-3 text-white">All</button>
            <button className="border-l border-[#212121] px-5 py-3">
              Live
            </button>
            <button className="border-l border-[#212121] px-5 py-3">
              Exhibit
            </button>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {records.map((record, index) => (
            <FeedPostCard
              key={record.title}
              record={record}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
      <SidebarFilter />
    </section>
  );
}

function ArchiveTicket({ record }: { record: (typeof records)[number] }) {
  return (
    <article className="relative overflow-hidden rounded-[16px] border border-[#212121] bg-white">
      <div className="absolute right-[78px] top-0 h-full border-l border-dashed border-[#212121]/35" />
      <div className="grid grid-cols-[1fr_78px]">
        <div className="p-4">
          <div className="mb-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em]">
            <span className="rounded bg-[#EFF0A3] px-2 py-1">
              {record.category}
            </span>
            <span className="text-[#6F706A]">{record.date}</span>
          </div>
          <h3 className="text-xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-[#212121]">
            {record.title}
          </h3>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-[#6F706A]">
            {record.artist}
          </p>
          <p className="mt-5 text-xs font-bold text-[#6F706A]">
            ⌖ {record.place}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#F6F5FA] text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#6F706A]">
            No
          </p>
          <p className="mt-2 rotate-90 text-2xl font-black tracking-[-0.08em] text-[#212121]">
            {record.no}
          </p>
        </div>
      </div>
    </article>
  );
}

function WebArchiveSection() {
  return (
    <section className="grid gap-5 lg:grid-cols-[340px_1fr]">
      <div className="rounded-[24px] border border-[#D8D8CF] bg-[#D8E9F0] p-6 shadow-sm lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#212121]/55">
          My Page
        </p>
        <h2 className="mt-2 text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-[#212121]">
          Ticket
          <br />
          Archive
        </h2>
        <p className="mt-6 text-sm leading-7 text-[#212121]/65">
          웹 마이페이지에서는 좌측에 월간 요약, 우측에 티켓 그리드를 배치하면
          아카이브 느낌이 잘 살아납니다.
        </p>
        <div className="mt-8 grid grid-cols-3 overflow-hidden rounded-2xl border border-[#212121]">
          <div className="h-20 border-r border-[#212121] bg-[#EFF0A3]" />
          <div className="h-20 border-r border-[#212121] bg-[#CFDECA]" />
          <div className="h-20 bg-white" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {records.map((record) => (
          <ArchiveTicket key={record.title} record={record} />
        ))}
      </div>
    </section>
  );
}

function DetailPreview() {
  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
      <div className="rounded-[24px] border border-[#D8D8CF] bg-white p-4 shadow-sm">
        <MockImage tone="blue" />
      </div>

      <div className="rounded-[24px] border border-[#D8D8CF] bg-white p-6 shadow-sm lg:p-8">
        <div className="mb-6 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em]">
          <span className="rounded-md border border-[#212121] bg-[#FF5C34] px-3 py-1 text-white">
            #live
          </span>
          <span className="rounded-md border border-[#212121] bg-[#EFF0A3] px-3 py-1">
            #concert
          </span>
          <span className="rounded-md border border-[#D8D8CF] bg-[#F6F5FA] px-3 py-1 text-[#6F706A]">
            #archive
          </span>
        </div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#6F706A]">
          Record Detail
        </p>
        <h3 className="mt-3 max-w-xl text-4xl font-black uppercase leading-[0.96] tracking-[-0.07em] text-[#212121]">
          Image + Note + Ticket Info
        </h3>
        <p className="mt-6 max-w-2xl text-sm leading-8 text-[#6F706A]">
          웹 상세에서는 이미지를 왼쪽 또는 상단에 크게 두고, 감상문과 공연
          정보를 오른쪽 패널로 정리하면 화면이 안정적입니다.
        </p>
        <div className="mt-8 overflow-hidden rounded-xl border border-[#212121] text-sm font-black uppercase tracking-[0.12em]">
          <div className="grid grid-cols-[112px_1fr] border-b border-[#212121]">
            <span className="border-r border-[#212121] bg-[#F6F5FA] p-3 text-[#6F706A]">
              Date
            </span>
            <span className="p-3">2026.05.12</span>
          </div>
          <div className="grid grid-cols-[112px_1fr]">
            <span className="border-r border-[#212121] bg-[#F6F5FA] p-3 text-[#6F706A]">
              Place
            </span>
            <span className="p-3">Blue Square</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WebRules() {
  return (
    <section className="rounded-[24px] border border-[#D8D8CF] bg-white p-6 shadow-sm lg:p-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#6F706A]">
        Responsive Strategy
      </p>
      <h2 className="mt-2 text-4xl font-black uppercase leading-[0.95] tracking-[-0.075em] text-[#212121]">
        Web Layout
        <br />
        Rules
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[18px] border border-[#D8D8CF] bg-[#F6F5FA] p-5">
          <p className="text-xl font-black tracking-[-0.05em]">Desktop Feed</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6F706A]">
            3-column grid
          </p>
          <p className="mt-4 text-sm leading-6 text-[#6F706A]">
            첫 카드만 크게 보여서 피드에 리듬감 주기
          </p>
        </div>
        <div className="rounded-[18px] border border-[#D8D8CF] bg-[#D8E9F0] p-5">
          <p className="text-xl font-black tracking-[-0.05em]">Right Sidebar</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6F706A]">
            filter / write
          </p>
          <p className="mt-4 text-sm leading-6 text-[#6F706A]">
            데스크톱에서만 필터와 작성 CTA 노출
          </p>
        </div>
        <div className="rounded-[18px] border border-[#D8D8CF] bg-[#CFDECA] p-5">
          <p className="text-xl font-black tracking-[-0.05em]">Archive</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6F706A]">
            ticket grid
          </p>
          <p className="mt-4 text-sm leading-6 text-[#6F706A]">
            마이페이지에서만 티켓 컨셉을 강하게 사용
          </p>
        </div>
        <div className="rounded-[18px] border border-[#D8D8CF] bg-[#EFF0A3] p-5">
          <p className="text-xl font-black tracking-[-0.05em]">Mobile</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6F706A]">
            1-column feed
          </p>
          <p className="mt-4 text-sm leading-6 text-[#6F706A]">
            모바일에서는 사이드바 제거, 카드 한 장씩 집중
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AtFeelogWebResponsivePreview() {
  return (
    <main className="min-h-screen bg-[#F6F5FA] text-[#212121]">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-5 py-5 lg:px-8">
        <Hero />
        <WebFeedSection />
        <WebArchiveSection />
        <DetailPreview />
        <WebRules />
      </div>
    </main>
  );
}

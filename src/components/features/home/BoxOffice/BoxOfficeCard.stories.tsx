import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BoxOfficeCard from "./BoxOfficeCard";
import type { BoxOffice } from "@/shared/types/performance";

const meta: Meta<typeof BoxOfficeCard> = {
  title: "features/home/BoxOfficeCard",
  component: BoxOfficeCard,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof BoxOfficeCard>;

const base: BoxOffice = {
  rank: 1,
  mt20id: "PF220846",
  title: "지킬앤하이드",
  venueName: "블루스퀘어 신한카드홀",
  posterUrl: "https://www.kopis.or.kr/upload/pfmPoster/PF_PF220846_230103_134742.gif",
  genre: "뮤지컬",
  period: "2024.12.06 ~ 2025.03.30",
  area: "서울",
};

export const WithPoster: Story = {
  name: "포스터 있음",
  args: { item: base },
};

export const NoPoster: Story = {
  name: "포스터 없음",
  args: { item: { ...base, rank: 2, posterUrl: "" } },
};

export const LongTitle: Story = {
  name: "긴 제목 (2줄 말줄임)",
  args: {
    item: {
      ...base,
      rank: 3,
      title: "노트르담 드 파리 — 2025 내한공연 특별판",
      posterUrl: "",
    },
  },
};

export const AllRanks: Story = {
  name: "순위 1~10 (리스트 형태)",
  parameters: { layout: "fullscreen" },
  render: () => {
    const GENRES = ["뮤지컬", "연극", "클래식", "대중음악", "뮤지컬", "무용", "연극", "뮤지컬", "클래식", "대중음악"];
    const TITLES = [
      "지킬앤하이드", "레미제라블", "오페라의 유령", "아이유 콘서트 HEREH",
      "베르테르", "호두까기 인형", "햄릿", "마타하리", "4대 협주곡의 밤", "BTS World Tour",
    ];
    const items: BoxOffice[] = Array.from({ length: 10 }, (_, i) => ({
      rank: i + 1,
      mt20id: `PF00000${i}`,
      title: TITLES[i],
      venueName: "예술의전당 오페라극장",
      posterUrl: i === 0 ? base.posterUrl : "",
      genre: GENRES[i],
      period: "2025.01.01 ~ 2025.06.30",
      area: i % 2 === 0 ? "서울" : "경기",
    }));

    return (
      <div className="bg-background p-8">
        <div className="w-full overflow-x-auto">
          <div className="flex flex-nowrap border-l-[1.5px] border-foreground">
            {items.map((item) => (
              <BoxOfficeCard key={item.mt20id} item={item} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

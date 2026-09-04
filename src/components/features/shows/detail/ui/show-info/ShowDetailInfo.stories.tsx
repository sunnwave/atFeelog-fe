import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import type { PerformanceDetail } from "@/shared/types/performance";
import ShowDetailInfo from "./ShowDetailInfo";

// ─── Mock ──────────────────────────────────────────────────────────────────────

const mockDetail: PerformanceDetail = {
  mt20id: "PF123456",
  title: "햄릿",
  venueName: "LG아트센터 서울",
  posterUrl: "https://placehold.co/260x347/1a1a1a/ffffff?text=POSTER",
  genre: "연극",
  status: "공연중",
  startDate: "2026.06.01",
  endDate: "2026.09.30",
  isOpenRun: false,
  cast: "김성철, 이봉련, 박정복",
  runtime: "170분 (인터미션 20분 포함)",
  ageLimit: "만 12세 이상",
  ticketPrice: "VIP석 130,000원 / R석 110,000원 / S석 80,000원",
  showTime:
    "화·목 19:30 / 수·금 19:30 / 토 14:00, 19:00 / 일 14:00 / 월 공연없음",
  ticketLinks: [
    { name: "인터파크", url: "https://ticket.interpark.com" },
    { name: "예스24", url: "https://ticket.yes24.com" },
  ],
  description:
    "덴마크의 왕자 햄릿은 아버지의 갑작스러운 죽음과 어머니의 재혼으로 혼란에 빠진다. 아버지의 유령으로부터 삼촌 클로디어스가 자신을 독살했다는 사실을 듣게 되고, 복수를 결심한다.",
};

const mockDetailUpcoming: PerformanceDetail = {
  ...mockDetail,
  title: "오페라의 유령",
  genre: "뮤지컬",
  status: "공연예정",
  startDate: "2026.10.01",
  endDate: "2027.02.28",
  posterUrl: "https://placehold.co/260x347/2d1b69/ffffff?text=POSTER",
};

const mockDetailNoPoster: PerformanceDetail = {
  ...mockDetail,
  posterUrl: "",
  title: "포스터 없는 공연",
};

// ─── Interactive wrapper ────────────────────────────────────────────────────────

function LikeWrapper({ detail }: { detail: PerformanceDetail }) {
  const [liked, setLiked] = useState(false);
  return (
    <ShowDetailInfo
      detail={detail}
      liked={liked}
      onLikeToggle={() => setLiked((v) => !v)}
    />
  );
}

// ─── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ShowDetailInfo> = {
  title: "features/shows/detail/ShowDetailInfo",
  component: ShowDetailInfo,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ShowDetailInfo>;

// ─── Stories ───────────────────────────────────────────────────────────────────

/** 공연중 상태. 찜하기 버튼을 누르면 상태가 토글됩니다. */
export const Playing: Story = {
  name: "공연중 — 찜 토글 가능",
  render: () => <LikeWrapper detail={mockDetail} />,
};

/** 공연예정 상태 배지 확인. */
export const Upcoming: Story = {
  name: "공연예정",
  render: () => <LikeWrapper detail={mockDetailUpcoming} />,
};

/** 찜한 상태로 시작. */
export const Liked: Story = {
  name: "찜한 상태",
  args: {
    detail: mockDetail,
    liked: true,
  },
};

/** 포스터 이미지 없는 경우. */
export const NoPoster: Story = {
  name: "포스터 없음",
  render: () => <LikeWrapper detail={mockDetailNoPoster} />,
};

import { Ghost, Heart, Search, Users } from "lucide-react";

type EmptyMessage = {
  variant?: "section" | "inline";
  title?: string;
  description: string;
  icon?: React.ReactNode;
};

export const EMPTY_MESSAGES = {
  record: {
    feed: {
      variant: "section",
      title: "아직 작성된 필로그가 없어요.",
      description:
        "관람한 공연의 감상을 사진과 장소, 날짜와 함께 차곡차곡 모아보세요",
      icon: <Ghost className="h-10 w-10" />,
    } as EmptyMessage,
    showDetail: {} as EmptyMessage,
  },
  show: {
    saved: {} as EmptyMessage,
    boxOffice: {} as EmptyMessage,
  },
  user: {
    follower: {} as EmptyMessage,
    following: {} as EmptyMessage,
    recordGrid: {} as EmptyMessage,
  },
  search: {
    default: {} as EmptyMessage,
    noResult: {} as EmptyMessage,
    place: {} as EmptyMessage,
    performance: {} as EmptyMessage,
  },
} satisfies Record<string, Record<string, EmptyMessage>>;

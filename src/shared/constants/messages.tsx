import { se } from "date-fns/locale";
import { Ghost, Heart, Search, Users } from "lucide-react";

type EmptyMessage = {
  variant?: "section" | "inline";
  title?: string;
  description: string;
  icon?: React.ReactNode;
};

export const EMPTY_MESSAGES = {
  home: {
    boxOffice: {
      variant: "inline",
      description: "선택한 장르의 박스오피스 정보가 없어요.",
    } as EmptyMessage,
    best: {
      variant: "inline",
      description: "이번 주 베스트 필로그가 없어요.",
    } as EmptyMessage,
    latest: {
      variant: "inline",
      description: "이번주 최신 필로그가 없어요.",
    } as EmptyMessage,
  },
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

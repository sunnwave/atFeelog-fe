import { Bookmark, Heart, MessageCircle } from "lucide-react";

type FeedBackMessage = {
  variant?: "section" | "inline";
  status?: "empty" | "error";
  title?: string;
  description: string;
  icon?: React.ReactNode;
};

export const EMPTY_MESSAGES = {
  home: {
    boxOffice: {
      variant: "inline",
      description: "선택한 장르의 박스오피스 정보가 없어요.",
    } as FeedBackMessage,
    best: {
      variant: "inline",
      description: "이번 주 베스트 필로그가 없어요.",
    } as FeedBackMessage,
    latest: {
      variant: "inline",
      description: "이번주 최신 필로그가 없어요.",
    } as FeedBackMessage,
  },
  record: {
    feed: {
      variant: "section",
      title: "아직 작성된 필로그가 없어요.",
      description:
        "관람한 공연의 감상을 사진과 장소, 날짜와 함께 차곡차곡 모아보세요",
    } as FeedBackMessage,
  },
  show: {
    record: {
      variant: "section",
      title: "아직 이 공연에 대해 작성된 필로그가 없어요",
      description: "이 공연을 관람했다면 필로그를 작성해보세요",
    } as FeedBackMessage,
    saved: {} as FeedBackMessage,
  },
  comment: {
    variant: "section",
    title: "아직 작성된 댓글이 없어요.",
    description: "첫 댓글을 남겨보세요",
    icon: <MessageCircle className="h-8 w-8" />,
  } as FeedBackMessage,
  user: {
    following: {
      variant: "inline",
      description: "팔로잉하는 사람이 없어요",
    } as FeedBackMessage,
    follower: {
      variant: "inline",
      description: "팔로워가 없어요",
    } as FeedBackMessage,
    recordGrid: {
      variant: "section",
      title: "아직 내가 작성한 필로그가 없어요.",
      description:
        "관람한 공연의 감상을 사진과 장소, 날짜와 함께 차곡차곡 모아보세요",
    } as FeedBackMessage,
    likedGrid: {
      variant: "section",
      title: "아직 좋아요한 필로그가 없어요.",
      description: "인상깊은 필로그에 좋아요를 남겨보세요",
      icon: <Heart className="w-10 h-10" />,
    } as FeedBackMessage,
    savedGrid: {
      variant: "section",
      title: "아직 찜한 공연이 없어요.",
      description: "공연피드를 둘러보고 관심있는 공연을 찜해보세요",
      icon: <Bookmark className="h-10 w-10" />,
    } as FeedBackMessage,
  },
  search: {
    default: {} as FeedBackMessage,
    noResult: {} as FeedBackMessage,
    place: {} as FeedBackMessage,
    performance: {} as FeedBackMessage,
  },
};

export const ERROR_MESSAGES = {
  home: {
    boxOffice: {
      variant: "inline",
      status: "error",
      description: "박스오피스 정보를 불러오지 못했어요.",
    } as FeedBackMessage,
    best: {
      variant: "inline",
      status: "error",
      description: "베스트 필로그를 불러오지 못했어요.",
    } as FeedBackMessage,
    latest: {
      variant: "inline",
      status: "error",
      description: "최신 필로그를 불러오지 못했어요.",
    } as FeedBackMessage,
  },
  record: {
    feed: {
      variant: "section",
      status: "error",
      description: "필로그를 불러오지 못했어요.",
    } as FeedBackMessage,
  },
  show: {
    record: {
      variant: "section",
      status: "error",
      description: "필로그를 불러오지 못했어요.",
    } as FeedBackMessage,
  },
  comment: {
    variant: "section",
    status: "error",
    description: "댓글을 불러오지 못했어요.",
  } as FeedBackMessage,
  user: {
    recordGrid: {
      variant: "section",
      status: "error",
      description: "필로그를 불러오지 못했어요.",
    } as FeedBackMessage,
    likedGrid: {
      variant: "section",
      status: "error",
      description: "좋아요한 필로그를 불러오지 못했어요.",
    } as FeedBackMessage,
    savedGrid: {
      variant: "section",
      status: "error",
      description: "찜한 공연을 불러오지 못했어요.",
    } as FeedBackMessage,
  },
  search: {
    variant: "inline",
    status: "error",
    description: "검색 중 오류가 발생했어요.",
  } as FeedBackMessage,
};

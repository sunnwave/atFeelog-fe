import { http, HttpResponse, delay } from "msw";
import type {
  Performance,
  PerformanceSearchApiResponse,
} from "@/shared/types/performance";

export const MOCK_PERFORMANCES: Performance[] = [
  {
    mt20id: "PF220846",
    title: "지킬앤하이드",
    venueName: "블루스퀘어 신한카드홀",
    posterUrl:
      "https://www.kopis.or.kr/upload/pfmPoster/PF_PF220846_230103_134742.gif",
    genre: "뮤지컬",
    status: "공연중",
    startDate: "2024.12.06",
    endDate: "2025.03.30",
    isOpenRun: false,
  },
  {
    mt20id: "PF241234",
    title: "레미제라블",
    venueName: "충무아트센터 대극장",
    posterUrl: "",
    genre: "뮤지컬",
    status: "공연예정",
    startDate: "2025.04.10",
    endDate: "2025.06.15",
    isOpenRun: false,
  },
  {
    mt20id: "PF210034",
    title: "오페라의 유령",
    venueName: "샤롯데씨어터",
    posterUrl: "",
    genre: "뮤지컬",
    status: "공연중",
    startDate: "2023.09.01",
    endDate: "2099.12.31",
    isOpenRun: true,
  },
  {
    mt20id: "PF231122",
    title: "베르테르",
    venueName: "예술의전당 오페라극장",
    posterUrl: "",
    genre: "뮤지컬",
    status: "공연완료",
    startDate: "2024.07.01",
    endDate: "2024.09.30",
    isOpenRun: false,
  },
  {
    mt20id: "PF240987",
    title: "마타하리",
    venueName: "세종문화회관 대극장",
    posterUrl: "",
    genre: "뮤지컬",
    status: "공연예정",
    startDate: "2025.05.20",
    endDate: "2025.08.10",
    isOpenRun: false,
  },
];

const successResponse: PerformanceSearchApiResponse = {
  items: MOCK_PERFORMANCES,
  total: MOCK_PERFORMANCES.length,
  page: 1,
  isEnd: true,
};

const emptyResponse: PerformanceSearchApiResponse = {
  items: [],
  total: 0,
  page: 1,
  isEnd: true,
};

// 기본 핸들러 — success
export const kopisHandlers = [
  http.get("/api/kopis/performances", () => {
    return HttpResponse.json(successResponse);
  }),
];

// 무한스크롤 확인용 — 3페이지에서 종료
export const kopisInfiniteHandler = http.get(
  "/api/kopis/performances",
  ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");

    return HttpResponse.json({
      items: MOCK_PERFORMANCES,
      total: 12,
      page,
      isEnd: page >= 3,
    });
  },
);

export const kopisDetailHandlers = [
  http.get("/api/kopis/performances/:mt20id", ({ params }) => {
    const base =
      MOCK_PERFORMANCES.find((p) => p.mt20id === params.mt20id) ??
      MOCK_PERFORMANCES[0];

    return HttpResponse.json({
      ...base,
      cast: "김지현, 홍광호",
      runtime: "2시간 30분",
      ageLimit: "8세 이상",
      ticketPrice: "VIP 170,000원 / R석 140,000원",
      showTime: "화~금 19:30 / 토·일 14:00, 19:00",
      ticketLinks: [{ name: "인터파크", url: "https://tickets.interpark.com" }],
      description: "지킬 박사는 인간의 선과 악을 분리하는 실험을 시도한다.",
      introImages: [],
    });
  }),
];

// 스토리별 override용 핸들러
export const kopisEmptyHandler = http.get("/api/kopis/performances", () => {
  return HttpResponse.json(emptyResponse);
});

export const kopisErrorHandler = http.get("/api/kopis/performances", () => {
  return HttpResponse.json(
    { message: "서버 오류가 발생했어요." },
    { status: 500 },
  );
});

export const kopisSlowHandler = http.get(
  "/api/kopis/performances",
  async () => {
    await delay(1500);
    return HttpResponse.json(successResponse);
  },
);

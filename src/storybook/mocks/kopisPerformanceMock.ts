import type {
  Performance,
  PerformanceSearchApiResponse,
} from "@/shared/types/performance";

export type MockMode = "success" | "empty" | "error" | "slow";

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

export function installKopisPerformanceFetchMock(mode: MockMode) {
  const original = window.fetch.bind(window);

  window.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : (input as Request).url;

    if (url.startsWith("/api/kopis/performances")) {
      if (mode === "slow") await new Promise((r) => setTimeout(r, 1500));

      if (mode === "error") {
        return new Response(
          JSON.stringify({ message: "서버 오류가 발생했어요." }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        );
      }

      if (mode === "empty") {
        const body: PerformanceSearchApiResponse = {
          items: [],
          total: 0,
          page: 1,
          isEnd: true,
        };
        return new Response(JSON.stringify(body), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      const body: PerformanceSearchApiResponse = {
        items: MOCK_PERFORMANCES,
        total: MOCK_PERFORMANCES.length,
        page: 1,
        isEnd: true,
      };
      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return original(input, init);
  }) as typeof window.fetch;

  return () => {
    window.fetch = original;
  };
}

import type { KakaoPlace } from "@/shared/types/kakao";

// ✅ 스토리 전용 타입
export type MockMode = "success" | "error" | "empty" | "slow";

export const MOCK_PLACES: KakaoPlace[] = [
  {
    id: "1",
    place_name: "올림픽공원 체조경기장",
    address_name: "서울 송파구 올림픽로 424",
    road_address_name: "서울 송파구 올림픽로 424",
    x: "127.1214",
    y: "37.5201",
  },
  {
    id: "2",
    place_name: "블루스퀘어 마스터카드홀",
    address_name: "서울 용산구 이태원로 294",
    road_address_name: "서울 용산구 이태원로 294",
    x: "126.9943",
    y: "37.5395",
  },
  {
    id: "3",
    place_name: "세종문화회관",
    address_name: "서울 종로구 세종대로 175",
    road_address_name: "서울 종로구 세종대로 175",
    x: "126.9769",
    y: "37.5728",
  },
];

export function installKakaoPlacesFetchMock(mode: MockMode) {
  const original = window.fetch.bind(window);

  window.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
        ? input.href
        : (input as Request).url;

    if (url.startsWith("/api/kakao/places")) {
      if (mode === "slow") await new Promise((r) => setTimeout(r, 1200));

      if (mode === "error") {
        return new Response(JSON.stringify({ message: "Mock 검색 실패" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (mode === "empty") {
        return new Response(JSON.stringify({ documents: [] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ documents: MOCK_PLACES }), {
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

import { KakaoPlace, KakaoSearchResponse } from "@/shared/types/kakao";
import { delay, http, HttpResponse } from "msw";

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

const successResponse: KakaoSearchResponse = {
  documents: MOCK_PLACES,
  meta: {
    total_count: 3,
    pageable_count: 3,
    is_end: true,
  },
};

const emptyResponse: KakaoSearchResponse = {
  documents: [],
  meta: {
    total_count: 0,
    pageable_count: 0,
    is_end: true,
  },
};

export const kakaoHandlers = [
  http.get("/api/kakao/places", () => {
    return HttpResponse.json(successResponse);
  }),
];

export const kakaoInfiniteHandler = http.get(
  "/api/kakao/places",
  ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");

    return HttpResponse.json({
      documents: MOCK_PLACES,
      meta: {
        total_count: 12,
        pageable_count: 12,
        is_end: page >= 3,
      },
    });
  },
);

export const kakaoEmptyHandler = http.get("/api/kakao/places", () => {
  return HttpResponse.json(emptyResponse);
});

export const kakaoErrorHandler = http.get("/api/kakao/places", () => {
  return HttpResponse.json(
    { message: "서버 오류가 발생했어요." },
    { status: 500 },
  );
});

export const kakaoSlowHandler = http.get("/api/kakao/places", async () => {
  await delay(1500);
  return HttpResponse.json(successResponse);
});

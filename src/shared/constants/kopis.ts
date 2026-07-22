export const KOPIS_BASE_URL = "http://www.kopis.or.kr/openApi/restful";

/** 박스오피스 예매상황판용 장르 코드 */
export const BOXOFFICE_GENRES = [
  { label: "전체", catecode: "" },
  { label: "뮤지컬", catecode: "GGGA" },
  { label: "연극", catecode: "AAAA" },
  { label: "클래식", catecode: "CCCA" },
  { label: "대중음악", catecode: "CCCD" },
  { label: "무용", catecode: "BBBC" },
  { label: "서커스/마술", catecode: "EEEB" },
] as const;

export type BoxOfficeGenreCatecode = (typeof BOXOFFICE_GENRES)[number]["catecode"];

/** 공연 탐색 페이지 장르 필터 코드 (pblprfr API shcate 파라미터) */
export const SHOW_GENRES = [
  { label: "전체", shcate: "" },
  { label: "뮤지컬", shcate: "GGGA" },
  { label: "연극", shcate: "AAAA" },
  { label: "클래식", shcate: "CCCA" },
  { label: "대중음악", shcate: "CCCD" },
  { label: "무용", shcate: "BBBC" },
  { label: "서커스/마술", shcate: "EEEB" },
] as const;

export type ShowGenreShcate = (typeof SHOW_GENRES)[number]["shcate"];

/** 공연 상태 필터 (prfstate 파라미터) */
export const SHOW_STATUSES = [
  { label: "전체", prfstate: "" },
  { label: "공연예정", prfstate: "01" },
  { label: "공연중", prfstate: "02" },
  { label: "공연완료", prfstate: "03" },
] as const;

export type ShowPrfstate = (typeof SHOW_STATUSES)[number]["prfstate"];

/** 공연 탐색 지역 필터 (signgucode 파라미터) */
export const SHOW_REGIONS = [
  { label: "전체", signgucode: "" },
  { label: "서울", signgucode: "11" },
  { label: "경기", signgucode: "41" },
  { label: "부산", signgucode: "26" },
  { label: "대구", signgucode: "27" },
  { label: "인천", signgucode: "28" },
  { label: "광주", signgucode: "29" },
  { label: "대전", signgucode: "30" },
  { label: "울산", signgucode: "31" },
  { label: "강원", signgucode: "51" },
  { label: "충북", signgucode: "43" },
  { label: "충남", signgucode: "44" },
  { label: "전북", signgucode: "45" },
  { label: "전남", signgucode: "46" },
  { label: "경북", signgucode: "47" },
  { label: "경남", signgucode: "48" },
  { label: "제주", signgucode: "50" },
] as const;

export type ShowSigngucode = (typeof SHOW_REGIONS)[number]["signgucode"];

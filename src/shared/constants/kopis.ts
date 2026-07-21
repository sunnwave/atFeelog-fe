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

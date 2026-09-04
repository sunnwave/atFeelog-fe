// ─────────────────────────────────────────────
// 정규화된 UI 타입
// ─────────────────────────────────────────────

/** 목록 검색 결과 — 모달 / 폼 자동완성에 사용 */
export type Performance = {
  mt20id: string;
  title: string; // prfnm
  venueName: string; // fcltynm
  posterUrl: string; // poster
  genre: string; // genrenm
  status?: PerformanceStatus;
  startDate: string; // "YYYY.MM.DD"
  endDate: string; // "YYYY.MM.DD"
  isOpenRun: boolean; // openrun === "Y"
};

export type PerformanceStatus = "공연예정" | "공연중" | "공연완료";

/** 상세 페이지 / 정보 카드에 사용 */
export type PerformanceDetail = Performance & {
  cast?: string;
  runtime?: string;
  ageLimit?: string;
  ticketPrice?: string;
  showTime?: string;
  ticketLinks: { name: string; url: string }[];
  description?: string; // 줄거리 (sty)
  introImages?: string[]; // 소개이미지 목록 (styurls.styurl)
};

// ─────────────────────────────────────────────
// API Route 응답 타입 (pages/api/kopis/performances.ts)
// ─────────────────────────────────────────────

export type PerformanceSearchApiResponse = {
  items: Performance[];
  total: number;
  page: number;
  isEnd: boolean;
};

// ─────────────────────────────────────────────
// 박스오피스 타입 (GET /boxoffice)
// ─────────────────────────────────────────────

/** 정규화된 박스오피스 항목 */
export type BoxOffice = {
  rank: number;
  mt20id: string;
  title: string;
  venueName: string;
  posterUrl: string;
  genre: string;
  period: string;
  area: string;
};

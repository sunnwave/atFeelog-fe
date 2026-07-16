// ─────────────────────────────────────────────
// Raw KOPIS API 응답 타입 (XML → fast-xml-parser 파싱 후)
// ─────────────────────────────────────────────

/** 공연 목록 검색 API (GET /pblprfr) 단일 항목 */
export type KopisRawPerformance = {
  mt20id: string;      // 공연 ID (KOPIS 고유값 — 이후 상세/필로그 연결 키)
  prfnm: string;       // 공연명
  prfpdfrom: string;   // 공연 시작일 "YYYY.MM.DD"
  prfpdto: string;     // 공연 종료일 "YYYY.MM.DD"
  fcltynm: string;     // 공연장명
  poster: string;      // 포스터 이미지 URL
  genrenm: string;     // 장르명 (뮤지컬 / 연극 / 콘서트 / 클래식 / 무용 / 국악 / 기타)
  prfstate: string;    // 공연 상태 (공연예정 / 공연중 / 공연완료)
  openrun: string;     // 오픈런 여부 ("Y" | "N")
};

/** 공연 목록 검색 API 전체 응답 래퍼 */
export type KopisSearchResponse = {
  dbs: {
    // 결과가 1건이면 객체, 2건 이상이면 배열로 옴 → 항상 배열로 정규화 필요
    db: KopisRawPerformance | KopisRawPerformance[];
  };
};

/** 공연 상세 API (GET /pblprfr/:mt20id) 추가 필드 */
export type KopisRawPerformanceDetail = KopisRawPerformance & {
  prfcast?: string;      // 출연진 (KOPIS XML 필드명)
  prfruntime?: string;   // 런타임 (예: "90분")
  prfage?: string;       // 관람연령 (예: "만 7세 이상")
  pcseguidance?: string; // 티켓가격 (예: "VIP석 170,000원, ...")
  dtguidance?: string;   // 공연 시간 (예: "화~금 19:30 ...")
  relates?: {
    // 예매처 링크도 1건이면 객체, 2건 이상이면 배열
    relate:
      | { relatenm: string; relateurl: string }
      | { relatenm: string; relateurl: string }[];
  };
};

/** 공연 상세 API 전체 응답 래퍼 */
export type KopisDetailResponse = {
  dbs: {
    db: KopisRawPerformanceDetail | KopisRawPerformanceDetail[];
  };
};

// ─────────────────────────────────────────────
// 정규화된 UI 타입
// ─────────────────────────────────────────────

/** 목록 검색 결과 — 모달 / 폼 자동완성에 사용 */
export type Performance = {
  mt20id: string;
  title: string;      // prfnm
  venueName: string;  // fcltynm
  posterUrl: string;  // poster
  genre: string;      // genrenm
  status: PerformanceStatus;
  startDate: string;  // "YYYY.MM.DD"
  endDate: string;    // "YYYY.MM.DD"
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

import { XMLParser } from "fast-xml-parser";
import type {
  KopisRawPerformance,
  KopisRawPerformanceDetail,
  KopisSearchResponse,
  KopisDetailResponse,
  Performance,
  PerformanceDetail,
  PerformanceStatus,
} from "@/shared/types/performance";

// ─────────────────────────────────────────────
// XML 파싱
// ─────────────────────────────────────────────

const parser = new XMLParser({
  ignoreAttributes: false,
  // 숫자처럼 생긴 값도 문자열 유지 (mt20id 등이 숫자로 변환되는 것 방지)
  parseAttributeValue: false,
  parseTagValue: false,
});

/**
 * KOPIS API XML 응답 문자열을 JS 객체로 파싱한다.
 * fast-xml-parser는 동기 파싱이라 try/catch로 감싼다.
 */
export function parseKopisXml<T = unknown>(xml: string): T {
  return parser.parse(xml) as T;
}

// ─────────────────────────────────────────────
// 배열 정규화
// KOPIS는 결과가 1건이면 객체, 2건 이상이면 배열로 내려옴
// ─────────────────────────────────────────────

export function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

// ─────────────────────────────────────────────
// Raw → UI 타입 정규화
// ─────────────────────────────────────────────

export function normalizeKopisPerformance(
  raw: KopisRawPerformance
): Performance {
  return {
    mt20id: raw.mt20id,
    title: raw.prfnm,
    venueName: raw.fcltynm,
    posterUrl: raw.poster,
    genre: raw.genrenm,
    status: raw.prfstate as PerformanceStatus,
    startDate: raw.prfpdfrom, // "YYYY.MM.DD" 그대로 유지
    endDate: raw.prfpdto,
    isOpenRun: raw.openrun === "Y",
  };
}

// ─────────────────────────────────────────────
// 검색 XML 응답 → Performance[]
// ─────────────────────────────────────────────

/**
 * 목록 검색 API XML을 파싱해 Performance 배열로 반환한다.
 * 결과 0건일 때 KOPIS는 <dbs/> 빈 태그를 내려주므로 null 체크 필요.
 */
export function parsePerformanceSearchXml(xml: string): Performance[] {
  const parsed = parseKopisXml<KopisSearchResponse>(xml);
  const db = parsed?.dbs?.db;
  return toArray(db).map(normalizeKopisPerformance);
}

// ─────────────────────────────────────────────
// 상세 API 파싱
// ─────────────────────────────────────────────

export function normalizeKopisPerformanceDetail(
  raw: KopisRawPerformanceDetail
): PerformanceDetail {
  const ticketLinks = toArray(raw.relates?.relate).map((r) => ({
    name: r.relatenm,
    url: r.relateurl,
  }));

  return {
    ...normalizeKopisPerformance(raw),
    cast: raw.prfcast,
    runtime: raw.prfruntime,
    ageLimit: raw.prfage,
    ticketPrice: raw.pcseguidance,
    showTime: raw.dtguidance,
    ticketLinks,
  };
}

export function parsePerformanceDetailXml(xml: string): PerformanceDetail | null {
  const parsed = parseKopisXml<KopisDetailResponse>(xml);
  const db = toArray(parsed?.dbs?.db)[0];
  if (!db) return null;
  return normalizeKopisPerformanceDetail(db);
}

// ─────────────────────────────────────────────
// 날짜 변환 유틸
// ─────────────────────────────────────────────

/** KOPIS 날짜 "YYYY.MM.DD" → 폼 날짜 "YYYY-MM-DD" */
export function kopisDateToFormDate(kopisDate: string): string {
  return kopisDate.replace(/\./g, "-");
}

/** 공연 검색 결과의 시작일을 폼의 showDate 초깃값으로 사용한다. */
export function resolveShowDate(p: Performance): string {
  return kopisDateToFormDate(p.startDate);
}

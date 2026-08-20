import { XMLParser } from "fast-xml-parser";
import type {
  KopisRawPerformance,
  KopisRawPerformanceDetail,
  KopisRawBoxOffice,
  KopisSearchResponse,
  KopisDetailResponse,
  KopisBoxOfficeResponse,
} from "@/api/adapters/types/kopis";

// ─────────────────────────────────────────────
// XML 파싱
// ─────────────────────────────────────────────

const parser = new XMLParser({
  ignoreAttributes: false,
  parseAttributeValue: false,
  parseTagValue: false,
});

/**
 * KOPIS API XML 응답 문자열을 JS 객체로 파싱한다.
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
// XML → Raw 타입 파싱 (타입 변환 없음)
// ─────────────────────────────────────────────

export function parsePerformanceSearchXml(xml: string): KopisRawPerformance[] {
  const parsed = parseKopisXml<KopisSearchResponse>(xml);
  return toArray(parsed?.dbs?.db);
}

export function parsePerformanceDetailXml(
  xml: string
): KopisRawPerformanceDetail | null {
  const parsed = parseKopisXml<KopisDetailResponse>(xml);
  return toArray(parsed?.dbs?.db)[0] ?? null;
}

export function parseBoxOfficeXml(xml: string): KopisRawBoxOffice[] {
  const parsed = parseKopisXml<KopisBoxOfficeResponse>(xml);
  return toArray(parsed?.boxofs?.boxof);
}

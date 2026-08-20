import type { Performance } from "@/shared/types/performance";

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

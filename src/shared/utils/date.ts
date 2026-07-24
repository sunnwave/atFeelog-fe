import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

export function formatDate(dateString: string): string {
  return moment.utc(dateString).format("YYYY.MM.DD");
}

export function fromNow(dateString: string): string {
  return moment(dateString).fromNow();
}

// ISO DateTime("2026-02-06T12:00:00.000Z") 또는 "YYYY-MM-DD" → input[type=date] 용 "YYYY-MM-DD"
export function toDateInputValue(dateString: string | undefined | null): string {
  if (!dateString) return "";
  return dateString.slice(0, 10);
}

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"] as const;

export function parseDateLabel(iso: string): { mon: string; day: string } {
  const d = new Date(iso);
  return {
    mon: MONTHS[d.getMonth()],
    day: String(d.getDate()).padStart(2, "0"),
  };
}

export function localDateToRfc3339NoonUtc(localDate: string): string {
  // 엄격 체크(간단 버전)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(localDate)) return localDate;

  // ✅ 정오(12:00:00.000Z)로 고정
  return `${localDate}T12:00:00.000Z`;
}

// ─────────────────────────────────────────────
// KOPIS 날짜 유틸
// ─────────────────────────────────────────────

/** Date → KOPIS API 파라미터 포맷 "YYYYMMDD" */
export function formatKopisDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

/** "YYYY-MM-DD" → "YYYYMMDD" */
export function toKopisDate(v: string): string {
  return v.replace(/-/g, "").slice(0, 8);
}

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function addYears(date: Date, years: number): Date {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

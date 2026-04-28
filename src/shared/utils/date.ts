import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

export function formatDate(dateString: string): string {
  return moment.utc(dateString).format("YYYY.MM.DD");
}

export function fromNow(dateString: string): string {
  return moment(dateString).fromNow();
}

export function localDateToRfc3339NoonUtc(localDate: string): string {
  // 엄격 체크(간단 버전)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(localDate)) return localDate;

  // ✅ 정오(12:00:00.000Z)로 고정
  return `${localDate}T12:00:00.000Z`;
}

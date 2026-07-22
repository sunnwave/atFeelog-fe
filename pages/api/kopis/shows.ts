import type { NextApiRequest, NextApiResponse } from "next";
import { KOPIS_BASE_URL } from "@/shared/constants/kopis";
import { parsePerformanceSearchXml } from "@/shared/utils/kopis";
import type { PerformanceSearchApiResponse } from "@/shared/types/performance";

/**
 * GET /api/kopis/shows
 *
 * 공연 탐색 페이지용 API (공연명 검색어 없이도 장르/상태/날짜 필터로 브라우징 가능)
 *
 * Query params:
 *   q        - 공연명 (선택)
 *   genre    - 장르 shcate 코드 (선택, e.g. GGGA)
 *   status   - 공연 상태 prfstate (선택, 01/02/03)
 *   stdate   - 시작일 YYYY-MM-DD (선택, 기본: 1개월 전)
 *   eddate   - 종료일 YYYY-MM-DD (선택, 기본: 1년 후)
 *   page     - 페이지 번호 (기본: 1)
 *   rows     - 페이지당 건수 (기본: 20)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PerformanceSearchApiResponse | { message: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const API_KEY = process.env.KOPIS_API_KEY;
  if (!API_KEY) return res.status(500).json({ message: "KOPIS_API_KEY missing" });

  const q = String(req.query.q ?? "").trim();
  const genre = String(req.query.genre ?? "").trim();
  const status = String(req.query.status ?? "").trim();
  const area = String(req.query.area ?? "").trim();
  const page = Math.max(1, Number(req.query.page ?? 1));
  const rows = Math.min(100, Math.max(1, Number(req.query.rows ?? 20)));

  // 날짜 기본값: 1개월 전 ~ 1년 후
  const defaultStdate = formatDate(addMonths(new Date(), -1));
  const defaultEddate = formatDate(addMonths(new Date(), 12));

  const stdate = toKopisDate(String(req.query.stdate ?? "")) || defaultStdate;
  const eddate = toKopisDate(String(req.query.eddate ?? "")) || defaultEddate;

  const url = new URL(`${KOPIS_BASE_URL}/pblprfr`);
  url.searchParams.set("service", API_KEY);
  url.searchParams.set("stdate", stdate);
  url.searchParams.set("eddate", eddate);
  url.searchParams.set("cpage", String(page));
  url.searchParams.set("rows", String(rows));

  if (q) url.searchParams.set("shprfnm", q);
  if (genre) url.searchParams.set("shcate", genre);
  if (status) url.searchParams.set("prfstate", status);
  if (area) url.searchParams.set("signgucode", area);

  const r = await fetch(url.toString());
  if (!r.ok) {
    return res.status(r.status).json({ message: `KOPIS error: ${r.status}` });
  }

  const xml = await r.text();
  const items = parsePerformanceSearchXml(xml);
  const isEnd = items.length < rows;

  return res.status(200).json({ items, total: items.length, page, isEnd });
}

/** "YYYY-MM-DD" → "YYYYMMDD" (KOPIS 포맷) */
function toKopisDate(v: string): string {
  return v.replace(/-/g, "").slice(0, 8);
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

function addMonths(d: Date, months: number): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + months);
  return r;
}

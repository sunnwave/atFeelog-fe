import type { NextApiRequest, NextApiResponse } from "next";
import { KOPIS_BASE_URL } from "@/shared/constants/kopis";
import { parsePerformanceSearchXml } from "@/api/adapters/kopis.parser";
import { normalizeKopisPerformance } from "@/api/adapters/kopis.adapter";
import { formatKopisDate, addYears } from "@/shared/utils/date";
import type { PerformanceSearchApiResponse } from "@/shared/types/performance";

/**
 * GET /api/kopis/performances?q=지킬앤하이드&page=1&rows=10
 *
 * KOPIS 공연 검색 API를 서버에서 호출해 JSON으로 변환해 반환한다.
 * API 키는 서버에서만 사용되므로 클라이언트에 노출되지 않는다.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PerformanceSearchApiResponse | { message: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const q = String(req.query.q ?? "").trim();
  const page = Number(req.query.page ?? 1);
  const rows = Number(req.query.rows ?? 10);

  if (!q) return res.status(400).json({ message: "q is required" });

  const API_KEY = process.env.KOPIS_API_KEY;
  if (!API_KEY) return res.status(500).json({ message: "KOPIS_API_KEY missing" });

  // stdate: KOPIS DB 최초 데이터 기준으로 고정 — 과거 공연 전체 검색 가능
  // eddate: 2년 후까지 — 예매 오픈된 미래 공연 포함
  const stdate = "20000101";
  const eddate = formatKopisDate(addYears(new Date(), 2));


  const url = new URL(`${KOPIS_BASE_URL}/pblprfr`);
  url.searchParams.set("service", API_KEY);
  url.searchParams.set("stdate", stdate);
  url.searchParams.set("eddate", eddate);
  url.searchParams.set("shprfnm", q);
  url.searchParams.set("cpage", String(page));
  url.searchParams.set("rows", String(rows));

  const r = await fetch(url.toString());

  if (!r.ok) {
    return res.status(r.status).json({ message: `KOPIS error: ${r.status}` });
  }

  const xml = await r.text();
  const items = parsePerformanceSearchXml(xml).map(normalizeKopisPerformance);

  // KOPIS는 전체 건수를 별도 필드로 내려주지 않으므로
  // rows보다 적게 왔으면 마지막 페이지로 판단
  const isEnd = items.length < rows;

  return res.status(200).json({
    items,
    total: items.length, // 현재 페이지 건수 (전체 건수는 API 미제공)
    page,
    isEnd,
  });
}



import type { NextApiRequest, NextApiResponse } from "next";
import { KOPIS_BASE_URL } from "@/shared/constants/kopis";
import { parseBoxOfficeXml } from "@/shared/utils/kopis";
import type { BoxOffice } from "@/shared/types/performance";

/**
 * GET /api/kopis/boxoffice?type=week
 *
 * KOPIS 예매상황판 조회 API
 * 파라미터: service, stdate, eddate (ststype 없음)
 * 하루 1회 캐싱 (Cache-Control: s-maxage=86400)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BoxOffice[] | { message: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const API_KEY = process.env.KOPIS_API_KEY;
  if (!API_KEY) return res.status(500).json({ message: "KOPIS_API_KEY missing" });

  const typeParam = (req.query.type as string) ?? "week";

  // stdate~eddate: week=최근 7일, month=최근 30일
  const edDate = new Date();
  const stDate = new Date();
  stDate.setDate(stDate.getDate() - (typeParam === "month" ? 30 : 7));

  const url = new URL(`${KOPIS_BASE_URL}/boxoffice`);
  url.searchParams.set("service", API_KEY);
  url.searchParams.set("stdate", formatDate(stDate));
  url.searchParams.set("eddate", formatDate(edDate));

  const catecode = req.query.catecode as string | undefined;
  if (catecode) url.searchParams.set("catecode", catecode);

  const r = await fetch(url.toString());
  if (!r.ok) {
    return res.status(r.status).json({ message: `KOPIS error: ${r.status}` });
  }

  const xml = await r.text();
  const items = parseBoxOfficeXml(xml);

  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=3600");
  return res.status(200).json(items);
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

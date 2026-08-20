import type { NextApiRequest, NextApiResponse } from "next";
import { KOPIS_BASE_URL } from "@/shared/constants/kopis";
import { parsePerformanceDetailXml } from "@/api/adapters/kopis.parser";
import { normalizeKopisPerformanceDetail } from "@/api/adapters/kopis.adapter";
import type { PerformanceDetail } from "@/shared/types/performance";

/**
 * GET /api/kopis/performances/:id
 *
 * KOPIS 공연 상세 API — 주로 cast(출연진) 자동완성에 사용.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PerformanceDetail | { message: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "id is required" });
  }

  const API_KEY = process.env.KOPIS_API_KEY;
  if (!API_KEY) return res.status(500).json({ message: "KOPIS_API_KEY missing" });

  const url = new URL(`${KOPIS_BASE_URL}/pblprfr/${encodeURIComponent(id)}`);
  url.searchParams.set("service", API_KEY);

  const r = await fetch(url.toString());
  if (!r.ok) {
    return res.status(r.status).json({ message: `KOPIS error: ${r.status}` });
  }

  const xml = await r.text();
  const raw = parsePerformanceDetailXml(xml);
  const detail = raw ? normalizeKopisPerformanceDetail(raw) : null;

  if (!detail) {
    return res.status(404).json({ message: "공연 정보를 찾을 수 없어요." });
  }

  return res.status(200).json(detail);
}

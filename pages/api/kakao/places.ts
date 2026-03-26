import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = String(req.query.q ?? "").trim();
  const page = Number(req.query.page ?? 1);
  const size = Number(req.query.size ?? 10);

  if (!q) return res.status(400).json({ message: "q is required" });

  const REST_KEY = process.env.KAKAO_REST_API_KEY;
  if (!REST_KEY)
    return res.status(500).json({ message: "KAKAO_REST_API_KEY missing" });

  const url =
    `https://dapi.kakao.com/v2/local/search/keyword.json` +
    `?query=${encodeURIComponent(q)}` +
    `&page=${page}` +
    `&size=${size}`;

  const r = await fetch(url, {
    headers: { Authorization: `KakaoAK ${REST_KEY}` },
  });

  const data = await r.json();

  if (!r.ok) {
    return res
      .status(r.status)
      .json({ message: data?.message ?? "kakao error", data });
  }

  return res.status(200).json(data);
}

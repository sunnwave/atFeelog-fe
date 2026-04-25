import type { NextApiRequest, NextApiResponse } from "next";

function isHttps(req: NextApiRequest) {
  const xfProto = req.headers["x-forwarded-proto"];
  return typeof xfProto === "string" && xfProto.includes("https");
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const secure = isHttps(req) ? "; Secure" : "";

  const base = `Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;

  res.setHeader("Set-Cookie", [
    `refreshToken=; ${base}`,
    `refresh-token=; ${base}`,
  ]);

  return res.status(200).json({ ok: true });
}
